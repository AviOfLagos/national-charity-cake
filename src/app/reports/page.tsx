import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink, EmptyState, Num, Prose, Section, Shell } from "@/components/primitives";
import { reports } from "@/lib/content";
import { formatBytes } from "@/lib/format";

export const metadata: Metadata = {
  title: "Reports & accounts",
  description: "Annual reports and audited accounts for the National Charity Cake campaign.",
  alternates: { canonical: "/reports" },
};

export default function ReportsPage() {
  return (
    <>
      <section className="border-b border-line py-14 md:py-20">
        <Shell>
          <div className="grid gap-8 md:grid-cols-[8rem_1fr] md:gap-10">
            <p className="idx md:pt-4">01 / Reports</p>
            <div>
              <h1>Accounts, in full</h1>
              <Prose className="mt-6">
                <p>
                  Annual reports and audited accounts, published whether or not the numbers flatter
                  us. For anything more current than the last filing, the{" "}
                  <Link href="/transparency">live ledger</Link> is the better source — it updates as
                  money moves.
                </p>
              </Prose>
            </div>
          </div>
        </Shell>
      </section>

      <Section index="02 / Documents" title="Available filings">
        {reports.length === 0 ? (
          <EmptyState
            title="No filings yet"
            body="The campaign has not completed a financial year, so there is nothing to audit. Until then the ledger is the whole record and it is public."
            action={<ButtonLink href="/transparency">Read the ledger instead</ButtonLink>}
          />
        ) : (
          <ul className="divide-y divide-line border-y border-line">
            {reports.map((r) => (
              <li key={r.slug} className="flex flex-wrap items-baseline justify-between gap-4 py-5">
                <div>
                  <a href={r.fileUrl} className="underline underline-offset-4 hover:text-accent">
                    {r.title}
                  </a>
                  <p className="idx mt-1">{r.period}</p>
                </div>
                <p className="text-sm text-muted">
                  PDF · <Num>{formatBytes(r.sizeBytes)}</Num>
                </p>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
