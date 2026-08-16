import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink, Prose, Section, Shell } from "@/components/primitives";
import { org } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "What the National Charity Cake campaign is, who runs it, and why it publishes its whole ledger.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line py-14 md:py-20">
        <Shell>
          <div className="grid gap-8 md:grid-cols-[8rem_1fr] md:gap-10">
            <p className="idx md:pt-4">01 / About</p>
            <div>
              <h1>{org.tagline}</h1>
              <Prose className="mt-6">
                <p>
                  National Charity Cake is a time-bound national bake. People bake, people buy, and
                  the money goes to work. That part is ordinary. The part that is not ordinary is
                  that every naira raised and every naira spent is published, line by line, on a page
                  anyone can read without asking us for anything.
                </p>
              </Prose>
            </div>
          </div>
        </Shell>
      </section>

      <Section index="02 / Why" title="Why we publish everything">
        <Prose>
          <p>
            Giving in Nigeria runs against a hostile baseline, and the reason is not stinginess. It
            is that fake appeals are common, they use real organisations&rsquo; names and logos, and
            they arrive through exactly the channels a real campaign uses — WhatsApp forwards, social
            posts, a link to a website that looks the part.
          </p>
          <p>
            A charity cannot argue its way out of that. The only durable answer is to be checkable.
            So we built the site around verification rather than around persuasion: the registration
            number is on every page, the trustees are named with their faces, and the ledger is the
            centre of the site rather than a PDF filed once a year.
          </p>
          <p>
            If we ever stop publishing, treat it as the warning it would be.
          </p>
        </Prose>
      </Section>

      <Section index="03 / How it works" title="Cake to outcome, in four steps">
        <ol className="grid gap-px border border-line bg-line md:grid-cols-4">
          {[
            ["A host site signs up", "A school, church, office or street holds a bake."],
            ["People buy cake", "Cash and transfers are receipted on the day."],
            ["It enters the ledger", "Every gift, with a date and a reference."],
            ["It gets spent", "The outgoing entry says what it bought, with the invoice where we can publish it."],
          ].map(([title, body], i) => (
            <li key={title} className="bg-bg p-6">
              <p className="idx">Step {i + 1}</p>
              <h3 className="mt-3">{title}</h3>
              <p className="mt-2 text-sm text-muted">{body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/transparency">Read the ledger</ButtonLink>
          <ButtonLink href="/leadership" variant="secondary">
            Meet the trustees
          </ButtonLink>
        </div>
        <p className="mt-6 text-sm text-muted">
          Questions we get asked most often are answered on the{" "}
          <Link href="/faq" className="underline underline-offset-4">
            FAQ
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
