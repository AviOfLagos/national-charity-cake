/** Shared by the server actions and the client form. Kept out of the "use server"
 *  module, which may only export async functions. */
export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Field-level errors, keyed by input name, associated programmatically in the UI. */
  fieldErrors?: Record<string, string>;
  /** Correlation id, shown to the user and logged, so a failed submission is traceable. */
  reference?: string;
};

export const idleState: FormState = { status: "idle" };
