import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { PageHero } from "@/components/landing/PageHero";
import { Reveal } from "@/components/landing/Reveal";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
const g1 = "/assets/gallery-1.jpg";
const g2 = "/assets/gallery-2.jpg";
const g3 = "/assets/gallery-3.jpg";
const g4 = "/assets/gallery-4.jpg";
const story1 = "/assets/story-1.jpg";

export const metadata: Metadata = {
  title: "Journal — Caffia Atelier",
  description: "Field notes from the Caffia atelier: sourcing trips, craft essays, recipes, and quiet portraits of the team.",
};

const posts = [
  { tag: "Sourcing", date: "Jun · 04", title: "Notes from Yirgacheffe: a harvest in jasmine", excerpt: "A week with the Konga cooperative — soft citrus, ripe stone fruit, and the patience of slow drying beds.", img: story1 },
  { tag: "Craft", date: "May · 22", title: "On the second pull: the case for the cortado", excerpt: "Smaller, warmer, more honest. Why our most quiet drink is the one we make most carefully.", img: g3 },
  { tag: "Atelier", date: "May · 09", title: "The morning we re-tiled the counter", excerpt: "Three days, twelve hands, and a slightly better angle for the espresso machine.", img: g1 },
  { tag: "Recipes", date: "Apr · 27", title: "Cardamom buns, two ways", excerpt: "A recipe for home, and a glimpse at how we shape them at four in the morning for the seven o'clock rush.", img: g2 },
  { tag: "Team", date: "Apr · 12", title: "Aria, on baking by feel", excerpt: "Our pastry chef on why she keeps no timers — and why the croissants come out the same every time.", img: g4 },
];

export default function JournalPage() {
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <PageHero
        eyebrow="Journal"
        title="Field Notes,"
        italicWord="Quietly Kept"
        subtitle="Sourcing diaries, craft essays, and recipes from our atelier. Published when there's something worth saying."
      />

      <section className="bg-background pb-20 md:pb-36">
        <div className="mx-auto max-w-[1480px] px-5 sm:px-6 md:px-12">
          <div className="divide-y divide-espresso/10 border-y border-espresso/10">
            {posts.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <a
                  href="#"
                  className="group grid grid-cols-1 items-start gap-5 py-8 transition-colors sm:gap-6 sm:py-10 md:grid-cols-12 md:items-center md:gap-10 md:py-14"
                >
                  <div className="flex w-full items-center justify-between text-[10px] uppercase tracking-[0.22em] text-espresso/60 sm:text-xs md:col-span-2 md:flex-col md:items-start md:gap-3">
                    <span className="text-terracotta">{p.tag}</span>
                    <span>{p.date}</span>
                  </div>
                  <div className="order-3 md:order-none md:col-span-7">
                    <h2 className="font-display text-2xl leading-tight text-espresso transition-colors group-hover:text-terracotta sm:text-3xl md:text-5xl">
                      {p.title}
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-espresso/65 sm:mt-4">
                      {p.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-espresso sm:mt-6 sm:text-xs">
                      Read essay
                      <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2" strokeWidth={1.5} />
                    </span>
                  </div>
                  <div className="order-2 md:order-none md:col-span-3">
                    <div className="aspect-[4/3] overflow-hidden rounded-sm bg-cream">
                      <img
                        src={p.img}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                      />
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
