"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { menuItems, formatUSD } from "@/lib/menu-data";
import { useCart } from "@/lib/cart-context";

const tabs = ["All", "Drinks", "Meals", "Pastry"] as const;
type Tab = (typeof tabs)[number];

export function Menu() {
  const { add } = useCart();
  const [active, setActive] = useState<Tab>("All");
  const filtered = active === "All" ? menuItems : menuItems.filter((i) => i.category === active);

  return (
    <section id="menu" className="bg-cream py-20 md:py-36">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-6 md:px-12">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.28em] text-terracotta sm:text-xs">— Today's Menu</span>
            <h2 className="mt-4 font-display text-4xl leading-[0.95] text-espresso sm:mt-5 sm:text-5xl md:text-7xl">
              Small Plates, <span className="italic">Slow</span> Sips.
            </h2>
          </div>
          <div className="-mx-1 flex w-full flex-nowrap gap-2 overflow-x-auto px-1 pb-2 md:w-auto md:flex-wrap md:overflow-visible md:pb-0">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`relative shrink-0 rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 sm:px-5 sm:py-2.5 sm:text-xs ${
                  active === t
                    ? "border-espresso bg-espresso text-cream"
                    : "border-espresso/20 text-espresso hover:border-espresso/60"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-espresso/10 bg-espresso/10 sm:grid-cols-2 sm:mt-16 md:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 } }}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
                className="group relative flex flex-col bg-cream p-5 transition-colors duration-500 hover:bg-background sm:p-7"
              >
                <div className="aspect-[5/4] overflow-hidden rounded-sm bg-cream-deep">
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  />
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl text-espresso">{item.name}</h3>
                  <span className="font-display text-xl text-terracotta">{formatUSD(item.price)}</span>
                </div>
                <p className="mt-2 text-sm text-espresso/65">{item.desc}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.22em] text-espresso/60">
                    {item.category} · USD
                  </span>
                  <button
                    onClick={() => {
                      add(item.id);
                      toast.success(`${item.name} added to cart`);
                    }}
                    className="group/btn inline-flex items-center gap-2 rounded-full border border-espresso/20 px-4 py-2 text-xs uppercase tracking-[0.22em] text-espresso transition-colors duration-500 hover:border-espresso hover:bg-espresso hover:text-cream"
                  >
                    <Plus className="h-3.5 w-3.5 transition-transform duration-500 group-hover/btn:rotate-90" strokeWidth={1.5} />
                    Add
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}