# WebGPU Visual and Photo Layer

The WebGPU layer is progressive enhancement. The website, navigation, content, forms, and payments never depend on it. Browsers without WebGPU retain the CSS visual underneath, while supported devices receive the interactive GPU scene.

## Quality policy

- The canvas renders at the device pixel ratio, capped at 3× and approximately 4K total pixels to avoid GPU allocation failures.
- The renderer first requests Display-P3 output with extended tone mapping, then falls back to standard sRGB when unsupported.
- Configured photos are uploaded to a 16-bit floating-point texture when supported, with an 8-bit fallback.
- Image sampling is linear, pointer movement is smoothed, and the source photo remains as the semantic/fallback image in the reusable `WebGpuPhoto` component.
- Animation stops outside the viewport and while the page is hidden. Reduced-motion users receive a still GPU frame.
- Device loss triggers a controlled renderer restart; failure always returns to the CSS or image fallback.

## Supplying a hero photo

1. Put the master in `public/media/`, for example `public/media/hero.avif`.
2. Set `NEXT_PUBLIC_HERO_IMAGE=/media/hero.avif`.
3. Keep the original master outside the repository. Export a web delivery copy at least as large as its maximum rendered pixel dimensions.
4. Prefer a high-quality AVIF or WebP delivery asset and verify color appearance in both Display-P3 and sRGB environments.

The environment value deliberately accepts only a root-relative local path. This keeps the Content Security Policy narrow, avoids cross-origin texture failures, and makes GitHub Pages repository subpaths work correctly.

## Reusing the photo widget

Import `WebGpuPhoto` from `components/webgpu/webgpu-surface.tsx` and provide a local image path and meaningful alternative text. The normal image is always present; the GPU canvas becomes visible only after a successful renderer start.

## Important limitations

WebGPU cannot add detail absent from an image master, turn SDR photography into authentic HDR, or guarantee wide-gamut output on an unsupported display. Highest quality begins with the source asset, correct color metadata, and a suitable viewer device.
