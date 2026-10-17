import type { Metadata } from "next";
import { PageIntro } from "@/components/BrandUI";
import { Services } from "@/components/Services";
import { WhoWeAre } from "@/components/Process";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Public and media relations, influencer and community marketing, experiential marketing, production and integrated campaigns for African audiences.",
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
      <WhoWeAre />
    </>
  );
}
