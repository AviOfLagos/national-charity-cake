import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink, Num, PendingValue, Prose, Section, Shell } from "@/components/primitives";
import { givingTiers, isPending, org, site } from "@/lib/content";
import { formatNaira } from "@/lib/format";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Give to the National Charity Cake campaign by card, bank transfer or USSD. Every gift appears in the public ledger.",
  alternates: { canonical: "/donate" },
  openGraph: {
    title: `Donate — ${site.name}`,
    description: "Card, bank transfer or USSD. Every gift appears in the public ledger.",
    url: "/donate",
  },
};

/** Set once the campaign's merchant account exists. Until then the page is honest
 *  about it rather than rendering a button that goes nowhere. */
const checkoutUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL ?? "";

export default function DonatePage() {
  // DonateAction makes the giving path machine-readable, and states the
  // currency and the accepted rails explicitly so an assistant answering
  // "how do I give to this" does not have to infer them from prose.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DonateAction",
    name: `Donate to ${site.name}`,
    description: site.promise,
    recipient: {
      "@type": "NGO",
      name: site.name,
      url: site.url,
      ...(isPending(org.cacNumber) ? {} : { identifier: org.cacNumber }),
    },
    ...(checkoutUrl ? { target: checkoutUrl } : {}),
    priceSpecification: givingTiers.map((t) => ({
      "@type": "PriceSpecification",
      price: t.amountKobo / 100,
      priceCurrency: "NGN",
      description: t.buys,
    })),
  };

  return (
    <>
      <section className="border-b border-line py-14 md:py-20">
        <Shell>
          <div className="grid gap-8 md:grid-cols-[8rem_1fr] md:gap-10">
            <p className="idx md:pt-4">01 / Give</p>
            <div>
              <h1>Give, and watch it land in the ledger</h1>
              <Prose className="mt-6">
                <p>
                  Card details never touch this website. Payment happens on a hosted Paystack or
                  Flutterwave checkout, the same one your bank already recognises. If you would
                  rather not use a card at all, transfer directly or use USSD — both are below, and
                  both end up in the same public ledger.
                </p>
              </Prose>
            </div>
          </div>
        </Shell>
      </section>

      <Section
        index="02 / Amount"
        title="Choose what it buys"
        lede="Pick a figure, or enter your own on the checkout page."
      >
        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
          {givingTiers.map((tier) => (
            <li key={tier.amountKobo} className="flex flex-col justify-between gap-4 bg-bg p-6">
              <div>
                <p className="text-2xl text-accent">
                  <Num>{formatNaira(tier.amountKobo)}</Num>
                </p>
                <p className="mt-2 text-muted">{tier.buys}</p>
              </div>
              {checkoutUrl ? (
                <a
                  href={`${checkoutUrl}?amount=${tier.amountKobo}`}
                  className="text-sm underline underline-offset-4 hover:text-accent"
                  rel="noopener noreferrer"
                >
                  Give {formatNaira(tier.amountKobo)}
                </a>
              ) : null}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          {checkoutUrl ? (
            <ButtonLink href={checkoutUrl}>Continue to secure checkout</ButtonLink>
          ) : (
            <div
              className="border border-dashed border-line-strong p-6"
              style={{ borderRadius: "var(--radius)" }}
            >
              <p className="font-medium">Card checkout is not open yet</p>
              <p className="mt-2 text-sm text-muted" style={{ maxWidth: "var(--measure)" }}>
                The campaign&rsquo;s merchant account is still being set up, and we would rather
                show you this than a button that quietly fails. Bank transfer and USSD below work
                today, and both are receipted the same way.
              </p>
            </div>
          )}
        </div>
      </Section>

      <Section
        index="03 / Transfer"
        title="Or transfer directly"
        lede="Larger gifts usually come this way. Use your name or your organisation's name as the narration so we can match it in the ledger."
      >
        <div className="border border-line bg-bg-soft p-6" style={{ maxWidth: "34rem" }}>
          <PendingValue
            value={org.bank}
            render={(b) => (
              <dl className="grid gap-3">
                <div>
                  {/* Account NAME first, deliberately: a personal account name is
                      the tell donors screen for, so ours leads. */}
                  <dt className="idx">Account name</dt>
                  <dd className="mt-1 font-medium">{b.accountName}</dd>
                </div>
                <div>
                  <dt className="idx">Account number</dt>
                  <dd className="num mt-1 text-lg">{b.accountNumber}</dd>
                </div>
                <div>
                  <dt className="idx">Bank</dt>
                  <dd className="mt-1">{b.bankName}</dd>
                </div>
              </dl>
            )}
          />
          <p className="mt-5 border-t border-line pt-4 text-sm text-muted">
            The account is held in the organisation&rsquo;s exact registered name. We will never ask
            you to pay into an individual&rsquo;s account, and anyone who does is not us.
          </p>
        </div>
      </Section>

      <Section
        index="04 / After you give"
        title="What happens next"
        lede="Three things, in this order."
      >
        <ol className="grid gap-px border border-line bg-line md:grid-cols-3">
          <li className="bg-bg p-6">
            <p className="idx">One</p>
            <p className="mt-3">
              You get a reference immediately — on screen and by email. Keep it.
            </p>
          </li>
          <li className="bg-bg p-6">
            <p className="idx">Two</p>
            <p className="mt-3">
              Your gift is entered in the{" "}
              <Link href="/transparency" className="underline underline-offset-4">
                public ledger
              </Link>{" "}
              against that reference.
            </p>
          </li>
          <li className="bg-bg p-6">
            <p className="idx">Three</p>
            <p className="mt-3">
              When it is spent, the outgoing entry shows what it bought and links the invoice where
              we can publish it.
            </p>
          </li>
        </ol>
        <p className="mt-6 text-sm text-muted" style={{ maxWidth: "var(--measure)" }}>
          Giving anonymously is fine — say so at checkout and your name will not appear anywhere. The
          amount still appears in the ledger, because the ledger is the point.
        </p>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
