// @ts-nocheck
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
  const [nationLookup, setNationLookup] = useState<Record<string, any>>({}); 
  const [worldPolygons, setWorldPolygons] = useState<any[]>([]);
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [selectedTarget, setSelectedTarget] = useState<any>(null);

  const router = useRouter();
  const globeRef = useRef<any>(null);
  const elementsCache = useRef<Record<string, HTMLElement>>({}); 

  const getInitialAltitude = (w: number) => (w < 768 ? 5.5 : 2.2);

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = !isZoomedIn && !selectedTarget;
        controls.autoRotateSpeed = 0.4; 
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
      }
    }
  }, [isZoomedIn, selectedTarget, nations.length]); 

  useEffect(() => {
    if (globeRef.current && dimensions.width > 0) {
        globeRef.current.pointOfView({ altitude: getInitialAltitude(dimensions.width) }, 0);
    }
  }, [dimensions.width]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson')
      .then((res: any) => res.json())
      .then((geo: any) => {
        const filteredFeatures = geo.features.filter((f: any) => f.properties.name !== "Israel");
        setWorldPolygons(filteredFeatures);
      });

    fetch("https://restcountries.com/v3.1/all?fields=name,latlng,cca2,flags,capital,population")
      .then((res: any) => res.json())
      .then((data: any) => {
        const lookupMap: Record<string, any> = {};

        const formatted = data
          .filter((c: any) => c.latlng?.length === 2 && c.name.common !== "Israel") 
          .map((c: any) => {
            const aliases: string[] = [];
            if (c.cca2 === 'US') aliases.push('USA', 'America', 'United States of America');
            if (c.cca2 === 'GB') aliases.push('UK', 'England', 'Great Britain', 'United Kingdom');
            if (c.cca2 === 'JO') aliases.push('JOR', 'Hashemite Kingdom of Jordan');
            if (c.cca2 === 'PS') aliases.push('Palestine State', 'Gaza');
            
            const countryData = {
              lat: c.latlng[0],
              lng: c.latlng[1],
              name: c.name.common,
              slug: c.name.common, 
              code: c.cca2, 
              flag: c.flags.svg,
              capital: c.capital && c.capital.length > 0 ? c.capital[0] : "N/A",
              population: new Intl.NumberFormat().format(c.population || 0),
              searchTerms: aliases.map((a: string) => a.toLowerCase())
            };

            lookupMap[countryData.name.toLowerCase()] = countryData;
            countryData.searchTerms.forEach((term: string) => {
                lookupMap[term] = countryData;
            });

            return countryData;
          });
        setNations(formatted);
        setNationLookup(lookupMap);
      });
  }, []);

  const filteredNations = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return [];
    return nations.filter((n: any) => 
        n.name.toLowerCase().startsWith(query) || 
        n.searchTerms.some((term: string) => term.startsWith(query)) || 
        n.code.toLowerCase() === query
    );
  }, [searchQuery, nations]);

  const flyToTarget = (target: any) => {
    if (target && globeRef.current) {
      setIsFocused(false); 
      setSearchQuery(""); 
      setSelectedTarget(target); 
      setIsZoomedIn(true);
      globeRef.current.pointOfView({ lat: target.lat, lng: target.lng, altitude: 0.6 }, 2500);
    }
  };

  const navigateToDossier = (slug: string) => {
      router.push(`/country/${slug}`);
  };

  const handleZoom = (direction: 'in' | 'out') => {
    if (globeRef.current) {
      const currentPov = globeRef.current.pointOfView();
      let newAltitude = direction === 'in' 
        ? Math.max(0.1, currentPov.altitude * 0.7) 
        : Math.min(5.0, currentPov.altitude * 1.4);
        
      globeRef.current.pointOfView({ ...currentPov, altitude: newAltitude }, 400);
      setIsZoomedIn(newAltitude < 1.8);
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative font-sans text-white">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800;900&display=swap');
        
        body { 
          font-family: 'Inter', sans-serif !important; 
          background-color: #050505; 
          background-image: url('https://unpkg.com/three-globe/example/img/night-sky.png');
          background-size: cover;
          background-position: center;
          margin: 0; 
          padding: 0; 
        }

        .country-wrapper { position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer; pointer-events: auto; will-change: transform; z-index: 10; }
        .country-dot { width: 4px; height: 4px; background-color: #3b82f6; border-radius: 50%; box-shadow: 0 0 8px 2px rgba(59, 130, 246, 0.8); margin-bottom: 3px; transition: all 0.3s ease; }
        @keyframes radar-ping { 0% { box-shadow: 0 0 0 0 rgba(0, 246, 255, 0.8); } 70% { box-shadow: 0 0 0 20px rgba(0, 246, 255, 0); } 100% { box-shadow: 0 0 0 0 rgba(0, 246, 255, 0); } }
        .country-dot.target-ping { width: 8px; height: 8px; background-color: #00f6ff; box-shadow: 0 0 15px 5px rgba(0, 246, 255, 0.9); animation: radar-ping 2s infinite cubic-bezier(0.66, 0, 0, 1); }
        .country-label { color: rgba(255, 255, 255, 0.5); font-size: 8px; font-weight: 600; letter-spacing: 0.5px; text-shadow: 0 0 4px rgba(0,0,0,1); transition: all 0.3s ease; white-space: nowrap; }
        
        .country-popover { position: absolute; bottom: 24px; background: rgba(10, 10, 10, 0.85); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); padding: 12px; border-radius: 8px; display: flex; flex-direction: column; gap: 8px; opacity: 0; visibility: hidden; transform: translateY(5px) scale(0.95); pointer-events: none; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 10px 30px rgba(0,0,0,0.9); min-width: 150px; text-align: left; z-index: 50; }
        .country-popover.force-open { opacity: 1 !important; visibility: visible !important; transform: translateY(0) scale(1) !important; border-color: #00f6ff; box-shadow: 0 0 30px rgba(0, 246, 255, 0.15); pointer-events: auto; }
        .country-wrapper:hover .country-popover { opacity: 1; visibility: visible; transform: translateY(0) scale(1); }
        .country-wrapper:hover .country-label { color: #00f6ff; transform: scale(1.1); text-shadow: 0 0 10px rgba(0,246,255,0.5); font-weight: 800; }
        .country-wrapper:hover .country-dot:not(.target-ping) { transform: scale(1.5); background-color: #00f6ff; box-shadow: 0 0 12px 4px rgba(0, 246, 255, 0.6); }
        
        .popover-header { display: flex; align-items: center; gap: 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 8px; }
        .popover-data { display: flex; flex-direction: column; gap: 4px; font-size: 9px; color: #9ca3af; letter-spacing: 0.5px; }
        .popover-data span { color: white; font-weight: 600; }
        .popover-arrow { display: flex; align-items: center; gap: 4px; font-size: 8px; font-weight: 800; color: #3b82f6; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; transition: color 0.2s; }
        .popover-arrow:hover { color: #00f6ff; }
      `}} />

      {/* 🟢 OVERRIDE: Z-index pushed to 400 to sit firmly above the Search Bar */}
      <div className={`fixed top-8 md:top-12 left-1/2 -translate-x-1/2 z-[400] max-w-2xl w-[92%] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${showBanner ? 'translate-y-0 opacity-100' : '-translate-y-32 opacity-0 pointer-events-none'}`}>
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] pointer-events-auto">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
              <h3 className="text-white font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase opacity-90">Welcome to EarthLookup</h3>
            </div>
            <button onClick={() => setShowBanner(false)} className="text-gray-400 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <p className="text-gray-200 text-sm md:text-base font-light leading-relaxed opacity-90">
            Spin the globe or use the search bar to pull up the full intelligence dossier on any country. Used by schools and explorers for massive global info in one place. 🚀
          </p>
        </div>
      </div>

      <div className="fixed top-8 left-8 z-[100] pointer-events-none select-none hidden md:block">
        <h1 className="text-xl md:text-2xl font-black tracking-tighter m-0 p-0 leading-none">EARTH<span className="text-blue-500">LOOKUP</span></h1>
        <h2 className="text-[8px] font-bold tracking-[0.2em] text-gray-400 uppercase mt-1">Ultimate Geography Encyclopedia</h2>
      </div>

      <div className="fixed bottom-8 left-4 md:left-8 z-[100] flex flex-col gap-2 bg-black/40 border border-white/10 p-4 md:p-5 rounded-xl backdrop-blur-md shadow-2xl pointer-events-auto">
        <div className="flex gap-4">
          <Link href="/about" className="text-[9px] md:text-[10px] font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">About</Link>
          <Link href="/contact" className="text-[9px] md:text-[10px] font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">Contact</Link>
          <Link href="/privacy" className="text-[9px] md:text-[10px] font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">Privacy</Link>
        </div>
        <div className="text-[8px] md:text-[9px] font-mono text-gray-500 font-bold tracking-widest uppercase">
          2026 all right received Don Odibat - Don Systems Holding
        </div>
      </div>

      <div className="fixed top-8 right-4 md:right-8 z-[300] w-[calc(100%-2rem)] md:w-full md:max-w-[280px]">
        <div className="bg-black/40 border border-white/10 rounded-full flex items-center px-4 backdrop-blur-md shadow-lg pointer-events-auto transition-colors hover:bg-black/60 focus-within:bg-black/80 focus-within:border-blue-500/50">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 min-w-[16px]"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" className="w-full bg-transparent border-none py-3 px-3 text-sm focus:outline-none placeholder:text-gray-500 font-medium tracking-wide text-white" placeholder="Search a country..." value={searchQuery} onChange={(e: any) => setSearchQuery(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setTimeout(() => setIsFocused(false), 250)} onKeyDown={(e: any) => e.key === 'Enter' && filteredNations[0] && flyToTarget(filteredNations[0])} />
        </div>
        {searchQuery && isFocused && (
          <div className="mt-2 bg-black/80 border border-white/10 rounded-xl max-h-60 overflow-y-auto backdrop-blur-xl shadow-2xl pointer-events-auto scrollbar-hide">
            {filteredNations.slice(0, 10).map((n: any) => (
              <button 
                key={n.slug} 
                onPointerDown={(e: any) => { e.preventDefault(); flyToTarget(n); }} 
                className="w-full text-left px-4 py-3 hover:bg-blue-500/20 text-sm flex items-center gap-3 border-b border-white/5 last:border-0 transition-colors"
              >
                <img src={n.flag} className="w-5 h-auto rounded-sm shadow-sm" alt="" /> 
                <span className="font-bold text-gray-200 tracking-wide">{n.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-12 right-4 md:right-8 z-[100] flex flex-col bg-black/40 border border-white/10 rounded-lg backdrop-blur-md overflow-hidden shadow-2xl pointer-events-auto">
        <button onClick={() => handleZoom('in')} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-blue-500/20 hover:text-white transition-colors border-b border-white/10 text-xl font-light">+</button>
        <button onClick={() => handleZoom('out')} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-blue-500/20 hover:text-white transition-colors text-xl font-light">−</button>
      </div>

      <div className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing">
        {dimensions.width > 0 && (
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
            backgroundColor="rgba(0,0,0,0)" 
            polygonsData={worldPolygons}
            polygonSideColor={() => 'rgba(0, 0, 0, 0.2)'}
            polygonCapColor={(poly: any) => selectedTarget && poly.properties.name === selectedTarget.name ? 'rgba(0, 246, 255, 0.3)' : 'rgba(10, 10, 10, 0.3)'}
            polygonStrokeColor={(poly: any) => selectedTarget && poly.properties.name === selectedTarget.name ? '#00f6ff' : 'rgba(30, 58, 138, 0.4)'}
            polygonHoverColor={() => 'rgba(0, 246, 255, 0.3)'}
            
            onPolygonClick={(poly: any) => {
                const clickedName = poly.properties.name.toLowerCase();
                let target = nationLookup[clickedName];
                if (!target) { target = nations.find((n: any) => n.searchTerms.includes(clickedName)); }
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
              let el = elementsCache.current[d.slug];
              
              if (!el) {
                el = document.createElement('div');
                el.className = 'country-wrapper';
                el.innerHTML = `<div class="country-label">${d.name}</div>`;
                elementsCache.current[d.slug] = el;
              }

              if (isTarget && !el.classList.contains('is-target')) {
                el.classList.add('is-target');
                el.style.zIndex = '1000';
                el.innerHTML = `
                  <div class="country-dot target-ping"></div>
                  <div class="country-popover force-open">
                    <div class="popover-header">
                      <img src="${d.flag}" style="width: 24px; border-radius: 2px; box-shadow: 0 0 5px rgba(0,0,0,0.5);" /> 
                      <span style="font-weight: 800; font-size: 11px; color: white; letter-spacing: 0.5px;">${d.name}</span>
                    </div>
                    <div class="popover-data">
                      <div>CAPITAL: <span>${d.capital}</span></div>
                      <div>POP: <span>${d.population}</span></div>
                    </div>
                    <div class="popover-arrow animate-pulse text-[#00f6ff]">ACCESS MAINFRAME <span>→</span></div>
                  </div>
                  <div class="country-label" style="color: #00f6ff; font-weight: 800;">${d.name}</div>
                `;
              } else if (!isTarget && el.classList.contains('is-target')) {
                el.classList.remove('is-target');
                el.style.zIndex = '10';
                el.innerHTML = `<div class="country-label">${d.name}</div>`;
              }

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