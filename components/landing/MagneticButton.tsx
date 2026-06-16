"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  href?: string;
  to?: string;
};

export function MagneticButton({ children, variant = "primary", className, href, to }: Props) {
  const base =
    "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-sm uppercase tracking-[0.18em] transition-colors duration-500";
  const styles =
    variant === "primary"
      ? "bg-espresso text-cream hover:bg-terracotta"
      : "border border-espresso/30 text-espresso hover:border-espresso";
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 block h-4 w-4 overflow-hidden">
        <span className="absolute inset-0 flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-4">
          <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.5} />
        </span>
        <span className="absolute inset-0 flex translate-y-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
          <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.5} />
        </span>
      </span>
    </>
  );
  const className2 = cn(base, styles, className);
  const targetHref = to || href || "#";

  return (
    <motion.span
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="inline-block"
    >
      <Link href={targetHref} className={className2}>
        {inner}
      </Link>
    </motion.span>
  );
}