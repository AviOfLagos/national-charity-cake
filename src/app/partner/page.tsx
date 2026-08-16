import type { Metadata } from "next";

import { Field, Form, Select, TextArea } from "@/components/form";
import { Prose, Section, Shell } from "@/components/primitives";
import { submitPartner } from "@/lib/actions";

export const metadata: Metadata = {
  title: "Partner with us",
  description:
    "Corporate partnership for the National Charity Cake campaign — headline, supporting or in kind.",
  alternates: { canonical: "/partner" },
};

export default function PartnerPage() {
  return (
    <>
      <section className="border-b border-line py-14 md:py-20">
        <Shell>
          <div className="grid gap-8 md:grid-cols-[8rem_1fr] md:gap-10">
            <p className="idx md:pt-4">01 / Partner</p>
            <div>
              <h1>Association you can defend internally</h1>
              <Prose className="mt-6">
                <p>
                  The reason to partner with a campaign that publishes its whole
                  ledger is that your risk team can read it. Every naira you put
                  in is traceable to what it bought, and your logo on our site
                  links to your own announcement rather than sitting there
                  unverifiable.
                </p>
              </Prose>
            </div>
          </div>
        </Shell>
      </section>

      <Section index="02 / Enquire" title="Start the conversation">
        <Form
          action={submitPartner}
          submitLabel="Send enquiry"
          successTitle="Enquiry received"
          successBody="We'll send the partnership pack — tiers, what each includes, and how partner funds appear in the public ledger."
        >
          <Field
            name="organisation"
            label="Organisation"
            required
            autoComplete="organization"
          />
          <Field
            name="contactName"
            label="Your name"
            required
            autoComplete="name"
          />
          <Field
            name="email"
            label="Work email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
          />
          <Field
            name="phone"
            label="Phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
          />
          <Select
            name="tier"
            label="What kind of partnership?"
            required
            options={["headline", "supporting", "in-kind", "not sure yet"]}
          />
          <TextArea name="message" label="Anything we should know?" rows={5} />
        </Form>
      </Section>
    </>
  );
}
