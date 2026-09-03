const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";

export const basePath = configuredBasePath ? `/${configuredBasePath.replace(/^\/+|\/+$/g, "")}` : "";

export function withBasePath(path: string) {
  if (!path.startsWith("/")) return path;
  if (path === "/") return `${basePath}/`;
  return `${basePath}${path}`;
}
