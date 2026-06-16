"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
const g2 = "/assets/gallery-2.jpg";
const g3 = "/assets/gallery-3.jpg";
const g4 = "/assets/gallery-4.jpg";
import { Reveal } from "./Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

const posts = [
  { tag: "Origin", date: "06 · 2026", title: "Yirgacheffe, in a Cup", img: g2 },
  { tag: "Pastry", date: "05 · 2026", title: "The Cardamom Bun, Reimagined", img: g3 },
  { tag: "Craft", date: "04 · 2026", title: "Notes on Roasting at Dawn", img: g4 },
];

export function JournalPreview() {
  return (
    <section className="bg-cream py-20 md:py-36">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-6 md:px-12">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.28em] text-terracotta">
                — From the Journal
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-display text-4xl leading-[0.95] text-espresso sm:mt-5 sm:text-5xl md:text-7xl">
                Field Notes & <span className="italic">Stories</span>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link
              href="/journal"
              className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-espresso"
            >
              Read the Journal
              <span className="block h-px w-10 bg-espresso transition-all duration-500 group-hover:w-16" />
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:mt-16 md:grid-cols-3">
          {posts.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease, delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-sm bg-cream-deep">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
              </div>
              <div className="mt-5 flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-espresso/55">
                <span>{p.tag}</span>
                <span>{p.date}</span>
              </div>
              <h3 className="mt-3 font-display text-2xl leading-tight text-espresso transition-colors duration-500 group-hover:text-terracotta">
                {p.title}
              </h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}