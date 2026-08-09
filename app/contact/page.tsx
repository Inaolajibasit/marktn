"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactState } from "./actions";

const initialState: ContactState = { status: "idle" };

export default function ContactPage() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  return (
    <div className="px-gutter pb-section pt-32">
      <p className="eyebrow mb-6">Start a Project</p>
      <h1 className="max-w-2xl font-display text-display-2">Tell us what you&rsquo;re building.</h1>

      <form action={formAction} noValidate className="mt-14 grid max-w-2xl gap-8">
        <div>
          <label htmlFor="name" className="font-mono text-caption uppercase tracking-[0.08em] text-ink-40">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            aria-invalid={Boolean(state.fieldErrors?.name)}
            aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
            className="mt-2 w-full border-0 border-b border-paper-line bg-transparent py-3 font-display text-display-3 italic outline-none focus:border-rust"
          />
          {state.fieldErrors?.name && (
            <p id="name-error" className="mt-2 font-mono text-caption text-rust-deep">{state.fieldErrors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="font-mono text-caption uppercase tracking-[0.08em] text-ink-40">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            aria-invalid={Boolean(state.fieldErrors?.email)}
            aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
            className="mt-2 w-full border-0 border-b border-paper-line bg-transparent py-3 font-display text-display-3 italic outline-none focus:border-rust"
          />
          {state.fieldErrors?.email && (
            <p id="email-error" className="mt-2 font-mono text-caption text-rust-deep">{state.fieldErrors.email}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="company" className="font-mono text-caption uppercase tracking-[0.08em] text-ink-40">
              Company
            </label>
            <input id="company" name="company" type="text" className="mt-2 w-full border-0 border-b border-paper-line bg-transparent py-3 font-body outline-none focus:border-rust" />
          </div>
          <div>
            <label htmlFor="budget" className="font-mono text-caption uppercase tracking-[0.08em] text-ink-40">
              Budget range
            </label>
            <input id="budget" name="budget" type="text" placeholder="₦" className="mt-2 w-full border-0 border-b border-paper-line bg-transparent py-3 font-body outline-none focus:border-rust" />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="font-mono text-caption uppercase tracking-[0.08em] text-ink-40">
            Project details
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            aria-invalid={Boolean(state.fieldErrors?.message)}
            aria-describedby={state.fieldErrors?.message ? "message-error" : undefined}
            className="mt-2 w-full border-0 border-b border-paper-line bg-transparent py-3 font-body outline-none focus:border-rust"
          />
          {state.fieldErrors?.message && (
            <p id="message-error" className="mt-2 font-mono text-caption text-rust-deep">{state.fieldErrors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="mt-4 inline-flex min-h-[44px] w-fit items-center bg-ink px-8 py-4 font-mono text-caption uppercase tracking-[0.1em] text-paper transition-[background-color,transform] duration-150 ease-out hover:bg-rust focus-visible:bg-rust active:scale-[0.98] active:bg-rust disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
        >
          {pending ? "Sending…" : "Send Enquiry"}
        </button>

        <div role="status" aria-live="polite">
          {state.status === "success" && (
            <p className="font-body text-body text-rust-deep">{state.message}</p>
          )}
          {state.status === "error" && state.message && !state.fieldErrors && (
            <p className="font-body text-body text-rust-deep">{state.message}</p>
          )}
        </div>
      </form>
    </div>
  );
}
