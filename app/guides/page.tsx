"use client";

import React from "react";
import Link from "next/link";
import TrustFooter from "../../components/TrustFooter";

export default function GuidesCommand() {
  return (
    <div className="min-h-screen w-screen bg-black text-white font-sans selection:bg-blue-500/30 relative overflow-x-hidden flex flex-col">
      
      {/* BACKGROUND STYLING */}
      <style dangerouslySetInnerHTML={{__html: `
        .glass-panel { background: rgba(10,10,10,0.7); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.3); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(59,130,246,0.6); }
        .image-glass { box-shadow: 0 0 30px rgba(0,0,0,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden; }
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
            TACTICAL MANUAL
        </div>
      </nav>

      {/* MAIN GUIDES FEED */}
      <main className="flex-1 w-full max-w-6xl mx-auto relative z-10 px-4 md:px-8 py-12 pb-24">
        
        {/* HERO SECTION */}
        <div className="mb-12 border-b border-white/10 pb-10">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white drop-shadow-2xl uppercase">Intelligence <span className="text-blue-500">Field Guides</span></h1>
            <p className="text-sm md:text-base text-gray-400 font-light tracking-widest uppercase mb-2">Protocol: <span className="text-white font-medium">Data Interpretation & Analysis</span></p>
            <p className="text-xs text-blue-400 font-mono tracking-widest uppercase">Target: Global Analysts & Explorers</p>
        </div>

        {/* INTRODUCTION */}
        <div className="glass-panel border border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl mb-12 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0"></div>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-white border-l-4 border-blue-500 pl-6 py-2">
              EarthLookup intercepts massive amounts of raw planetary data. To leverage this terminal effectively, operators must understand the metrics they are analyzing. This field guide decodes the socio-economic, geographic, and demographic indicators displayed across the mainframe.
            </p>
        </div>

        {/* GUIDE 1: MACROECONOMICS */}
        <div className="glass-panel border border-white/5 rounded-3xl overflow-hidden shadow-2xl mb-12">
            <div className="h-64 md:h-96 w-full relative">
                <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=2000" alt="Macroeconomic Terminal" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-widest flex items-center gap-4">
                      <span className="w-3 h-3 bg-green-500 rounded-full animate-ping shadow-[0_0_15px_rgba(34,197,94,0.8)]"></span>
                      01. Macroeconomics & Fiat
                    </h2>
                </div>
            </div>
            
            <div className="p-6 md:p-10 prose prose-invert prose-blue max-w-none text-gray-300 font-light leading-relaxed">
                <p>
                  The Macroeconomic ledger within the EarthLookup dossier provides real-time financial tracking for all 195 sovereign states. Understanding these specific indicators is critical for assessing a nation's stability and integration into the global financial grid.
                </p>
                
                <h3 className="text-xl font-bold text-white mt-8 mb-4 tracking-wider uppercase border-b border-white/10 pb-2">The Gini Coefficient</h3>
                <p>
                  Often displayed simply as "Gini," this is the mathematical measure of statistical dispersion intended to represent the income inequality or wealth inequality within a nation. A Gini index of <strong>0</strong> represents perfect equality (everyone has the exact same income), while an index of <strong>100</strong> implies maximal inequality (one person has all the income).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                    <div className="bg-black/50 border border-green-500/30 p-4 rounded-xl">
                        <p className="font-bold text-green-400 mb-1">0.0 - 30.0</p>
                        <p className="text-xs text-gray-400">Highly equal wealth distribution (Typical in Scandinavian nations).</p>
                    </div>
                    <div className="bg-black/50 border border-yellow-500/30 p-4 rounded-xl">
                        <p className="font-bold text-yellow-400 mb-1">31.0 - 45.0</p>
                        <p className="text-xs text-gray-400">Moderate inequality (Typical in Western economic super-powers).</p>
                    </div>
                    <div className="bg-black/50 border border-red-500/30 p-4 rounded-xl">
                        <p className="font-bold text-red-400 mb-1">46.0 - 100.0</p>
                        <p className="text-xs text-gray-400">Severe wealth disparity and economic stratification.</p>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-white mt-8 mb-4 tracking-wider uppercase border-b border-white/10 pb-2">Fiat vs. Crypto Parity</h3>
                <p>
                  EarthLookup dual-routes local currency conversions against both the United States Dollar (USD) and Bitcoin (BTC). The USD acts as the global reserve fiat benchmark, while the BTC rate provides a decentralized, mathematically hard-capped counter-metric. Nations experiencing hyperinflation will show rapid, daily destabilization in both of these live conversion panes.
                </p>
            </div>
        </div>

        {/* GUIDE 2: DEMOGRAPHICS & DENSITY */}
        <div className="glass-panel border border-white/5 rounded-3xl overflow-hidden shadow-2xl mb-12">
            <div className="h-64 md:h-96 w-full relative">
                <img src="https://images.unsplash.com/photo-1517732306149-e8f829eb588a?auto=format&fit=crop&q=80&w=2000" alt="Population Density" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-widest flex items-center gap-4">
                      <span className="w-3 h-3 bg-blue-500 rounded-full animate-ping shadow-[0_0_15px_rgba(59,130,246,0.8)]"></span>
                      02. Demographic Pressure
                    </h2>
                </div>
            </div>
            
            <div className="p-6 md:p-10 prose prose-invert prose-blue max-w-none text-gray-300 font-light leading-relaxed">
                <p>
                  Population alone is an incomplete metric. One billion people spread across an entire continent operates entirely differently than one hundred million people compressed into an island. EarthLookup's demographic terminal forces an immediate calculation of <strong>Population Density</strong>.
                </p>

                <h3 className="text-xl font-bold text-white mt-8 mb-4 tracking-wider uppercase border-b border-white/10 pb-2">Reading Density Metrics (km² / sq mi)</h3>
                <p>
                  The terminal automatically calculates density by dividing the live population ticker by the total landmass area. 
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li><strong>Low Density (0-50 per km²):</strong> Indicates massive, untamed frontiers, vast agricultural land, or harsh climates (e.g., Russia, Canada, Australia).</li>
                  <li><strong>High Density (300+ per km²):</strong> Indicates heavy urban infrastructure, high economic velocity, and vertical city planning (e.g., Japan, India, Netherlands).</li>
                  <li><strong>Extreme Density (1000+ per km²):</strong> Typically restricted to city-states and highly developed sovereign islands (e.g., Singapore, Monaco).</li>
                </ul>

                <h3 className="text-xl font-bold text-white mt-8 mb-4 tracking-wider uppercase border-b border-white/10 pb-2">The Live Ticker Mechanics</h3>
                <p>
                  The green (Births) and red (Deaths) terminal pulses are mathematically extrapolated from the United Nations global baseline rates (approx. 1.5% birth rate and 0.8% death rate globally). These pulses allow operators to visually comprehend the actual real-time biological momentum of the target nation.
                </p>
            </div>
        </div>

        {/* GUIDE 3: STATE INFRASTRUCTURE & LOGISTICS */}
        <div className="glass-panel border border-white/5 rounded-3xl overflow-hidden shadow-2xl mb-12">
            <div className="h-64 md:h-96 w-full relative">
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" alt="Global Network" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-widest flex items-center gap-4">
                      <span className="w-3 h-3 bg-purple-500 rounded-full animate-ping shadow-[0_0_15px_rgba(168,85,247,0.8)]"></span>
                      03. Geopolitical Logistics
                    </h2>
                </div>
            </div>
            
            <div className="p-6 md:p-10 prose prose-invert prose-blue max-w-none text-gray-300 font-light leading-relaxed">
                <p>
                  To fully analyze a nation, an operator must look beyond the borders and analyze how the state integrates with the rest of the world. The State & Infrastructure panel provides the digital and physical routing codes for the nation.
                </p>

                <div className="flex flex-col md:flex-row gap-8 mt-8">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-4 tracking-wider uppercase border-b border-white/10 pb-2">ISO 3166 Codes & TLDs</h3>
                        <p>
                          <strong>ISO Codes (Alpha-2 / Alpha-3)</strong> are the internationally recognized, standardized codes used by aviation, maritime logistics, and digital databases to definitively identify a state without language barriers. 
                        </p>
                        <p>
                          The <strong>TLD (Top Level Domain)</strong> is the nation's sovereign internet extension (e.g., .us, .uk, .jo). Tracking TLD restrictions is vital for digital security analysts.
                        </p>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-4 tracking-wider uppercase border-b border-white/10 pb-2">Landlocked Diagnostics</h3>
                        <p>
                          A critical geopolitical indicator. Nations marked as <strong>Landlocked (YES)</strong> do not have direct sovereign access to the world's oceans. This fundamentally limits their maritime military capabilities and heavily taxes their import/export economy, as they must rely on the diplomatic goodwill of bordering nations for access to global shipping routes.
                        </p>
                    </div>
                </div>

            </div>
        </div>

        <div className="mt-12 text-center border-t border-white/5 pt-8 bg-black/40 rounded-2xl p-8">
          <h3 className="text-xl font-black text-white uppercase tracking-widest mb-4">Proceed to Global Scan</h3>
          <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-widest uppercase text-xs px-8 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]">
            Open The Mainframe
          </Link>
        </div>

      </main>

      {/* UNIVERSAL FOOTER */}
      <div className="relative z-20 bg-black/90 border-t border-white/10 backdrop-blur-md mt-10">
        <TrustFooter />
      </div>

    </div>
  );
}