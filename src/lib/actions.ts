"use server";

import { headers } from "next/headers";
import type { z } from "zod";

import type { FormState } from "./form-state";
import { MIN_FILL_MS, inKindSchema, mediaSchema, partnerSchema, volunteerSchema } from "./schemas";
import { appendRow, type SheetTab } from "./sheets";

/** In-memory fixed-window limiter. Adequate for a single instance; the backlog
 *  carries the note to move this to a shared store before scaling out. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(key: string, now: number): boolean {
  const entry = hits.get(key);
  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function ref(now: number): string {
  return `NCC-${now.toString(36).toUpperCase()}`;
}

async function clientKey(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? "local";
}

async function handle<S extends z.ZodTypeAny>(
  schema: S,
  tab: SheetTab,
  toRow: (data: z.infer<S>, submittedAt: string) => (string | number)[],
  formData: FormData,
): Promise<FormState> {
  const now = Date.now();
  const reference = ref(now);

  if (rateLimited(await clientKey(), now)) {
    return {
      status: "error",
      message: "Too many submissions from this connection. Please wait a minute and try again.",
      reference,
    };
  }

  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    // The honeypot and timing failures are not shown as field errors — a bot
    // learns from a specific message. They read as a generic failure.
    if (fieldErrors.website || fieldErrors.renderedAt) {
      return { status: "error", message: "We could not accept that submission.", reference };
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  const data = parsed.data as z.infer<S> & { renderedAt: number };
  if (now - data.renderedAt < MIN_FILL_MS) {
    return { status: "error", message: "We could not accept that submission.", reference };
  }

  const submittedAt = new Date(now).toISOString();
  const result = await appendRow(tab, [reference, submittedAt, ...toRow(parsed.data, submittedAt)]);

  if (!result.ok) {
    return {
      status: "error",
      message:
        result.reason === "unconfigured"
          ? "The form is not connected to its data store yet, so your details were not saved. Please email us instead — nothing was lost on your side."
          : "We could not save your details just now. Please try again, or email us with the reference below.",
      reference,
    };
  }

  return { status: "success", reference };
}

export async function submitVolunteer(_prev: FormState, formData: FormData): Promise<FormState> {
  return handle(
    volunteerSchema,
    "Volunteers",
    (d) => [d.name, d.email, d.phone, d.state, d.availability, d.interests],
    formData,
  );
}

export async function submitPartner(_prev: FormState, formData: FormData): Promise<FormState> {
  return handle(
    partnerSchema,
    "Partners",
    (d) => [d.organisation, d.contactName, d.email, d.phone, d.tier, d.message],
    formData,
  );
}

export async function submitInKind(_prev: FormState, formData: FormData): Promise<FormState> {
  return handle(
    inKindSchema,
    "InKind",
    (d) => [d.name, d.email, d.phone, d.goods, d.quantity, d.location],
    formData,
  );
}

export async function submitMedia(_prev: FormState, formData: FormData): Promise<FormState> {
  return handle(
    mediaSchema,
    "Media",
    (d) => [d.name, d.outlet, d.email, d.deadline, d.request],
    formData,
  );
}
