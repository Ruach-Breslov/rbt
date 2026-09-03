export const heroShader = /* wgsl */ `
struct Uniforms {
  viewport: vec4f,
  pointer: vec4f,
  media: vec4f,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var mediaTexture: texture_2d<f32>;
@group(0) @binding(2) var mediaSampler: sampler;

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
};

@vertex
fn vertexMain(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
  var positions = array<vec2f, 3>(
    vec2f(-1.0, -1.0),
    vec2f(3.0, -1.0),
    vec2f(-1.0, 3.0)
  );
  let position = positions[vertexIndex];
  var output: VertexOutput;
  output.position = vec4f(position, 0.0, 1.0);
  output.uv = position * 0.5 + 0.5;
  return output;
}

fn hash21(value: vec2f) -> f32 {
  let point = fract(value * vec2f(123.34, 456.21));
  let mixed = point + dot(point, point + 45.32);
  return fract(mixed.x * mixed.y);
}

fn noise(value: vec2f) -> f32 {
  let cell = floor(value);
  let local = fract(value);
  let curve = local * local * (3.0 - 2.0 * local);
  let a = hash21(cell);
  let b = hash21(cell + vec2f(1.0, 0.0));
  let c = hash21(cell + vec2f(0.0, 1.0));
  let d = hash21(cell + vec2f(1.0, 1.0));
  return mix(mix(a, b, curve.x), mix(c, d, curve.x), curve.y);
}

fn fbm(value: vec2f) -> f32 {
  var position = value;
  var amplitude = 0.52;
  var result = 0.0;
  for (var octave = 0; octave < 5; octave = octave + 1) {
    result += amplitude * noise(position);
    position = mat2x2f(1.62, 1.21, -1.21, 1.62) * position + vec2f(13.1, 7.7);
    amplitude *= 0.48;
  }
  return result;
}

fn coverUv(uv: vec2f, viewportAspect: f32, imageAspect: f32) -> vec2f {
  var scale = vec2f(1.0);
  if (viewportAspect > imageAspect) {
    scale.y = imageAspect / viewportAspect;
  } else {
    scale.x = viewportAspect / imageAspect;
  }
  return (uv - 0.5) * scale + 0.5;
}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  var uv = vec2f(input.uv.x, 1.0 - input.uv.y);
  let resolution = max(uniforms.viewport.xy, vec2f(1.0));
  let aspect = resolution.x / resolution.y;
  let time = uniforms.viewport.z;
  let pointer = uniforms.pointer.xy;
  let motion = uniforms.pointer.z;
  let hasImage = uniforms.media.y;
  let photoMode = uniforms.media.z;

  var centered = uv - 0.5;
  centered.x *= aspect;
  let pointerCentered = (pointer - 0.5) * vec2f(aspect, 1.0);

  let warpA = fbm(centered * 2.4 + vec2f(time * 0.075, -time * 0.05));
  let warpB = fbm(centered * 4.1 + vec2f(-time * 0.045, time * 0.065) + warpA);
  let warped = centered + vec2f(warpA - 0.5, warpB - 0.5) * 0.22;

  let violet = vec3f(0.43, 0.21, 1.18);
  let blue = vec3f(0.08, 0.40, 1.10);
  let cyan = vec3f(0.02, 0.82, 1.05);
  let ink = vec3f(0.012, 0.018, 0.055);
  let field = smoothstep(0.74, 0.05, length(warped));
  let plume = smoothstep(0.9, 0.12, length(warped - pointerCentered * 0.22));
  var procedural = mix(ink, violet, field);
  procedural = mix(procedural, blue, smoothstep(0.18, 0.82, warpA) * field);
  procedural = mix(procedural, cyan, pow(max(warpB, 0.0), 3.0) * plume * 0.68);

  let ringDistance = abs(length(warped - pointerCentered * 0.13) - (0.31 + sin(time * 0.35) * 0.02));
  let ring = smoothstep(0.018, 0.0, ringDistance) * field;
  procedural += vec3f(0.32, 0.50, 1.25) * ring * 0.34;

  var color = procedural;
  if (hasImage > 0.5) {
    var imageUv = coverUv(uv, aspect, max(uniforms.media.x, 0.001));
    let parallax = (pointer - 0.5) * mix(0.016, 0.009, photoMode);
    let refraction = vec2f(warpA - 0.5, warpB - 0.5) * mix(0.012, 0.0025, photoMode);
    imageUv += parallax + refraction;
    let photo = textureSample(mediaTexture, mediaSampler, clamp(imageUv, vec2f(0.001), vec2f(0.999))).rgb;
    let liftedPhoto = photo * (0.97 + field * 0.08) + procedural * mix(0.16, 0.035, photoMode);
    color = mix(procedural, liftedPhoto, mix(0.86, 0.985, photoMode));
  }

  let highlight = pow(max(0.0, 1.0 - length(warped - pointerCentered * 0.32) * 1.7), 5.0);
  color += vec3f(0.45, 0.65, 1.35) * highlight * (0.12 + motion * 0.18);
  let grain = hash21(input.position.xy + fract(time) * 117.0) - 0.5;
  color += grain * mix(0.018, 0.006, photoMode);
  color *= 0.93 + 0.14 * smoothstep(0.9, 0.0, length(centered));

  return vec4f(max(color, vec3f(0.0)), 1.0);
}
`;
