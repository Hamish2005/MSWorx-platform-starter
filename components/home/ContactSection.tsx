"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animation";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("pending");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });

      if (!response.ok) {
        throw new Error("Newsletter signup failed.");
      }

      event.currentTarget.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="px-5 py-20 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 rounded border border-[#e7dccd] bg-white p-6 shadow-[0_12px_30px_rgba(36,48,47,0.06)] sm:p-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <motion.div {...fadeUp}>
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#116466]">
            Stay connected
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[#24302f] sm:text-4xl">
            Get catalog updates and launch notes.
          </h2>
          <p className="mt-4 text-base leading-7 text-[#4f5f5c]">
            Join the MSWorx Learning list for course updates, instructor news,
            and launch communications.
          </p>
        </motion.div>
        <motion.form
          name="newsletter-signup"
          className="grid gap-3"
          method="post"
          onSubmit={handleSubmit}
          {...fadeUp}
        >
          <input type="hidden" name="form-name" value="newsletter-signup" />
          <p className="hidden">
            <label>
              Do not fill this out if you are human: <input name="bot-field" />
            </label>
          </p>
          <label className="sr-only" htmlFor="newsletter-name">
            Name
          </label>
          <input
            id="newsletter-name"
            name="name"
            type="text"
            required
            suppressHydrationWarning
            placeholder="Name"
            className="min-h-12 rounded border border-[#d8cbb9] bg-[#FAF6EF] px-4 text-sm text-[#24302f] outline-none transition placeholder:text-[#7c8884] focus:border-[#116466] focus:ring-2 focus:ring-[#116466]/20"
          />
          <label className="sr-only" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            suppressHydrationWarning
            placeholder="Email address"
            className="min-h-12 rounded border border-[#d8cbb9] bg-[#FAF6EF] px-4 text-sm text-[#24302f] outline-none transition placeholder:text-[#7c8884] focus:border-[#116466] focus:ring-2 focus:ring-[#116466]/20"
          />
          <button
            type="submit"
            disabled={status === "pending"}
            className="min-h-12 rounded bg-[#116466] px-5 text-sm font-bold text-white transition hover:bg-[#0d4f50] focus:outline-none focus:ring-2 focus:ring-[#116466]/25"
            suppressHydrationWarning
          >
            {status === "pending" ? "Signing up..." : "Sign up for updates"}
          </button>
          {status === "success" ? (
            <p className="text-sm font-semibold text-[#116466]">
              Thanks. You&apos;re on the MSWorx Learning update list.
            </p>
          ) : null}
          {status === "error" ? (
            <p className="text-sm font-semibold text-[#9f2d20]">
              Something went wrong. Please try again.
            </p>
          ) : null}
        </motion.form>
      </div>
    </section>
  );
}
