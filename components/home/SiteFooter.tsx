import Image from "next/image";
import { footerLinks } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#e7dccd] bg-[#FAF6EF] px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <Image
            src="/msworx-logo.png"
            alt="MSWorx Learning"
            width={150}
            height={150}
            className="h-12 w-auto"
          />
          <p className="mt-3 max-w-md text-sm leading-6 text-[#4f5f5c]">
            Equip. Empower. Lead.
          </p>
          <p className="mt-2 text-sm text-[#4f5f5c]">hello@msworx.co</p>
        </div>
        <div className="grid gap-3 text-sm font-semibold text-[#4f5f5c] sm:grid-cols-2">
          {footerLinks.map(([label, href]) => (
            <a key={label} href={href} className="transition hover:text-[#116466]">
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
