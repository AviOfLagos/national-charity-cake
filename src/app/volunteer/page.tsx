import type { Metadata } from "next";

import { Field, Form, Select, TextArea } from "@/components/form";
import { Prose, Section, Shell } from "@/components/primitives";
import { submitVolunteer } from "@/lib/actions";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Bake, host a sale, help with logistics or media for the National Charity Cake campaign.",
  alternates: { canonical: "/volunteer" },
};

export default function VolunteerPage() {
  return (
    <>
      <section className="border-b border-line py-14 md:py-20">
        <Shell>
          <div className="grid gap-8 md:grid-cols-[8rem_1fr] md:gap-10">
            <p className="idx md:pt-4">01 / Volunteer</p>
            <div>
              <h1>Give a day, not just a naira</h1>
              <Prose className="mt-6">
                <p>
                  Baking, hosting a sale, logistics on the day, or helping with
                  media. Tell us what you can actually do and someone from the
                  project team follows up — a person, by name, not an
                  autoresponder.
                </p>
              </Prose>
            </div>
          </div>
        </Shell>
      </section>

      <Section index="02 / Sign up" title="Tell us about you">
        <Form
          action={submitVolunteer}
          submitLabel="Sign me up"
          successTitle="You're on the list"
          successBody="Someone from the project team will be in touch about the nearest host site. If you don't hear from us within a week, email us with the reference below and we'll find you."
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
            hint="We use WhatsApp for host-site coordination."
          />
          <Field
            name="state"
            label="State"
            required
            autoComplete="address-level1"
          />
          <Select
            name="availability"
            label="When are you free?"
            required
            options={["weekends", "weekdays", "the bake day only", "flexible"]}
          />
          <TextArea
            name="interests"
            label="What would you like to do?"
            hint="Baking, driving, setting up, photography, anything else."
          />
        </Form>
      </Section>
    </>
  );
}
