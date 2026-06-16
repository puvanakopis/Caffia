"use client";

import { motion } from "motion/react";
const heroCup = "/assets/hero-cup.png";
const heroBeans = "/assets/hero-beans.png";
const heroCroissant = "/assets/hero-croissant.png";
import { MagneticButton } from "./MagneticButton";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-cream pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-44 md:pb-28">
      <div className="pointer-events-none absolute -top-40 right-0 h-[520px] w-[520px] rounded-full bg-terracotta/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1480px] grid-cols-1 items-center gap-10 px-5 sm:px-6 md:grid-cols-12 md:gap-12 md:px-12">
        <div className="md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="mb-6 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-espresso/70 sm:mb-8 sm:text-xs"
          >
            <span className="h-px w-10 bg-espresso/40" />
            Boutique coffee atelier · est. 2014
          </motion.div>

          <h1 className="font-display text-[15vw] leading-[0.95] text-espresso sm:text-[12vw] md:text-[7.2rem] md:leading-[0.92]">
            {"Steeped in Flavor,".split(" ").map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease, delay: 0.1 + i * 0.08 }}
                className="mr-2 inline-block sm:mr-4"
              >
                {w}
              </motion.span>
            ))}
            <br />
            <motion.span
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease, delay: 0.35 }}
              className="inline-block italic text-terracotta"
            >
              Lovingly{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease, delay: 0.45 }}
              className="inline-block"
            >
              Served Daily.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.6 }}
            className="mt-6 max-w-md text-sm leading-relaxed text-espresso/70 sm:mt-8 sm:text-base"
          >
            A neighbourhood atelier for slow mornings — single-origin espresso,
            handmade pastries, and seasonal plates crafted from local growers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.75 }}
            className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4"
          >
            <MagneticButton to="/menu">Explore Menu</MagneticButton>
            <MagneticButton to="/visit" variant="ghost">
              Reserve a Table
            </MagneticButton>
          </motion.div>
        </div>

        <div className="relative h-[360px] sm:h-[460px] md:col-span-5 md:h-[640px]">
          <motion.img
            src={heroCup}
            alt="Cappuccino with latte art"
            width={1024}
            height={1024}
            initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: -4 }}
            transition={{ duration: 1.3, ease, delay: 0.3 }}
            className="absolute -right-6 top-0 h-[320px] w-[320px] object-contain drop-shadow-[0_40px_60px_rgba(28,22,19,0.25)] sm:-right-10 sm:h-[440px] sm:w-[440px] md:-right-20 md:h-[560px] md:w-[560px]"
          />
          <motion.img
            src={heroCroissant}
            alt="Golden croissant"
            width={800}
            height={800}
            initial={{ opacity: 0, y: 60, rotate: 25 }}
            animate={{ opacity: 1, y: 0, rotate: 18 }}
            transition={{ duration: 1.3, ease, delay: 0.7 }}
            className="absolute -left-4 bottom-4 h-32 w-32 object-contain drop-shadow-[0_24px_30px_rgba(28,22,19,0.2)] sm:-left-6 sm:bottom-6 sm:h-44 sm:w-44 md:h-56 md:w-56"
          />
          <motion.img
            src={heroBeans}
            alt="Coffee beans"
            width={800}
            height={800}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ duration: 1.4, ease, delay: 0.9 }}
            className="absolute right-2 bottom-0 h-28 w-28 object-contain sm:right-4 sm:h-40 sm:w-40 md:h-52 md:w-52"
          />
        </div>
      </div>

      <div className="relative mx-auto mt-16 grid max-w-[1480px] grid-cols-2 gap-6 border-t border-espresso/10 px-5 pt-8 text-espresso sm:gap-8 sm:px-6 sm:pt-10 md:mt-20 md:grid-cols-4 md:px-12">
        {[
          ["10y+", "Roasting daily"],
          ["32", "Single origins"],
          ["4.9", "Guest rating"],
          ["A.M.", "Open 7 — 19"],
        ].map(([k, v], i) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: i * 0.08 }}
          >
            <div className="font-display text-3xl sm:text-4xl">{k}</div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-espresso/60 sm:text-xs">
              {v}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}