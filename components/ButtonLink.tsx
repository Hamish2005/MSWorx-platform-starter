"use client";

import { motion } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "gold" | "light";

const styles: Record<ButtonVariant, string> = {
  primary: "border-[#116466] bg-[#116466] text-white hover:bg-[#0d4f50]",
  secondary:
    "border-[#116466] bg-transparent text-[#116466] hover:bg-[#116466] hover:text-white",
  gold: "border-[#BD9227] bg-[#BD9227] text-[#24302f] hover:bg-[#a67f20]",
  light: "border-white bg-white text-[#116466] hover:bg-[#FAF6EF]",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
}) {
  return (
    <motion.a
      href={href}
      suppressHydrationWarning
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex min-h-11 items-center justify-center rounded border px-5 py-3 text-sm font-semibold transition ${styles[variant]}`}
    >
      {children}
    </motion.a>
  );
}
