import type { Metadata } from "next";

import { Prose, Section, Shell } from "@/components/primitives";
import { org } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the National Charity Cake website and donations.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <section className="border-b border-line py-14 md:py-20">
        <Shell>
          <div className="grid gap-8 md:grid-cols-[8rem_1fr] md:gap-10">
            <p className="idx md:pt-4">01 / Terms</p>
            <div>
              <h1>Terms of use</h1>
              <Prose className="mt-6">
                <p>
                  Short, because there is not much to say. Requires legal review before launch.
                </p>
              </Prose>
            </div>
          </div>
        </Shell>
      </section>

      <Section index="02 / Donations" title="About your gift">
        <Prose>
          <p>
            Gifts are voluntary and, as a general rule, not refundable — funds are committed to
            programme work quickly. If you gave in error or an amount was taken twice, email{" "}
            <a href={`mailto:${org.email}`}>{org.email}</a> with your reference and we will put it
            right.
          </p>
          <p>
            We apply gifts to the campaign&rsquo;s charitable purposes. Where a gift is given for a
            specific purpose and that purpose is already fully funded, we will contact you before
            applying it elsewhere.
          </p>
          <p>
            Payments are processed by a third-party provider under their own terms. We do not store
            card details at any point.
          </p>
        </Prose>
      </Section>

      <Section index="03 / This site" title="Using this site">
        <Prose>
          <p>
            The ledger and the figures on this site are published in good faith and updated as money
            moves. They may briefly lag reality between a payment clearing and its entry being made.
          </p>
          <p>
            Our name and marks may not be used to solicit funds without written permission. If you
            see them being used that way, tell us — impersonation is the main risk this campaign
            faces, and reports from the public are how it gets caught.
          </p>
        </Prose>
      </Section>
    </>
  );
}
