import type { Metadata } from "next";

import { Prose, Section, Shell } from "@/components/primitives";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "How to check that the National Charity Cake campaign is real, how giving works, and how to volunteer.",
  alternates: { canonical: "/faq" },
};

const GROUPS = [
  { key: "trust", index: "02", title: "Is this real?" },
  { key: "giving", index: "03", title: "Giving" },
  { key: "volunteering", index: "04", title: "Taking part" },
] as const;

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <section className="border-b border-line py-14 md:py-20">
        <Shell>
          <div className="grid gap-8 md:grid-cols-[8rem_1fr] md:gap-10">
            <p className="idx md:pt-4">01 / FAQ</p>
            <div>
              <h1>The questions people actually ask</h1>
              <Prose className="mt-6">
                <p>
                  Starting with the one everybody thinks first and few people say out loud.
                </p>
              </Prose>
            </div>
          </div>
        </Shell>
      </section>

      {GROUPS.map((group) => (
        <Section key={group.key} index={`${group.index} / ${group.key}`} title={group.title}>
          <dl className="divide-y divide-line border-y border-line">
            {faqs
              .filter((f) => f.group === group.key)
              .map((f) => (
                <div key={f.q} className="py-6">
                  <dt className="font-medium">{f.q}</dt>
                  <dd className="mt-2 text-muted" style={{ maxWidth: "var(--measure)" }}>
                    {f.a}
                  </dd>
                </div>
              ))}
          </dl>
        </Section>
      ))}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
