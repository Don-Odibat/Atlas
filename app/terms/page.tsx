"use client";

import React from "react";
import Link from "next/link";
import TrustFooter from "../../components/TrustFooter";

export default function TermsCommand() {
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
            RULES OF ENGAGEMENT
        </div>
      </nav>

      {/* MAIN TERMS FEED */}
      <main className="flex-1 w-full max-w-5xl mx-auto relative z-10 px-4 md:px-8 py-12 pb-24">
        
        {/* HERO SECTION */}
        <div className="mb-12 border-b border-white/10 pb-10">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white drop-shadow-2xl uppercase">Terms of <span className="text-blue-500">Service</span></h1>
            <p className="text-sm md:text-base text-gray-400 font-light tracking-widest uppercase mb-2">Protocol: <span className="text-white font-medium">Mainframe Access Agreement</span></p>
            <p className="text-xs text-blue-400 font-mono tracking-widest uppercase">Entity: Don Systems Holding / EarthLookup</p>
        </div>

        {/* LEGAL DOCUMENT (Glass Panel) */}
        <div className="glass-panel border border-white/5 rounded-3xl p-6 md:p-12 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0"></div>
            
            <article className="prose prose-invert prose-blue max-w-none text-gray-300 font-light leading-relaxed">
                
                <p className="text-lg leading-relaxed text-gray-400 mb-10">
                  By accessing the EarthLookup intelligence grid, you are entering into a binding legal agreement with Don Systems Holding. These Terms of Service (the "Terms") dictate the permitted uses, restrictions, and operational guidelines for utilizing our global mainframe. If you do not agree with every provision in this directive, you must sever your connection immediately.
                </p>

                {/* SECTION 1: PERMITTED USE */}
                <h2 className="text-2xl font-black text-white uppercase tracking-widest mt-12 mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span> 1. Operator Conduct & Access
                </h2>
                <p>
                  EarthLookup grants you a personal, non-exclusive, non-transferable, and revocable license to access and use the terminal strictly for educational, research, and general geographic exploration.
                </p>
                <p className="mb-4">You are strictly prohibited from engaging in the following network activities:</p>
                <ul className="list-disc pl-6 space-y-2 mb-8 text-sm">
                  <li>Deploying automated scraping scripts, bots, spiders, or data-miners to extract EarthLookup's aggregated dossiers.</li>
                  <li>Attempting to bypass our API rate limits or executing Denial of Service (DDoS) attacks against our servers.</li>
                  <li>Reverse-engineering, decompiling, or cloning the EarthLookup 3D globe interface or UI architecture.</li>
                  <li>Using our platform to facilitate illegal activities, distribute malware, or bypass national security firewalls.</li>
                </ul>

                {/* SECTION 2: INTELLECTUAL PROPERTY */}
                <h2 className="text-2xl font-black text-white uppercase tracking-widest mt-12 mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span> 2. Intellectual Property & Syndication
                </h2>
                <p>
                  The EarthLookup name, the custom UI architecture, the 3D WebGL implementation, and all proprietary code belonging to the specific visual presentation of this terminal are the exclusive intellectual property of <strong>Don Systems Holding</strong>.
                </p>
                <p className="mb-8">
                  The raw geographic data, historical text, and demographic statistics rendered inside the terminal are syndicated from external open-source APIs (including RestCountries, Open-Meteo, ER-API, and the Wikimedia Foundation). You acknowledge that Don Systems Holding does not claim ownership over the underlying open-source data packets or the audio files (national anthems) utilized within the public domain.
                </p>

                {/* SECTION 3: ACCESS REVOCATION */}
                <h2 className="text-2xl font-black text-white uppercase tracking-widest mt-12 mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span> 3. Revocation of Mainframe Access
                </h2>
                <p className="mb-8">
                  We reserve the absolute right to monitor network traffic to ensure compliance with these Terms. Don Systems Holding may, at its sole discretion, permanently block your IP address, restrict your geographic access, or terminate your connection to the EarthLookup servers without prior notice if we detect a violation of our security protocols.
                </p>

                {/* SECTION 4: JURISDICTION */}
                <h2 className="text-2xl font-black text-white uppercase tracking-widest mt-12 mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span> 4. Governing Law & Jurisdiction
                </h2>
                <p className="mb-8">
                  These Terms of Service and your use of the EarthLookup platform shall be governed by and construed in accordance with the laws of the State of Mississippi, United States, without regard to its conflict of law principles. Any legal action, dispute, or proceeding arising out of or related to this agreement must be filed exclusively in the state or federal courts located in <strong>Tupelo, Mississippi</strong>. You hereby consent and submit to the personal jurisdiction of such courts.
                </p>

                <div className="mt-12 text-center border-t border-white/5 pt-8">
                  <p className="text-xs font-mono text-gray-600 uppercase tracking-widest">
                    &gt; End of Terms Directive. Continued use constitutes binding legal agreement.
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