"use client";

import { useState, type FormEvent } from "react";
import { Arrow } from "../BrandUI";

export function Newsletter() {
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setPending(true);
    setStatus("Adding you to the list…");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: data.get("email") }),
      });
      const result = await response.json();
      setStatus(
        response.ok
          ? "You’re on the list. Good things to come."
          : result.error || "Something went wrong. Please try again.",
      );
      if (response.ok) form.reset();
    } catch {
      setStatus("Could not connect. Please try again.");
    } finally {
      setPending(false);
    }
  }
  return (
    <section className="newsletter-section">
      <div>
        <p className="eyebrow">The signal</p>
        <h2>
          A fresh perspective.
          <br />
          Every now and then.
        </h2>
        <p>Useful thinking on culture, reputation and communications.</p>
      </div>
      <form onSubmit={submit} aria-busy={pending}>
        <label htmlFor="newsletter-email">Your email address</label>
        <div className="newsletter-field">
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@company.com"
            disabled={pending}
          />
          <button
            type="submit"
            aria-label="Subscribe to the newsletter"
            disabled={pending}
          >
            <Arrow />
          </button>
        </div>
        <p role="status" aria-live="polite">
          {status}
        </p>
      </form>
    </section>
  );
}
