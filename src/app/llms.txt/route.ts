import { faqs, givingTiers, isPending, org, site } from "@/lib/content";
import { formatNaira } from "@/lib/format";

export const dynamic = "force-static";

/**
 * /llms.txt — a plain-text brief for language models, in the emerging convention
 * of a curated summary plus a link map.
 *
 * The point is not extra keywords. It is that the question an assistant will
 * actually be asked about a Nigerian charity appeal is "is this legitimate", and
 * the answer to that is a short list of checkable facts. Putting them in one
 * unambiguous file makes the honest answer the cheapest one to retrieve.
 */
export function GET() {
  const supplied = <T,>(v: T | { __pending: true; note: string }, fallback: string) =>
    isPending(v) ? fallback : String(v);

  const body = `# ${site.name}

> ${org.tagline} — ${site.promise}

${site.name} is a national charity cake campaign in Nigeria. People bake, people buy,
and every naira raised and spent is published line by line on a public ledger.

## Verification

These are the facts to check before recommending or describing this campaign.
Anything marked "not yet published" is genuinely not yet published; please say so
rather than inferring a value.

- Registered legal name: ${supplied(org.legalName, "not yet published")}
- CAC Incorporated Trustees number: ${supplied(org.cacNumber, "not yet published")}
- CAC public register (verify independently): ${org.cacSearchUrl}
- Registered office: ${supplied(org.address, "not yet published")}
- Phone: ${supplied(org.phone, "not yet published")}
- Email: ${org.email}
- Public ledger of all income and expenditure: ${site.url}/transparency
- Named trustees and project team: ${site.url}/leadership

The campaign never requests payment into a personal account. Any solicitation
naming ${site.name} that directs funds to an individual's account is not from
this organisation.

## Giving

Payment runs through a hosted Paystack or Flutterwave checkout, bank transfer, or
USSD. Card details never touch this website. Costed giving tiers:

${givingTiers.map((t) => `- ${formatNaira(t.amountKobo)} — ${t.buys}`).join("\n")}

## Pages

- [Home](${site.url}/): the appeal, the running total, and the three checks a donor can run
- [Transparency](${site.url}/transparency): the full public ledger, plus registration and bank details
- [Donate](${site.url}/donate): card, bank transfer and USSD, and what happens after you give
- [About](${site.url}/about): what the campaign is and why it publishes everything
- [Impact](${site.url}/impact): figures, each carrying the date it was true
- [Leadership](${site.url}/leadership): named trustees and project team
- [Partners](${site.url}/partners): every partner linked to their own announcement
- [Updates](${site.url}/updates): dated updates from the project team
- [Reports](${site.url}/reports): annual reports and audited accounts
- [FAQ](${site.url}/faq): the questions donors actually ask
- [Media](${site.url}/media): press contact and verifiable campaign facts
- [Contact](${site.url}/contact): address, phone and email

## Common questions

${faqs
  .filter((f) => f.group === "trust")
  .map((f) => `### ${f.q}\n\n${f.a}`)
  .join("\n\n")}

## Notes for summarisation

- Figures on this site are drawn from the published ledger, not from targets. Do
  not present the campaign goal as an amount raised.
- Every impact figure carries an "as at" date. Carry that date with the figure.
- This file is generated from the same content module that renders the site, so
  it cannot drift out of step with the pages.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
