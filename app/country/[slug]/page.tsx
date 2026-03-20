"use client";

import React, { useState, useRef, useEffect, memo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import TrustFooter from "../../../components/TrustFooter";

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
      <p className="text-4xl md:text-5xl font-black text-white drop-shadow-lg relative z-10 flex items-baseline gap-2">
        {(basePopulation + sessionBirths - sessionDeaths).toLocaleString()}
      </p>
      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <p className="text-[10px] font-black tracking-widest uppercase text-green-400">Births: +{sessionBirths}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <p className="text-[10px] font-black tracking-widest uppercase text-red-400">Deaths: -{sessionDeaths}</p>
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
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  
  const [historyData, setHistoryData] = useState<string>("");
  const [isHistoryLoading, setIsHistoryLoading] = useState<boolean>(true);
  
  const audioRef = useRef<HTMLAudioElement>(null);

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
    if (!liveData?.name?.common) return;
    const fetchHistory = async () => {
      try {
        let wikiName = liveData.name.common;
        if (wikiName.toLowerCase() === "georgia") wikiName = "Georgia (country)";
        
        const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=${encodeURIComponent(wikiName)}&format=json&origin=*&explaintext=true`);
        const data = await res.json();
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        
        if (pageId !== "-1" && pages[pageId].extract) {
          let cleanText = pages[pageId].extract;
          const metaSections = /\n==\s*(See also|Notes|References|Further reading|External links|Bibliography|Sources)\s*==[\s\S]*/i;
          cleanText = cleanText.replace(metaSections, '');
          setHistoryData(cleanText);
        } else {
          setHistoryData("== RECORDS CLASSIFIED ==\n\nThe historical archives for this region are currently unavailable or classified by the global network.");
        }
      } catch (e) {
        setHistoryData("== UPLINK FAILED ==\n\nFailed to establish a secure connection to the historical mainframe.");
      } finally {
        setIsHistoryLoading(false);
      }
    };
    fetchHistory();
  }, [liveData]);

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

  const formattedAudioSlug = rawSlug.toLowerCase().replace(/\s+/g, '-');
  const audioUrl = `/anthems/${formattedAudioSlug}.mp3`;

  // 🟢 NEW: Mainframe Error Alert to help you find the exact missing file
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isAudioPlaying) { 
      audioRef.current.pause(); 
      setIsAudioPlaying(false); 
    } else { 
      audioRef.current.play()
        .then(() => setIsAudioPlaying(true))
        .catch((e) => {
          alert(`MAINFRAME ERROR: Anthem not found.\n\nThe system is looking for an exact file named:\n"${formattedAudioSlug}.mp3"\n\nMake sure it is saved exactly like that inside your "public/anthems" folder.`);
          setIsAudioPlaying(false);
        }); 
    }
  };

  const renderHistory = () => {
    if (!historyData) return null;
    return historyData.split('\n').map((line, idx) => {
      const text = line.trim();
      if (!text) return null;
      if (text.startsWith('===') && text.endsWith('===')) {
        return <h4 key={idx} className="text-lg font-bold text-white mt-8 mb-2 tracking-wide flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> {text.replace(/===/g, '').trim()}</h4>;
      } else if (text.startsWith('==') && text.endsWith('==')) {
        return <h3 key={idx} className="text-2xl md:text-3xl font-black text-blue-400 uppercase tracking-widest mt-12 mb-6 border-b border-white/10 pb-3">{text.replace(/==/g, '').trim()}</h3>;
      } else {
        return <p key={idx} className="text-gray-300 text-sm md:text-base leading-relaxed mb-4 text-justify">{text}</p>;
      }
    });
  };

  const currencyCode = liveData?.currencies ? Object.keys(liveData.currencies)[0] : null;
  const currencyInfo = currencyCode ? liveData.currencies[currencyCode] : null;
  const flagUrl = liveData?.flags?.svg || "https://flagcdn.com/w320/un.png";
  const bgFlagUrl = liveData?.flags?.svg || "https://flagcdn.com/w1280/un.png";
  const languages = liveData?.languages ? Object.values(liveData.languages).join(", ") : "N/A";
  
  const popDensity = liveData?.area ? String((liveData.population / liveData.area).toFixed(1)) : "N/A";
  const giniIndex = liveData?.gini ? String(Object.values(liveData.gini)[0]) : "CLASSIFIED";
  const drivingSide = liveData?.car?.side ? String(liveData.car.side).toUpperCase() : "N/A";
  const tld = liveData?.tld ? liveData.tld.join(", ") : "N/A";
  const phoneCode = liveData?.idd?.root ? `${liveData.idd.root}${liveData.idd.suffixes?.[0] || ""}` : "N/A";
  const nativeNameObj = liveData?.name?.nativeName ? Object.values(liveData.name.nativeName)[0] : null;
  const nativeName = nativeNameObj ? (nativeNameObj as any).common : "N/A";
  const mapLink = liveData?.maps?.googleMaps || "#";

  if (isFetching) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-blue-500 font-mono tracking-widest uppercase">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          Decrypting Dossier...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-black text-white font-sans selection:bg-blue-500/30 relative overflow-x-hidden flex flex-col">
      <audio ref={audioRef} src={audioUrl} preload="none" />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes breathe { 
          0%, 100% { opacity: 0.15; transform: scale(1); filter: blur(8px); } 
          50% { opacity: 0.6; transform: scale(1.02); filter: blur(2px) brightness(1.2); } 
        }
        .animate-breathe { animation: breathe 12s ease-in-out infinite; }
        .glass-panel { background: rgba(10,10,10,0.7); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.3); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(59,130,246,0.6); }
      `}} />

      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="w-full h-full animate-breathe mix-blend-screen opacity-50" style={{ backgroundImage: `url(${bgFlagUrl})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)' }}></div>
      </div>

      <nav className="w-full border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl sticky top-0 z-50 px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
            <Link href="/" className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-400 hover:text-white uppercase transition-colors flex items-center gap-2">
              <span className="text-blue-500 text-lg">←</span> BACK TO GLOBE
            </Link>
            <div className="text-[9px] md:text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              MAINFRAME SECURED
            </div>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-end">
          <a href={mapLink} target="_blank" className="text-[10px] font-black tracking-widest text-gray-400 hover:text-white uppercase border border-gray-800 hover:border-white/30 px-4 py-2.5 rounded-full transition-all flex items-center gap-2">
            📍 MAP
          </a>
          <button onClick={toggleAudio} className={`flex items-center gap-2 border ${isAudioPlaying ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'border-gray-700 bg-black/50'} px-6 py-2.5 rounded-full hover:bg-white/5 transition-all`}>
            <div className={`w-2 h-2 rounded-full ${isAudioPlaying ? 'bg-blue-400 animate-ping' : 'bg-gray-500'}`}></div>
            <span className={`text-[10px] font-black tracking-[0.1em] ${isAudioPlaying ? 'text-blue-400' : 'text-gray-400'}`}>
              {isAudioPlaying ? "TRANSMITTING..." : "PLAY ANTHEM"}
            </span>
          </button>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-7xl mx-auto relative z-10 px-4 md:px-8 py-10 pb-24">
        
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 mb-16 border-b border-white/10 pb-10">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <img src={flagUrl} alt="Flag" className="w-32 md:w-48 h-auto rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/10" />
                <div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-2 text-white drop-shadow-2xl uppercase">{countryName}</h1>
                    <p className="text-sm md:text-base text-gray-400 font-light tracking-widest uppercase mb-1">Official Name: <span className="text-white font-medium">{liveData?.name?.official}</span></p>
                    <p className="text-xs text-blue-400 font-mono tracking-widest uppercase">Native: {nativeName}</p>
                </div>
            </div>
            
            {liveData?.coatOfArms?.svg && (
                <div className="flex flex-col items-center justify-center glass-panel p-4 rounded-2xl border border-white/5">
                    <img src={liveData.coatOfArms.svg} alt="Coat of Arms" className="h-24 md:h-32 w-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                    <span className="text-[8px] font-black tracking-[0.2em] text-gray-500 mt-3 uppercase">Official Insignia</span>
                </div>
            )}
        </div>

        <div className="w-full flex items-center gap-4 mb-6">
            <div className="w-1 h-8 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
            <h2 className="text-2xl font-black tracking-widest uppercase text-gray-200">The People & Demographics</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            <div className="bg-black/60 border border-blue-900/30 p-8 rounded-3xl lg:col-span-2 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full group-hover:bg-blue-500/10 transition-all"></div>
                <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-6 uppercase">Live Population Ticker</h3>
                {liveData ? <LiveDemographics basePopulation={liveData.population} /> : <span>...</span>}
            </div>
            <div className="bg-black/60 border border-white/5 p-6 rounded-3xl flex flex-col justify-center">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">Population Density</h3>
                <p className="text-3xl font-black text-white">{popDensity} <span className="text-sm font-light text-gray-400">/ km²</span></p>
            </div>
            <div className="bg-black/60 border border-white/5 p-6 rounded-3xl lg:col-span-2 flex flex-col justify-center">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">Official Languages</h3>
                <p className="text-lg md:text-xl font-bold text-white uppercase tracking-wider">{languages}</p>
            </div>
            <div className="bg-black/60 border border-white/5 p-6 rounded-3xl flex flex-col justify-center">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">Demonym (Citizens)</h3>
                <p className="text-lg font-bold text-blue-400 uppercase">{liveData?.demonyms?.eng?.m || "N/A"}</p>
            </div>
        </div>

        <div className="w-full flex items-center gap-4 mb-6">
            <div className="w-1 h-8 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
            <h2 className="text-2xl font-black tracking-widest uppercase text-gray-200">Geography & Climate</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div className="bg-black/60 border border-white/5 p-6 rounded-3xl col-span-2 flex flex-col justify-center">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">Seat of Government (Capital)</h3>
                <p className="text-3xl md:text-4xl font-black text-white">{liveData?.capital ? liveData.capital[0] : "N/A"}</p>
            </div>
            <div className="bg-black/60 border border-white/5 p-6 rounded-3xl flex flex-col justify-center">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">Local Time</h3>
                {liveData ? <LiveClock timezones={liveData.timezones} /> : <span>...</span>}
            </div>
            <div className="bg-black/60 border border-white/5 p-6 rounded-3xl flex flex-col justify-center">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">Live Temp</h3>
                <p className="text-3xl font-black text-white">{weather ? `${weather.temp}°C` : "..."}</p>
            </div>
            
            <div className="bg-black/60 border border-white/5 p-6 rounded-3xl col-span-2 flex flex-col justify-center">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">Total Land Area</h3>
                <p className="text-2xl font-bold text-white">{liveData ? `${liveData.area.toLocaleString()} km²` : "..."}</p>
            </div>
            <div className="bg-black/60 border border-white/5 p-6 rounded-3xl col-span-2 flex flex-col justify-center">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">Region / Subregion</h3>
                <p className="text-xl font-bold text-white">{liveData?.region} <span className="text-gray-400 font-light">/ {liveData?.subregion}</span></p>
            </div>

            <div className="bg-black/60 border border-white/5 p-6 rounded-3xl col-span-2 md:col-span-3 flex flex-col justify-center">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">Bordering Nations</h3>
                <p className="text-sm font-mono text-white leading-relaxed">{liveData?.borders ? liveData.borders.join(", ") : "ISOLATED LANDMASS / ISLAND"}</p>
            </div>
            <div className="bg-black/60 border border-white/5 p-6 rounded-3xl col-span-2 md:col-span-1 flex flex-col justify-center items-center text-center">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">Landlocked</h3>
                <p className={`text-2xl font-black ${liveData?.landlocked ? 'text-red-400' : 'text-blue-400'}`}>{liveData?.landlocked ? "YES" : "NO"}</p>
            </div>
        </div>

        <div className="w-full flex items-center gap-4 mb-6">
            <div className="w-1 h-8 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
            <h2 className="text-2xl font-black tracking-widest uppercase text-gray-200">Macroeconomics</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            <div className="bg-black/60 border border-white/5 p-6 rounded-3xl flex flex-col justify-center">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">Official Currency</h3>
                <p className="text-3xl font-black text-white">{currencyInfo ? `${currencyInfo.symbol} ${currencyInfo.name}` : "..."}</p>
                <p className="text-sm font-mono text-gray-400 mt-2">CODE: {currencyCode}</p>
            </div>
            <div className="bg-black/60 border border-white/5 p-6 rounded-3xl flex flex-col justify-center border-b-2 border-b-green-500/50">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">1 {currencyCode || "Unit"} = USD</h3>
                <p className="text-4xl font-black text-green-400">${exchangeRates?.usd || "..."}</p>
                <p className="text-xs text-gray-500 mt-2 font-mono uppercase">Live Fiat Market Rate</p>
            </div>
            <div className="bg-black/60 border border-white/5 p-6 rounded-3xl flex flex-col justify-center border-b-2 border-b-[#F7931A]/50">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">1 {currencyCode || "Unit"} = BTC</h3>
                <p className="text-3xl font-black text-[#F7931A]">₿ {exchangeRates?.btc || "..."}</p>
                <p className="text-xs text-gray-500 mt-2 font-mono uppercase">Live Crypto Block Rate</p>
            </div>
            <div className="bg-black/60 border border-white/5 p-6 rounded-3xl col-span-1 md:col-span-3">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">Gini Coefficient (Wealth Inequality Index)</h3>
                <p className={`text-2xl font-bold ${giniIndex === "CLASSIFIED" ? 'text-gray-500' : 'text-blue-400'}`}>{giniIndex}</p>
            </div>
        </div>

        <div className="w-full flex items-center gap-4 mb-12">
            <div className="w-1 h-8 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
            <h2 className="text-2xl font-black tracking-widest uppercase text-gray-200">State & Infrastructure</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div className="bg-black/60 border border-white/5 p-6 rounded-3xl col-span-2 md:col-span-1 flex flex-col justify-center">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">UN Member</h3>
                <p className={`text-2xl font-black ${liveData?.unMember ? 'text-green-400' : 'text-red-400'}`}>{liveData?.unMember ? "VERIFIED" : "UNVERIFIED"}</p>
            </div>
            <div className="bg-black/60 border border-white/5 p-6 rounded-3xl col-span-2 md:col-span-1 flex flex-col justify-center">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">Sovereignty</h3>
                <p className={`text-xl font-black ${liveData?.independent ? 'text-blue-400' : 'text-gray-500'}`}>{liveData?.independent ? "INDEPENDENT" : "DEPENDENT"}</p>
            </div>
            <div className="bg-black/60 border border-white/5 p-6 rounded-3xl col-span-2 flex justify-between items-center">
                <div>
                  <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">Driving Side</h3>
                  <p className="text-3xl font-bold text-blue-400">{drivingSide}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
            </div>

            <div className="bg-black/60 border border-white/5 p-6 rounded-3xl col-span-2 flex flex-col justify-center">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">Intl Calling Code</h3>
                <p className="text-4xl font-mono text-white">+{phoneCode}</p>
            </div>
            <div className="bg-black/60 border border-white/5 p-6 rounded-3xl col-span-2 flex flex-col justify-center">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">Start of Week</h3>
                <p className="text-4xl font-bold text-white capitalize">{liveData?.startOfWeek || "N/A"}</p>
            </div>

            <div className="bg-black/60 border border-white/5 p-6 rounded-3xl col-span-2 flex flex-col justify-center">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">ISO 3166 Codes</h3>
                <p className="text-2xl font-mono text-white">{liveData?.cca2} / {liveData?.cca3}</p>
            </div>
            <div className="bg-black/60 border border-white/5 p-6 rounded-3xl col-span-1 flex flex-col justify-center">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">Top Level Domain</h3>
                <p className="text-2xl font-mono text-blue-400">{tld}</p>
            </div>
            <div className="bg-black/60 border border-white/5 p-6 rounded-3xl col-span-1 flex flex-col justify-center">
                <h3 className="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-2 uppercase">Vehicle Signs</h3>
                <p className="text-2xl font-mono text-white">{liveData?.car?.signs ? liveData.car.signs.join(", ") : "N/A"}</p>
            </div>
        </div>

        <div className="w-full flex items-center gap-4 mb-6 mt-12">
            <div className="w-1 h-8 bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]"></div>
            <h2 className="text-2xl font-black tracking-widest uppercase text-gray-200">Declassified Historical Archives</h2>
        </div>

        <div className="bg-black/80 border border-yellow-500/30 p-6 md:p-12 rounded-3xl mb-16 relative overflow-hidden shadow-[0_0_40px_rgba(234,179,8,0.05)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>
            
            {isHistoryLoading ? (
               <div className="flex flex-col items-center justify-center py-20 gap-4 font-mono text-yellow-500 tracking-widest">
                  <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="animate-pulse">DECRYPTING ARCHIVES FROM GLOBAL MAINFRAME...</p>
               </div>
            ) : (
               <article className="prose prose-invert max-w-none">
                 <p className="text-yellow-500 font-mono text-xs tracking-widest uppercase mb-8 border-b border-yellow-500/20 pb-4">
                   &gt; SECURE UPLINK ESTABLISHED. SHOWING UNREDACTED HISTORY FOR: {countryName}
                 </p>
                 {renderHistory()}
               </article>
            )}
        </div>

        <div className="w-full h-32 bg-black/80 border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center relative overflow-hidden mb-16 mt-8">
            <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay"></div>
            <span className="text-gray-500 font-mono text-xs uppercase tracking-widest font-bold z-10 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
              Google AdSense Zone
            </span>
        </div>

      </main>

      <div className="relative z-20 bg-black/90 border-t border-white/10 backdrop-blur-md">
        <TrustFooter />
      </div>

    </div>
  );
}