import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/uploads/"],
      },
    ],
    sitemap: "https://regeneralive.com/sitemap.xml",
    host: "https://regeneralive.com",
  };
}