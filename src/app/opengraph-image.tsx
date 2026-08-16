import { ImageResponse } from "next/og";

import { org, site } from "@/lib/content";
import { isPending } from "@/lib/content/types";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${org.tagline}`;

/**
 * WhatsApp is the primary distribution channel and its crawler runs no
 * JavaScript, so this must exist as a real image at a real URL. Flexbox only —
 * Satori supports no grid. Wrapped so a throw cannot take every share down with
 * it: a failing OG route silently kills the preview on every shared link.
 */
export default async function Image() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#F7F5F1",
            color: "#2B2724",
            padding: "72px",
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 2, color: "#6B635B" }}>
            {site.name.toUpperCase()}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 82, lineHeight: 1.05, letterSpacing: -2 }}>
              {org.tagline}
            </div>
            <div style={{ display: "flex", marginTop: 28, fontSize: 34, color: "#6B635B" }}>
              {site.promise}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              borderTop: "2px solid #C9C2B8",
              paddingTop: 28,
              fontSize: 24,
              color: "#6B635B",
            }}
          >
            <div style={{ display: "flex" }}>
              {isPending(org.cacNumber) ? "Registered in Nigeria" : `CAC ${org.cacNumber}`}
            </div>
            <div style={{ display: "flex", color: "#A32E28" }}>Read the ledger →</div>
          </div>
        </div>
      ),
      size,
    );
  } catch (error) {
    console.error("[og] generation failed", error);
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F7F5F1",
            color: "#2B2724",
            fontSize: 64,
          }}
        >
          {site.name}
        </div>
      ),
      size,
    );
  }
}
