import "server-only";

import { GoogleAuth } from "google-auth-library";

import type { LedgerEntry } from "./content/types";

/**
 * The single write path. Every form in the site funnels through `appendRow`, so
 * replacing Sheets with a database later touches this module and nothing else.
 *
 * Credentials never reach the client: this file is `server-only` and the service
 * account key is read from the environment at call time.
 */

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

export type SheetTab = "Donations" | "Partners" | "Volunteers" | "InKind" | "Media" | "Ledger";

export type SheetsResult = { ok: true } | { ok: false; reason: "unconfigured" | "failed" };

function config() {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!spreadsheetId || !clientEmail || !privateKey) return null;
  return { spreadsheetId, clientEmail, privateKey };
}

export function sheetsConfigured(): boolean {
  return config() !== null;
}

async function token(clientEmail: string, privateKey: string): Promise<string> {
  const auth = new GoogleAuth({
    credentials: { client_email: clientEmail, private_key: privateKey },
    scopes: SCOPES,
  });
  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();
  const value = typeof accessToken === "string" ? accessToken : accessToken?.token;
  if (!value) throw new Error("Google auth returned no access token");
  return value;
}

/**
 * Append one row. Returns a discriminated result rather than throwing, so the
 * caller can render an honest error state — a submission that silently vanishes
 * is the single worst failure this site can have.
 */
export async function appendRow(tab: SheetTab, row: (string | number)[]): Promise<SheetsResult> {
  const cfg = config();
  if (!cfg) {
    // Deliberate: in local dev without credentials, log instead of pretending to succeed.
    console.warn(`[sheets] not configured — would append to ${tab}:`, row);
    return { ok: false, reason: "unconfigured" };
  }

  try {
    const accessToken = await token(cfg.clientEmail, cfg.privateKey);
    const range = encodeURIComponent(`${tab}!A:Z`);
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${cfg.spreadsheetId}/values/${range}:append` +
        `?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: [row] }),
        cache: "no-store",
      },
    );

    if (!res.ok) {
      console.error(`[sheets] append to ${tab} failed`, res.status, await res.text());
      return { ok: false, reason: "failed" };
    }
    return { ok: true };
  } catch (error) {
    console.error(`[sheets] append to ${tab} threw`, error);
    return { ok: false, reason: "failed" };
  }
}

/** Read the public ledger. Returns [] when unconfigured so /transparency renders
 *  its designed empty state rather than an error. */
export async function readLedger(): Promise<LedgerEntry[]> {
  const cfg = config();
  if (!cfg) return [];

  try {
    const accessToken = await token(cfg.clientEmail, cfg.privateKey);
    const range = encodeURIComponent("Ledger!A2:H");
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${cfg.spreadsheetId}/values/${range}`,
      { headers: { Authorization: `Bearer ${accessToken}` }, next: { revalidate: 300 } },
    );
    if (!res.ok) {
      console.error("[sheets] ledger read failed", res.status);
      return [];
    }

    const data = (await res.json()) as { values?: string[][] };
    return (data.values ?? [])
      .filter((r) => r[0] && r[1])
      .map((r) => ({
        id: r[0],
        date: r[1],
        direction: r[2] === "out" ? ("out" as const) : ("in" as const),
        amount: { amountKobo: Math.round(Number(r[3] ?? 0) * 100), currency: "NGN" as const },
        description: r[4] ?? "",
        category: (r[5] as LedgerEntry["category"]) ?? "donation",
        reference: r[6] || undefined,
        proofUrl: r[7] || undefined,
      }))
      .filter((e) => Number.isFinite(e.amount.amountKobo));
  } catch (error) {
    console.error("[sheets] ledger read threw", error);
    return [];
  }
}
