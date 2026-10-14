"use client";

import { useState } from "react";
import { testimonials } from "@/lib/content";
import { Arrow } from "./BrandUI";

export function Testimonials() {
  const [active, setActive] = useState(0);
  const testimonial = testimonials[active];
  return (
    <section
      className="testimonial-section"
      aria-labelledby="testimonials-title"
    >
      <div className="testimonial-heading">
        <p className="eyebrow">Client perspective</p>
        <h2 id="testimonials-title">
          Good company.
          <br />
          <span>Shared ambition.</span>
        </h2>
      </div>
      <figure className="testimonial-feature" aria-live="polite">
        <span className="quote-mark" aria-hidden>
          “
        </span>
        <blockquote>{testimonial.quote}</blockquote>
        <figcaption>
          <div className="testimonial-avatar" aria-hidden>
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <strong>{testimonial.name}</strong>
            <span>
              {testimonial.role} / {testimonial.context}
            </span>
          </div>
        </figcaption>
      </figure>
      <div className="testimonial-bottom">
        <span>
          0{active + 1} / 0{testimonials.length}
        </span>
        <div>
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() =>
              setActive(
                (active - 1 + testimonials.length) % testimonials.length,
              )
            }
          >
            <Arrow direction="left" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => setActive((active + 1) % testimonials.length)}
          >
            <Arrow direction="right" />
          </button>
        </div>
      </div>
    </section>
  );
}
