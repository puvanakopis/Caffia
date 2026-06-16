"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";

export function VisitCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-espresso py-20 text-cream md:py-40">
      <div className="pointer-events-none absolute -top-32 -right-20 h-[480px] w-[480px] rounded-full bg-terracotta/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-[420px] w-[420px] rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1480px] grid-cols-1 gap-12 px-5 sm:px-6 md:grid-cols-12 md:gap-14 md:px-12">
        <div className="md:col-span-8">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.28em] text-gold">
              — Pay Us a Visit
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-[clamp(2.5rem,10vw,7rem)] leading-[0.95] sm:mt-6">
              Come Sit With Us
              <br />
              <span className="italic text-gold">A While</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <Link
                  href="/visit"
                  className="group inline-flex items-center gap-3 rounded-full bg-cream px-7 py-4 text-sm uppercase tracking-[0.18em] text-espresso transition-colors duration-500 hover:bg-terracotta hover:text-cream"
                >
                  Plan Your Visit
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <Link
                  href="/menu"
                  className="group inline-flex items-center gap-3 rounded-full border border-cream/30 px-7 py-4 text-sm uppercase tracking-[0.18em] text-cream transition-colors duration-500 hover:border-cream"
                >
                  Order Online
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>

        <div className="space-y-8 md:col-span-4 md:border-l md:border-cream/15 md:pl-10">
          {[
            { k: "Hours", v: "Mon — Sun · 7:00 — 19:00" },
            { k: "Address", v: "14 Linden Lane, Marlow EC1 4RT" },
            { k: "Reservations", v: "hello@caffia.cafe" },
          ].map((row, i) => (
            <Reveal key={row.k} delay={0.2 + i * 0.08}>
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-gold">{row.k}</div>
                <div className="mt-2 font-display text-xl text-cream">{row.v}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}