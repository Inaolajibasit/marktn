"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { submitContactForm, type ContactState } from "@/app/contact/actions";
import { services } from "@/lib/content";
import { Arrow } from "./BrandUI";

const initialState: ContactState = { status: "idle" };

export function ContactForm({
  initialService = "",
}: {
  initialService?: string;
}) {
  const id = useId();
  const [state, setState] = useState<ContactState>(initialState);
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const data = new FormData(event.currentTarget);
    setPending(true);
    try {
      const result = await submitContactForm(state, data);
      setState(result);
      if (result.status === "success") formRef.current?.reset();
      else if (result.fieldErrors) {
        const first = Object.keys(result.fieldErrors)[0];
        formRef.current
          ?.querySelector<HTMLElement>('[name="' + first + '"]')
          ?.focus();
      }
    } catch {
      setState({
        status: "error",
        message:
          "We couldn’t send your message. Please try again or email hello@marktnpr.com.",
      });
    } finally {
      setPending(false);
    }
  }
  const fieldError = (name: keyof NonNullable<ContactState["fieldErrors"]>) =>
    state.fieldErrors?.[name];
  return (
    <form
      ref={formRef}
      className="contact-form"
      onSubmit={submit}
      noValidate
      aria-busy={pending}
    >
      <fieldset disabled={pending}>
        <legend>What are you thinking?</legend>
        <div className="form-chips">
          {services.map((service) => (
            <div key={service.slug} className="form-chip">
              <input
                type="radio"
                name="service"
                id={id + "-" + service.slug}
                value={service.name}
                defaultChecked={initialService === service.slug}
              />
              <label htmlFor={id + "-" + service.slug}>{service.name}</label>
            </div>
          ))}
          <div className="form-chip">
            <input
              type="radio"
              name="service"
              id={id + "-unsure"}
              value="Let’s explore"
              defaultChecked={!initialService}
            />
            <label htmlFor={id + "-unsure"}>Let’s explore</label>
          </div>
        </div>
      </fieldset>
      <div className="form-row">
        {(
          [
            {
              name: "name",
              label: "Your name",
              type: "text",
              placeholder: "Full name",
              autoComplete: "name",
            },
            {
              name: "email",
              label: "Work email",
              type: "email",
              placeholder: "you@company.com",
              autoComplete: "email",
            },
          ] as const
        ).map((field) => (
          <div key={field.name}>
            <label htmlFor={id + "-" + field.name}>{field.label}</label>
            <input
              id={id + "-" + field.name}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              required
              disabled={pending}
              aria-invalid={!!fieldError(field.name)}
              aria-describedby={
                fieldError(field.name)
                  ? id + "-" + field.name + "-error"
                  : undefined
              }
            />
            {fieldError(field.name) && (
              <p className="field-error" id={id + "-" + field.name + "-error"}>
                {fieldError(field.name)}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="form-row">
        <div>
          <label htmlFor={id + "-company"}>
            Company <span>(optional)</span>
          </label>
          <input
            id={id + "-company"}
            name="company"
            autoComplete="organization"
            placeholder="Your brand or organisation"
            disabled={pending}
          />
        </div>
        <div>
          <label htmlFor={id + "-budget"}>
            Budget <span>(optional)</span>
          </label>
          <input
            id={id + "-budget"}
            name="budget"
            placeholder="A rough range is fine"
            disabled={pending}
          />
        </div>
      </div>
      <div>
        <label htmlFor={id + "-message"}>Tell us about it</label>
        <textarea
          id={id + "-message"}
          name="message"
          rows={4}
          placeholder="Your idea, your ambition, or the challenge you’re working on."
          required
          minLength={10}
          disabled={pending}
          aria-invalid={!!fieldError("message")}
          aria-describedby={
            fieldError("message") ? id + "-message-error" : undefined
          }
        />
        {fieldError("message") && (
          <p className="field-error" id={id + "-message-error"}>
            {fieldError("message")}
          </p>
        )}
      </div>
      <button type="submit" className="contact-submit" disabled={pending}>
        {pending ? "Sending your message…" : "Let’s go beyond the brief"}
        <Arrow />
      </button>
      {state.message && (
        <p
          ref={statusRef}
          role="status"
          aria-live="polite"
          className={"form-status form-status--" + state.status}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}

export function ContactSection({
  initialService = "",
}: {
  initialService?: string;
}) {
  return (
    <section
      className="contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-panel">
        <div className="contact-introduction">
          <p className="eyebrow">The next great idea starts here</p>
          <h2 id="contact-title">
            Tell us what
            <br />
            <span className="accent-text">you have in mind.</span>
          </h2>
          <p>
            A new market. A bigger story. A brand ready for its next chapter.
            We’d love to hear what you’re working on.
          </p>
          <a href="mailto:hello@marktnpr.com">hello@marktnpr.com</a>
          <span className="contact-response">
            <span className="status-dot" />
            We reply within two business days.
          </span>
        </div>
        <ContactForm initialService={initialService} />
      </div>
    </section>
  );
}
