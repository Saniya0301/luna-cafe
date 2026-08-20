import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";
import { useEffect } from "react";

/* ---------------- Motion ---------------- */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "li";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

/* ---------------- Typography ---------------- */

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`eyebrow inline-flex items-center gap-3 text-olive ${className}`}>
      <span className="h-px w-6 bg-olive/50" aria-hidden="true" />
      {children}
    </span>
  );
}

export function Display({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  return (
    <Tag className={`font-display text-espresso ${className}`}>{children}</Tag>
  );
}

/* ---------------- Buttons ---------------- */

const base =
  "group inline-flex items-center justify-center gap-2.5 eyebrow px-7 py-4 rounded-full transition-all duration-500 min-h-[52px] text-center";

const variants = {
  primary:
    "bg-espresso text-cream hover:bg-olive border border-espresso hover:border-olive",
  outline:
    "border border-espresso/25 text-espresso hover:border-espresso hover:bg-espresso hover:text-cream",
  light:
    "border border-cream/40 text-cream hover:bg-cream hover:text-espresso backdrop-blur-sm",
  solidLight: "bg-cream text-espresso hover:bg-beige border border-cream",
};

type BtnProps = {
  to?: string;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  arrow?: boolean;
};

export function Button({
  to,
  href,
  onClick,
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled,
  arrow = false,
}: BtnProps) {
  const cls = `${base} ${variants[variant]} ${disabled ? "opacity-40 pointer-events-none" : ""} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && (
        <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">
          →
        </span>
      )}
    </>
  );
  if (to)
    return (
      <Link to={to} onClick={onClick} className={cls}>
        {inner}
      </Link>
    );
  if (href)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  );
}

export function TextLink({
  to,
  href,
  children,
  className = "",
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
}) {
  const cls = `group inline-flex items-center gap-2 eyebrow text-espresso ${className}`;
  const inner = (
    <>
      <span className="link-underline pb-0.5">{children}</span>
      <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">
        →
      </span>
    </>
  );
  if (href)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  return (
    <Link to={to ?? "#"} className={cls}>
      {inner}
    </Link>
  );
}

/* ---------------- Form fields ---------------- */

const fieldCls =
  "w-full bg-transparent border-b border-espresso/20 py-3 text-espresso placeholder:text-taupe/60 font-light focus:border-olive focus:outline-none transition-colors text-[15px]";

export function Field({
  label,
  id,
  ...props
}: { label: string; id: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow block text-taupe mb-2">
        {label}
      </label>
      <input id={id} className={fieldCls} {...props} />
    </div>
  );
}

export function TextArea({
  label,
  id,
  ...props
}: { label: string; id: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow block text-taupe mb-2">
        {label}
      </label>
      <textarea id={id} rows={4} className={`${fieldCls} resize-none`} {...props} />
    </div>
  );
}

export function Select({
  label,
  id,
  options,
  ...props
}: { label: string; id: string; options: string[] } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow block text-taupe mb-2">
        {label}
      </label>
      <select id={id} className={`${fieldCls} cursor-pointer`} {...props}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ---------------- Chip / pill selector ---------------- */

export function Chip({
  active,
  children,
  onClick,
  className = "",
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`eyebrow whitespace-nowrap rounded-full border px-5 py-3 transition-all duration-400 ${
        active
          ? "border-espresso bg-espresso text-cream"
          : "border-espresso/20 text-taupe hover:border-espresso/60 hover:text-espresso"
      } ${className}`}
    >
      {children}
    </button>
  );
}

/* ---------------- Page scaffolding ---------------- */

export function useTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) {
      let m = document.querySelector('meta[name="description"]');
      if (!m) {
        m = document.createElement("meta");
        m.setAttribute("name", "description");
        document.head.appendChild(m);
      }
      m.setAttribute("content", description);
    }
  }, [title, description]);
}

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  alt,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  image: string;
  alt: string;
}) {
  return (
    <header className="relative border-b hairline">
      <div className="shell grid gap-10 pt-36 pb-16 md:grid-cols-12 md:pt-44 md:pb-20">
        <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-center">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-6 text-[13vw] leading-[0.95] sm:text-6xl md:text-[4.2rem] lg:text-[5rem]">
              {title}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-md text-[15px] leading-relaxed text-taupe">
              {intro}
            </p>
          </Reveal>
        </div>
        <div className="md:col-span-6 lg:col-span-7">
          <Reveal delay={0.12}>
            <div className="overflow-hidden">
              <motion.img
                src={image}
                alt={alt}
                loading="eager"
                className="h-[48vh] w-full object-cover md:h-[60vh]"
                initial={{ scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </header>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow className={align === "center" ? "justify-center" : ""}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <h2 className="font-display mt-5 text-4xl leading-[1.05] sm:text-5xl md:text-[3.4rem]">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.12}>
          <p className="mt-5 text-[15px] leading-relaxed text-taupe">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

export const rupee = (n: number) => `₹${n.toLocaleString("en-IN")}`;
