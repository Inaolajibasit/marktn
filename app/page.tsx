import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { LogoMarquee } from "@/components/LogoMarquee";
import { FeaturedWork } from "@/components/FeaturedWork";
import { ImpactCounter } from "@/components/ImpactCounter";
import { Services } from "@/components/Services";
import { Founder } from "@/components/Founder";
import { Press } from "@/components/Press";
import { Testimonials } from "@/components/Testimonials";
import { HomeBlog } from "@/components/HomeBlog";

export const metadata: Metadata = {
  title: "marktn PR — Africa's Culturally Intelligent Luxury PR Agency",
};

// All content (campaigns, press, services, founder) is centralized in
// lib/content.ts — edit that file to change copy, or drop images into
// /public/images/... (see public/images/README.md for exact paths).
export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <Services />
      <ImpactCounter />
      <FeaturedWork />
      <Founder />
      <Testimonials />
      <HomeBlog />
      <Press />
    </>
  );
}
