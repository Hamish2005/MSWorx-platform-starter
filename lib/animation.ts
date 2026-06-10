export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12, margin: "0px 0px -80px 0px" },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;
