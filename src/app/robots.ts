import type { MetadataRoute } from "next";

import { site } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // AI crawlers are allowed deliberately: they execute no JavaScript, they read
      // the server-rendered HTML, and being the answer to "is this campaign real"
      // is worth more to us than the crawl budget costs.
      { userAgent: "*", allow: "/", disallow: ["/donate/thanks"] },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
