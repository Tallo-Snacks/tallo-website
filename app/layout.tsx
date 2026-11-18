import type { Metadata, Viewport } from "next";
import { DM_Mono, Instrument_Sans, Libre_Caslon_Text } from "next/font/google";

import { CartProvider } from "@/components/cart";
import { storeOpen } from "@/lib/stripe";

import "./globals.css";

const display = Libre_Caslon_Text({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-display", display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://tallo-website.vercel.app"),
  title: "Tallo | Sweet potato chips cooked in beef tallow",
  description:
    "Organic sweet potatoes, grass-fed beef tallow, and sea salt. Three ingredients, kettle cooked, no seed oils.",
  icons: { icon: "/assets/brand/favicon.svg", apple: "/assets/brand/apple-touch-icon.png" },
  openGraph: {
    title: "Tallo | Sweet potato chips cooked in beef tallow",
    description: "Three ingredients. Not one more.",
    images: ["/assets/img/og-v2.jpg"],
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/assets/img/og-v2.jpg"] },
};

export const viewport: Viewport = { themeColor: "#3A1214" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <CartProvider storeOpen={storeOpen()}>{children}</CartProvider>
      </body>
    </html>
  );
}
