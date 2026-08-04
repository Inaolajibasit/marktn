import type { Metadata } from "next";
import { Press } from "@/components/Press";

export const metadata: Metadata = {
  title: "Press",
  description: "marktn PR in Marie Claire, Business of Fashion, PRNewswire, Culture Custodian, BeautyMatter and 21 Magazine.",
};

export default function PressPage() {
  return (
    <div className="pt-32">
      <section className="px-gutter pb-section">
        <p className="eyebrow mb-6">Coverage</p>
        <h1 className="max-w-3xl font-display text-display-2">marktn PR in the press.</h1>
      </section>
      <Press />
    </div>
  );
}
