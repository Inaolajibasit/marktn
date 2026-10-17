import { ContactSection } from "@/components/ContactForm";
import { PageIntro } from "@/components/BrandUI";
import { services } from "@/lib/content";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const requestedService =
    service === "media-relations"
      ? "public-relations"
      : service === "brand-strategy" || service === "consulting"
        ? "integrated-campaigns"
        : service;
  const initialService = services.some((item) => item.slug === requestedService)
    ? requestedService
    : "";
  return (
    <>
      <PageIntro
        eyebrow="Start a conversation"
        title="A different angle"
        accent="starts with hello."
      />
      <ContactSection initialService={initialService} />
    </>
  );
}
