import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
const g1 = "/assets/gallery-1.jpg";
const g2 = "/assets/gallery-2.jpg";
import { Reveal } from "./Reveal";

export function AtelierTeaser() {
  return (
    <section className="bg-background py-20 md:py-36">
      <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-10 px-5 sm:px-6 md:grid-cols-12 md:gap-12 md:px-12">
        <div className="md:col-span-7">
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            <Reveal className="aspect-[3/4] overflow-hidden rounded-sm bg-cream">
              <img src={g1} alt="Counter at Caffia" loading="lazy" className="h-full w-full object-cover" />
            </Reveal>
            <Reveal delay={0.15} className="mt-12 aspect-[3/4] overflow-hidden rounded-sm bg-cream">
              <img src={g2} alt="Quiet morning light" loading="lazy" className="h-full w-full object-cover" />
            </Reveal>
          </div>
        </div>

        <div className="md:col-span-5 md:pl-8">
          <div className="md:sticky md:top-32">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.28em] text-terracotta">
                — The Atelier
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display text-4xl leading-[0.95] text-espresso sm:mt-6 sm:text-5xl md:text-7xl">
                A Room For <span className="italic">Slow</span> Hours.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md text-base leading-relaxed text-espresso/70">
                Twelve seats, low light, and a counter polished by years of
                quiet mornings. Step inside our atelier and meet the people
                behind every cup.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link
                href="/atelier"
                className="group mt-10 inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-espresso"
              >
                Step Inside
                <span className="block h-px w-10 bg-espresso transition-all duration-500 group-hover:w-16" />
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}