import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Story } from "@/components/landing/Story";
import { Gallery } from "@/components/landing/Gallery";
import { Ticker } from "@/components/landing/Ticker";
import { PageHero } from "@/components/landing/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Atelier — Caffia",
  description: "Step inside the Caffia atelier — a Brooklyn workshop where beans are roasted, pastries baked, and slow mornings are kept.",
};

export default function AtelierPage() {
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <PageHero
        eyebrow="The Atelier"
        title="A Workshop for"
        italicWord="Slow Craft"
        subtitle="Equal parts roastery, bakery, and gathering room. Designed by hand, kept by twelve craftspeople, open to the neighbourhood."
      />
      <Story />
      <Ticker />
      <Gallery />
      <Footer />
    </main>
  );
}
