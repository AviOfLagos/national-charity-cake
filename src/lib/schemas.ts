import { z } from "zod";

/**
 * Boundary validation for every public form.
 *
 * Two anti-spam measures ride along on all of them, because these routes are
 * unauthenticated and a charity address attracts volume:
 *  - `website`  — honeypot. Real users never see it, so any value means a bot.
 *  - `renderedAt` — timing check. A human cannot read and complete a form in
 *    under ~2.5 seconds.
 */

const antiSpam = {
  website: z.string().max(0, "Rejected."),
  renderedAt: z.coerce.number().int().positive(),
};

const name = z.string().trim().min(2, "Please enter your name.").max(120);
const email = z.string().trim().toLowerCase().email("Please enter a valid email address.").max(200);
/** NG mobile numbers, permissive about formatting, strict about being a number. */
const phone = z
  .string()
  .trim()
  .min(7, "Please enter a phone number we can reach you on.")
  .max(24)
  .regex(/^[0-9+\-()\s]+$/, "Use digits, spaces, and + ( ) - only.");

export const volunteerSchema = z.object({
  ...antiSpam,
  name,
  email,
  phone,
  state: z.string().trim().min(2, "Which state are you in?").max(60),
  availability: z.enum(["weekends", "weekdays", "the bake day only", "flexible"]),
  interests: z.string().trim().max(600).optional().default(""),
});

export const partnerSchema = z.object({
  ...antiSpam,
  organisation: z.string().trim().min(2, "Please enter your organisation.").max(160),
  contactName: name,
  email,
  phone,
  tier: z.enum(["headline", "supporting", "in-kind", "not sure yet"]),
  message: z.string().trim().max(1200).optional().default(""),
});

export const inKindSchema = z.object({
  ...antiSpam,
  name,
  email,
  phone,
  goods: z.string().trim().min(3, "What would you like to give?").max(600),
  quantity: z.string().trim().max(120).optional().default(""),
  location: z.string().trim().min(2, "Where are the goods?").max(160),
});

export const mediaSchema = z.object({
  ...antiSpam,
  name,
  outlet: z.string().trim().min(2, "Which outlet?").max(160),
  email,
  deadline: z.string().trim().max(60).optional().default(""),
  request: z.string().trim().min(3, "What do you need?").max(1200),
});

export const donationIntentSchema = z.object({
  ...antiSpam,
  amountKobo: z.coerce
    .number()
    .int("Enter a whole naira amount.")
    .min(100_00, "The minimum gift is ₦100.")
    .max(500_000_000_00, "For gifts above ₦5,000,000 please contact us directly."),
  name: z.string().trim().max(120).optional().default(""),
  email,
  anonymous: z.coerce.boolean().optional().default(false),
});

export type VolunteerInput = z.infer<typeof volunteerSchema>;
export type PartnerInput = z.infer<typeof partnerSchema>;
export type InKindInput = z.infer<typeof inKindSchema>;
export type MediaInput = z.infer<typeof mediaSchema>;
export type DonationIntentInput = z.infer<typeof donationIntentSchema>;

export const MIN_FILL_MS = 2500;
