"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { motion } from "motion/react";
import { ArrowRight, Lock } from "lucide-react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { PageHero } from "@/components/landing/PageHero";
import { useCart } from "@/lib/cart-context";
import { findItem, formatUSD } from "@/lib/menu-data";

const DELIVERY_FEE = 4.5;
const TAX_RATE = 0.0875;
const PICKUP_SLOTS = [
  "Today · 10:30 AM",
  "Today · 11:00 AM",
  "Today · 11:30 AM",
  "Today · 12:00 PM",
  "Today · 12:30 PM",
  "Today · 1:00 PM",
];

const baseSchema = z.object({
  fullName: z.string().trim().min(2, "Name is required").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(30),
  notes: z.string().trim().max(280).optional().or(z.literal("")),
  cardName: z.string().trim().min(2, "Name on card is required").max(80),
  cardNumber: z.string().trim().regex(/^[\d\s]{12,23}$/, "Enter a valid card number"),
  cardExpiry: z.string().trim().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY"),
  cardCvc: z.string().trim().regex(/^\d{3,4}$/, "3 or 4 digits"),
});

const pickupSchema = baseSchema.extend({
  fulfillment: z.literal("pickup"),
  pickupSlot: z.string().min(1, "Choose a pickup time"),
});

const deliverySchema = baseSchema.extend({
  fulfillment: z.literal("delivery"),
  address1: z.string().trim().min(3, "Street address is required").max(120),
  address2: z.string().trim().max(80).optional().or(z.literal("")),
  city: z.string().trim().min(2, "City is required").max(60),
  zip: z.string().trim().regex(/^\d{5}(-\d{4})?$/, "Enter a valid ZIP"),
});

const schema = z.discriminatedUnion("fulfillment", [pickupSchema, deliverySchema]);
type FormErrors = Partial<Record<string, string>>;

export default function CheckoutPage() {
  const { lines, clear } = useCart();
  const router = useRouter();
  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">("pickup");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const detailed = useMemo(
    () =>
      lines
        .map((l) => ({ line: l, item: findItem(l.id) }))
        .filter((x): x is { line: typeof x.line; item: NonNullable<typeof x.item> } => Boolean(x.item)),
    [lines],
  );

  const subtotal = detailed.reduce((s, { line, item }) => s + line.qty * item.price, 0);
  const deliveryFee = fulfillment === "delivery" ? DELIVERY_FEE : 0;
  const tax = +(subtotal * TAX_RATE).toFixed(2);
  const total = +(subtotal + deliveryFee + tax).toFixed(2);

  useEffect(() => {
    if (detailed.length === 0 && !submitting) {
      router.push("/cart");
    }
  }, [detailed.length, submitting, router]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const raw = Object.fromEntries(formData.entries()) as Record<string, string>;
    const payload = { ...raw, fulfillment };
    const result = schema.safeParse(payload);

    if (!result.success) {
      const nextErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      const firstField = result.error.issues[0]?.path[0];
      if (typeof firstField === "string") {
        document.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus();
      }
      return;
    }
    setErrors({});
    setSubmitting(true);
    const orderNumber = `CF-${Math.floor(100000 + Math.random() * 900000)}`;
    setTimeout(() => {
      clear();
      router.push(
        `/order-confirmed?n=${encodeURIComponent(orderNumber)}&f=${encodeURIComponent(fulfillment)}&t=${encodeURIComponent(total.toFixed(2))}&name=${encodeURIComponent(result.data.fullName.split(" ")[0])}`
      );
    }, 700);
  }

  return (
    <main className="bg-background text-foreground">
      <Nav />
      <PageHero
        eyebrow="Checkout"
        title="One Last"
        italicWord="Detail"
        subtitle="Tell us how to find you, and we'll have it ready. All fields are kept private."
      />

      <section className="bg-background pb-20 md:pb-36">
        <div className="mx-auto max-w-[1480px] px-5 sm:px-6 md:px-12">
          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12" noValidate>
            <div className="space-y-12 md:col-span-8">
              <FormSection title="Fulfillment" step="01">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {(["pickup", "delivery"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setFulfillment(m)}
                      className={`rounded-sm border px-4 py-4 text-left transition-colors duration-500 sm:px-5 sm:py-5 ${
                        fulfillment === m
                          ? "border-espresso bg-espresso text-cream"
                          : "border-espresso/20 text-espresso hover:border-espresso/60"
                      }`}
                    >
                      <div className="font-display text-xl capitalize">{m}</div>
                      <div className={`mt-1 text-xs uppercase tracking-[0.22em] ${fulfillment === m ? "text-cream/70" : "text-espresso/60"}`}>
                        {m === "pickup" ? "Free · ready in 15 min" : "Brooklyn · $4.50"}
                      </div>
                    </button>
                  ))}
                </div>

                {fulfillment === "pickup" ? (
                  <Field label="Pickup time" error={errors.pickupSlot}>
                    <select
                      name="pickupSlot"
                      defaultValue=""
                      className="w-full appearance-none border-b border-espresso/30 bg-transparent py-3 text-sm text-espresso focus:border-espresso focus:outline-none"
                    >
                      <option value="" disabled>Choose a time…</option>
                      {PICKUP_SLOTS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                ) : (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Field label="Street address" error={errors.address1} className="md:col-span-2">
                      <Input name="address1" placeholder="28 Linden Lane" autoComplete="address-line1" />
                    </Field>
                    <Field label="Apt / suite (optional)" error={errors.address2} className="md:col-span-2">
                      <Input name="address2" placeholder="Apt 4B" autoComplete="address-line2" />
                    </Field>
                    <Field label="City" error={errors.city}>
                      <Input name="city" placeholder="Brooklyn" autoComplete="address-level2" />
                    </Field>
                    <Field label="ZIP" error={errors.zip}>
                      <Input name="zip" placeholder="11217" autoComplete="postal-code" inputMode="numeric" />
                    </Field>
                  </div>
                )}
              </FormSection>

              <FormSection title="Contact" step="02">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Field label="Full name" error={errors.fullName}>
                    <Input name="fullName" placeholder="Jane Doe" autoComplete="name" />
                  </Field>
                  <Field label="Phone" error={errors.phone}>
                    <Input name="phone" placeholder="(718) 555 0142" autoComplete="tel" inputMode="tel" />
                  </Field>
                  <Field label="Email" error={errors.email} className="md:col-span-2">
                    <Input name="email" placeholder="jane@email.com" autoComplete="email" type="email" />
                  </Field>
                  <Field label="Order notes (optional)" error={errors.notes} className="md:col-span-2">
                    <textarea
                      name="notes"
                      rows={3}
                      maxLength={280}
                      placeholder="Allergies, preferences, gate code…"
                      className="w-full resize-none border-b border-espresso/30 bg-transparent py-3 text-sm text-espresso placeholder:text-espresso/40 focus:border-espresso focus:outline-none"
                    />
                  </Field>
                </div>
              </FormSection>

              <FormSection title="Payment" step="03">
                <div className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-espresso/60">
                  <Lock className="h-3 w-3" strokeWidth={1.5} /> Demo · No real charge will be made
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
                  <Field label="Name on card" error={errors.cardName} className="md:col-span-6">
                    <Input name="cardName" placeholder="Jane Doe" autoComplete="cc-name" />
                  </Field>
                  <Field label="Card number" error={errors.cardNumber} className="md:col-span-6">
                    <Input name="cardNumber" placeholder="4242 4242 4242 4242" autoComplete="cc-number" inputMode="numeric" />
                  </Field>
                  <Field label="Expiry" error={errors.cardExpiry} className="md:col-span-3">
                    <Input name="cardExpiry" placeholder="MM/YY" autoComplete="cc-exp" />
                  </Field>
                  <Field label="CVC" error={errors.cardCvc} className="md:col-span-3">
                    <Input name="cardCvc" placeholder="123" autoComplete="cc-csc" inputMode="numeric" />
                  </Field>
                </div>
              </FormSection>
            </div>

            <aside className="md:col-span-4">
              <div className="rounded-sm bg-cream p-6 sm:p-8 md:sticky md:top-32">
                <h3 className="font-display text-2xl text-espresso sm:text-3xl">Order Summary</h3>
                <ul className="mt-8 space-y-4">
                  {detailed.map(({ line, item }) => (
                    <li key={item.id} className="flex items-start justify-between gap-4 text-sm">
                      <div>
                        <div className="font-display text-base text-espresso">{item.name}</div>
                        <div className="text-xs uppercase tracking-[0.18em] text-espresso/55">× {line.qty}</div>
                      </div>
                      <div className="font-display text-base text-espresso">{formatUSD(item.price * line.qty)}</div>
                    </li>
                  ))}
                </ul>
                <dl className="mt-8 space-y-3 border-t border-espresso/10 pt-6 text-sm text-espresso/80">
                  <Row label="Subtotal" value={formatUSD(subtotal)} />
                  <Row label={fulfillment === "delivery" ? "Delivery" : "Pickup"} value={fulfillment === "delivery" ? formatUSD(DELIVERY_FEE) : "Free"} />
                  <Row label="Tax" value={formatUSD(tax)} />
                </dl>
                <div className="mt-6 flex items-baseline justify-between border-t border-espresso/10 pt-6">
                  <span className="text-xs uppercase tracking-[0.22em] text-espresso/60">Total</span>
                  <span className="font-display text-3xl text-espresso">{formatUSD(total)}</span>
                </div>
                <motion.button
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  type="submit"
                  disabled={submitting}
                  className="group mt-8 flex w-full items-center justify-between rounded-full bg-espresso px-6 py-4 text-sm uppercase tracking-[0.22em] text-cream transition-colors hover:bg-terracotta disabled:opacity-60"
                >
                  {submitting ? "Placing order…" : "Place Order"}
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
                </motion.button>
                <p className="mt-4 text-xs text-espresso/50">
                  By placing this order you agree to Caffia's terms.{" "}
                  <Link href="/cart" className="underline hover:text-terracotta">Back to cart</Link>
                </p>
              </div>
            </aside>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function FormSection({ title, step, children }: { title: string; step: string; children: React.ReactNode }) {
  return (
    <section>
      <header className="mb-8 flex items-baseline gap-4 border-b border-espresso/10 pb-4">
        <span className="text-xs uppercase tracking-[0.28em] text-terracotta">{step}</span>
        <h2 className="font-display text-3xl text-espresso md:text-4xl">{title}</h2>
      </header>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function Field({ label, error, className = "", children }: { label: string; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-espresso/60">{label}</span>
      {children}
      {error && <span className="mt-2 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full border-b border-espresso/30 bg-transparent py-3 text-sm text-espresso placeholder:text-espresso/40 focus:border-espresso focus:outline-none"
    />
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
