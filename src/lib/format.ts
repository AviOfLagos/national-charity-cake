const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const nairaWithKobo = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 2,
});

/** Kobo → display. Whole-naira amounts drop the decimals; anything else keeps them,
 *  because a ledger that hides 40 kobo is a ledger someone will query. */
export function formatNaira(amountKobo: number): string {
  const naira = amountKobo / 100;
  return Number.isInteger(naira) ? nairaFormatter.format(naira) : nairaWithKobo.format(naira);
}

export function formatCount(value: number): string {
  return new Intl.NumberFormat("en-NG").format(value);
}

const dateFormatter = new Intl.DateTimeFormat("en-NG", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : dateFormatter.format(d);
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}
