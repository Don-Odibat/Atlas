"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import TrustFooter from "../../../components/TrustFooter";

export default function CountryDossier({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Re-format the slug to match your downloaded MP3 files (e.g., 'united-states', 'bahamas')
  const cleanSlug = decodeURIComponent(params.slug).toLowerCase().replace(/\s+/g, '-');
  const anthemPath = `/anthems/${cleanSlug}.mp3`;

  useEffect(() => {
    // We decode the slug to fetch the exact country name from the API
    const fetchName = decodeURIComponent(params.slug);
    
    fetch(`https://restcountries.com/v3.1/name/${fetchName}?fullText=true`)
      .then((res) => res.json())
      .then((json) => {
        if (json && json.length > 0) {
          setData(json[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [params.slug]);

  const toggleAnthem = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.error("Audio playback failed. File may be missing in /public/anthems/", e));
      setIsPlaying(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-blue-500 font-mono tracking-widest uppercase">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          Decrypting Dossier...
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-red-500 font-mono tracking-widest uppercase flex-col gap-4">
        <h2>Target Lost. No Data Found.</h2>
        <Link href="/" className="text-blue-400 underline text-sm">Return to Global Map</Link>
      </div>
    );
  }

  // Extracting data safely
  const currencyKeys = data.currencies ? Object.keys(data.currencies) : [];
  const currencyName = currencyKeys.length > 0 ? data.currencies[currencyKeys[0]].name : "N/A";
  const currencySymbol = currencyKeys.length > 0 ? data.currencies[currencyKeys[0]].symbol : "";
  const languages = data.languages ? Object.values(data.languages).join(", ") : "N/A";
  const mapLink = data.maps?.googleMaps || "#";
  const borders = data.borders ? data.borders.join(", ") : "None (Island/Isolated)";

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col selection:bg-blue-500/30">
      
      {/* HIDDEN AUDIO ELEMENT */}
      <audio ref={audioRef} src={anthemPath} onEnded={() => setIsPlaying(false)} preload="none" />

      {/* TOP NAVIGATION BANNER */}
      <nav className="w-full border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-black tracking-widest hover:text-blue-400 transition-colors uppercase">
          <span className="text-xl">←</span> BACK TO GLOBE
        </Link>
        <div className="text-[10px] md:text-xs font-mono font-bold text-gray-500 uppercase tracking-widest border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          Dossier Active: {data.name.common}
        </div>
      </nav>

      {/* MAIN INTELLIGENCE LAYOUT */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col lg:flex-row gap-10">
        
        {/* LEFT COLUMN: VISUALS & CORE ACTIONS */}
        <aside className="w-full lg:w-1/3 flex flex-col gap-8">
          
          <div className="bg-[#0a0a0a] border border-blue-900/40 rounded-3xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.8)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full group-hover:bg-blue-500/20 transition-all"></div>
            
            <img src={data.flags.svg} alt={`Flag of ${data.name.common}`} className="w-full object-cover rounded-xl shadow-lg border border-white/10 mb-6 aspect-video" />
            
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-1">{data.name.common}</h1>
            <h2 className="text-sm font-mono text-gray-400 mb-6">{data.name.official}</h2>
            
            <div className="flex gap-4 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-center flex-1">
                <span className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">CCA2</span>
                <span className="font-mono text-lg text-blue-400">{data.cca2}</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-center flex-1">
                <span className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">CCA3</span>
                <span className="font-mono text-lg text-blue-400">{data.cca3}</span>
              </div>
            </div>

            {/* ANTHEM & MAPS BUTTONS */}
            <div className="flex flex-col gap-3">
              <button onClick={toggleAnthem} className={`w-full font-black uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-3 transition-all border ${isPlaying ? 'bg-blue-500/20 text-blue-400 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}>
                {isPlaying ? (
                   <>⏸ PAUSE ANTHEM</>
                ) : (
                   <>▶ PLAY ANTHEM</>
                )}
              </button>
              <a href={mapLink} target="_blank" className="w-full bg-[#0a0a0a] text-gray-300 font-bold uppercase tracking-widest py-3 rounded-xl flex items-center justify-center gap-3 border border-white/10 hover:border-blue-500/50 hover:text-white transition-all text-sm">
                📍 OPEN IN GOOGLE MAPS
              </a>
            </div>
          </div>

          {/* COAT OF ARMS (If it exists) */}
          {data.coatOfArms && data.coatOfArms.svg && (
             <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center shadow-lg">
               <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Official Insignia</h3>
               <img src={data.coatOfArms.svg} alt={`Coat of Arms of ${data.name.common}`} className="w-32 h-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
             </div>
          )}

        </aside>

        {/* RIGHT COLUMN: INTELLIGENCE GRID */}
        <section className="w-full lg:w-2/3 flex flex-col gap-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* DEMOGRAPHICS */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-colors">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                 Live Demographics
              </div>
              <div className="text-3xl font-black tracking-tight">{new Intl.NumberFormat().format(data.population || 0)}</div>
              <div className="text-sm text-gray-400 mt-1">Total Population</div>
            </div>

            {/* CAPITAL */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-colors">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                 Seat of Government
              </div>
              <div className="text-3xl font-black tracking-tight">{data.capital && data.capital.length > 0 ? data.capital[0] : "N/A"}</div>
              <div className="text-sm text-gray-400 mt-1">Capital City</div>
            </div>

            {/* ECONOMICS */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-colors">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 Macroeconomics
              </div>
              <div className="text-xl font-bold">{currencyName} <span className="text-blue-400 ml-1">{currencySymbol}</span></div>
              <div className="text-sm text-gray-400 mt-1">Official Currency</div>
            </div>

            {/* GEOGRAPHY */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-colors">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                 Land Area
              </div>
              <div className="text-2xl font-bold">{new Intl.NumberFormat().format(data.area || 0)} <span className="text-sm text-gray-400">km²</span></div>
              <div className="text-sm text-gray-400 mt-1">Total Square Kilometers</div>
            </div>
            
          </div>

          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-lg">
             <h3 className="text-sm font-black text-white uppercase tracking-widest border-b border-white/10 pb-4">Extended Intelligence</h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Region / Subregion</span>
                  <span className="font-medium text-gray-200">{data.region} / {data.subregion || "N/A"}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Official Languages</span>
                  <span className="font-medium text-gray-200">{languages}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Bordering Nations</span>
                  <span className="font-mono text-gray-300 text-xs">{borders}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Timezones</span>
                  <span className="font-mono text-gray-300 text-xs">{data.timezones ? data.timezones.join(", ") : "N/A"}</span>
                </div>
             </div>
          </div>

          {/* THE ADSENSE ZONE */}
          <div className="w-full h-32 md:h-24 bg-black border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay"></div>
             <span className="text-gray-600 font-mono text-xs uppercase tracking-widest font-bold z-10">Google AdSense Zone</span>
          </div>

        </section>
      </main>

      {/* UNIVERSAL FOOTER */}
      <TrustFooter />
      
    </div>
  );
}