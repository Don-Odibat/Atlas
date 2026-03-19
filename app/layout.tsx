import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script"; // Next.js optimized script loader

export const metadata: Metadata = {
  title: "EarthLookup | Intelligence OS",
  description: "The Ultimate Global Encyclopedia and Geopolitical Mainframe.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* 🟢 DON SYSTEMS: GOOGLE ADSENSE VERIFICATION SCRIPT */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5129097020907805"
          crossOrigin="anonymous"
          strategy="afterInteractive" // Loads after the UI so the globe stays fast
        />
      </head>
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}