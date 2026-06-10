import type { Metadata } from "next";
import { BackNavigationReset } from "@/components/BackNavigationReset";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "./globals.css";

export const metadata: Metadata = {
  title: "MSWorx Learning | Equip. Empower. Lead.",
  description:
    "Professional development and training infrastructure for nonprofit frontline teams, organizations, and instructors.",
  icons: {
    icon: "/msworx-logo.png",
    shortcut: "/msworx-logo.png",
    apple: "/msworx-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        <BackNavigationReset />
        {children}
      </body>
    </html>
  );
}
