import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/data/site";
import { withBasePath } from "@/lib/paths";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: withBasePath("/") },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/")
  };
}
