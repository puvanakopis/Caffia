"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
const story1 = "/assets/story-1.jpg";
const story2 = "/assets/story-2.jpg";
import { Reveal } from "./Reveal";

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], ["8%", "-18%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section id="story" ref={ref} className="relative bg-background py-20 md:py-40">
      <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-12 px-5 sm:px-6 md:grid-cols-12 md:gap-16 md:px-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <Reveal>
              <span className="text-[10px] uppercase tracking-[0.28em] text-terracotta sm:text-xs">
                — Our Craft
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display text-4xl leading-[0.95] text-espresso sm:mt-6 sm:text-5xl md:text-7xl">
                Crafted Coffee <span className="italic text-terracotta">Moments</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md text-base leading-relaxed text-espresso/70">
                Every cup begins in the highlands and ends at your table. We
                source from family farms, roast in small batches, and pour with
                intention — so that every sip carries a sense of place.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <ul className="mt-10 space-y-4 text-sm text-espresso/80">
                {[
                  "Single-origin beans, traceable to the lot",
                  "Stone-hearth pastries baked at dawn",
                  "Seasonal plates with biodynamic produce",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-2 h-px w-6 shrink-0 bg-terracotta" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 md:col-span-7">
          <motion.div
            style={{ y: y1 }}
            className="relative aspect-[3/4] overflow-hidden rounded-sm bg-cream"
          >
            <img
              src={story1}
              alt="Barista pouring milk"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="relative mt-16 aspect-[3/4] overflow-hidden rounded-sm bg-cream"
          >
            <img
              src={story2}
              alt="Roasting coffee beans"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            style={{ y: y1 }}
            className="col-span-2 -mt-4 flex items-center justify-between rounded-sm border border-espresso/10 bg-cream/60 px-6 py-5 text-xs uppercase tracking-[0.22em] text-espresso/70"
          >
            <span>Ethiopia · Yirgacheffe</span>
            <span>Roasted 06.12</span>
            <span className="text-terracotta">Lot 042</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}