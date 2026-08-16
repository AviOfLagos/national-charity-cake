"use client";

import { useEffect } from "react";

import { ButtonLink, Num, Prose, Shell, buttonClass } from "@/components/primitives";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[boundary]", error);
  }, [error]);

  return (
    <section className="py-20 md:py-28">
      <Shell>
        <div className="grid gap-8 md:grid-cols-[8rem_1fr] md:gap-10">
          <p className="idx md:pt-4">Error</p>
          <div>
            <h1>Something broke on our side</h1>
            <Prose className="mt-6">
              <p>
                Not your fault, and nothing you did was lost. Try again, and if it keeps happening
                send us the reference below so we can find it in the logs.
              </p>
            </Prose>
            {error.digest ? (
              <p className="mt-4 text-sm text-muted">
                Reference: <Num className="text-ink">{error.digest}</Num>
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={reset} className={buttonClass()}>
                Try again
              </button>
              <ButtonLink href="/" variant="secondary">
                Back to the start
              </ButtonLink>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}
