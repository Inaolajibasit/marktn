import type { Metadata } from "next";
import { PageIntro } from "@/components/BrandUI";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";

export const metadata: Metadata = {
  title: "Services",
  description:
    "PR, brand strategy, experiences and campaigns built around culture and your next move.",
  alternates: { canonical: "/services" },
};
export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our capabilities"
        title="All the right angles."
        accent="One connected team."
        description="From the first strategic question to the final detail. We connect the disciplines that help your brand go further."
      />
      <Services />
      <Process />
    </>
  );
}
