// @ts-nocheck
"use client";

import React from "react";
import Link from "next/link";
import TrustFooter from "../../components/TrustFooter";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-blue-500/30">
      
      {/* TOP NAVIGATION */}
      <nav className="w-full border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50 px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-black tracking-tighter hover:text-blue-400 transition-colors">
          EARTH<span className="text-blue-500">LOOKUP</span>
        </Link>
        <div className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">
          Intelligence Core / Terms of Service
        </div>
      </nav>

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-20 flex flex-col gap-10">
        
        <header className="border-b border-white/10 pb-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">Terms of Service</h1>
          <div className="flex flex-col md:flex-row gap-4 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <span>Last Updated: March 19, 2026</span>
            <span className="hidden md:inline">•</span>
            <span>Operated by Don Systems Holding</span>
          </div>
        </header>

        <article className="prose prose-invert prose-blue max-w-none text-gray-300 leading-relaxed space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-blue-500 pl-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using <strong>EarthLookup.com</strong>, a digital asset owned and operated by Don Systems Holding ("Company", "we", "us", or "our"), you accept and agree to be bound by the terms and provision of this agreement. 
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-blue-500 pl-4">2. Educational & Informational Use</h2>
            <p>
              EarthLookup is designed to be <em>amazing for knowing the world and exploring the globe</em>. It is heavily used by schools, educators, and students for general geography info. All intelligence, demographics, and geopolitical borders provided are for educational and informational purposes only. We compile massive info into one place, but do not guarantee real-time accuracy of every metric.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-blue-500 pl-4">3. The Don Systems Network</h2>
            <p>
              These terms apply strictly to EarthLookup.com. If you visit other applications within our network, such as TellMyLocation.com, WaterInMySpeaker.com, or CheckThisPhone.com, you are subject to their specific terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-blue-500 pl-4">4. Intellectual Property</h2>
            <p>
              All branding, logos, custom code, and unique UI/UX designs are the exclusive property of Don Odibat and Don Systems Holding. The underlying geographic data is sourced from public API directories. 
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-blue-500 pl-4">5. Contact Information</h2>
            <p>If you have any questions regarding these Terms, please contact us at:</p>
            <ul className="list-none mt-4 font-mono bg-white/5 p-6 rounded-lg border border-white/10">
              <li>Don Systems Holding</li>
              <li>Tupelo, MS USA 38801</li>
              <li className="text-blue-400 mt-2">don.odibat@gmail.com</li>
            </ul>
          </section>
        </article>

      </main>

      <TrustFooter />
    </div>
  );
}