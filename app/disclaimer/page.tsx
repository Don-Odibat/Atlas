// @ts-nocheck
"use client";

import React from "react";
import Link from "next/link";
import TrustFooter from "../../components/TrustFooter";

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-blue-500/30">
      
      <nav className="w-full border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50 px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-black tracking-tighter hover:text-blue-400 transition-colors">
          EARTH<span className="text-blue-500">LOOKUP</span>
        </Link>
        <div className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">
          Intelligence Core / Legal Disclaimer
        </div>
      </nav>

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-20 flex flex-col gap-10">
        
        <header className="border-b border-white/10 pb-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4 text-red-500">Legal Disclaimer</h1>
          <div className="flex flex-col md:flex-row gap-4 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <span>Last Updated: March 19, 2026</span>
            <span className="hidden md:inline">•</span>
            <span>Don Systems Holding</span>
          </div>
        </header>

        <article className="prose prose-invert prose-red max-w-none text-gray-300 leading-relaxed space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-red-500 pl-4">Data Accuracy & Sources</h2>
            <p>
              The information provided by EarthLookup.com (a subsidiary of Don Systems Holding) is for general informational and educational purposes only. While we strive to bring massive info into one place, the geographic boundaries, national statistics, and demographic data are rendered dynamically via third-party open-source APIs (such as RestCountries and GeoBoundaries).
            </p>
            <p className="mt-4">
              <strong>Don Odibat and Don Systems Holding make no representation or warranty of any kind</strong>, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-red-500 pl-4">Geopolitical Borders</h2>
            <p>
              The rendering of 3D borders and national territories does not imply the expression of any opinion whatsoever on the part of Don Systems Holding concerning the legal status of any country, territory, city, or area, or of its authorities, or concerning the delimitation of its frontiers or boundaries. We render standard 110m geo-JSON datasets strictly for educational visual representation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-red-500 pl-4">External Links</h2>
            <p>
              Our platform may contain links to our partner sites (TellMyLocation.com, WaterInMySpeaker.com, CheckThisPhone.com) or external affiliates. We are not responsible for the content or privacy practices of external web properties outside of the Don Systems Network.
            </p>
          </section>
        </article>

      </main>

      <TrustFooter />
    </div>
  );
}