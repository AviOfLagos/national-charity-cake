import type { Metadata } from "next";

import { Field, Form, TextArea } from "@/components/form";
import { PendingValue, Prose, Section, Shell } from "@/components/primitives";
import { submitMedia } from "@/lib/actions";
import { org, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Press contact, campaign facts and assets for the National Charity Cake campaign.",
  alternates: { canonical: "/media" },
};

export default function MediaPage() {
  return (
    <>
      <section className="border-b border-line py-14 md:py-20">
        <Shell>
          <div className="grid gap-8 md:grid-cols-[8rem_1fr] md:gap-10">
            <p className="idx md:pt-4">01 / Media</p>
            <div>
              <h1>Everything a desk needs to check us</h1>
              <Prose className="mt-6">
                <p>
                  The facts below are the ones we would want verified before
                  publication. All of them are checkable independently, and we
                  would rather you did.
                </p>
              </Prose>
            </div>
          </div>
        </Shell>
      </section>

      <Section index="02 / Facts" title="The campaign in verifiable form">
        <dl className="grid gap-px border border-line bg-line sm:grid-cols-2">
          <div className="bg-bg p-6">
            <dt className="idx">Campaign</dt>
            <dd className="mt-2">{site.name}</dd>
          </div>
          <div className="bg-bg p-6">
            <dt className="idx">Registered name</dt>
            <dd className="mt-2">
              <PendingValue value={org.legalName} render={(v) => v} />
            </dd>
          </div>
          <div className="bg-bg p-6">
            <dt className="idx">CAC Incorporated Trustees no.</dt>
            <dd className="num mt-2">
              <PendingValue value={org.cacNumber} render={(v) => v} />
            </dd>
          </div>
          <div className="bg-bg p-6">
            <dt className="idx">Press contact</dt>
            <dd className="mt-2">
              <a
                href={`mailto:${org.email}`}
                className="underline underline-offset-4"
              >
                {org.email}
              </a>
              <br />
              <span className="num">
                <PendingValue value={org.phone} render={(v) => v} />
              </span>
            </dd>
          </div>
        </dl>
        <p
          className="mt-6 text-sm text-muted"
          style={{ maxWidth: "var(--measure)" }}
        >
          Logo pack and photography are supplied on request rather than
          published, so that we know where our marks are being used — logo
          misuse is how fake appeals borrow credibility.
        </p>
      </Section>

      <Section index="03 / Request" title="Ask us for something">
        <Form
          action={submitMedia}
          submitLabel="Send request"
          successTitle="Request received"
          successBody="We answer press requests within one working day. If yours is on deadline today, call the number above instead of waiting."
        >
          <Field name="name" label="Your name" required autoComplete="name" />
          <Field name="outlet" label="Outlet" required />
          <Field
            name="email"
            label="Email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
          />
          <Field
            name="deadline"
            label="Deadline"
            hint="Tell us and we will work to it."
          />
          <TextArea
            name="request"
            label="What do you need?"
            required
            rows={5}
          />
        </Form>
      </Section>
    </>
  );
}
