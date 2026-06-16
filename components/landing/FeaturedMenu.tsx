"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { menuItems, formatUSD } from "@/lib/menu-data";
import { Reveal } from "./Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

export function FeaturedMenu() {
  const featured = [
    menuItems.find((i) => i.id === "caramel-cloud-latte")!,
    menuItems.find((i) => i.id === "avocado-poached-egg")!,
    menuItems.find((i) => i.id === "almond-croissant")!,
  ];

  return (
    <section className="bg-cream py-20 md:py-36">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-6 md:px-12">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <span className="text-[10px] uppercase tracking-[0.28em] text-terracotta sm:text-xs">
                — Featured Today
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-display text-4xl leading-[0.95] text-espresso sm:mt-5 sm:text-5xl md:text-7xl">
                A Taste of <span className="italic">Today</span>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link
              href="/menu"
              className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-espresso"
            >
              View Full Menu
              <span className="block h-px w-10 bg-espresso transition-all duration-500 group-hover:w-16" />
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:mt-16 md:grid-cols-3">
          {featured.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease, delay: i * 0.1 }}
              className="group flex flex-col"
            >
              <div className="aspect-[5/6] overflow-hidden rounded-sm bg-cream-deep">
                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
              </div>
              <div className="mt-6 flex items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl text-espresso">{item.name}</h3>
                <span className="font-display text-xl text-terracotta">{formatUSD(item.price)}</span>
              </div>
              <p className="mt-2 text-sm text-espresso/65">{item.desc}</p>
              <span className="mt-3 text-[10px] uppercase tracking-[0.28em] text-espresso/50">
                — {item.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}