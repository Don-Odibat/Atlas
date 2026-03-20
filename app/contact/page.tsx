"use client";

import React from "react";
import Link from "next/link";
import TrustFooter from "../../components/TrustFooter";

export default function ContactCommand() {
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
            SECURE COMMS UPLINK
        </div>
      </nav>

      {/* MAIN COMMS FEED */}
      <main className="flex-1 w-full max-w-5xl mx-auto relative z-10 px-4 md:px-8 py-12 pb-24">
        
        {/* HERO SECTION */}
        <div className="mb-12 border-b border-white/10 pb-10">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white drop-shadow-2xl uppercase">Global Command <span className="text-blue-500">Relay</span></h1>
            <p className="text-sm md:text-base text-gray-400 font-light tracking-widest uppercase mb-2">Transmission Protocol: <span className="text-green-400 font-medium">ACTIVE</span></p>
            <p className="text-xs text-blue-400 font-mono tracking-widest uppercase">Routing to: Don Systems Holding Mainframe</p>
        </div>

        {/* COMMUNICATIONS DOCUMENT (Glass Panel) */}
        <div className="glass-panel border border-white/5 rounded-3xl p-6 md:p-12 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0"></div>
            
            <article className="prose prose-invert prose-blue max-w-none text-gray-300 font-light leading-relaxed">
                
                <p className="text-lg leading-relaxed text-gray-400 mb-10">
                  EarthLookup operates as a high-density, centralized geographic intelligence terminal. Because our systems actively aggregate millions of data points—from live macroeconomics to declassified historical archives—we require strict protocols for all incoming communications. Please review the specific transmission sectors below to ensure your message is routed to the correct department within our global mainframe.
                </p>

                {/* SECTION 1: DATA ANOMALIES */}
                <h2 className="text-2xl font-black text-white uppercase tracking-widest mt-12 mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span> 1. Data Integrity & Anomaly Reporting
                </h2>
                <p>
                  Our intelligence grid pulls live metrics from the RestCountries global API, the Open-Meteo satellite network, the ER-API fiat/crypto financial ledgers, and the Wikimedia Foundation's historical archives. While our parser engines are highly accurate, geopolitical borders, populations, and monetary valuations are fluid.
                </p>
                <p className="mb-8">
                  If you detect a severe anomaly in a country's intelligence dossier (e.g., outdated Gini coefficients, incorrect ISO 3166 codes, or broken Wikipedia decryption links), you may submit a formal Data Correction Request. <strong>All requests must include the exact target Country Name, the specific category (e.g., Macroeconomics, State Infrastructure), and the verified source of your correction.</strong>
                </p>

                {/* SECTION 2: COMMERCIAL PARTNERSHIPS */}
                <h2 className="text-2xl font-black text-white uppercase tracking-widest mt-12 mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span> 2. Strategic Partnerships & AdSense
                </h2>
                <p>
                  EarthLookup is heavily utilized by educational institutions, independent researchers, and global explorers. This generates highly valuable, engaged web traffic across our network. 
                </p>
                <p className="mb-8">
                  If you are representing a commercial entity looking to secure dedicated advertising real estate outside of our standard Google AdSense integration, or if you are seeking a strategic infrastructure partnership, please route your transmission directly to our executive team. Provide your corporate credentials, proposed integration scale, and expected bandwidth requirements.
                </p>

                {/* SECTION 3: LEGAL & COPYRIGHT */}
                <h2 className="text-2xl font-black text-white uppercase tracking-widest mt-12 mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span> 3. Legal, Privacy, & DMCA Compliance
                </h2>
                <p className="mb-8">
                  We operate in strict adherence to global privacy frameworks, including GDPR and CCPA. EarthLookup acts purely as an aggregator and display terminal for open-source and properly licensed APIs. If you believe any syndicated content (including national insignias, flags, or historical text) violates international copyright laws or requires immediate redaction, submit a formal DMCA takedown notice to our Legal Mainframe. Please review our <Link href="/privacy" className="text-blue-400 hover:text-white underline">Global Privacy Directive</Link> before initiating a request.
                </p>

                {/* CONTACT VECTORS */}
                <h2 className="text-2xl font-black text-white uppercase tracking-widest mt-16 mb-8 text-center">
                  Direct Transmission Vectors
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  
                  {/* EMAIL TERMINAL */}
                  <div className="bg-black/60 border border-blue-500/30 p-8 rounded-2xl flex flex-col justify-center items-center text-center group hover:border-blue-500/80 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 mb-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <h3 className="text-xs font-black tracking-[0.2em] text-gray-400 mb-2 uppercase">Director of Operations</h3>
                    <a href="mailto:don.odibat@gmail.com" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">don.odibat@gmail.com</a>
                    <p className="text-[10px] text-gray-500 font-mono mt-4 uppercase tracking-widest">Average Response: 24-48 Hours</p>
                  </div>

                  {/* HQ TERMINAL */}
                  <div className="bg-black/60 border border-white/10 p-8 rounded-2xl flex flex-col justify-center items-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    <h3 className="text-xs font-black tracking-[0.2em] text-gray-400 mb-4 uppercase">Corporate Headquarters</h3>
                    <div className="font-mono text-white text-sm leading-relaxed">
                      <p className="font-bold text-blue-400">Don Systems Holding</p>
                      <p>Jackson St.</p>
                      <p>Tupelo, MS 38801</p>
                      <p>United States</p>
                    </div>
                  </div>

                </div>

                <div className="mt-12 text-center border-t border-white/5 pt-8">
                  <p className="text-xs font-mono text-gray-600 uppercase tracking-widest">
                    &gt; EarthLookup systems are monitored 24/7. Unauthorized network probing will be logged.
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