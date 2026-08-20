import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SITE, wa } from "../data/content";
import { useCart } from "../store/cart";

const primary = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/journal", label: "Journal" },
];

const mobileLinks = [
  ...primary,
  { to: "/events", label: "Events" },
  { to: "/order", label: "Order Online" },
  { to: "/reservations", label: "Reservations" },
  { to: "/location", label: "Location" },
  { to: "/contact", label: "Contact" },
];

function Announcement() {
  const text = "Luna Café · Now serving our summer menu · Reserve your table";
  return (
    <div className="relative overflow-hidden border-b border-espresso/15 bg-espresso text-cream">
      <div className="flex w-max animate-[marquee_38s_linear_infinite] py-2.5">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="eyebrow px-8 text-cream/85">
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        <Announcement />
        <div
          className={`transition-all duration-700 ${
            scrolled
              ? "border-b border-espresso/10 bg-cream/92 backdrop-blur-md"
              : "border-b border-transparent bg-cream/0"
          }`}
        >
          <nav
            className="shell flex items-center justify-between py-4"
            aria-label="Primary"
          >
            <Link
              to="/"
              className="font-display text-2xl tracking-tight text-espresso md:text-[1.7rem]"
            >
              LUNA<span className="text-olive"> CAFÉ</span>
            </Link>

            <ul className="hidden items-center gap-9 lg:flex">
              {primary.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    className={({ isActive }) =>
                      `eyebrow link-underline pb-1 transition-colors ${
                        isActive ? "text-espresso" : "text-taupe hover:text-espresso"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <Link
                to="/cart"
                className="hidden items-center gap-1.5 eyebrow text-taupe transition-colors hover:text-espresso md:inline-flex"
                aria-label={`Cart, ${count} items`}
              >
                Cart
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-espresso px-1 text-[10px] text-cream">
                  {count}
                </span>
              </Link>
              <Link
                to="/reservations"
                className="hidden rounded-full border border-espresso bg-espresso px-6 py-3 eyebrow text-cream transition-colors duration-500 hover:bg-olive hover:border-olive md:inline-flex"
              >
                Reserve a table
              </Link>
              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-espresso/20 lg:hidden"
              >
                <span className="h-px w-4 bg-espresso" />
                <span className="h-px w-4 bg-espresso" />
              </button>
            </div>
          </nav>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] bg-cream"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex h-full flex-col overflow-y-auto">
              <div className="shell flex items-center justify-between py-5">
                <span className="font-display text-2xl">
                  LUNA<span className="text-olive"> CAFÉ</span>
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-11 w-11 place-items-center rounded-full border border-espresso/20 text-lg"
                >
                  ✕
                </button>
              </div>

              <nav className="shell flex-1 pt-4">
                <ul className="divide-y divide-espresso/10 border-y border-espresso/10">
                  {mobileLinks.map((l, i) => (
                    <motion.li
                      key={l.to}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.035, duration: 0.5 }}
                    >
                      <Link
                        to={l.to}
                        className="flex items-baseline justify-between py-4"
                      >
                        <span className="font-display text-3xl">{l.label}</span>
                        <span className="eyebrow text-taupe/60">
                          0{i + 1}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8 space-y-3 pb-10">
                  <Link
                    to="/reservations"
                    className="flex w-full items-center justify-center rounded-full bg-espresso py-4 eyebrow text-cream"
                  >
                    Reserve a table
                  </Link>
                  <a
                    href={wa("Hi Luna! I'd like to ask about a table.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center rounded-full border border-espresso/25 py-4 eyebrow text-espresso"
                  >
                    WhatsApp Luna
                  </a>
                  <p className="pt-4 text-center text-[13px] font-light text-taupe">
                    {SITE.address1}, {SITE.address2}
                    <br />
                    {SITE.phone}
                  </p>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
