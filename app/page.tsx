import type { Metadata } from "next";
import { Suspense } from "react";
import { Hero } from "@/components/Hero";
import { LogoMarquee } from "@/components/LogoMarquee";
import { FeaturedWork } from "@/components/FeaturedWork";
import { ImpactCounter } from "@/components/ImpactCounter";
import { Services } from "@/components/Services";
import { Process, Engagements } from "@/components/Process";
import { Founder } from "@/components/Founder";
import { Testimonials } from "@/components/Testimonials";
import { HomeBlog } from "@/components/HomeBlog";
import { ContactSection } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: { absolute: "MARKTN — Beyond the brief." },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <FeaturedWork />
      <ImpactCounter />
      <Services />
      <Process />
      <Engagements />
      <Testimonials />
      <Founder />
      <Suspense fallback={null}>
        <HomeBlog />
      </Suspense>
      <ContactSection />
    </>
  );
}
