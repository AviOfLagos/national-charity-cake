import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { themeScript } from "@/components/theme-toggle";
import { isPending, org, site } from "@/lib/content";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${org.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.promise,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_NG",
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  publisher: site.name,
  category: "nonprofit",
  keywords: [
    "National Charity Cake",
    "charity Nigeria",
    "donate Nigeria",
    "transparent charity",
    "public ledger charity",
    "verified charity Nigeria",
    "CAC registered charity",
    "charity bake sale Nigeria",
  ],
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: LayoutProps<"/">) {
  // JSON-LD carries the registration identifier, so the legitimacy signal is
  // machine-readable as well as visible.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: site.name,
    url: site.url,
    email: org.email,
    slogan: org.tagline,
    ...(isPending(org.cacNumber) ? {} : { identifier: org.cacNumber }),
    ...(isPending(org.legalName) ? {} : { legalName: org.legalName }),
  };

  return (
    <html
      lang="en-NG"
      className={`${display.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-bg focus:px-4 focus:py-2 focus:outline focus:outline-2 focus:outline-accent"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <SpeedInsights />
        {/* Loaded only once a measurement id exists, so no empty gtag request
            goes out — and so the consent work in the backlog has one place to
            gate. */}
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
