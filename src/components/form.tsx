"use client";

import { createContext, useActionState, useContext, useEffect, useId, useRef } from "react";
import { useFormStatus } from "react-dom";

import { idleState, type FormState } from "@/lib/form-state";
import { buttonClass } from "./primitives";

/* ---------------------------------------------------------------------------
   Fields. Every input is programmatically labelled and every error is both
   associated with its field (aria-describedby + aria-invalid) and announced —
   a red border communicates nothing to anyone not looking at it.
   ------------------------------------------------------------------------ */

type BaseProps = {
  name: string;
  label: string;
  hint?: string;
  required?: boolean;
};

/** Field errors travel by context rather than as a render prop, because a
 *  function child cannot cross the server-to-client boundary — which is what
 *  lets these form pages stay Server Components and keep their metadata. */
const FieldErrors = createContext<Record<string, string>>({});

function useFieldError(name: string): string | undefined {
  return useContext(FieldErrors)[name];
}

const controlClass =
  "w-full min-h-11 border border-line-strong bg-bg px-3 py-2.5 text-ink " +
  "transition-colors placeholder:text-muted focus:border-accent";

function FieldFrame({
  id,
  label,
  hint,
  error,
  required,
  children,
}: BaseProps & { id: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required ? (
          <span className="text-accent"> *</span>
        ) : (
          <span className="text-muted"> (optional)</span>
        )}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function describedBy(id: string, hint?: string, error?: string) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
}

export function Field({
  type = "text",
  autoComplete,
  inputMode,
  ...props
}: BaseProps & {
  type?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
}) {
  const id = useId();
  const error = useFieldError(props.name);
  return (
    <FieldFrame id={id} error={error} {...props}>
      <input
        id={id}
        name={props.name}
        type={type}
        required={props.required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, props.hint, error)}
        className={controlClass}
        style={{ borderRadius: "var(--radius)" }}
      />
    </FieldFrame>
  );
}

export function TextArea({ rows = 4, ...props }: BaseProps & { rows?: number }) {
  const id = useId();
  const error = useFieldError(props.name);
  return (
    <FieldFrame id={id} error={error} {...props}>
      <textarea
        id={id}
        name={props.name}
        rows={rows}
        required={props.required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, props.hint, error)}
        className={controlClass}
        style={{ borderRadius: "var(--radius)" }}
      />
    </FieldFrame>
  );
}

export function Select({ options, ...props }: BaseProps & { options: readonly string[] }) {
  const id = useId();
  const error = useFieldError(props.name);
  return (
    <FieldFrame id={id} error={error} {...props}>
      <select
        id={id}
        name={props.name}
        required={props.required}
        defaultValue=""
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, props.hint, error)}
        className={controlClass}
        style={{ borderRadius: "var(--radius)" }}
      >
        <option value="" disabled>
          Choose one
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </FieldFrame>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`${buttonClass()} disabled:opacity-60`}>
      {pending ? "Sending…" : label}
    </button>
  );
}

/* ---------------------------------------------------------------------------
   The form wrapper. Carries the honeypot and the timing check, renders all four
   states, and moves focus to the outcome so a screen-reader user is told what
   happened rather than left in the old DOM.
   ------------------------------------------------------------------------ */

export function Form({
  action,
  submitLabel,
  successTitle,
  successBody,
  children,
}: {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  submitLabel: string;
  successTitle: string;
  successBody: string;
  children: React.ReactNode;
}) {
  const [state, formAction] = useActionState(action, idleState);
  const outcomeRef = useRef<HTMLDivElement>(null);

  // Stamped on the client, so a bot posting the raw HTML has no usable value.
  // Written straight to the DOM rather than held in state: it is never rendered
  // from, and state here would cost a cascading render on every form in the site.
  // Re-stamped after every render because React resets the node to its
  // defaultValue when the form re-renders with an error, which would otherwise
  // send 0 and get the resubmission rejected as a bot.
  const stampRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const node = stampRef.current;
    if (node && node.value === "0") node.value = String(Date.now());
  });

  useEffect(() => {
    if (state.status === "idle") return;
    // Deferred a frame: React restores focus to the submit button as the action
    // settles, so focusing synchronously here gets overwritten and the screen-
    // reader user is never told what happened.
    const id = requestAnimationFrame(() => outcomeRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div
        ref={outcomeRef}
        tabIndex={-1}
        role="status"
        className="border border-line-strong bg-bg-soft px-6 py-8"
        style={{ borderRadius: "var(--radius)" }}
      >
        <h3>{successTitle}</h3>
        <p className="mt-2 text-muted" style={{ maxWidth: "var(--measure)" }}>
          {successBody}
        </p>
        {state.reference ? (
          <p className="mt-4 text-sm text-muted">
            Your reference: <span className="num text-ink">{state.reference}</span>
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="grid gap-5" style={{ maxWidth: "42rem" }}>
      {/* Honeypot. Hidden from everyone who should be filling this in. */}
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="renderedAt" defaultValue="0" ref={stampRef} />

      <FieldErrors.Provider value={state.fieldErrors ?? {}}>{children}</FieldErrors.Provider>

      <div
        ref={outcomeRef}
        tabIndex={-1}
        aria-live="polite"
        className={state.status === "error" ? "" : "sr-only"}
      >
        {state.status === "error" && state.message ? (
          <p
            className="border border-accent px-4 py-3 text-sm"
            style={{ borderRadius: "var(--radius)" }}
          >
            {state.message}
            {state.reference ? (
              <>
                {" "}
                Reference <span className="num">{state.reference}</span>.
              </>
            ) : null}
          </p>
        ) : null}
      </div>

      <div className="flex items-center gap-4">
        <SubmitButton label={submitLabel} />
        <p className="text-sm text-muted">We never share your details.</p>
      </div>
    </form>
  );
}
