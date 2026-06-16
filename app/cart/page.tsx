"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus, X, ArrowRight, ShoppingBag } from "lucide-react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { PageHero } from "@/components/landing/PageHero";
import { useCart } from "@/lib/cart-context";
import { findItem, formatUSD } from "@/lib/menu-data";
import { MagneticButton } from "@/components/landing/MagneticButton";

export default function CartPage() {
  const { lines, setQty, remove } = useCart();

  const detailed = lines
    .map((l) => ({ line: l, item: findItem(l.id) }))
    .filter((x): x is { line: typeof x.line; item: NonNullable<typeof x.item> } => Boolean(x.item));

  const subtotal = detailed.reduce((s, { line, item }) => s + line.qty * item.price, 0);

  return (
    <main className="bg-background text-foreground">
      <Nav />
      <PageHero
        eyebrow="Your Cart"
        title="A Quiet"
        italicWord="Selection"
        subtitle="Take a moment to review. Adjust quantities, remove anything, then proceed when you're ready."
      />

      <section className="bg-background pb-20 md:pb-36">
        <div className="mx-auto max-w-[1480px] px-5 sm:px-6 md:px-12">
          {detailed.length === 0 ? (
            <div className="flex flex-col items-center gap-6 rounded-sm border border-espresso/10 bg-cream px-6 py-16 text-center sm:py-24">
              <ShoppingBag className="h-10 w-10 text-espresso/40" strokeWidth={1.2} />
              <h2 className="font-display text-3xl text-espresso sm:text-4xl">Your cart is empty.</h2>
              <p className="max-w-sm text-sm text-espresso/65">
                Browse today's menu and add something warm — we'll have it ready.
              </p>
              <div className="mt-2">
                <MagneticButton href="/menu">Explore Menu</MagneticButton>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
              <div className="md:col-span-8">
                <div className="divide-y divide-espresso/10 border-y border-espresso/10">
                  <AnimatePresence initial={false}>
                    {detailed.map(({ line, item }) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="grid grid-cols-[88px_minmax(0,1fr)] items-start gap-4 py-6 sm:gap-6 sm:py-8 md:grid-cols-12 md:items-center"
                      >
                        <div className="md:col-span-2">
                           <div className="aspect-square overflow-hidden rounded-sm bg-cream">
                            <img
                              src={typeof item.img === "string" ? item.img : (item.img as any).src}
                              alt={item.name}
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="min-w-0 md:col-span-5">
                          <h3 className="font-display text-xl text-espresso sm:text-2xl">{item.name}</h3>
                          <p className="mt-1 text-xs leading-relaxed text-espresso/65 sm:text-sm">{item.desc}</p>
                          <span className="mt-2 inline-block text-[10px] uppercase tracking-[0.22em] text-espresso/50 sm:text-xs">
                            {item.category}
                          </span>
                        </div>
                        <div className="col-span-2 md:col-span-3">
                          <div className="inline-flex items-center rounded-full border border-espresso/20">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() => setQty(item.id, line.qty - 1)}
                              className="flex h-10 w-10 items-center justify-center text-espresso transition-colors hover:text-terracotta"
                            >
                              <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                            </button>
                            <span className="min-w-8 text-center font-display text-lg text-espresso">{line.qty}</span>
                            <button
                              aria-label="Increase quantity"
                              onClick={() => setQty(item.id, line.qty + 1)}
                              className="flex h-10 w-10 items-center justify-center text-espresso transition-colors hover:text-terracotta"
                            >
                              <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                            </button>
                          </div>
                        </div>
                        <div className="col-span-2 flex items-center justify-between gap-4 md:col-span-2 md:justify-end">
                          <span className="font-display text-xl text-espresso">{formatUSD(item.price * line.qty)}</span>
                          <button
                            aria-label={`Remove ${item.name}`}
                            onClick={() => remove(item.id)}
                            className="text-espresso/40 transition-colors hover:text-terracotta"
                          >
                            <X className="h-4 w-4" strokeWidth={1.5} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <div className="mt-8">
                  <Link href="/menu" className="text-xs uppercase tracking-[0.22em] text-espresso/70 transition-colors hover:text-terracotta">
                    ← Continue browsing
                  </Link>
                </div>
              </div>

              <aside className="md:col-span-4">
                <div className="rounded-sm bg-cream p-6 sm:p-8 md:sticky md:top-32">
                  <h3 className="font-display text-2xl text-espresso sm:text-3xl">Order Summary</h3>
                  <dl className="mt-8 space-y-4 text-sm text-espresso/80">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd className="font-display text-base">{formatUSD(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between text-espresso/60">
                      <dt>Taxes & fees</dt>
                      <dd>Calculated at checkout</dd>
                    </div>
                  </dl>
                  <div className="mt-8 border-t border-espresso/10 pt-6">
                    <Link
                      href="/checkout"
                      className="group flex w-full items-center justify-between rounded-full bg-espresso px-6 py-4 text-sm uppercase tracking-[0.22em] text-cream transition-colors hover:bg-terracotta"
                    >
                      Proceed to Checkout
                      <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
                    </Link>
                  </div>
                  <p className="mt-6 text-xs text-espresso/50">
                    Pickup is free. Local delivery is a flat $4.50 within Brooklyn.
                  </p>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
