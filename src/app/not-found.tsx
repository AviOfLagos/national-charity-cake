import type { Metadata } from "next";

import { ButtonLink, Prose, Shell } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="py-20 md:py-28">
      <Shell>
        <div className="grid gap-8 md:grid-cols-[8rem_1fr] md:gap-10">
          <p className="idx md:pt-4">404</p>
          <div>
            <h1>That page is not here</h1>
            <Prose className="mt-6">
              <p>
                Either it moved, or the link was wrong. If you followed a link asking you to donate
                somewhere, be careful — check the donate page below against whatever you were sent.
              </p>
            </Prose>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/">Back to the start</ButtonLink>
              <ButtonLink href="/transparency" variant="secondary">
                Read the ledger
              </ButtonLink>
              <ButtonLink href="/donate" variant="secondary">
                Donate
              </ButtonLink>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}
