import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { MenuItem } from "../data/menu";

export interface CartLine {
  key: string;
  id: string;
  name: string;
  image: string;
  unit: number;
  qty: number;
  modifiers: string[];
}

interface CartCtx {
  lines: CartLine[];
  add: (item: MenuItem, modifiers?: { label: string; price: number }[], qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  toast: string | null;
  mode: "pickup" | "delivery";
  setMode: (m: "pickup" | "delivery") => void;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [mode, setMode] = useState<"pickup" | "delivery">("pickup");

  const add: CartCtx["add"] = (item, modifiers = [], qty = 1) => {
    const mods = modifiers.map((m) => m.label);
    const extra = modifiers.reduce((s, m) => s + m.price, 0);
    const key = `${item.id}__${mods.join("|")}`;
    setLines((prev) => {
      const found = prev.find((l) => l.key === key);
      if (found)
        return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l));
      return [
        ...prev,
        {
          key,
          id: item.id,
          name: item.name,
          image: item.image,
          unit: item.price + extra,
          qty,
          modifiers: mods,
        },
      ];
    });
    setToast(`${item.name} added to your order`);
    window.setTimeout(() => setToast(null), 2600);
  };

  const setQty = (key: string, qty: number) =>
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, qty } : l))
    );

  const remove = (key: string) =>
    setLines((prev) => prev.filter((l) => l.key !== key));

  const value = useMemo<CartCtx>(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + l.qty * l.unit, 0);
    return {
      lines,
      add,
      setQty,
      remove,
      clear: () => setLines([]),
      count,
      subtotal,
      toast,
      mode,
      setMode,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines, toast, mode]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
