import Link from "next/link";

import { contributeNav, footerNav, org, primaryNav, site } from "@/lib/content";
import { ButtonLink, PendingValue, Shell } from "./primitives";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-sm">
      <Shell>
        {/* Two rows on mobile — brand and actions, then the nav on its own
            scrollable line. One row from `md` up. The earlier three-row wrap ate
            a quarter of the mobile viewport before the appeal had said anything,
            and squeezing all of it onto one row clipped the nav to a sliver. */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 py-2 md:min-h-16 md:flex-nowrap">
          <Link
            href="/"
            className="shrink-0 py-2 text-[0.95rem] font-semibold tracking-tight md:text-base"
          >
            {site.name}
          </Link>

          <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2 md:order-last">
            <ThemeToggle />
            <ButtonLink href="/donate">Donate</ButtonLink>
          </div>

          <nav
            aria-label="Primary"
            className="-mx-1 flex w-full min-w-0 items-center gap-x-5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] md:w-auto md:flex-1 md:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 py-2 text-[0.95rem] text-muted transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Shell>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-bg-soft">
      <Shell>
        <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* The trust block. Registration is the strongest legitimacy token in
              this market, so it appears on every page — at readable size, in the
              type system, not as fine print. */}
          <div>
            <p className="idx">Registered organisation</p>
            <p className="mt-3 font-medium">
              <PendingValue value={org.legalName} render={(v) => v} />
            </p>
            <dl className="mt-3 space-y-1.5 text-sm">
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-muted">CAC Incorporated Trustees no.</dt>
                <dd className="num">
                  <PendingValue value={org.cacNumber} render={(v) => v} />
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-muted">Registered office</dt>
                <dd>
                  <PendingValue value={org.address} render={(v) => v} />
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-muted">Phone</dt>
                <dd className="num">
                  <PendingValue
                    value={org.phone}
                    render={(v) => (
                      <a href={`tel:${v.replace(/\s/g, "")}`} className="underline underline-offset-4">
                        {v}
                      </a>
                    )}
                  />
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-muted">Email</dt>
                <dd>
                  <a href={`mailto:${org.email}`} className="underline underline-offset-4">
                    {org.email}
                  </a>
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-muted">
              Check us yourself on the{" "}
              <a
                href={org.cacSearchUrl}
                className="underline underline-offset-4"
                rel="noopener noreferrer"
                target="_blank"
              >
                CAC public register
              </a>
              . Then read{" "}
              <Link href="/transparency" className="underline underline-offset-4">
                the ledger
              </Link>
              .
            </p>
          </div>

          <nav aria-label="Ways to contribute">
            <p className="idx">Contribute</p>
            <ul className="mt-3 space-y-2 text-sm">
              {contributeNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:underline hover:underline-offset-4">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Secondary">
            <p className="idx">The campaign</p>
            <ul className="mt-3 space-y-2 text-sm">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:underline hover:underline-offset-4">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-line py-6 text-sm text-muted">
          <p>
            {site.name}. We never ask for payment into a personal account. If someone asks you to
            send money anywhere other than the account published on this site, it is not us.
          </p>
        </div>
      </Shell>
    </footer>
  );
}
