"use client";

import { useEffect, useRef, useState } from "react";
import { createWebGpuScene, type WebGpuOutput, type WebGpuScene } from "@/lib/webgpu/scene-renderer";
import { withBasePath } from "@/lib/paths";

type SurfaceState = "loading" | "ready" | "fallback" | "recovering";

function WebGpuCanvas({ imageUrl, variant, className }: { imageUrl?: string; variant: "hero" | "photo"; className: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<SurfaceState>("loading");
  const [output, setOutput] = useState<WebGpuOutput>("srgb");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let active = true;
    let scene: WebGpuScene | undefined;
    let retryTimer = 0;

    const boot = async () => {
      if (!active) return;
      try {
        scene?.destroy();
        scene = await createWebGpuScene(canvas, {
          imageUrl,
          variant,
          onDeviceLost: () => {
            if (!active) return;
            setState("recovering");
            retryTimer = window.setTimeout(boot, 900);
          }
        });
        if (!active) {
          scene.destroy();
          return;
        }
        setOutput(scene.output);
        setState("ready");
      } catch {
        if (active) setState("fallback");
      }
    };

    void boot();
    return () => {
      active = false;
      window.clearTimeout(retryTimer);
      scene?.destroy();
    };
  }, [imageUrl, variant]);

  return (
    <div className={className} data-webgpu-state={state} data-webgpu-output={output} aria-hidden="true">
      <canvas ref={canvasRef} />
      {variant === "hero" ? <span className="webgpu-quality-mark">WebGPU · {output === "display-p3-extended" ? "P3 extended" : "sRGB"}</span> : null}
    </div>
  );
}

export function WebGpuHero({ imageUrl }: { imageUrl?: string }) {
  return <WebGpuCanvas imageUrl={imageUrl} variant="hero" className="webgpu-hero-surface" />;
}

export function WebGpuPhoto({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const resolvedSrc = withBasePath(src);

  return (
    <figure className={["webgpu-photo", className].filter(Boolean).join(" ")}>
      <img src={resolvedSrc} alt={alt} decoding="async" />
      <WebGpuCanvas imageUrl={resolvedSrc} variant="photo" className="webgpu-photo-surface" />
    </figure>
  );
}
