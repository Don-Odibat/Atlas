"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export default function GlobalCommandCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [nations, setNations] = useState<any[]>([]);
  const [worldPolygons, setWorldPolygons] = useState<any[]>([]);
  const [isIdle, setIsIdle] = useState(true);
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [selectedTarget, setSelectedTarget] = useState<any>(null);

  const router = useRouter();
  
  // FIXED: Added null as the initial value to satisfy the Vercel build error
  const globeRef = useRef<any>(null);

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const resetIdle = () => {
      setIsIdle(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsIdle(true), 3000); 
    };
    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('mousedown', resetIdle);
    window.addEventListener('wheel', resetIdle, { passive: true });
    window.addEventListener('keydown', resetIdle);
    resetIdle();
    return () => {
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('mousedown', resetIdle);
      window.removeEventListener('wheel', resetIdle);
      window.removeEventListener('keydown', resetIdle);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = isIdle && !isFocused && !isZoomedIn && !selectedTarget;
        controls.autoRotateSpeed = 0.12; 
        controls.enableDamping = true;
        controls.dampingFactor = 0.07;
      }
    }
  }, [isIdle, isFocused, isZoomedIn, nations.length, selectedTarget]); 

  useEffect(() => {
    if (globeRef.current) {
        const savedCamera = sessionStorage.getItem('earthLookupCamera');
        if (savedCamera) {
            globeRef.current.pointOfView(JSON.parse(savedCamera), 0);
        } else {
            globeRef.current.pointOfView({ altitude: 2.5 });
        }
    }
  }, [dimensions.width]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson')
      .then(res => res.json())
      .then(geo => {
        const filteredFeatures = geo.features.filter((f: any) => f.properties.name !== "Israel");
        setWorldPolygons(filteredFeatures);
      });

    fetch("https://restcountries.com/v3.1/all?fields=name,latlng,cca2,flags,capital,population")
      .then(res => res.json())
      .then(data => {
        const formatted = data
          .filter((c: any) => c.latlng?.length === 2 && c.name.common !== "Israel") 
          .map((c: any) => {
            const aliases: string[] = [];
            if (c.cca2 === 'US') aliases.push('USA', 'America', 'United States of America');
            if (c.cca2 === 'GB') aliases.push('UK', 'England', 'Great Britain', 'United Kingdom');
            if (c.cca2 === 'JO') aliases.push('JOR', 'Hashemite Kingdom of Jordan');
            if (c.cca2 === 'PS') aliases.push('Palestine State', 'Gaza');
            if (c.cca2 === 'AE') aliases.push('UAE', 'Dubai', 'Emirates');
            if (c.cca2 === 'SA') aliases.push('KSA', 'Saudi');
            
            return {
              lat: c.latlng[0],
              lng: c.latlng[1],
              name: c.name.common,
              slug: c.name.common, 
              code: c.cca2, 
              flag: c.flags.svg,
              capital: c.capital && c.capital.length > 0 ? c.capital[0] : "N/A",
              population: new Intl.NumberFormat().format(c.population || 0),
              searchTerms: aliases.map(a => a.toLowerCase())
            };
          });
        setNations(formatted);
      });
  }, []);

  const filteredNations = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return [];
    
    return nations.filter(n => 
        n.name.toLowerCase().startsWith(query) || 
        n.searchTerms.some(term => term.startsWith(query)) || 
        n.code.toLowerCase() === query
    );
  }, [searchQuery, nations]);

  const flyToTarget = (target: any) => {
    if (target && globeRef.current) {
      setIsFocused(false); 
      setSearchQuery(""); 
      setSelectedTarget(target); 
      globeRef.current.pointOfView({ lat: target.lat, lng: target.lng, altitude: 0.5 }, 4000);
    }
  };

  const navigateToDossier = (slug: string) => {
      if (globeRef.current) {
          const currentView = globeRef.current.pointOfView();
          sessionStorage.setItem('earthLookupCamera', JSON.stringify(currentView));
      }
      router.push(`/country/${slug}`);
  };

  const handleZoom = (direction: 'in' | 'out') => {
    if (globeRef.current) {
      const currentPov = globeRef.current.pointOfView();
      let newAltitude = direction === 'in' 
        ? Math.max(0.1, currentPov.altitude * 0.7) 
        : Math.min(5.0, currentPov.altitude * 1.4);
        
      globeRef.current.pointOfView({ ...currentPov, altitude: newAltitude }, 400);
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-black relative font-sans text-white">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif !important; background: black; margin: 0; padding: 0; }
        .country-wrapper { position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer; pointer-events: auto; will-change: transform; }
        .country-dot { width: 4px; height: 4px; background-color: #3b82f6; border-radius: 50%; box-shadow: 0 0 8px 2px rgba(59, 130, 246, 0.8); margin-bottom: 3px; transition: all 0.3s ease; }
        @keyframes radar-ping { 0% { box-shadow: 0 0 0 0 rgba(0, 246, 255, 0.8); } 70% { box-shadow: 0 0 0 20px rgba(0, 246, 255, 0); } 100% { box-shadow: 0 0 0 0 rgba(0, 246, 255, 0); } }
        .country-dot.target-ping { width: 8px; height: 8px; background-color: #00f6ff; box-shadow: 0 0 15px 5px rgba(0, 246, 255, 0.9); animation: radar-ping 2s infinite cubic-bezier(0.66, 0, 0, 1); }
        .country-label { color: rgba(255, 255, 255, 0.6); font-size: 8px; font-weight: 700; letter-spacing: 0.5px; text-shadow: 0 0 6px rgba(0,0,0,1); transition: all 0.3s ease; }
        .country-popover { position: absolute; bottom: 24px; background: rgba(10, 10, 10, 0.98); border: 1px solid rgba(255, 255, 255, 0.15); padding: 12px; border-radius: 4px; display: flex; flex-direction: column; gap: 10px; opacity: 0; visibility: hidden; transform: translateY(5px) scale(0.95); pointer-events: none; transition: opacity 0.3s, transform 0.3s; box-shadow: 0 10px 30px rgba(0,0,0,0.9); min-width: 150px; text-align: left; }
        .country-popover.force-open { opacity: 1 !important; visibility: visible !important; transform: translateY(0) scale(1) !important; border-color: #00f6ff; box-shadow: 0 0 30px rgba(0, 246, 255, 0.2); pointer-events: auto; }
        .country-wrapper:hover .country-popover { opacity: 1; visibility: visible; transform: translateY(0) scale(1); }
        .country-wrapper:hover .country-label { color: #3b82f6; transform: scale(1.2); text-shadow: 0 0 10px rgba(59,130,246,0.5); }
        .country-wrapper:hover .country-dot:not(.target-ping) { transform: scale(1.5); background-color: #60a5fa; box-shadow: 0 0 12px 4px rgba(59, 130, 246, 0.9); }
        .popover-header { display: flex; align-items: center; gap: 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 8px; }
        .popover-data { display: flex; flex-direction: column; gap: 4px; font-size: 9px; color: #9ca3af; letter-spacing: 0.5px; }
        .popover-data span { color: white; font-weight: 600; }
        .popover-arrow { display: flex; align-items: center; gap: 4px; font-size: 8px; font-weight: 800; color: #3b82f6; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; transition: color 0.2s; }
        .popover-arrow:hover { color: #00f6ff; }
        .popover-arrow span { font-size: 12px; margin-bottom: 1px; }
      `}} />

      <div className={`fixed top-8 md:top-12 left-1/2 -translate-x-1/2 z-[200] max-w-2xl w-[95%] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${showBanner ? 'translate-y-0 opacity-100' : '-translate-y-32 opacity-0 pointer-events-none'}`}>
        <div className="bg-black/85 backdrop-blur-2xl border border-blue-500/40 p-6 md:p-8 rounded-3xl shadow-[0_20px_60px_rgba(37,99,235,0.25)] pointer-events-auto">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
              <h3 className="text-blue-400 font-black tracking-widest text-[10px] md:text-xs uppercase">Welcome to EarthLookup 🌍</h3>
            </div>
            <button onClick={() => setShowBanner(false)} className="text-gray-400 hover:text-white hover:bg-white/10 p-1.5 md:p-2 rounded-lg transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <p className="text-gray-200 text-sm md:text-base font-light leading-relaxed">
            Hey, thanks for dropping by! 👋 You can spin the globe or use the search bar to pull up the full intelligence dossier on any country. 
            <br/><br/>
            We're constantly improving this site to make it the ultimate educational tool. 🚀 If you spot a bug, have a cool idea, or just want to share your opinion, please hit the <strong className="text-white">Contact</strong> link below. We actually read every single message and take your feedback to heart. Enjoy the dive! ✌️
          </p>
        </div>
      </div>

      <div className="fixed top-8 left-8 z-[100] pointer-events-none select-none hidden md:block">
        <h1 className="text-xl md:text-2xl font-black tracking-tighter m-0 p-0 leading-none">EARTH<span className="text-blue-500">LOOKUP</span><span className="text-[10px] text-gray-500 ml-1">.COM</span></h1>
        <h2 className="text-[8px] font-bold tracking-[0.2em] text-gray-400 uppercase mt-1">Ultimate Geography Encyclopedia</h2>
      </div>

      <div className="fixed bottom-8 left-4 md:left-8 z-[100] flex flex-col gap-3 bg-black/50 border border-white/10 p-5 rounded-xl backdrop-blur-md shadow-2xl pointer-events-auto">
        <div className="flex gap-4">
          <Link href="/about" className="text-[9px] md:text-[10px] font-bold text-gray-400 hover:text-blue-400 uppercase tracking-widest transition-colors">About</Link>
          <Link href="/privacy" className="text-[9px] md:text-[10px] font-bold text-gray-400 hover:text-blue-400 uppercase tracking-widest transition-colors">Privacy</Link>
          <Link href="/terms" className="text-[9px] md:text-[10px] font-bold text-gray-400 hover:text-blue-400 uppercase tracking-widest transition-colors">Terms</Link>
          <Link href="/contact" className="text-[9px] md:text-[10px] font-bold text-gray-400 hover:text-blue-400 uppercase tracking-widest transition-colors">Contact</Link>
        </div>
        <div className="text-[8px] md:text-[9px] font-mono text-gray-600 font-bold tracking-widest uppercase">© 2026 // EarthLookup Systems</div>
      </div>

      <div className="fixed top-8 right-4 md:right-8 z-[100] w-[calc(100%-2rem)] md:w-full md:max-w-[280px]">
        <div className="bg-black/60 border border-white/10 rounded-full flex items-center px-4 backdrop-blur-md shadow-lg pointer-events-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 min-w-[16px]"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" className="w-full bg-transparent border-none py-3 px-3 text-sm focus:outline-none placeholder:text-gray-500 font-medium tracking-wide" placeholder="Search a country..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setTimeout(() => setIsFocused(false), 200)} onKeyDown={(e) => e.key === 'Enter' && filteredNations[0] && flyToTarget(filteredNations[0])} />
        </div>
        {searchQuery && isFocused && (
          <div className="mt-2 bg-black/90 border border-white/10 rounded-xl max-h-60 overflow-y-auto backdrop-blur-xl shadow-2xl pointer-events-auto">
            {filteredNations.slice(0, 10).map(n => (
              <button key={n.slug} onClick={() => flyToTarget(n)} className="w-full text-left px-4 py-3 hover:bg-blue-500/10 text-sm flex items-center gap-3 border-b border-white/5 last:border-0">
                <img src={n.flag} className="w-4 h-auto rounded-sm" alt="" /> 
                <div className="flex flex-col"><span className="font-bold">{n.name}</span><span className="text-[9px] text-gray-500 uppercase tracking-tighter">{n.code}</span></div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-12 right-4 md:right-8 z-[100] flex flex-col bg-black/50 border border-white/10 rounded-lg backdrop-blur-md overflow-hidden shadow-2xl pointer-events-auto">
        <button onClick={() => handleZoom('in')} className="w-10 h-10 flex items-center justify-center text-white hover:bg-blue-500/20 hover:text-blue-400 transition-colors border-b border-white/10 text-xl font-light">+</button>
        <button onClick={() => handleZoom('out')} className="w-10 h-10 flex items-center justify-center text-white hover:bg-blue-500/20 hover:text-blue-400 transition-colors text-xl font-light">−</button>
      </div>

      <div className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing">
        {dimensions.width > 0 && (
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            polygonsData={worldPolygons}
            polygonSideColor={() => 'rgba(0, 0, 0, 0.4)'}
            polygonCapColor={(poly: any) => selectedTarget && poly.properties.name === selectedTarget.name ? 'rgba(0, 246, 255, 0.3)' : 'rgba(10, 10, 10, 0.6)'}
            polygonStrokeColor={(poly: any) => selectedTarget && poly.properties.name === selectedTarget.name ? '#00f6ff' : '#1e3a8a'}
            polygonHoverColor={() => 'rgba(59, 130, 246, 0.3)'}
            onPolygonClick={(poly: any) => {
                const target = nations.find(n => n.name === poly.properties.name);
                if (target) {
                    if (selectedTarget && selectedTarget.name === target.name) navigateToDossier(target.slug);
                    else flyToTarget(target);
                }
            }}
            htmlElementsData={nations}
            htmlLat="lat"
            htmlLng="lng"
            htmlElement={(d: any) => {
              const isTarget = selectedTarget && selectedTarget.slug === d.slug;
              const el = document.createElement('div');
              el.className = 'country-wrapper';
              el.style.zIndex = isTarget ? '1000' : '1'; 
              el.innerHTML = `
                <div class="country-dot ${isTarget ? 'target-ping' : ''}"></div>
                <div class="country-popover ${isTarget ? 'force-open' : ''}">
                  <div class="popover-header"><img src="${d.flag}" style="width: 22px; border-radius: 2px;" /> <span style="font-weight: 800; font-size: 11px; color: white; letter-spacing: 0.5px;">${d.name}</span></div>
                  <div class="popover-data"><div>CAPITAL: <span>${d.capital}</span></div><div>POP: <span>${d.population}</span></div></div>
                  <div class="popover-arrow ${isTarget ? 'animate-pulse text-[#00f6ff]' : ''}">${isTarget ? 'CLICK TO ACCESS' : 'ACCESS DOSSIER'} <span>→</span></div>
                </div>
                <div class="country-label" style="${isTarget ? 'color: #00f6ff;' : ''}">${d.name}</div>
              `;
              el.onclick = () => { if (isTarget) navigateToDossier(d.slug); else flyToTarget(d); };
              return el;
            }}
            onZoom={(pov: any) => setIsZoomedIn(pov.altitude < 1.8)}
          />
        )}
      </div>
    </div>
  );
}