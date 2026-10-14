import type { Metadata } from "next";
import { PageIntro } from "@/components/BrandUI";
import { Press } from "@/components/Press";

export const metadata: Metadata = {
  title: "Press",
  description:
    "MARKTN in the press: conversations about culture, brands and communications.",
  alternates: { canonical: "/press" },
};
export default function PressPage() {
  return (
    <>
      <PageIntro
        eyebrow="The conversation"
        title="A perspective"
        accent="worth sharing."
        description="Where our work, people and ideas have appeared in the wider conversation."
      />
      <Press />
    </>
  );
}
