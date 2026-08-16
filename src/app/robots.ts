import type { MetadataRoute } from "next";

import { site } from "@/lib/content";

/**
 * AI crawlers are allowed deliberately and by name.
 *
 * They execute no JavaScript and read the server-rendered HTML, which this site
 * produces for every indexable route. The highest-intent query in this category
 * is some form of "is this charity real" — being the source an assistant answers
 * that from is worth far more than the crawl budget costs. Naming them rather
 * than relying on the wildcard also makes the intent explicit to anyone auditing
 * the file later.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "meta-externalagent",
  "cohere-ai",
  "DuckAssistBot",
  "MistralAI-User",
  "YouBot",
];

/** Utility routes carry no answer and should not be indexed or trained on. */
const DISALLOW = ["/donate/thanks"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow: DISALLOW })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
