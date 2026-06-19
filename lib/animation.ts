export const fadeUp = {
  initial: { y: 24 },
  whileInView: { y: 0 },
  viewport: { once: true, amount: 0.12, margin: "0px 0px -80px 0px" },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;
