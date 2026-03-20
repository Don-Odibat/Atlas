"use client";

import React, { useState, useRef, useEffect, memo } from "react";
import Link from "next/link";

const translations: Record<string, Record<string, string>> = {
  EN: {
    pop: "Population", cap: "Capital", cur: "Currency",
    time: "Local Time", temp: "Temp", mil: "Mil Rank",
    births: "Births", deaths: "Deaths", fetching: "FETCHING...", live: "LIVE FEED",
    back: "← Back to Globe", connected: "Connected", mainframe: "Mainframe",
    cat1: "Geography & Climate", cat2: "The People", cat3: "State & Security",
    cat4: "Macroeconomics", cat5: "Tech & Infrastructure", cat6: "History & Eras",
    cat7: "Health & Longevity", cat8: "Travel & Logistics"
  }
};

const LiveClock = memo(({ timezones }: { timezones: string[] }) => {
  const [localTime, setLocalTime] = useState<string>("CALCULATING...");
  useEffect(() => {
    if (!timezones || timezones.length === 0) return;
    const tzString = timezones[0];
    let offsetHours = 0, offsetMinutes = 0;
    if (tzString !== "UTC") {
      const sign = tzString.includes("-") ? -1 : 1;
      const parts = tzString.replace("UTC", "").replace("+", "").replace("-", "").split(":");
      offsetHours = parseInt(parts[0]) * sign;
      if (parts.length > 1) offsetMinutes = parseInt(parts[1]) * sign;
    }
    const tick = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const countryTime = new Date(utc + (3600000 * offsetHours) + (60000 * offsetMinutes));
      setLocalTime(countryTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [timezones]);
  return <p className="text-3xl font-black text-white drop-shadow-lg font-mono tracking-tighter">{localTime}</p>;
});

const LiveDemographics = memo(({ basePopulation }: { basePopulation: number }) => {
  const [sessionBirths, setSessionBirths] = useState(0);
  const [sessionDeaths, setSessionDeaths] = useState(0);
  
  useEffect(() => {
    if (!basePopulation) return;
    const birthRateSec = Math.max(1, Math.round(31536000 / (basePopulation * 0.015)));
    const deathRateSec = Math.max(1, Math.round(31536000 / (basePopulation * 0.008)));
    
    const birthInterval = setInterval(() => setSessionBirths(prev => prev + 1), Math.max(100, birthRateSec * 1000));
    const deathInterval = setInterval(() => setSessionDeaths(prev => prev + 1), Math.max(100, deathRateSec * 1000));
    return () => { clearInterval(birthInterval); clearInterval(deathInterval); };
  }, [basePopulation]);

  return (
    <>
      <p className="text-4xl font-black text-white drop-shadow-lg relative z-10 flex items-baseline gap-2">
        {(basePopulation + sessionBirths - sessionDeaths).toLocaleString()}
      </p>
      <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <p className="text-[9px] font-black tracking-widest uppercase text-green-400">Births: +{sessionBirths}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
          <p className="text-[9px] font-black tracking-widest uppercase text-red-400">Deaths: -{sessionDeaths}</p>
        </div>
      </div>
    </>
  );
});

export default function CountryHub({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const rawSlug = decodeURIComponent(resolvedParams.slug);
  const countryName = rawSlug.charAt(0).toUpperCase() + rawSlug.slice(1);

  const [liveData, setLiveData] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [exchangeRates, setExchangeRates] = useState<{ usd: string, btc: string } | null>(null);
  const [weather, setWeather] = useState<{ temp: number } | null>(null);
  const [activeTabKey, setActiveTabKey] = useState("cat1");
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const t = (key: string) => translations["EN"][key];
  const categoryKeys = ["cat1", "cat6", "cat2", "cat4", "cat3", "cat5", "cat7", "cat8"];

  // 🟢 SURGICAL API FIX: Bulletproof URL encoding with fallback
  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(rawSlug)}?fullText=true`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
            setLiveData(data[0]);
            setIsFetching(false);
        } else {
            // Fallback for tricky names
            fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(rawSlug)}`)
              .then(res => res.json())
              .then(fallback => {
                  if (Array.isArray(fallback) && fallback.length > 0) setLiveData(fallback[0]);
                  setIsFetching(false);
              }).catch(() => setIsFetching(false));
        }
      })
      .catch(() => setIsFetching(false));
  }, [rawSlug]);

  // 🟢 BTC & USD LIVE CONVERSION FIX
  useEffect(() => {
    if (!liveData || !liveData.currencies) return;
    const currencyCode = Object.keys(liveData.currencies)[0];
    async function fetchMarketData() {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        const fiatData = await res.json();
        const localRateToUsd = fiatData?.rates?.[currencyCode];
        const btcRate = fiatData?.rates?.BTC;
        if (localRateToUsd) {
          setExchangeRates({ 
              usd: (1 / localRateToUsd).toFixed(2),
              btc: btcRate ? ((1 / localRateToUsd) * btcRate).toFixed(8) : "N/A"
          });
        }
      } catch (e) {}
    }
    fetchMarketData();
  }, [liveData]);

  useEffect(() => {
    if (!liveData || !liveData.latlng) return;
    const [lat, lng] = liveData.latlng;
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`)
      .then(res => res.json())
      .then(data => {
        if (data.current_weather) setWeather({ temp: data.current_weather.temperature });
      })
      .catch(() => {});
  }, [liveData]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isAudioPlaying) { audioRef.current.pause(); setIsAudioPlaying(false); } 
    else { audioRef.current.play().then(() => setIsAudioPlaying(true)).catch(() => setIsAudioPlaying(false)); }
  };

  const currencyCode = liveData?.currencies ? Object.keys(liveData.currencies)[0] : null;
  const currencyInfo = currencyCode ? liveData.currencies[currencyCode] : null;
  const flagUrl = liveData?.flags?.svg || "https://flagcdn.com/w320/un.png";
  const bgFlagUrl = liveData?.flags?.svg || "https://flagcdn.com/w1280/un.png";
  const languages = liveData?.languages ? Object.values(liveData.languages).join(", ") : "N/A";
  
  // 🟢 CORRECT AUDIO PATH: Pulling from the exact folder you made
  const formattedAudioSlug = rawSlug.toLowerCase().replace(/\s+/g, '-');
  const audioUrl = `/anthems/${formattedAudioSlug}.mp3`;

  return (
    // 🟢 MOBILE FIX: flex-col md:flex-row makes it stack on phones
    <div className="h-screen w-screen bg-black text-white font-sans selection:bg-white/20 relative overflow-y-auto overflow-x-hidden md:overflow-hidden flex flex-col md:flex-row">
      <audio ref={audioRef} src={audioUrl} preload="none" />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes breathe { 
          0%, 100% { opacity: 0.25; transform: scale(1); filter: blur(6px); } 
          50% { opacity: 0.85; transform: scale(1.04); filter: blur(1px) brightness(1.2); } 
        }
        .animate-breathe { animation: breathe 10s ease-in-out infinite; }
        .glass-panel { background: rgba(10,10,10,0.6); backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}} />

      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="w-[1400px] h-[900px] animate-breathe mix-blend-screen" style={{ backgroundImage: `url(${bgFlagUrl})`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 60%)' }}></div>
      </div>

      <aside className="relative w-full md:w-80 border-b md:border-b-0 md:border-r border-gray-800/40 flex flex-col md:h-screen z-20 shadow-[10px_0_50px_rgba(0,0,0,0.8)] shrink-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/95"></div>
        <div className="relative z-10 p-6 border-b border-gray-800/50 glass-panel">
          <Link href="/" className="text-[10px] font-bold tracking-[0.2em] text-gray-400 hover:text-white uppercase transition-colors flex items-center gap-2 mb-6 w-max">
            <span className="text-blue-500">←</span> {t('back')}
          </Link>
          <div className="flex items-center gap-4">
            <img src={flagUrl} alt="Flag" className="w-10 h-auto rounded shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/10" />
            <h2 className="text-xl font-black tracking-widest uppercase truncate text-blue-400">{countryName}</h2>
          </div>
        </div>
        
        <nav className="relative z-10 flex-1 p-4 overflow-x-auto md:overflow-y-auto glass-panel">
          <p className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-4 px-2 hidden md:block">DOSSIER INDEX</p>
          {/* MOBILE TABS FIX: flex-row overflow-x-auto on phone, flex-col on desktop */}
          <ul className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2">
            {categoryKeys.map((catKey) => (
              <li key={catKey} className="shrink-0 md:shrink">
                <button 
                  onClick={() => setActiveTabKey(catKey)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold tracking-wider transition-all duration-300 border ${activeTabKey === catKey ? 'bg-white/10 text-white border-blue-500/50 md:border-s-4 border-b-4 md:border-b-transparent' : 'text-gray-400 border-transparent hover:bg-white/5 hover:text-blue-400'}`}
                >
                  {t(catKey)}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-10 p-4 border-t border-white/10 bg-black/60 backdrop-blur-md shrink-0 hidden md:block">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-2">
            <Link href="/about" className="text-[8px] font-bold text-gray-500 hover:text-blue-400 uppercase tracking-widest transition-colors">About</Link>
            <Link href="/privacy" className="text-[8px] font-bold text-gray-500 hover:text-blue-400 uppercase tracking-widest transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[8px] font-bold text-gray-500 hover:text-blue-400 uppercase tracking-widest transition-colors">Terms</Link>
            <Link href="/contact" className="text-[8px] font-bold text-gray-500 hover:text-blue-400 uppercase tracking-widest transition-colors">Contact</Link>
          </div>
          <div className="text-center text-[8px] font-mono text-gray-600 tracking-widest uppercase">
            © 2026 // EarthLookup
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col md:h-screen relative z-10 overflow-hidden min-h-[500px]">
        <header className="p-6 md:p-10 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 glass-panel shrink-0">
          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-2 text-white drop-shadow-2xl">{countryName}</h1>
            <p className="text-sm text-gray-400 font-light tracking-widest uppercase">{t('mainframe')} / <span className="text-blue-400">{t('connected')}</span></p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleAudio} className={`flex items-center gap-2 border ${isAudioPlaying ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-black/50'} px-6 py-3 rounded-full hover:bg-white/5 transition-all shadow-lg`}>
              <span className={`text-[10px] font-black tracking-[0.1em] ${isAudioPlaying ? 'text-blue-400' : 'text-gray-400'}`}>
                {isAudioPlaying ? "⏸ PAUSE ANTHEM" : "▶ PLAY ANTHEM"}
              </span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-12 glass-panel">
          <div className="max-w-4xl mx-auto pb-20 md:pb-0">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-8 rounded-full bg-blue-500"></div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">{t(activeTabKey)}</h2>
            </div>

            {/* DYNAMIC API WIDGETS */}
            {activeTabKey === "cat1" && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col justify-center">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-1">{t('time')}</h3>
                  {liveData ? <LiveClock timezones={liveData.timezones} /> : <span>...</span>}
                </div>
                <div className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col justify-center">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-1">{t('temp')}</h3>
                  <p className="text-3xl font-black text-white">{weather ? `${weather.temp}°C` : "..."}</p>
                </div>
                <div className="bg-black/40 border border-white/5 p-5 rounded-2xl col-span-2 flex flex-col justify-center">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-1">Area Profile</h3>
                  <p className="text-xl font-bold text-white">{liveData ? `${liveData.area.toLocaleString()} km²` : "..."}</p>
                </div>
              </div>
            )}

            {activeTabKey === "cat2" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-4">{t('pop')}</h3>
                  {liveData ? <LiveDemographics basePopulation={liveData.population} /> : <span>...</span>}
                </div>
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl flex flex-col justify-center">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2">Official Languages</h3>
                  <p className="text-lg font-bold text-white uppercase tracking-wider">{languages}</p>
                </div>
              </div>
            )}

            {activeTabKey === "cat3" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                   <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-4 w-full text-left">Official Insignia</h3>
                   {liveData?.coatOfArms?.svg ? (
                     <img src={liveData.coatOfArms.svg} alt="Coat of Arms" className="h-32 w-auto drop-shadow-2xl" />
                   ) : (
                     <p className="text-gray-600 font-mono text-xs">NO INSIGNIA ON FILE</p>
                   )}
                </div>
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl flex flex-col justify-center">
                   <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2">Seat of Government</h3>
                   <p className="text-3xl font-black text-white">{liveData?.capital ? liveData.capital[0] : "N/A"}</p>
                </div>
              </div>
            )}

            {activeTabKey === "cat4" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="bg-black/40 border border-white/5 p-5 rounded-2xl">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-1">{t('cur')}</h3>
                  <p className="text-xl font-black text-white">{currencyInfo ? `${currencyInfo.symbol} ${currencyInfo.name}` : "..."}</p>
                </div>
                <div className="bg-black/40 border border-white/5 p-5 rounded-2xl">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-1">1 {currencyCode || "Unit"} = USD</h3>
                  <p className="text-xl font-black text-green-400">${exchangeRates?.usd || "..."}</p>
                </div>
                <div className="bg-black/40 border border-white/5 p-5 rounded-2xl lg:col-span-1 md:col-span-2">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-1">1 {currencyCode || "Unit"} = BTC</h3>
                  <p className="text-xl font-black text-[#F7931A]">₿ {exchangeRates?.btc || "..."}</p>
                </div>
              </div>
            )}

            {/* UNIVERSAL FALLBACK FOR TEXT TABS */}
            {activeTabKey !== "cat1" && activeTabKey !== "cat2" && activeTabKey !== "cat4" && activeTabKey !== "cat3" && (
              <div className="animate-in fade-in duration-500 mt-4 pt-4 border-t border-white/10">
                <p className="text-blue-400 font-bold mb-2 text-sm border-b border-blue-500/20 pb-1">Database Uplink</p>
                <p className="text-gray-400 text-sm italic leading-relaxed">
                  The mainframe is actively compiling deep-level data for {countryName}. We are pulling live demographics, atmospheric conditions, and border data straight from the global API. Detailed historical and geopolitical intelligence briefs will be injected shortly.
                </p>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}