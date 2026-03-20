"use client";

import React from "react";
import Link from "next/link";
import TrustFooter from "../../components/TrustFooter";

export default function PrivacyDirective() {
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
            LEGAL MAINFRAME
        </div>
      </nav>

      {/* MAIN LEGAL FEED */}
      <main className="flex-1 w-full max-w-5xl mx-auto relative z-10 px-4 md:px-8 py-12 pb-24">
        
        {/* HERO SECTION */}
        <div className="mb-12 border-b border-white/10 pb-10">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white drop-shadow-2xl uppercase">Global Privacy <span className="text-blue-500">Directive</span></h1>
            <p className="text-sm md:text-base text-gray-400 font-light tracking-widest uppercase mb-2">Effective Date: <span className="text-white font-medium">March 2026</span></p>
            <p className="text-xs text-blue-400 font-mono tracking-widest uppercase">Entity: Don Systems Holding / EarthLookup</p>
        </div>

        {/* LEGAL DOCUMENT (Glass Panel) */}
        <div className="glass-panel border border-white/5 rounded-3xl p-6 md:p-12 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0"></div>
            
            <article className="prose prose-invert prose-blue max-w-none text-gray-300 font-light leading-relaxed">
                
                <h2 className="text-2xl font-black text-white uppercase tracking-widest mt-0 mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span> 1. Information We Collect
                </h2>
                <p>
                  EarthLookup ("we", "our", or "us") operates as a global geographic and historical intelligence encyclopedia. We are committed to protecting the privacy of our users. When you interact with our global mainframe, we may collect the following data:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-8 text-sm">
                  <li><strong>Automated Network Data:</strong> IP addresses, browser types, device profiles, and operating system data collected automatically by our hosting providers (e.g., Vercel).</li>
                  <li><strong>Cookies & Tracking Technologies:</strong> Information collected via Google AdSense and analytics tools to serve relevant global intelligence and advertisements.</li>
                  <li><strong>User Inquiries:</strong> Any data voluntarily submitted through our Contact portals.</li>
                </ul>

                <h2 className="text-2xl font-black text-white uppercase tracking-widest mt-12 mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span> 2. Third-Party Intelligence APIs
                </h2>
                <p>
                  To provide real-time global intelligence, EarthLookup relies on secured external APIs. These third parties have their own privacy frameworks. We currently syndicate data from:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-8 text-sm">
                  <li><strong>RestCountries API:</strong> For demographic and geographic boundary data.</li>
                  <li><strong>Wikipedia API (Wikimedia Foundation):</strong> For declassified historical archives and text syndication.</li>
                  <li><strong>Open-Meteo:</strong> For live atmospheric and temperature readings.</li>
                  <li><strong>ExchangeRate-API:</strong> For real-time fiat and cryptocurrency macroeconomic conversions.</li>
                </ul>
                <p className="text-xs text-gray-500 font-mono mt-4">We do not pass personally identifiable information (PII) to these intelligence APIs.</p>

                <h2 className="text-2xl font-black text-white uppercase tracking-widest mt-12 mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span> 3. Advertising & Google AdSense
                </h2>
                <p>
                  EarthLookup utilizes Google AdSense to sustain our server infrastructure. Google, as a third-party vendor, uses cookies (including the DoubleClick cookie) to serve ads based on your prior visits to our site or other websites on the Internet.
                </p>
                <p className="mb-8">
                  Users may opt-out of the use of the DoubleClick cookie for interest-based advertising by visiting the <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white underline">Google Ads Settings</a> webpage. We strictly comply with Google's Publisher Policies.
                </p>

                <h2 className="text-2xl font-black text-white uppercase tracking-widest mt-12 mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span> 4. Global Compliance Frameworks
                </h2>
                
                <h3 className="text-lg font-bold text-white mt-6 mb-2 uppercase tracking-wider">European Union (GDPR)</h3>
                <p className="text-sm mb-4">
                  If you are a resident of the European Economic Area (EEA), you have the right to access, correct, update, or erase your personal data under the General Data Protection Regulation (GDPR). EarthLookup processes data purely on the basis of legitimate interest to provide our services and display contextual advertising. 
                </p>

                <h3 className="text-lg font-bold text-white mt-6 mb-2 uppercase tracking-wider">California (CCPA / CPRA)</h3>
                <p className="text-sm mb-4">
                  Under the California Consumer Privacy Act, California residents have the right to request full disclosure of the personal data we collect, and the right to request deletion of that data. We do not strictly "sell" personal information, but we do share data with advertising partners (like Google) to support the platform.
                </p>

                <h3 className="text-lg font-bold text-white mt-6 mb-2 uppercase tracking-wider">Children's Privacy (COPPA)</h3>
                <p className="text-sm mb-8">
                  As an educational encyclopedia, EarthLookup is safe for general audiences. However, we do not knowingly collect personal information from children under the age of 13 in compliance with the Children's Online Privacy Protection Act. If we discover that a child under 13 has provided us with personal data, we will immediately delete such information from our mainframes.
                </p>

                <h2 className="text-2xl font-black text-white uppercase tracking-widest mt-12 mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span> 5. Data Security & Retention
                </h2>
                <p className="mb-8">
                  We deploy industry-standard encryption protocols and secure SSL/TLS connections to protect your data in transit. Data is retained only for as long as necessary to fulfill the purposes outlined in this directive, or as required by law.
                </p>

                <h2 className="text-2xl font-black text-white uppercase tracking-widest mt-12 mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span> 6. Corporate Contact
                </h2>
                <p className="mb-4">
                  If you have questions regarding this Global Privacy Directive, or wish to execute your data rights, contact our legal entity at:
                </p>
                
                {/* 🟢 CORPORATE HQ BLOCK */}
                <div className="bg-black/80 border border-white/10 p-6 rounded-xl inline-block mt-2">
                  <p className="font-bold text-white uppercase tracking-widest mb-1 text-sm">Don Systems Holding</p>
                  <p className="font-mono text-gray-400 text-xs">ATTN: EarthLookup Legal Dept.</p>
                  <p className="font-mono text-gray-400 text-xs">Jackson St.</p>
                  <p className="font-mono text-gray-400 text-xs">Tupelo, MS 38801</p>
                  <p className="font-mono text-gray-400 text-xs">United States</p>
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