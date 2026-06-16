"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { MagneticButton } from "@/components/landing/MagneticButton";

function ConfirmedPageContent() {
  const searchParams = useSearchParams();
  const n = searchParams.get("n");
  const f = searchParams.get("f");
  const t = searchParams.get("t");
  const name = searchParams.get("name");
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <main className="bg-background text-foreground">
      <Nav />
      <section className="bg-cream pt-40 pb-24 md:pt-48 md:pb-36">
        <div className="mx-auto max-w-[900px] px-6 text-center md:px-12">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-terracotta text-cream"
          >
            <Check className="h-9 w-9" strokeWidth={1.5} />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="mt-10 block text-xs uppercase tracking-[0.28em] text-terracotta"
          >
            — Order Received
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.25 }}
            className="mt-6 font-display text-[12vw] leading-[0.92] text-espresso md:text-[7rem]"
          >
            Thank you{name ? <>, <span className="italic text-terracotta">{name}</span></> : null}.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.4 }}
            className="mx-auto mt-8 max-w-md text-base leading-relaxed text-espresso/70"
          >
            {f === "delivery"
              ? "We're packing it now — a courier will be at your door within the hour."
              : "We've started preparing your order. It'll be ready at the counter shortly."}
          </motion.p>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.55 }}
            className="mx-auto mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-espresso/10 pt-10 text-left"
          >
            <div>
              <dt className="text-xs uppercase tracking-[0.22em] text-espresso/55">Order</dt>
              <dd className="mt-2 font-display text-2xl text-espresso">{n ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.22em] text-espresso/55">Method</dt>
              <dd className="mt-2 font-display text-2xl capitalize text-espresso">{f ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.22em] text-espresso/55">Total</dt>
              <dd className="mt-2 font-display text-2xl text-espresso">{t ? `$${t}` : "—"}</dd>
            </div>
          </motion.dl>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.7 }}
            className="mt-14 flex flex-wrap justify-center gap-4"
          >
            <MagneticButton href="/menu">Order Again</MagneticButton>
            <MagneticButton href="/" variant="ghost">Back Home</MagneticButton>
          </motion.div>

          <p className="mt-12 text-xs uppercase tracking-[0.22em] text-espresso/50">
            A receipt has been sent to your email · <Link href="/visit" className="hover:text-terracotta">Find the atelier →</Link>
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default function OrderConfirmedPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-background text-espresso font-display text-2xl">Loading...</div>}>
      <ConfirmedPageContent />
    </Suspense>
  );
}
