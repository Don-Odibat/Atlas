// @ts-nocheck
"use client";

import React from "react";
import Link from "next/link";
import TrustFooter from "../../components/TrustFooter";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-blue-500/30">
      
      {/* TOP NAVIGATION BANNER */}
      <nav className="w-full border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50 px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-black tracking-tighter hover:text-blue-400 transition-colors">
          EARTH<span className="text-blue-500">LOOKUP</span>
        </Link>
        <div className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">
          Intelligence Core / Contact
        </div>
      </nav>

      {/* CONTACT CONTENT */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-20 flex flex-col gap-12">
        
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            ESTABLISH <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">COMMS.</span>
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
            Got a feature request? Found a bug in the matrix? Just want to say EarthLookup is amazing for knowing the world? We want to hear from you.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DIRECT EMAIL CARD */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-colors flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6 border border-blue-500/40">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 uppercase tracking-wider">Direct Intel</h2>
            <p className="text-gray-400 text-sm mb-6">Send an email directly to the executive team at Don Systems Holding.</p>
            <a href="mailto:don.odibat@gmail.com" className="text-blue-400 font-bold text-lg hover:text-white transition-colors">don.odibat@gmail.com</a>
          </div>

          {/* GLOBAL HQ CARD */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-colors flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6 border border-blue-500/40">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 uppercase tracking-wider">Global HQ</h2>
            <p className="text-gray-400 text-sm mb-6">The command center where the code is written and the servers are monitored.</p>
            <address className="not-italic text-white font-mono">
              Don Systems Holding<br/>
              Tupelo, MS<br/>
              USA 38801
            </address>
          </div>
        </div>

        {/* SUPPORT CARD */}
        <section className="bg-gradient-to-br from-blue-900/20 to-black border border-blue-500/20 rounded-2xl p-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-bold mb-2 uppercase tracking-wider text-white">Support The Data Engine</h2>
            <p className="text-gray-400 text-sm max-w-md">
              EarthLookup brings massive info into one place. If you rely on our high-speed geospatial rendering or intelligence dossiers, help Don keep the servers lightning fast.
            </p>
          </div>
          <a href="https://buymeacoffee.com/DonShehab" target="_blank" className="bg-[#FFDD00] text-black font-black uppercase tracking-widest px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(255,221,0,0.3)] hover:scale-105 transition-transform whitespace-nowrap">
            Buy Don a Coffee ☕
          </a>
        </section>

      </main>

      {/* UNIVERSAL FOOTER */}
      <TrustFooter />
      
    </div>
  );
}