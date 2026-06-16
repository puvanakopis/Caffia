"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ShoppingBag, Menu as MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";

const links = [
  { label: "Menu", href: "/menu" },
  { label: "Atelier", href: "/atelier" },
  { label: "Journal", href: "/journal" },
  { label: "Visit", href: "/visit" },
];

export function Nav() {
  const pathname = usePathname();
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled || open
          ? "bg-white/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1480px] items-center justify-between px-6 py-6 md:px-12">
        <Link href="/" className="font-display text-2xl tracking-tight text-espresso">
          Caffia<span className="text-terracotta">.</span>
        </Link>
        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`group relative text-xs uppercase tracking-[0.22em] transition-colors duration-300 ${
                  isActive ? "text-espresso" : "text-espresso/80 hover:text-espresso"
                }`}
              >
                {l.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-terracotta transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full ${isActive ? "w-full" : "w-0"}`} />
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            aria-label="View cart"
            className="group relative flex items-center gap-2 rounded-full border border-espresso/15 px-3 py-2 text-xs uppercase tracking-[0.18em] text-espresso transition-colors hover:border-espresso/40 md:px-4"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1.5 text-[10px] text-cream">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-espresso/15 text-espresso transition-colors hover:border-espresso/40 md:hidden"
          >
            {open ? <X className="h-4 w-4" strokeWidth={1.5} /> : <MenuIcon className="h-4 w-4" strokeWidth={1.5} />}
          </button>
        </div>
      </div>
    </motion.header>
    {open && (
      <div className="fixed inset-0 top-[72px] z-40 bg-cream/95 backdrop-blur-md md:hidden">
        <nav className="flex flex-col items-start gap-6 px-8 py-10">
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`font-display text-4xl ${isActive ? "text-terracotta" : "text-espresso"}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    )}
    </>
  );
}