"use client";

import React from "react";
import Link from "next/link";
import TrustFooter from "../../components/TrustFooter";

export default function AboutCommand() {
  return (
    <div className="min-h-screen w-screen bg-black text-white font-sans selection:bg-blue-500/30 relative overflow-x-hidden flex flex-col">
      
      {/* BACKGROUND STYLING */}
      <style dangerouslySetInnerHTML={{__html: `
        .glass-panel { background: rgba(10,10,10,0.7); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.3); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(59,130,246,0.6); }
      `}} />

      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black"></div>

      {/* TOP COMMAND HEADER (Sticky) */}
      <nav className="w-full border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl sticky top-0 z-50 px-4 md:px-8 py-4 flex justify-between items-center shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-6">
            <Link href="/" className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-400 hover:text-white uppercase transition-colors flex items-center gap-2">
              <span className="text-blue-500 text-lg">←</span> BACK TO GLOBE
            </Link>
        </div>
        <div className="text-[9px] md:text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            SYSTEM OVERVIEW
        </div>
      </nav>

      {/* MAIN ABOUT FEED */}
      <main className="flex-1 w-full max-w-6xl mx-auto relative z-10 px-4 md:px-8 py-12 pb-24">
        
        {/* HERO SECTION */}
        <div className="mb-12 border-b border-white/10 pb-10">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white drop-shadow-2xl uppercase">About The <span className="text-blue-500">Mainframe</span></h1>
            <p className="text-sm md:text-base text-gray-400 font-light tracking-widest uppercase mb-2">Project Classification: <span className="text-white font-medium">EarthLookup Intelligence Grid</span></p>
            <p className="text-xs text-blue-400 font-mono tracking-widest uppercase">Architect: Don Odibat / Don Systems Holding</p>
        </div>

        {/* OVERVIEW DOCUMENT (Glass Panel) */}
        <div className="glass-panel border border-white/5 rounded-3xl p-6 md:p-12 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0"></div>
            
            <article className="prose prose-invert prose-blue max-w-none text-gray-300 font-light leading-relaxed">
                
                <p className="text-xl md:text-2xl font-light leading-relaxed text-white mb-10 border-l-4 border-blue-500 pl-6 py-2">
                  EarthLookup is not a standard geography website. It is a highly advanced, centralized intelligence terminal designed to bypass fragmented web searches and deliver unfiltered global data in a single, high-density dashboard.
                </p>

                {/* SECTION 1: GENESIS */}
                <h2 className="text-2xl font-black text-white uppercase tracking-widest mt-12 mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span> Project Genesis
                </h2>
                <p>
                  The modern internet forces researchers, students, and explorers to jump across dozens of platforms to gather basic intelligence about a nation. You check one site for the population, another for the live exchange rate, another to read the history, and yet another to see the local weather. 
                </p>
                <p className="mb-8">
                  EarthLookup was engineered to solve this latency. By syndicating data from the world's most powerful open-source APIs, we created a unified command center. When you select one of the 195 recognized sovereign states, our mainframe decrypts and compiles a comprehensive dossier in less than a second, bringing the planet to your fingertips.
                </p>

                {/* SECTION 2: CORE SUBSYSTEMS */}
                <h2 className="text-2xl font-black text-white uppercase tracking-widest mt-12 mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span> Core Subsystems
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-black/50 border border-white/5 p-6 rounded-2xl">
                        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2 flex items-center gap-2">
                            <span className="text-blue-500">01.</span> Live Demographics
                        </h3>
                        <p className="text-sm text-gray-400">The engine calculates continuous, mathematical estimations of a nation's population based on standardized global birth and death rates, updating directly before your eyes.</p>
                    </div>
                    <div className="bg-black/50 border border-white/5 p-6 rounded-2xl">
                        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2 flex items-center gap-2">
                            <span className="text-green-500">02.</span> Macroeconomic Ledger
                        </h3>
                        <p className="text-sm text-gray-400">Live integration with global exchange APIs instantly converts any local currency into both USD (Fiat) and BTC (Crypto), allowing for real-time economic assessment.</p>
                    </div>
                    <div className="bg-black/50 border border-white/5 p-6 rounded-2xl">
                        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2 flex items-center gap-2">
                            <span className="text-purple-500">03.</span> Atmospheric Tracking
                        </h3>
                        <p className="text-sm text-gray-400">By locking onto the precise GPS coordinates of a nation's seat of government, the terminal pulls highly accurate, dual-metric (Celsius/Fahrenheit) temperature and local timezone readings.</p>
                    </div>
                    <div className="bg-black/50 border border-white/5 p-6 rounded-2xl">
                        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2 flex items-center gap-2">
                            <span className="text-yellow-500">04.</span> Multilingual Matrix
                        </h3>
                        <p className="text-sm text-gray-400">A 7-node translation engine allows operators to flip the entire UI and route direct queries to foreign Wikipedia servers in English, Russian, Dutch, Arabic, Chinese, Hindi, and French.</p>
                    </div>
                </div>

                {/* SECTION 3: THE ARCHITECT */}
                <h2 className="text-2xl font-black text-white uppercase tracking-widest mt-12 mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span> Architecture & Operations
                </h2>
                <p>
                  EarthLookup operates as a flagship subsidiary of <strong>Don Systems Holding</strong>, a technology and digital infrastructure firm headquartered in Tupelo, Mississippi, United States. 
                </p>
                <p className="mb-8">
                  Our engineering philosophy is built on speed, data integrity, and uncompromising user interface design. Every line of code, from the 3D WebGL globe on the launch screen to the responsive dual-column intelligence grids, was architected to make heavy data feel completely frictionless.
                </p>

                <div className="mt-12 text-center border-t border-white/5 pt-8 bg-black/40 rounded-2xl p-8">
                  <h3 className="text-xl font-black text-white uppercase tracking-widest mb-4">Ready to Access the Mainframe?</h3>
                  <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-widest uppercase text-xs px-8 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]">
                    Initialize Global Search
                  </Link>
                </div>

            </article>
        </div>
      </main>

      {/* UNIVERSAL FOOTER */}
      <div className="relative z-20 bg-black/90 border-t border-white/10 backdrop-blur-md mt-10">
        <TrustFooter />
      </div>

    </div>
  );
}