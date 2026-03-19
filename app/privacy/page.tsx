"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/country/${searchQuery.toLowerCase().trim().replace(/\s+/g, '-')}`;
    }
  };

  return (
    <main className="h-screen w-screen bg-black overflow-hidden relative font-sans selection:bg-white/20">
      
      {/* 🟢 AMBIENT BACKGROUND (Fixed: Removed missing external file import) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/15 via-black to-black"></div>

      {/* 🟢 ZERO-SCROLL OVERLAY UI */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 md:p-10">
        
        {/* TOP HUD: BRANDING */}
        <header className="flex justify-between items-start w-full max-w-7xl mx-auto">
          <div className="bg-black/50 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)] pointer-events-auto">
            <h1 className="text-3xl font-black tracking-tighter m-0 p-0 leading-none select-none text-white drop-shadow-lg">
              EARTH<span className="text-blue-500">LOOKUP</span>
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <p className="text-[9px] font-bold tracking-[0.3em] text-blue-400 uppercase">Intelligence OS v1.0</p>
            </div>
          </div>
        </header>

        {/* CENTER HUD: TARGET ACQUISITION */}
        <div className="flex flex-col items-center justify-center gap-6 w-full px-4">
          <form 
            onSubmit={handleSearch}
            className="pointer-events-auto w-full max-w-xl transition-all hover:scale-[1.01] duration-500"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-600/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative bg-black/60 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center overflow-hidden transition-all group-hover:border-blue-500/50">
                <div className="pl-6 pr-2 text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ENTER NATIONAL IDENTIFIER..."
                  className="w-full bg-transparent px-4 py-5 text-white font-bold tracking-widest focus:outline-none placeholder:text-gray-600 uppercase text-sm"
                  autoComplete="off"
                  spellCheck="false"
                />
                <div className="pr-6">
                   <kbd className="hidden sm:flex items-center justify-center bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] text-gray-500 font-mono font-bold tracking-wider shadow-inner">ENTER</kbd>
                </div>
              </div>
            </div>
          </form>
          <p className="text-[10px] font-black tracking-[0.4em] text-gray-500 uppercase animate-pulse">Select Territory to Begin Data Uplink</p>
        </div>

        {/* BOTTOM HUD: GLOBAL COMPLIANCE FOOTER (AdSense Ready) */}
        <footer className="pointer-events-auto w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 bg-black/50 backdrop-blur-xl border border-white/10 p-6 md:px-8 rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          
          <div className="flex flex-col gap-1.5 text-center md:text-left">
            <p className="text-[11px] font-black text-white tracking-widest uppercase">EarthLookup Systems</p>
            <p className="text-[9px] text-gray-400 font-light tracking-widest uppercase">Verified Educational Database & Archive</p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            <Link href="/about" className="text-[10px] font-bold text-gray-500 hover:text-blue-400 uppercase tracking-widest transition-colors duration-300">About</Link>
            <Link href="/privacy" className="text-[10px] font-bold text-gray-500 hover:text-blue-400 uppercase tracking-widest transition-colors duration-300">Privacy</Link>
            <Link href="/terms" className="text-[10px] font-bold text-gray-500 hover:text-blue-400 uppercase tracking-widest transition-colors duration-300">Terms</Link>
            <Link href="/contact" className="text-[10px] font-bold text-gray-500 hover:text-blue-400 uppercase tracking-widest transition-colors duration-300 flex items-center gap-1">
              Contact <span className="w-1.5 h-1.5 rounded-full bg-blue-500 ml-1"></span>
            </Link>
          </div>

          <div className="text-[10px] font-mono text-gray-600 font-bold tracking-widest">
            © 2026 // ALL_RIGHTS_RESERVED
          </div>

        </footer>
      </div>

    </main>
  );
}