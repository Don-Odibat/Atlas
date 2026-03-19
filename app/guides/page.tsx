// @ts-nocheck
"use client";

import React from "react";
import Link from "next/link";
import TrustFooter from "../../components/TrustFooter";

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-blue-500/30">
      
      <nav className="w-full border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50 px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-black tracking-tighter hover:text-blue-400 transition-colors">
          EARTH<span className="text-blue-500">LOOKUP</span>
        </Link>
        <div className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">
          Intelligence Core / Educational Guides
        </div>
      </nav>

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-20 flex flex-col gap-12">
        
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            GLOBAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">GUIDES.</span>
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto border-l-4 border-blue-500 pl-4">
            "Amazing for knowing the world and exploring the globe."
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* CARD 1 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-colors">
            <h2 className="text-2xl font-bold mb-4 uppercase text-blue-400">For Schools & Educators</h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              EarthLookup is heavily used by schools for general geography info. Teachers can use the 3D globe to demonstrate spatial relationships between nations, while the Intelligence Dossiers provide instant access to capitals, flags, and populations.
            </p>
            <ul className="text-xs font-mono text-gray-400 space-y-2">
              <li>✓ Interactive visual learning</li>
              <li>✓ Instant demographic retrieval</li>
              <li>✓ Distraction-free interface</li>
            </ul>
          </div>

          {/* CARD 2 */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-colors">
            <h2 className="text-2xl font-bold mb-4 uppercase text-blue-400">Massive Info In One Place</h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Stop digging through outdated encyclopedias or messy wiki pages. EarthLookup pulls real-time geopolitical data directly from trusted global APIs, putting massive amounts of intelligence into a single, lightning-fast dashboard.
            </p>
            <ul className="text-xs font-mono text-gray-400 space-y-2">
              <li>✓ High-fidelity 3D rendering</li>
              <li>✓ Intelligent search aliases (e.g., "USA", "UK")</li>
              <li>✓ Live flag vector graphics</li>
            </ul>
          </div>
        </div>

      </main>

      <TrustFooter />
    </div>
  );
}