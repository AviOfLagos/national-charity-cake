import type { Metadata } from "next";
import Link from "next/link";

import { EmptyState, Num, PendingValue, Prose, Section, Shell } from "@/components/primitives";
import { org, reports, site } from "@/lib/content";
import { formatDate, formatNaira } from "@/lib/format";
import { readLedger } from "@/lib/sheets";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Transparency — the public ledger",
  description:
    "Every naira into and out of the National Charity Cake campaign, with dates, categories and references you can match against your own receipt.",
  alternates: { canonical: "/transparency" },
  openGraph: {
    title: `Transparency — ${site.name}`,
    description: "The full public ledger: every naira in, every naira out.",
    url: "/transparency",
  },
};

const CATEGORY_LABEL: Record<string, string> = {
  donation: "Donation",
  grant: "Grant",
  programme: "Programme",
  logistics: "Logistics",
  admin: "Admin",
};

export default async function TransparencyPage() {
  const entries = await readLedger();
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
  const inKobo = entries.filter((e) => e.direction === "in").reduce((s, e) => s + e.amount.amountKobo, 0);
  const outKobo = entries.filter((e) => e.direction === "out").reduce((s, e) => s + e.amount.amountKobo, 0);
  const programmeKobo = entries
    .filter((e) => e.direction === "out" && e.category === "programme")
    .reduce((s, e) => s + e.amount.amountKobo, 0);
  const programmeShare = outKobo > 0 ? Math.round((programmeKobo / outKobo) * 100) : null;

  return (
    <>
      <section className="border-b border-line py-14 md:py-20">
        <Shell>
          <div className="grid gap-8 md:grid-cols-[8rem_1fr] md:gap-10">
            <p className="idx md:pt-4">01 / The ledger</p>
            <div>
              <h1>Every naira, in public</h1>
              <Prose className="mt-6">
                <p>
                  This is the whole record. Money in, money out, with the date, what it was for, and
                  a reference. If you have given, your reference is on your receipt and it matches a
                  line on this page.
                </p>
                <p>
                  We publish this because in this country the reasonable default is suspicion, and
                  the only honest answer to it is the numbers.
                </p>
              </Prose>
            </div>
          </div>
        </Shell>
      </section>

      <Section
        index="02 / Summary"
        title="The totals"
        lede="Derived from the entries below — nothing here is typed in by hand."
      >
        <dl className="grid gap-px border border-line bg-line sm:grid-cols-3">
          <div className="bg-bg p-6">
            <dd className="text-3xl text-accent">
              <Num>{formatNaira(inKobo)}</Num>
            </dd>
            <dt className="mt-2 text-sm">Received</dt>
          </div>
          <div className="bg-bg p-6">
            <dd className="text-3xl">
              <Num>{formatNaira(outKobo)}</Num>
            </dd>
            <dt className="mt-2 text-sm">Spent</dt>
          </div>
          <div className="bg-bg p-6">
            <dd className="text-3xl">
              <Num>{programmeShare === null ? "—" : `${programmeShare}%`}</Num>
            </dd>
            <dt className="mt-2 text-sm">
              Of spending that went to programme
              <span className="mt-1 block text-xs text-muted">
                {programmeShare === null
                  ? "No spending recorded yet."
                  : "The rest is logistics and admin, itemised below."}
              </span>
            </dt>
          </div>
        </dl>
      </Section>

      <Section
        index="03 / Entries"
        title="Line by line"
        lede="Newest first. Where a receipt or invoice can be published without exposing someone's personal data, it is linked."
      >
        {sorted.length === 0 ? (
          <EmptyState
            title="The ledger is empty"
            body="Nothing has been received or spent yet, so there is nothing to show. This page will fill up on its own — the first entry appears the moment the first gift clears."
          />
        ) : (
          <div className="overflow-x-auto border border-line">
            <table className="w-full min-w-[46rem] border-collapse text-sm">
              <caption className="sr-only">
                Public ledger of all income and expenditure, newest first
              </caption>
              <thead>
                <tr className="border-b border-line bg-bg-soft text-left">
                  <th scope="col" className="p-3 font-medium">Date</th>
                  <th scope="col" className="p-3 font-medium">Description</th>
                  <th scope="col" className="p-3 font-medium">Category</th>
                  <th scope="col" className="p-3 text-right font-medium">In</th>
                  <th scope="col" className="p-3 text-right font-medium">Out</th>
                  <th scope="col" className="p-3 font-medium">Reference</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((e) => (
                  <tr key={e.id} className="border-b border-line last:border-0">
                    <td className="num p-3 whitespace-nowrap text-muted">{formatDate(e.date)}</td>
                    <td className="p-3">
                      {e.proofUrl ? (
                        <a
                          href={e.proofUrl}
                          className="underline underline-offset-4"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {e.description}
                        </a>
                      ) : (
                        e.description
                      )}
                    </td>
                    <td className="p-3 text-muted">{CATEGORY_LABEL[e.category] ?? e.category}</td>
                    <td className="num p-3 text-right text-accent">
                      {e.direction === "in" ? formatNaira(e.amount.amountKobo) : ""}
                    </td>
                    <td className="num p-3 text-right">
                      {e.direction === "out" ? formatNaira(e.amount.amountKobo) : ""}
                    </td>
                    <td className="num p-3 text-muted">{e.reference ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      <Section
        index="04 / The organisation"
        title="Who we legally are"
        lede="The details you would need to check us, or to complain about us."
      >
        <dl className="grid gap-px border border-line bg-line sm:grid-cols-2">
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
            <dt className="idx">Tax exemption</dt>
            <dd className="mt-2">
              <PendingValue value={org.taxExemptRef ?? org.legalName} render={(v) => v} />
            </dd>
          </div>
          <div className="bg-bg p-6">
            <dt className="idx">Bank account</dt>
            <dd className="mt-2">
              <PendingValue
                value={org.bank}
                render={(b) => (
                  <span>
                    <strong>{b.accountName}</strong>
                    <br />
                    <Num>{b.accountNumber}</Num> · {b.bankName}
                  </span>
                )}
              />
            </dd>
            <dd className="mt-2 text-xs text-muted">
              The account is in the organisation&rsquo;s registered name. We will never ask you to
              pay an individual.
            </dd>
          </div>
        </dl>

        <p className="mt-8 text-sm text-muted">
          {reports.length > 0 ? (
            <>
              Audited accounts and annual reports are on the{" "}
              <Link href="/reports" className="underline underline-offset-4">
                reports page
              </Link>
              .
            </>
          ) : (
            <>
              No annual report exists yet — the campaign has not completed a financial year. When one
              does, it will be published on the{" "}
              <Link href="/reports" className="underline underline-offset-4">
                reports page
              </Link>{" "}
              whether or not the numbers flatter us.
            </>
          )}
        </p>
      </Section>
    </>
  );
}
