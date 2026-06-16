import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartLine = { id: string; qty: number };

type CartContextValue = {
  lines: CartLine[];
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "caffia.cart.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setLines(parsed.filter((l) => l && typeof l.id === "string"));
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const add = (id: string, qty = 1) =>
      setLines((prev) => {
        const existing = prev.find((l) => l.id === id);
        if (existing) {
          return prev.map((l) => (l.id === id ? { ...l, qty: Math.min(99, l.qty + qty) } : l));
        }
        return [...prev, { id, qty: Math.max(1, qty) }];
      });
    const remove = (id: string) => setLines((prev) => prev.filter((l) => l.id !== id));
    const setQty = (id: string, qty: number) =>
      setLines((prev) =>
        qty <= 0
          ? prev.filter((l) => l.id !== id)
          : prev.map((l) => (l.id === id ? { ...l, qty: Math.min(99, qty) } : l)),
      );
    const clear = () => setLines([]);
    const count = lines.reduce((sum, l) => sum + l.qty, 0);
    return { lines, add, remove, setQty, clear, count };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}