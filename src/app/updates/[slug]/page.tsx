import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Prose, Shell } from "@/components/primitives";
import { site, updates } from "@/lib/content";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return updates.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const update = updates.find((u) => u.slug === slug);
  if (!update) return { title: "Update not found" };

  return {
    title: update.title,
    description: update.excerpt,
    alternates: { canonical: `/updates/${update.slug}` },
    // A child openGraph object REPLACES the parent's entirely rather than
    // merging, so siteName is restated here or the share card loses it.
    openGraph: {
      type: "article",
      siteName: site.name,
      title: update.title,
      description: update.excerpt,
      url: `/updates/${update.slug}`,
      publishedTime: update.date,
    },
  };
}

export default async function UpdatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const update = updates.find((u) => u.slug === slug);
  if (!update) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: update.title,
    datePublished: update.date,
    description: update.excerpt,
    publisher: { "@type": "NGO", name: site.name },
  };

  return (
    <article className="py-14 md:py-20">
      <Shell>
        <div className="grid gap-8 md:grid-cols-[8rem_1fr] md:gap-10">
          <p className="idx md:pt-4">{formatDate(update.date)}</p>
          <div>
            <h1>{update.title}</h1>
            {update.cover ? (
              <figure className="mt-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={update.cover.src}
                  alt={update.cover.alt}
                  className="w-full border border-line object-cover"
                  style={{ aspectRatio: "3 / 2" }}
                />
                <figcaption className="mt-3 text-sm text-muted">
                  {update.cover.caption} · {update.cover.place} · {formatDate(update.cover.date)}
                </figcaption>
              </figure>
            ) : null}
            <Prose className="mt-8">
              {update.body.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </Prose>
          </div>
        </div>
      </Shell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
