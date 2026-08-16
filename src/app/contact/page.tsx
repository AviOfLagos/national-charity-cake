import type { Metadata } from "next";

import { Num, PendingValue, Prose, Section, Shell } from "@/components/primitives";
import { org } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Address, phone and email for the National Charity Cake campaign.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-line py-14 md:py-20">
        <Shell>
          <div className="grid gap-8 md:grid-cols-[8rem_1fr] md:gap-10">
            <p className="idx md:pt-4">01 / Contact</p>
            <div>
              <h1>A real address and a phone that answers</h1>
              <Prose className="mt-6">
                <p>
                  A campaign you cannot phone is a campaign you should not fund. Ours is answered
                  during working hours by someone who can actually help.
                </p>
              </Prose>
            </div>
          </div>
        </Shell>
      </section>

      <Section index="02 / Reach us" title="How to get hold of us">
        <dl className="grid gap-px border border-line bg-line sm:grid-cols-3">
          <div className="bg-bg p-6">
            <dt className="idx">Registered office</dt>
            <dd className="mt-2">
              <PendingValue value={org.address} render={(v) => v} />
            </dd>
          </div>
          <div className="bg-bg p-6">
            <dt className="idx">Phone</dt>
            <dd className="num mt-2">
              <PendingValue
                value={org.phone}
                render={(v) => (
                  <a href={`tel:${v.replace(/\s/g, "")}`} className="underline underline-offset-4">
                    {v}
                  </a>
                )}
              />
            </dd>
          </div>
          <div className="bg-bg p-6">
            <dt className="idx">Email</dt>
            <dd className="mt-2">
              <a href={`mailto:${org.email}`} className="underline underline-offset-4">
                {org.email}
              </a>
            </dd>
          </div>
        </dl>

        <div className="mt-8 border border-line p-6" style={{ maxWidth: "var(--measure)" }}>
          <p className="idx">If someone is using our name</p>
          <p className="mt-3 text-sm text-muted">
            If you have been asked to pay into an account that is not the one published on our{" "}
            <a href="/donate" className="underline underline-offset-4">
              donate page
            </a>
            , it is not us. Send us the message and the account number — the account name is the
            thing to check, and ours is{" "}
            <PendingValue value={org.legalName} render={(v) => <Num>{v}</Num>} />.
          </p>
        </div>
      </Section>
    </>
  );
}
