import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Menu } from "@/components/landing/Menu";
import { PageHero } from "@/components/landing/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu — Caffia Boutique Café",
  description: "Single-origin coffee, seasonal small plates, and stone-hearth pastries — explore today's full menu at Caffia.",
};

export default function MenuPage() {
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <PageHero
        eyebrow="Today's Menu"
        title="Small Plates,"
        italicWord="Slow Sips"
        subtitle="Curated daily from local growers and our small-batch roastery. Prices in USD, taxes included."
      />
      <Menu />
      <Footer />
    </main>
  );
}
