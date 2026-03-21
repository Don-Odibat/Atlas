import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EarthLookup | Global Intelligence Terminal",
  description: "A centralized geographic, demographic, and macroeconomic intelligence terminal. Access live fiat/crypto rates, population pulses, and declassified historical archives for all 195 sovereign states.",
  keywords: "geography, global data, population tracker, live exchange rates, fiat, crypto, demographics, EarthLookup",
  authors: [{ name: "Don Systems Holding" }],
  openGraph: {
    title: "EarthLookup | Global Intelligence Terminal",
    description: "Access live global demographics, macroeconomic ledgers, and geographic intelligence in a single high-density dashboard.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* GOOGLE ADSENSE UPLINK (Uncomment and add your Client ID when approved) */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous"></script> */}
      </head>
      <body className={`${inter.className} bg-black`}>{children}</body>
    </html>
  );
}