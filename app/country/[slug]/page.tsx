"use client";

import React, { useState, useRef, useEffect, memo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const translations: Record<string, Record<string, string>> = {
  EN: {
    pop: "Live Population", cap: "Capital", cur: "Currency",
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
  return <p className="text-2xl md:text-3xl font-black text-white drop-shadow-lg font-mono tracking-tighter">{localTime}</p>;
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
      <p className="text-3xl md:text-4xl font-black text-white drop-shadow-lg relative z-10 flex items-baseline gap-2">
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

export default function CountryHub() {
  const params = useParams();
  const rawSlug = decodeURIComponent((params?.slug as string) || "");
  const countryName = rawSlug.charAt(0).toUpperCase() + rawSlug.slice(1);

  const [liveData, setLiveData] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [exchangeRates, setExchangeRates] = useState<{ usd: string, btc: string } | null>(null);
  const [weather, setWeather] = useState<{ temp: number, wind: number } | null>(null);
  const [activeTabKey, setActiveTabKey] = useState("cat1");
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const t = (key: string) => translations["EN"][key];
  const categoryKeys = ["cat1", "cat2", "cat3", "cat4", "cat5", "cat6", "cat7", "cat8"];

  useEffect(() => {
    if (!rawSlug) return;
    fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(rawSlug)}?fullText=true`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
            setLiveData(data[0]);
            setIsFetching(false);
        } else {
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
        if (data.current_weather) setWeather({ temp: data.current_weather.temperature, wind: data.current_weather.windspeed });
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
  
  const formattedAudioSlug = rawSlug.toLowerCase().replace(/\s+/g, '-');
  const audioUrl = `/anthems/${formattedAudioSlug}.mp3`;

  // 🟢 VERCEL STRICT TYPESCRIPT FIX: Wrapped dynamic objects in String()
  const popDensity = liveData?.area ? String((liveData.population / liveData.area).toFixed(1)) : "N/A";
  const giniIndex = liveData?.gini ? String(Object.values(liveData.gini)[0]) : "CLASSIFIED";
  const drivingSide = liveData?.car?.side ? String(liveData.car.side).toUpperCase() : "N/A";
  const tld = liveData?.tld ? liveData.tld.join(", ") : "N/A";
  const phoneCode = liveData?.idd?.root ? `${liveData.idd.root}${liveData.idd.suffixes?.[0] || ""}` : "N/A";

  return (
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
          <ul className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2">
            {categoryKeys.map((catKey) => (
              <li key={catKey} className="shrink-0 md:shrink">
                <button 
                  onClick={() => setActiveTabKey(catKey)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold tracking-wider transition-all duration-300 border ${activeTabKey === catKey ? 'bg-white/10 text-white border-blue-500/50 md:border-s-4 border-b-4 md:border-b-transparent shadow-[inset_4px_0_10px_rgba(59,130,246,0.1)]' : 'text-gray-400 border-transparent hover:bg-white/5 hover:text-blue-400'}`}
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-2 text-white drop-shadow-2xl">{countryName}</h1>
            <p className="text-xs md:text-sm text-gray-400 font-light tracking-widest uppercase">{t('mainframe')} / <span className="text-blue-400">{t('connected')}</span></p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleAudio} className={`flex items-center gap-2 border ${isAudioPlaying ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-black/50'} px-6 py-3 rounded-full hover:bg-white/5 transition-all shadow-lg`}>
              <div className={`w-2 h-2 rounded-full ${isAudioPlaying ? 'bg-blue-400 animate-ping' : 'bg-gray-500'}`}></div>
              <span className={`text-[10px] font-black tracking-[0.1em] ${isAudioPlaying ? 'text-blue-400' : 'text-gray-400'}`}>
                {isAudioPlaying ? "TRANSMITTING..." : "▶ PLAY ANTHEM"}
              </span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 glass-panel">
          <div className="max-w-6xl mx-auto pb-20 md:pb-0">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-8 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight uppercase">{t(activeTabKey)}</h2>
            </div>

            {/* TAB 1: GEOGRAPHY & CLIMATE */}
            {activeTabKey === "cat1" && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col justify-center">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2">{t('time')}</h3>
                  {liveData ? <LiveClock timezones={liveData.timezones} /> : <span>...</span>}
                </div>
                <div className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col justify-center">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2">{t('temp')}</h3>
                  <p className="text-2xl md:text-3xl font-black text-white">{weather ? `${weather.temp}°C` : "..."}</p>
                </div>
                <div className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col justify-center">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2">Wind Speed</h3>
                  <p className="text-xl md:text-2xl font-black text-white">{weather ? `${weather.wind} km/h` : "..."}</p>
                </div>
                <div className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col justify-center">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2">Area Profile</h3>
                  <p className="text-xl md:text-2xl font-bold text-white">{liveData ? `${liveData.area.toLocaleString()} km²` : "..."}</p>
                </div>
                <div className="bg-black/40 border border-white/5 p-5 rounded-2xl col-span-2 flex flex-col justify-center">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2">Global Coordinates</h3>
                  <p className="text-xl font-mono text-blue-400">{liveData?.latlng ? `${liveData.latlng[0].toFixed(2)}° N, ${liveData.latlng[1].toFixed(2)}° E` : "..."}</p>
                </div>
                <div className="bg-black/40 border border-white/5 p-5 rounded-2xl col-span-2 flex flex-col justify-center">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2">Region / Subregion</h3>
                  <p className="text-lg font-bold text-white">{liveData?.region} / <span className="text-gray-400">{liveData?.subregion}</span></p>
                </div>
                <div className="bg-black/40 border border-white/5 p-5 rounded-2xl col-span-2 md:col-span-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2">Bordering Nations</h3>
                    <p className="text-sm font-mono text-white">{liveData?.borders ? liveData.borders.join(", ") : "ISOLATED LANDMASS / ISLAND"}</p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2">Landlocked</h3>
                    <p className={`text-lg font-bold ${liveData?.landlocked ? 'text-red-400' : 'text-blue-400'}`}>{liveData?.landlocked ? "YES" : "NO"}</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: THE PEOPLE */}
            {activeTabKey === "cat2" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl lg:col-span-2">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-4">{t('pop')}</h3>
                  {liveData ? <LiveDemographics basePopulation={liveData.population} /> : <span>...</span>}
                </div>
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl flex flex-col justify-center">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2">Population Density</h3>
                  <p className="text-3xl font-black text-white">{popDensity} <span className="text-sm font-light text-gray-400">/ km²</span></p>
                </div>
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl lg:col-span-2 flex flex-col justify-center">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2">Official Languages</h3>
                  <p className="text-lg md:text-xl font-bold text-white uppercase tracking-wider">{languages}</p>
                </div>
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl flex flex-col justify-center">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2">Demonym (Citizens)</h3>
                  <p className="text-lg font-bold text-blue-400 uppercase">{liveData?.demonyms?.eng?.m || "N/A"}</p>
                </div>
              </div>
            )}

            {/* TAB 3: STATE & SECURITY */}
            {activeTabKey === "cat3" && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl col-span-2 flex flex-col items-center justify-center text-center">
                   <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-4 w-full text-left">Official Insignia / Coat of Arms</h3>
                   {liveData?.coatOfArms?.svg ? (
                     <img src={liveData.coatOfArms.svg} alt="Coat of Arms" className="h-32 w-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                   ) : (
                     <p className="text-gray-600 font-mono text-xs border border-gray-800 p-4 rounded-lg">NO INSIGNIA ON FILE</p>
                   )}
                </div>
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl col-span-2 flex flex-col justify-center">
                   <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2">Seat of Government</h3>
                   <p className="text-3xl font-black text-white">{liveData?.capital ? liveData.capital[0] : "N/A"}</p>
                   <p className="text-sm text-gray-400 mt-2">Official Name: <span className="text-white">{liveData?.name?.official}</span></p>
                </div>
                <div className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col justify-center">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2">UN Member</h3>
                  <p className={`text-xl font-black ${liveData?.unMember ? 'text-green-400' : 'text-red-400'}`}>{liveData?.unMember ? "VERIFIED" : "UNVERIFIED"}</p>
                </div>
                <div className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col justify-center">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2">Sovereignty</h3>
                  <p className={`text-xl font-black ${liveData?.independent ? 'text-blue-400' : 'text-gray-500'}`}>{liveData?.independent ? "INDEPENDENT" : "DEPENDENT TERRITORY"}</p>
                </div>
                <div className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col justify-center">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2">ISO 3166 Codes</h3>
                  <p className="text-xl font-mono text-white">{liveData?.cca2} / {liveData?.cca3}</p>
                </div>
                <div className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col justify-center">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2">Top Level Domain</h3>
                  <p className="text-xl font-mono text-blue-400">{tld}</p>
                </div>
              </div>
            )}

            {/* TAB 4: MACROECONOMICS */}
            {activeTabKey === "cat4" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl flex flex-col justify-center">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2">{t('cur')}</h3>
                  <p className="text-2xl md:text-3xl font-black text-white">{currencyInfo ? `${currencyInfo.symbol} ${currencyInfo.name}` : "..."}</p>
                  <p className="text-sm font-mono text-gray-400 mt-1">CODE: {currencyCode}</p>
                </div>
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl flex flex-col justify-center border-b-2 border-b-green-500/50">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2">1 {currencyCode || "Unit"} = USD</h3>
                  <p className="text-3xl font-black text-green-400">${exchangeRates?.usd || "..."}</p>
                  <p className="text-xs text-gray-500 mt-2 font-mono uppercase">Live Fiat Market Rate</p>
                </div>
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl flex flex-col justify-center border-b-2 border-b-[#F7931A]/50">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2">1 {currencyCode || "Unit"} = BTC</h3>
                  <p className="text-3xl font-black text-[#F7931A]">₿ {exchangeRates?.btc || "..."}</p>
                  <p className="text-xs text-gray-500 mt-2 font-mono uppercase">Live Crypto Block Rate</p>
                </div>
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl col-span-1 md:col-span-3">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2">Gini Coefficient (Wealth Inequality Index)</h3>
                  <p className={`text-xl font-bold ${giniIndex === "CLASSIFIED" ? 'text-gray-500' : 'text-blue-400'}`}>{giniIndex}</p>
                </div>
              </div>
            )}

            {/* TAB 5: TECH & INFRASTRUCTURE */}
            {activeTabKey === "cat5" && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl col-span-2">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2">International Calling Code</h3>
                  <p className="text-4xl font-mono text-white">+{phoneCode}</p>
                </div>
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl col-span-2">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2">Start of Week</h3>
                  <p className="text-4xl font-bold text-white capitalize">{liveData?.startOfWeek || "N/A"}</p>
                </div>
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl col-span-2 flex justify-between items-center">
                  <div>
                    <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2">Driving Side</h3>
                    <p className="text-2xl font-bold text-blue-400">{drivingSide}</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                </div>
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl col-span-2">
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2">Vehicle License Code</h3>
                  <p className="text-2xl font-mono text-white">{liveData?.car?.signs ? liveData.car.signs.join(", ") : "N/A"}</p>
                </div>
              </div>
            )}

            {/* UNIVERSAL TERMINAL FALLBACK FOR EMPTY TABS (6, 7, 8) */}
            {(activeTabKey === "cat6" || activeTabKey === "cat7" || activeTabKey === "cat8") && (
              <div className="bg-black/80 border border-blue-500/30 p-8 rounded-2xl relative overflow-hidden font-mono text-sm shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
                <p className="text-blue-400 font-bold mb-4 border-b border-blue-500/20 pb-2 flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span> 
                   SECURE DATABASE UPLINK
                </p>
                <div className="space-y-2 text-gray-400">
                   <p className="text-green-400">&gt; ESTABLISHING CONNECTION TO GLOBAL NODE...</p>
                   <p>&gt; AUTHENTICATING ACCESS FOR: <span className="text-white">{countryName.toUpperCase()}</span></p>
                   <p>&gt; ENCRYPTING PACKETS...</p>
                   <p>&gt; <span className="animate-pulse text-yellow-500">DECRYPTING CLASSIFIED RECORDS... PLEASE WAIT.</span></p>
                   <p className="mt-4 pt-4 border-t border-white/5 italic">
                     The mainframe is currently compiling deeper intelligence arrays for this sector. Archival history, advanced health metrics, and classified logistical routes will be injected into this terminal when the secure connection stabilizes.
                   </p>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}