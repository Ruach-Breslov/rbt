/// <reference types="@webgpu/types" />

import { heroShader } from "@/lib/webgpu/hero-shader";

export type WebGpuOutput = "display-p3-extended" | "srgb";

export type WebGpuSceneOptions = {
  imageUrl?: string;
  variant?: "hero" | "photo";
  onDeviceLost?: () => void;
};

export type WebGpuScene = {
  output: WebGpuOutput;
  destroy: () => void;
};

const MAX_PIXEL_RATIO = 3;
const MAX_RENDER_PIXELS = 8_294_400;

function canvasSize(canvas: HTMLCanvasElement, maxDimension: number) {
  const cssWidth = Math.max(1, canvas.clientWidth);
  const cssHeight = Math.max(1, canvas.clientHeight);
  let ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
  const requestedPixels = cssWidth * cssHeight * ratio * ratio;

  if (requestedPixels > MAX_RENDER_PIXELS) {
    ratio *= Math.sqrt(MAX_RENDER_PIXELS / requestedPixels);
  }

  const width = Math.max(1, Math.min(maxDimension, Math.round(cssWidth * ratio)));
  const height = Math.max(1, Math.min(maxDimension, Math.round(cssHeight * ratio)));
  return { width, height, ratio };
}

async function createTexture(device: GPUDevice, imageUrl?: string) {
  if (!imageUrl) {
    const texture = device.createTexture({
      label: "WebGPU fallback media texture",
      size: [1, 1],
      format: "rgba8unorm",
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST
    });
    device.queue.writeTexture(
      { texture },
      new Uint8Array([10, 14, 30, 255]),
      { bytesPerRow: 4 },
      { width: 1, height: 1 }
    );
    return { texture, aspect: 1, hasImage: false };
  }

  const response = await fetch(imageUrl, { credentials: "same-origin", cache: "force-cache" });
  if (!response.ok) throw new Error("WEBGPU_IMAGE_FETCH_FAILED");
  const bitmap = await createImageBitmap(await response.blob(), {
    imageOrientation: "from-image",
    premultiplyAlpha: "default",
    colorSpaceConversion: "default"
  });

  const formats: GPUTextureFormat[] = ["rgba16float", "rgba8unorm"];
  try {
    for (const format of formats) {
      device.pushErrorScope("validation");
      const texture = device.createTexture({
        label: `WebGPU media texture (${format})`,
        size: [bitmap.width, bitmap.height],
        format,
        usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST
      });
      device.queue.copyExternalImageToTexture(
        { source: bitmap },
        { texture, colorSpace: "display-p3" },
        { width: bitmap.width, height: bitmap.height }
      );
      const validationError = await device.popErrorScope();
      if (!validationError) {
        return { texture, aspect: bitmap.width / bitmap.height, hasImage: true };
      }
      texture.destroy();
    }
  } finally {
    bitmap.close();
  }

  throw new Error("WEBGPU_IMAGE_UPLOAD_FAILED");
}

export async function createWebGpuScene(canvas: HTMLCanvasElement, options: WebGpuSceneOptions = {}): Promise<WebGpuScene> {
  if (!navigator.gpu) throw new Error("WEBGPU_UNAVAILABLE");
  const adapter = await navigator.gpu.requestAdapter({ powerPreference: "high-performance" });
  if (!adapter) throw new Error("WEBGPU_ADAPTER_UNAVAILABLE");
  const device = await adapter.requestDevice({ label: "Website visual renderer" });
  const context = canvas.getContext("webgpu");
  if (!context) {
    device.destroy();
    throw new Error("WEBGPU_CONTEXT_UNAVAILABLE");
  }

  const format = navigator.gpu.getPreferredCanvasFormat();
  let output: WebGpuOutput = "display-p3-extended";
  try {
    context.configure({
      device,
      format,
      alphaMode: "premultiplied",
      colorSpace: "display-p3",
      toneMapping: { mode: "extended" }
    });
  } catch {
    output = "srgb";
    context.configure({ device, format, alphaMode: "premultiplied", colorSpace: "srgb" });
  }

  const shaderModule = device.createShaderModule({ label: "Website visual shader", code: heroShader });
  const compilation = await shaderModule.getCompilationInfo();
  if (compilation.messages.some((message) => message.type === "error")) {
    context.unconfigure();
    device.destroy();
    throw new Error("WEBGPU_SHADER_COMPILATION_FAILED");
  }

  const pipeline = await device.createRenderPipelineAsync({
    label: "Website full-resolution visual pipeline",
    layout: "auto",
    vertex: { module: shaderModule, entryPoint: "vertexMain" },
    fragment: { module: shaderModule, entryPoint: "fragmentMain", targets: [{ format }] },
    primitive: { topology: "triangle-list" }
  });

  let media: Awaited<ReturnType<typeof createTexture>>;
  try {
    media = await createTexture(device, options.imageUrl);
  } catch {
    media = await createTexture(device);
  }

  const sampler = device.createSampler({
    label: "High-quality media sampler",
    addressModeU: "clamp-to-edge",
    addressModeV: "clamp-to-edge",
    magFilter: "linear",
    minFilter: "linear",
    mipmapFilter: "linear"
  });
  const uniformBuffer = device.createBuffer({
    label: "Website visual uniforms",
    size: 48,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  });
  const bindGroup = device.createBindGroup({
    label: "Website visual bind group",
    layout: pipeline.getBindGroupLayout(0),
    entries: [
      { binding: 0, resource: { buffer: uniformBuffer } },
      { binding: 1, resource: media.texture.createView() },
      { binding: 2, resource: sampler }
    ]
  });

  let destroyed = false;
  let intersecting = true;
  let frameId = 0;
  let startTime = performance.now();
  let pointerX = 0.5;
  let pointerY = 0.5;
  let targetX = 0.5;
  let targetY = 0.5;
  let lastMotion = 0;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const resize = () => {
    const size = canvasSize(canvas, device.limits.maxTextureDimension2D);
    if (canvas.width !== size.width || canvas.height !== size.height) {
      canvas.width = size.width;
      canvas.height = size.height;
    }
    return size.ratio;
  };

  const render = (timestamp: number) => {
    if (destroyed) return;
    const pixelRatio = resize();
    const dx = targetX - pointerX;
    const dy = targetY - pointerY;
    pointerX += dx * 0.075;
    pointerY += dy * 0.075;
    lastMotion = lastMotion * 0.9 + Math.min(1, Math.hypot(dx, dy) * 3) * 0.1;
    const elapsed = reducedMotion.matches ? 0 : (timestamp - startTime) / 1000;
    const values = new Float32Array([
      canvas.width, canvas.height, elapsed, pixelRatio,
      pointerX, pointerY, lastMotion, reducedMotion.matches ? 1 : 0,
      media.aspect, media.hasImage ? 1 : 0, options.variant === "photo" ? 1 : 0, 0
    ]);
    device.queue.writeBuffer(uniformBuffer, 0, values);

    const encoder = device.createCommandEncoder({ label: "Website visual frame" });
    const pass = encoder.beginRenderPass({
      label: "Website visual render pass",
      colorAttachments: [{
        view: context.getCurrentTexture().createView(),
        clearValue: { r: 0.005, g: 0.008, b: 0.025, a: 1 },
        loadOp: "clear",
        storeOp: "store"
      }]
    });
    pass.setPipeline(pipeline);
    pass.setBindGroup(0, bindGroup);
    pass.draw(3);
    pass.end();
    device.queue.submit([encoder.finish()]);

    if (!reducedMotion.matches && intersecting && document.visibilityState === "visible") {
      frameId = requestAnimationFrame(render);
    }
  };

  const requestRender = () => {
    cancelAnimationFrame(frameId);
    if (!destroyed && intersecting && document.visibilityState === "visible") {
      frameId = requestAnimationFrame(render);
    }
  };

  const onPointerMove = (event: PointerEvent) => {
    const bounds = canvas.getBoundingClientRect();
    targetX = Math.min(1, Math.max(0, (event.clientX - bounds.left) / Math.max(bounds.width, 1)));
    targetY = Math.min(1, Math.max(0, (event.clientY - bounds.top) / Math.max(bounds.height, 1)));
    if (reducedMotion.matches) requestRender();
  };
  const onPointerLeave = () => {
    targetX = 0.5;
    targetY = 0.5;
  };
  const onVisibility = () => {
    if (document.visibilityState === "visible") {
      startTime = performance.now();
      requestRender();
    } else {
      cancelAnimationFrame(frameId);
    }
  };
  const onMotionPreference = () => requestRender();

  const resizeObserver = new ResizeObserver(requestRender);
  resizeObserver.observe(canvas);
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    intersecting = entry?.isIntersecting ?? true;
    if (intersecting) requestRender();
    else cancelAnimationFrame(frameId);
  }, { rootMargin: "160px" });
  intersectionObserver.observe(canvas);
  canvas.addEventListener("pointermove", onPointerMove, { passive: true });
  canvas.addEventListener("pointerleave", onPointerLeave, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  reducedMotion.addEventListener("change", onMotionPreference);

  void device.lost.then((info) => {
    if (!destroyed && info.reason !== "destroyed") options.onDeviceLost?.();
  });
  requestRender();

  return {
    output,
    destroy() {
      if (destroyed) return;
      destroyed = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMotion.removeEventListener("change", onMotionPreference);
      media.texture.destroy();
      uniformBuffer.destroy();
      context.unconfigure();
      device.destroy();
    }
  };
}
