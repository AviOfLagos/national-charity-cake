import type { Metadata } from "next";

import { Field, Form, TextArea } from "@/components/form";
import { Prose, Section, Shell } from "@/components/primitives";
import { submitInKind } from "@/lib/actions";

export const metadata: Metadata = {
  title: "Give in kind",
  description:
    "Donate flour, sugar, ovens, transport, venue space or printing to the National Charity Cake campaign.",
  alternates: { canonical: "/in-kind" },
};

export default function InKindPage() {
  return (
    <>
      <section className="border-b border-line py-14 md:py-20">
        <Shell>
          <div className="grid gap-8 md:grid-cols-[8rem_1fr] md:gap-10">
            <p className="idx md:pt-4">01 / In kind</p>
            <div>
              <h1>Goods count, and they are counted</h1>
              <Prose className="mt-6">
                <p>
                  Flour, sugar, ovens, transport, venue space, printing. In-kind
                  gifts go into the same public ledger as cash, entered at their
                  stated value, so a pallet of flour is as visible as a bank
                  transfer.
                </p>
              </Prose>
            </div>
          </div>
        </Shell>
      </section>

      <Section index="02 / Offer" title="What can you give?">
        <Form
          action={submitInKind}
          submitLabel="Offer these goods"
          successTitle="Offer logged"
          successBody="We'll confirm what we can take and arrange collection. Please don't send anything before we've replied — storage is our tightest constraint."
        >
          <Field name="name" label="Your name" required autoComplete="name" />
          <Field
            name="email"
            label="Email"
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
          <TextArea
            name="goods"
            label="What are you offering?"
            required
            hint="Be specific — it decides whether we can use it."
          />
          <Field
            name="quantity"
            label="How much?"
            hint="For example: 20 bags of 50kg flour."
          />
          <Field name="location" label="Where are the goods?" required />
        </Form>
      </Section>
    </>
  );
}
