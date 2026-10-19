"use client";

import { useEffect, useState } from "react";
import { Arrow } from "@/components/BrandUI";
export function ReadingTools({ title }: { title: string }) {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Share");
  useEffect(() => {
    const update = () => {
      const article = document.querySelector<HTMLElement>("[data-article]");
      if (!article) return;
      const top = article.getBoundingClientRect().top + window.scrollY;
      setProgress(
        Math.max(
          0,
          Math.min(
            100,
            ((window.scrollY - top) /
              Math.max(article.offsetHeight - window.innerHeight, 1)) *
              100,
          ),
        ),
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  async function share() {
    try {
      if (navigator.share) await navigator.share({ title, url: location.href });
      else {
        await navigator.clipboard.writeText(location.href);
        setMessage("Link copied");
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError"))
        setMessage("Please copy the page URL");
    }
  }
  return (
    <>
      <div className="reading-progress" aria-hidden="true">
        <div style={{ width: progress + "%" }} />
      </div>
      <button
        type="button"
        onClick={share}
        className="share-button"
        aria-live="polite"
      >
        {message} <Arrow className="inline-arrow" />
      </button>
    </>
  );
}
