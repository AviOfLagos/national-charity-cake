import type { Metadata } from "next";

import { ButtonLink, EmptyState, Prose, Section, Shell } from "@/components/primitives";
import { partners } from "@/lib/content";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Organisations backing the National Charity Cake campaign. Every partner links to their own announcement.",
  alternates: { canonical: "/partners" },
};

const TIER_LABEL = {
  headline: "Headline partner",
  supporting: "Supporting partner",
  "in-kind": "In-kind partner",
} as const;

export default function PartnersPage() {
  return (
    <>
      <section className="border-b border-line py-14 md:py-20">
        <Shell>
          <div className="grid gap-8 md:grid-cols-[8rem_1fr] md:gap-10">
            <p className="idx md:pt-4">01 / Partners</p>
            <div>
              <h1>Backed by, and provably so</h1>
              <Prose className="mt-6">
                <p>
                  Every partner below links out to their own announcement — their press release,
                  their site, or the article covering it. A logo on its own proves nothing. Copying a
                  logo is one of the commonest tricks a fake appeal uses, which is exactly why we do
                  not ask you to accept ours on sight.
                </p>
              </Prose>
            </div>
          </div>
        </Shell>
      </section>

      <Section index="02 / The list" title="Who is behind this">
        {partners.length === 0 ? (
          <EmptyState
            title="No partners announced yet"
            body="A partner appears here only once they have published something we can link to. That means this page will always lag the conversations — deliberately."
            action={<ButtonLink href="/partner">Partner with us</ButtonLink>}
          />
        ) : (
          <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((p) => (
              <li key={p.slug} className="bg-bg p-6">
                <h3>{p.name}</h3>
                <p className="idx mt-1">{TIER_LABEL[p.tier]}</p>
                <a
                  href={p.proofUrl}
                  className="mt-4 inline-block text-sm underline underline-offset-4 hover:text-accent"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {p.proofLabel} ↗
                </a>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
