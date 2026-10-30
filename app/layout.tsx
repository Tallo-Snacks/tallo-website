import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Mono, Fraunces } from "next/font/google";

import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-display",
  display: "swap",
});
const body = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://tallo-site.vercel.app"),
  title: "Tallo | Sweet potato chips cooked in beef tallow",
  description:
    "Organic sweet potatoes, grass-fed beef tallow, and sea salt. Three ingredients, kettle cooked, no seed oils.",
  icons: { icon: "/assets/brand/favicon.svg" },
  openGraph: {
    title: "Tallo | Sweet potato chips cooked in beef tallow",
    description: "Three ingredients. Not one more.",
    images: ["/assets/img/og.jpg"],
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/assets/img/og.jpg"] },
};

export const viewport: Viewport = { themeColor: "#0F1F17" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
