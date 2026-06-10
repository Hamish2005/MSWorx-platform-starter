"use client";

import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { learningUrl, navItems } from "@/lib/site-content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e7dccd] bg-[#FAF6EF]/95 shadow-[0_8px_24px_rgba(36,48,47,0.06)] backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center" aria-label="MSWorx Learning home">
          <Image
            src="/msworx-logo.png"
            alt="MSWorx Learning"
            width={168}
            height={168}
            className="h-14 w-auto"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-sm font-semibold text-[#4f5f5c] transition hover:text-[#116466]"
            >
              {label}
            </a>
          ))}
        </nav>
        <ButtonLink href={learningUrl}>Learning Login</ButtonLink>
      </div>
    </header>
  );
}
