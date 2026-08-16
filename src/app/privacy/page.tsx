import type { Metadata } from "next";

import { Prose, Section, Shell } from "@/components/primitives";
import { org } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What the National Charity Cake campaign collects, why, and how to have it deleted.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="border-b border-line py-14 md:py-20">
        <Shell>
          <div className="grid gap-8 md:grid-cols-[8rem_1fr] md:gap-10">
            <p className="idx md:pt-4">01 / Privacy</p>
            <div>
              <h1>What we hold, and why</h1>
              <Prose className="mt-6">
                <p>
                  Written plainly rather than defensively. This describes what the site actually
                  does, and it must be reviewed against the Nigeria Data Protection Act by a lawyer
                  before launch — this text is accurate about the system, not a substitute for that
                  review.
                </p>
              </Prose>
            </div>
          </div>
        </Shell>
      </section>

      <Section index="02 / Collection" title="What we collect">
        <Prose>
          <p>Only what a form asks for, and only when you submit it:</p>
          <ul>
            <li>
              <strong>Volunteers:</strong> name, email, phone, state, availability, and what you told
              us you would like to do.
            </li>
            <li>
              <strong>Partners:</strong> organisation, contact name, work email, phone, and your
              message.
            </li>
            <li>
              <strong>In-kind gifts:</strong> name, email, phone, what you are offering and where it is.
            </li>
            <li>
              <strong>Press:</strong> name, outlet, email, deadline and request.
            </li>
            <li>
              <strong>Donations:</strong> handled by our payment provider. We receive a reference,
              an amount and, unless you gave anonymously, a name and email. Your card details never
              reach us.
            </li>
          </ul>
          <p>
            Submissions are stored in a Google Sheet accessible only to the project team through a
            service account. We do not sell or share your details, and we do not run advertising
            trackers on this site.
          </p>
        </Prose>
      </Section>

      <Section index="03 / The ledger" title="What appears in public">
        <Prose>
          <p>
            The public ledger shows amounts, dates, categories and references. It does not publish
            donor names, addresses or contact details. If you gave in a way that carries your name —
            a bank transfer narration, for example — we record it internally and publish only the
            reference.
          </p>
        </Prose>
      </Section>

      <Section index="04 / Your rights" title="Getting your data back, or removed">
        <Prose>
          <p>
            Email{" "}
            <a href={`mailto:${org.email}`}>{org.email}</a> and ask for a copy of what we hold, a
            correction, or deletion. We will act within 30 days. Financial records that we are
            required to retain are the one exception, and we will tell you if that applies.
          </p>
        </Prose>
      </Section>
    </>
  );
}
