import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink, Num, Prose, Section, Shell } from "@/components/primitives";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: true },
};

export default async function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>;
}) {
  const { reference } = await searchParams;
  const shareText = encodeURIComponent(`I just gave to ${site.name}. Every naira is published: `);
  const shareUrl = encodeURIComponent(site.url);

  return (
    <>
      <section className="border-b border-line py-14 md:py-20">
        <Shell>
          <div className="grid gap-8 md:grid-cols-[8rem_1fr] md:gap-10">
            <p className="idx md:pt-4">01 / Received</p>
            <div>
              <h1>Thank you. Here is your reference.</h1>
              {reference ? (
                <p className="mt-6 border border-line bg-bg-soft px-5 py-4 text-2xl">
                  <Num>{reference}</Num>
                </p>
              ) : (
                <p className="mt-6 text-muted">
                  Your reference was sent to your email. If it has not arrived within a few minutes,
                  check your spam folder before contacting us.
                </p>
              )}
              <Prose className="mt-6">
                <p>
                  Keep it. That reference is what matches your gift to a line on the{" "}
                  <Link href="/transparency">public ledger</Link>, and it is how you hold us to what
                  we said we would do with it.
                </p>
              </Prose>
            </div>
          </div>
        </Shell>
      </section>

      {/* Everything we deliberately refused to ask before payment gets asked here,
          where it costs no conversion. */}
      <Section
        index="02 / One more thing, if you have a moment"
        title="Send it on"
        lede="The single most useful thing you can do now is give someone else a reason to trust this. Share the ledger, not just the appeal."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={`https://wa.me/?text=${shareText}${shareUrl}`}>
            Share on WhatsApp
          </ButtonLink>
          <ButtonLink
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
            variant="secondary"
          >
            Share on X
          </ButtonLink>
          <ButtonLink href="/volunteer" variant="secondary">
            Volunteer too
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
