"use client";

import React from "react";
import Link from "next/link";
import TrustFooter from "../../components/TrustFooter";

export default function DisclaimerCommand() {
  return (
    <div className="min-h-screen w-screen bg-black text-white font-sans selection:bg-red-500/30 relative overflow-x-hidden flex flex-col">
      
      {/* BACKGROUND STYLING */}
      <style dangerouslySetInnerHTML={{__html: `
        .glass-panel { background: rgba(10,10,10,0.7); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(239,68,68,0.3); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(239,68,68,0.6); }
      `}} />

      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-black to-black"></div>

      {/* TOP COMMAND HEADER (Sticky) */}
      <nav className="w-full border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl sticky top-0 z-50 px-4 md:px-8 py-4 flex justify-between items-center shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-6">
            <Link href="/" className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-400 hover:text-white uppercase transition-colors flex items-center gap-2">
              <span className="text-red-500 text-lg">←</span> BACK TO GLOBE
            </Link>
        </div>
        <div className="text-[9px] md:text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            OPERATIONAL DISCLAIMER
        </div>
      </nav>

      {/* MAIN DISCLAIMER FEED */}
      <main className="flex-1 w-full max-w-5xl mx-auto relative z-10 px-4 md:px-8 py-12 pb-24">
        
        {/* HERO SECTION */}
        <div className="mb-12 border-b border-white/10 pb-10">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white drop-shadow-2xl uppercase">Limitation of <span className="text-red-500">Liability</span></h1>
            <p className="text-sm md:text-base text-gray-400 font-light tracking-widest uppercase mb-2">Protocol: <span className="text-white font-medium">Data Provenance & Risk Assumption</span></p>
            <p className="text-xs text-red-400 font-mono tracking-widest uppercase">Entity: Don Systems Holding / EarthLookup</p>
        </div>

        {/* LEGAL DOCUMENT (Glass Panel) */}
        <div className="glass-panel border border-white/5 rounded-3xl p-6 md:p-12 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0"></div>
            
            <article className="prose prose-invert prose-red max-w-none text-gray-300 font-light leading-relaxed">
                
                <p className="text-lg leading-relaxed text-gray-400 mb-10">
                  The EarthLookup mainframe is an intelligence aggregator. We do not manually input or verify every individual data point. The information displayed across our terminals is synthesized in real-time from open-source global APIs. By accessing this terminal, you agree to the following operational disclaimers.
                </p>

                {/* SECTION 1: FINANCIAL */}
                <h2 className="text-2xl font-black text-white uppercase tracking-widest mt-12 mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span> 1. No Financial or Investment Advice
                </h2>
                <p>
                  The Macroeconomic panels on EarthLookup display live fiat (USD) and cryptocurrency (BTC) exchange rates derived from third-party financial endpoints (e.g., ExchangeRate-API). 
                </p>
                <p className="mb-8">
                  <strong>This data is provided strictly for educational and informational purposes.</strong> EarthLookup and Don Systems Holding are not registered financial advisors. We do not guarantee the real-time accuracy, latency, or reliability of these financial metrics. Users must never make trading, investment, or geopolitical financial decisions based solely on the data displayed in this terminal. You assume all risk for any financial actions taken.
                </p>

                {/* SECTION 2: GEOPOLITICAL */}
                <h2 className="text-2xl font-black text-white uppercase tracking-widest mt-12 mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span> 2. Geopolitical Neutrality
                </h2>
                <p>
                  EarthLookup dynamically renders maps, borders, national insignias, capital cities, and sovereign designations based on the ISO 3166 standards and the RestCountries database. 
                </p>
                <p className="mb-8">
                  The representation of disputed territories, borders, or sovereign statuses on this platform <strong>does not constitute a political endorsement or official diplomatic stance by Don Systems Holding.</strong> We act purely as a neutral mirror reflecting the data provided by global tracking authorities and the Wikimedia Foundation. Any geopolitical disputes regarding the data should be directed to the respective API authorities.
                </p>

                {/* SECTION 3: DATA LATENCY */}
                <h2 className="text-2xl font-black text-white uppercase tracking-widest mt-12 mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span> 3. Data Latency & API Uptime
                </h2>
                <p className="mb-8">
                  While our mainframe is engineered for maximum uptime, we rely on external data nodes (Open-Meteo, Wikipedia, etc.). EarthLookup makes no warranties regarding the uninterrupted availability of the site or the accuracy of real-time tickers (such as the Live Demographics pulse or localized weather). Network outages, API rate limits, or corrupted data packets from third-party servers are outside of our control.
                </p>

                {/* SECTION 4: LIABILITY */}
                <h2 className="text-2xl font-black text-white uppercase tracking-widest mt-12 mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span> 4. Absolute Limitation of Liability
                </h2>
                <p className="mb-8 text-sm uppercase tracking-wider font-mono text-gray-400">
                  In no event shall Don Systems Holding, EarthLookup, its directors, or affiliates be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use, inability to use, or reliance upon the intelligence, metrics, or archives provided by this platform. The system is provided "AS IS" and "AS AVAILABLE" without any warranties of any kind, either express or implied.
                </p>

                <div className="mt-12 text-center border-t border-white/5 pt-8">
                  <p className="text-xs font-mono text-gray-600 uppercase tracking-widest">
                    &gt; End of Disclaimer Directive. Use of the mainframe constitutes acceptance of these terms.
                  </p>
                </div>

            </article>
        </div>
      </main>

      {/* UNIVERSAL FOOTER */}
      <div className="relative z-20 bg-black/90 border-t border-white/10 backdrop-blur-md">
        <TrustFooter />
      </div>

    </div>
  );
}