"use client";

import React from "react";
import Link from "next/link";
import TrustFooter from "../../components/TrustFooter";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-blue-500/30">
      
      {/* TOP NAVIGATION BANNER */}
      <nav className="w-full border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50 px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-black tracking-tighter hover:text-blue-400 transition-colors">
          EARTH<span className="text-blue-500">LOOKUP</span>
        </Link>
        <div className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">
          Intelligence Core / About
        </div>
      </nav>

      {/* MASSIVE CONTENT AREA */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-20 flex flex-col gap-16">
        
        <header className="text-center space-y-6">
          <div className="inline-block bg-blue-900/30 border border-blue-500/50 text-blue-400 text-xs font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-4">
            A Don Systems Holding Project
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            Exploring The <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Globe Together.</span>
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Massive info in one place. Welcome to the ultimate geography encyclopedia designed for explorers, students, and data-driven minds.
          </p>
        </header>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-6 text-blue-400 uppercase tracking-wider">The EarthLookup Mission</h2>
          <div className="space-y-6 text-gray-300 leading-loose">
            <p>
              Built from the ground up by <strong>Don Odibat</strong> in Tupelo, MS, EarthLookup.com was engineered to be the single most powerful, interactive, and seamless way to understand our planet. We believe that global intelligence shouldn't be locked behind boring spreadsheets. It should be at your fingertips.
            </p>
            <p className="text-white font-medium text-lg border-l-4 border-blue-500 pl-4 py-2 bg-blue-500/10">
              "Amazing for knowing the world and exploring the globe. Used by schools across the country for general geography info and advanced geopolitical research."
            </p>
            <p>
              Whether you are a teacher building a lesson plan, a student studying for an exam, or a developer looking for precise demographic data, EarthLookup condenses thousands of data points into one lightning-fast, 3D interactive experience.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4 uppercase tracking-wider">The Don Systems Network</h2>
            <p className="text-gray-400 text-sm mb-6">
              EarthLookup is proudly maintained by <strong>Don Systems Holding</strong>. We build tools that make the internet faster, safer, and more useful. Check out our sister platforms:
            </p>
            <ul className="space-y-3 font-mono text-sm">
              <li>📍 <a href="https://tellmylocation.com" className="text-blue-400 hover:text-white transition-colors">TellMyLocation.com</a></li>
              <li>🔊 <a href="https://waterinmyspeaker.com" className="text-blue-400 hover:text-white transition-colors">WaterInMySpeaker.com</a></li>
              <li>📱 <a href="https://checkthisphone.com" className="text-blue-400 hover:text-white transition-colors">CheckThisPhone.com</a></li>
            </ul>
          </section>

          <section className="bg-gradient-to-br from-blue-900/20 to-black border border-blue-500/20 rounded-2xl p-8 flex flex-col justify-center items-center text-center">
            <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-white">Keep the Servers Running</h2>
            <p className="text-gray-400 text-sm mb-6">
              Maintaining real-time global databases and HD 3D vectors requires massive server power. If EarthLookup helped you out, consider fueling the dev team.
            </p>
            <a href="https://buymeacoffee.com/DonShehab" target="_blank" className="bg-[#FFDD00] text-black font-black uppercase tracking-widest px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(255,221,0,0.3)] hover:scale-105 transition-transform">
              Buy Don a Coffee ☕
            </a>
          </section>
        </div>

      </main>

      {/* THE MASTER FOOTER WE JUST BUILT */}
      <TrustFooter />
      
    </div>
  );
}