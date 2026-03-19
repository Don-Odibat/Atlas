import React from 'react';
import Link from 'next/link';

export default function TrustFooter() {
  const lastUpdated = "March 19, 2026 | 01:22 AM CDT"; // Locked in timestamp

  return (
    <footer className="bg-[#050505] border-t border-blue-900/30 text-gray-400 py-12 px-6 font-sans relative z-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* BRANDING & MISSION */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-white text-xl font-black tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
            EarthLookup.com
          </h3>
          <p className="text-sm leading-relaxed mb-4 text-gray-300">
            <strong>The Ultimate Geography Encyclopedia.</strong> Amazing for knowing the world and exploring the globe. Used by schools, educators, and explorers worldwide for general geography info. We bring massive geopolitical intelligence into one place.
          </p>
          <div className="inline-block bg-blue-900/20 border border-blue-500/30 rounded-lg px-4 py-2 text-xs font-mono text-blue-400">
            A Proud Product of <strong className="text-white">Don Systems Holding</strong>
          </div>
        </div>

        {/* THE NETWORK */}
        <div>
          <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">The Don Systems Network</h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li><a href="https://tellmylocation.com" target="_blank" className="hover:text-blue-400 transition-colors">TellMyLocation.com</a></li>
            <li><a href="https://waterinmyspeaker.com" target="_blank" className="hover:text-blue-400 transition-colors">WaterInMySpeaker.com</a></li>
            <li><a href="https://checkthisphone.com" target="_blank" className="hover:text-blue-400 transition-colors">CheckThisPhone.com</a></li>
          </ul>
        </div>

        {/* CONTACT & TRUST */}
        <div>
          <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Global HQ</h4>
          <address className="not-italic text-sm flex flex-col gap-2 mb-4">
            <p>Tupelo, MS</p>
            <p>USA 38801</p>
            <p className="text-blue-400 font-medium mt-2">don.odibat@gmail.com</p>
          </address>
          <a href="https://buymeacoffee.com/DonShehab" target="_blank" className="inline-flex items-center gap-2 bg-[#FFDD00] text-black text-xs font-black px-4 py-2 rounded-md hover:bg-white transition-colors uppercase tracking-wide">
            ☕ Support the Server
          </a>
        </div>
      </div>

      {/* LEGAL & TIMESTAMP */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <div className="flex gap-4 font-bold uppercase tracking-wider">
          <Link href="/about" className="hover:text-white">About</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
          <Link href="/policy" className="hover:text-white">Privacy</Link>
          <Link href="/terms" className="hover:text-white">Terms</Link>
          <Link href="/guides" className="hover:text-white">Guides</Link>
          <Link href="/disclaimer" className="hover:text-white">Disclaimer</Link>
        </div>
        <div className="text-right flex flex-col items-center md:items-end gap-1">
          <p className="font-mono text-[10px] text-gray-500">SYSTEM UPDATE: {lastUpdated}</p>
          <p>© 2025 Don Systems Holding. All Rights Reserved. Executive Director: Don Odibat.</p>
        </div>
      </div>
    </footer>
  );
}