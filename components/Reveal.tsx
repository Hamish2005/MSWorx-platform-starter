"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Reveal({
  children,
  className,
  x = 0,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  x?: number;
  y?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { x, y }}
      whileInView={{ x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
