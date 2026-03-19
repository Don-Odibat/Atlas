import React from "react";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans selection:bg-white/20 relative overflow-y-auto">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black"></div>
      </div>

      {/* Top Navigation */}
      <nav className="relative z-50 w-full px-8 md:px-12 pt-8 pb-4 flex justify-between items-center border-b border-white/10 bg-black/60 backdrop-blur-md sticky top-0 shadow-2xl">
        <Link href="/" className="text-[10px] font-bold tracking-[0.2em] text-gray-400 hover:text-white uppercase transition-colors flex items-center gap-2">
          <span className="text-blue-500">←</span> Return to Mainframe
        </Link>
        <h1 className="text-xl font-black tracking-tighter m-0 p-0 leading-none select-none text-white">
            EARTH<span className="text-blue-500">LOOKUP</span>
        </h1>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto p-8 md:p-16">
        
        <header className="mb-16 border-b border-white/10 pb-8">
          <p className="text-blue-500 font-black tracking-widest uppercase mb-4 text-sm">Platform Origin & Mission</p>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-4">About EarthLookup</h1>
          <p className="text-gray-400 text-sm tracking-wide">The Global Intelligence Operating System</p>
        </header>

        <article className="space-y-12 text-sm md:text-base leading-relaxed font-light">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. The Vision: Beyond the Encyclopedia</h2>
            <p className="mb-4">
              EarthLookup was engineered with a singular, uncompromising vision: to revolutionize how global intelligence is consumed. We believed that the traditional online encyclopedia model—endless walls of text, cluttered interfaces, and exhausting scrolling—was fundamentally obsolete for the modern researcher.
            </p>
            <p>
              We built EarthLookup to act as a high-speed, university-grade Intelligence Operating System. It is designed to deliver extreme-density geopolitical, macroeconomic, and historical data instantly, utilizing a completely frictionless "Zero-Scroll" Heads-Up Display (HUD) architecture. 
            </p>
          </section>

          <section className="bg-white/5 border border-blue-500/30 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-blue-400 mb-4">2. The Architecture & Technology</h2>
            <p className="mb-4 text-gray-300">
              EarthLookup is not a standard website; it is an active data mainframe. To achieve supersonic load speeds and absolute precision, the platform integrates multiple cutting-edge systems:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong>Live Telemetry:</strong> We utilize live global API endpoints (including RestCountries and Open-Meteo) to stream real-time demographic shifts, atmospheric conditions, and active currency exchange rates directly to the user.</li>
              <li><strong>Zero-Scroll HUD:</strong> Information is categorized into strict tactical sectors (Macroeconomics, Security, History, etc.) that swap instantly via a locked-viewport interface, eliminating scroll fatigue.</li>
              <li><strong>CSS Power Data:</strong> Deep economic and demographic metrics are rendered using native HTML/CSS visual power bars, ensuring instant data visualization with zero bandwidth cost.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. University-Grade Intelligence</h2>
            <p className="mb-4">
              Our dossiers are crafted for academic, research, and geopolitical analysis. We refuse to take shortcuts. When you access a nation's mainframe on EarthLookup, you are not just given the capital city and the flag. 
            </p>
            <p>
              You receive a brutal, unfiltered breakdown of the nation's tectonic reality, its deeply entrenched military alliances (NATO, CSTO, Five Eyes), the exact realities of its economic infrastructure, and a comprehensive timeline of the conflicts and eras that forged its modern borders. It is designed specifically for schools, universities, and dedicated global citizens.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. The Humanitarian Initiative</h2>
            <p className="mb-4">
              EarthLookup is committed to looking beyond the data. We recognize that many of the nations in our database are currently enduring severe humanitarian crises, economic collapse, or active conflict.
            </p>
            <p>
              As part of our core mission, EarthLookup serves as a verified bridge to global aid. For nations facing acute emergencies, the mainframe actively integrates direct, verified links to apolitical, internationally trusted non-profit organizations (such as UN agencies and Doctors Without Borders). Our goal is to convert global education directly into targeted, verifiable humanitarian support.
            </p>
          </section>

        </article>

        <footer className="mt-20 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 text-xs uppercase tracking-widest">EarthLookup Intelligence Systems © 2026. All Rights Reserved.</p>
        </footer>

      </main>
    </div>
  );
}