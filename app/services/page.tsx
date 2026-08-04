import type { Metadata } from "next";
import { Services } from "@/components/Services";

export const metadata: Metadata = {
  title: "Services",
  description: "Public relations, experiential, brand strategy and integrated campaign services from marktn PR.",
};

export default function ServicesPage() {
  return (
    <div className="pt-32">
      <section className="px-gutter pb-section">
        <p className="eyebrow mb-6">Capabilities</p>
        <h1 className="max-w-3xl font-display text-display-2">
          Full-service, from first insight to final press clip.
        </h1>
      </section>
      <Services />
    </div>
  );
}
