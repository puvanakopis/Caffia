import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { PageHero } from "@/components/landing/PageHero";
import { Reveal } from "@/components/landing/Reveal";
import { MagneticButton } from "@/components/landing/MagneticButton";
import type { Metadata } from "next";
const gallery = "/assets/gallery-1.jpg";

export const metadata: Metadata = {
  title: "Visit — Caffia, Brooklyn",
  description: "Find Caffia at 28 Linden Lane, Brooklyn. Hours, directions, private bookings, and a quiet table waiting for you.",
};

export default function VisitPage() {
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <PageHero
        eyebrow="Visit"
        title="Find Us On"
        italicWord="Linden Lane"
        subtitle="A quiet corner of Brooklyn, open seven days a week. Walk-ins welcome, tables held for those who write ahead."
      />

      <section className="bg-background py-16 md:py-28">
        <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-10 px-5 sm:px-6 md:grid-cols-12 md:gap-12 md:px-12">
          <Reveal className="md:col-span-7">
            <div className="aspect-[4/3] overflow-hidden rounded-sm md:aspect-auto">
              <img
                src={gallery}
                alt="Inside the Caffia atelier"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="md:col-span-5">
            <Reveal>
              <h2 className="font-display text-3xl leading-tight text-espresso sm:text-4xl md:text-5xl">
                28 Linden Lane,<br /><span className="italic text-terracotta">Atelier No. 4</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-sm leading-relaxed text-espresso/70">
                Brooklyn, NY 11217 · Tucked between a bookshop and a flower studio.
                Look for the brass kettle in the window.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-espresso/10 pt-8 text-sm text-espresso/80">
                <div className="text-xs uppercase tracking-[0.22em] text-espresso/60">Mon — Fri</div><div>07:00 — 19:00</div>
                <div className="text-xs uppercase tracking-[0.22em] text-espresso/60">Saturday</div><div>08:00 — 20:00</div>
                <div className="text-xs uppercase tracking-[0.22em] text-espresso/60">Sunday</div><div>09:00 — 17:00</div>
                <div className="text-xs uppercase tracking-[0.22em] text-espresso/60">Phone</div><div>+1 (718) 555 0142</div>
                <div className="text-xs uppercase tracking-[0.22em] text-espresso/60">Email</div><div>hello@caffia.co</div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-3">
                <MagneticButton href="#">Reserve a Table</MagneticButton>
                <MagneticButton href="#" variant="ghost">Get Directions</MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-28">
        <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-10 px-5 sm:px-6 md:grid-cols-3 md:gap-12 md:px-12">
          {[
            { t: "Private Mornings", d: "Reserve the room for breakfast or a quiet meeting before 10am. Tasting menus on request." },
            { t: "Events & Tastings", d: "Monthly cuppings, pastry workshops, and seasonal supper clubs. Limited seating, by invitation." },
            { t: "Wholesale", d: "We supply small-batch beans to a handful of considered hotels and restaurants. Write to us." },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.1}>
              <div className="flex h-full flex-col border-t border-espresso/20 pt-6">
                <span className="text-xs uppercase tracking-[0.22em] text-terracotta">0{i + 1}</span>
                <h3 className="mt-4 font-display text-2xl text-espresso sm:text-3xl">{c.t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-espresso/70">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
