import React from "react";
import Link from "next/link";

export default function TrustFooter() {
  return (
    <footer className="w-full bg-[#050505] border-t border-white/10 pt-12 pb-8 px-4 md:px-8 relative z-50 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 border-b border-white/10 pb-10">
        
        {/* BRAND & HQ */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-black tracking-tighter m-0 p-0 leading-none text-white">EARTH<span className="text-blue-500">LOOKUP</span></h2>
            <h3 className="text-[8px] font-bold tracking-[0.2em] text-gray-500 uppercase mt-1">Global Intelligence Terminal</h3>
          </div>
          <div className="font-mono text-gray-400 text-[10px] leading-relaxed uppercase tracking-widest mt-2">
            <p className="text-blue-400 font-bold mb-1">Don Systems Holding</p>
            <p>Jackson St.</p>
            <p>Tupelo, MS 38801</p>
            <p>United States</p>
          </div>
        </div>

        {/* TERMINAL OPERATIONS */}
        <div className="md:col-span-1 flex flex-col gap-3">
          <h4 className="text-xs font-black tracking-[0.2em] text-gray-600 uppercase mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Operations
          </h4>
          <Link href="/" className="text-[10px] md:text-xs font-bold text-gray-400 hover:text-blue-400 uppercase tracking-widest transition-colors">Global Scan (Home)</Link>
          <Link href="/about" className="text-[10px] md:text-xs font-bold text-gray-400 hover:text-blue-400 uppercase tracking-widest transition-colors">System Overview</Link>
          <Link href="/contact" className="text-[10px] md:text-xs font-bold text-gray-400 hover:text-blue-400 uppercase tracking-widest transition-colors">Secure Comms Relay</Link>
        </div>

        {/* INTEL & GUIDES */}
        <div className="md:col-span-1 flex flex-col gap-3">
          <h4 className="text-xs font-black tracking-[0.2em] text-gray-600 uppercase mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span> Intel & Support
          </h4>
          <Link href="/guides" className="text-[10px] md:text-xs font-bold text-gray-400 hover:text-yellow-400 uppercase tracking-widest transition-colors">Tactical Field Manual</Link>
          <Link href="/faq" className="text-[10px] md:text-xs font-bold text-gray-400 hover:text-yellow-400 uppercase tracking-widest transition-colors">Operator FAQ Matrix</Link>
        </div>

        {/* COMPLIANCE & LEGAL */}
        <div className="md:col-span-1 flex flex-col gap-3">
          <h4 className="text-xs font-black tracking-[0.2em] text-gray-600 uppercase mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Compliance
          </h4>
          <Link href="/privacy" className="text-[10px] md:text-xs font-bold text-gray-400 hover:text-red-400 uppercase tracking-widest transition-colors">Privacy Directive</Link>
          <Link href="/terms" className="text-[10px] md:text-xs font-bold text-gray-400 hover:text-red-400 uppercase tracking-widest transition-colors">Rules of Engagement</Link>
          <Link href="/disclaimer" className="text-[10px] md:text-xs font-bold text-gray-400 hover:text-red-400 uppercase tracking-widest transition-colors">Limitation of Liability</Link>
        </div>

      </div>

      {/* COPYRIGHT TIER */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className="text-[9px] font-mono text-gray-600 font-bold tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Don Systems Holding. All Rights Reserved.
        </p>
        <div className="text-[9px] font-mono text-gray-600 font-bold tracking-widest uppercase flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          NETWORK STATUS: ONLINE
        </div>
      </div>
    </footer>
  );
}