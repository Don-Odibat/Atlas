import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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
  },
  verification: {
    google: "YznLD54o7VrTHE9GNtpVAjlPMPEsU3VIFzRfIZeGjDQ",
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
      <body className={`${inter.className} bg-black`}>
        {children}

        {/* 🟢 GOOGLE ANALYTICS SURVEILLANCE BEACON */}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-S9JQ20EPS1" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-S9JQ20EPS1', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </body>
    </html>
  );
}