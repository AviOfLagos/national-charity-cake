import type { Metadata } from "next";

import { ButtonLink, EmptyState, Prose, Section, Shell } from "@/components/primitives";
import { people } from "@/lib/content";

export const metadata: Metadata = {
  title: "Leadership",
  description: "The named trustees and project team behind the National Charity Cake campaign.",
  alternates: { canonical: "/leadership" },
};

export default function LeadershipPage() {
  const trustees = people.filter((p) => p.isTrustee);
  const team = people.filter((p) => !p.isTrustee);

  return (
    <>
      <section className="border-b border-line py-14 md:py-20">
        <Shell>
          <div className="grid gap-8 md:grid-cols-[8rem_1fr] md:gap-10">
            <p className="idx md:pt-4">01 / Leadership</p>
            <div>
              <h1>The people accountable for this</h1>
              <Prose className="mt-6">
                <p>
                  Names, faces and working histories, because an anonymous charity is not a charity.
                  If money goes missing, these are the people you name.
                </p>
              </Prose>
            </div>
          </div>
        </Shell>
      </section>

      <Section
        index="02 / Trustees"
        title="Trustees"
        lede="Registered with the CAC as Incorporated Trustees."
      >
        <PeopleGrid
          people={trustees}
          emptyTitle="Trustees not published yet"
          emptyBody="The trustee list is filed with the CAC and will be published here in full, with photographs, before the campaign opens for donations."
        />
      </Section>

      <Section index="03 / Project team" title="Project team">
        <PeopleGrid
          people={team}
          emptyTitle="Project team not published yet"
          emptyBody="The people running the day-to-day will be listed here as they are appointed."
        />
      </Section>
    </>
  );
}

function PeopleGrid({
  people,
  emptyTitle,
  emptyBody,
}: {
  people: typeof import("@/lib/content").people;
  emptyTitle: string;
  emptyBody: string;
}) {
  if (people.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        body={emptyBody}
        action={<ButtonLink href="/contact">Ask us about it</ButtonLink>}
      />
    );
  }
  return (
    <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {people.map((p) => (
        <li key={p.slug} className="bg-bg p-6">
          {p.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={p.photo}
              alt={`${p.name}, ${p.role}`}
              className="mb-4 w-full border border-line object-cover"
              style={{ aspectRatio: "4 / 3" }}
            />
          ) : null}
          <h3>{p.name}</h3>
          <p className="idx mt-1">{p.role}</p>
          <p className="mt-3 text-sm text-muted">{p.bio}</p>
          {p.linkedin ? (
            <a
              href={p.linkedin}
              className="mt-3 inline-block text-sm underline underline-offset-4"
              rel="noopener noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
