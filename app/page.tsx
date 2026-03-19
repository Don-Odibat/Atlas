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
  const [worldPolygons, setWorldPolygons] = useState<any[]>([]);
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [selectedTarget, setSelectedTarget] = useState<any>(null);

  const router = useRouter();
  const globeRef = useRef<any>(null);

  // Responsive Altitude Logic
  const getInitialAltitude = (w: number) => (w < 768 ? 3.5 : 2.5);

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
        // Instant spin, no idle delay. Only stops if zoomed in or a target is locked.
        controls.autoRotate = !isZoomedIn && !selectedTarget;
        controls.autoRotateSpeed = 0.6; 
        controls.enableDamping = true;
        controls.dampingFactor = 0.07;
      }
    }
  }, [isZoomedIn, selectedTarget, nations.length]); 

  useEffect(() => {
    if (globeRef.current && dimensions.width > 0) {
        const savedCamera = sessionStorage.getItem('earthLookupCamera');
        if (savedCamera) {
            globeRef.current.pointOfView(JSON.parse(savedCamera), 0);
        } else {
            globeRef.current.pointOfView({ altitude: getInitialAltitude(dimensions.width) });
        }
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
        const formatted = data
          .filter((c: any) => c.latlng?.length === 2 && c.name.common !== "Israel") 
          .map((c: any) => {
            const aliases: string[] = [];
            if (c.cca2 === 'US') aliases.push('USA', 'America', 'United States of America');
            if (c.cca2 === 'GB') aliases.push('UK', 'England', 'Great Britain', 'United Kingdom');
            if (c.cca2 === 'JO') aliases.push('JOR', 'Hashemite Kingdom of Jordan');
            if (c.cca2 === 'PS') aliases.push('Palestine State', 'Gaza');
            
            return {
              lat: c.latlng[0],
              lng: c.latlng[1],
              name: c.name.common,
              slug: c.name.common, 
              code: c.cca2, 
              flag: c.flags.svg,
              capital: c.capital?.[0] || "N/A",
              population: new Intl.NumberFormat().format(c.population || 0),
              searchTerms: aliases.map((a: string) => a.toLowerCase())
            };
          });
        setNations(formatted);
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
      globeRef.current.pointOfView({ lat: target.lat, lng: target.lng, altitude: 0.6 }, 3000);
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
      
      setIsZoomedIn(newAltitude < 1.8);
      globeRef.current.pointOfView({ ...currentPov, altitude: newAltitude }, 400);
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-black relative font-sans text-white">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif !important; background: black; margin: 0; padding: 0; }
        .country-wrapper { position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer; pointer-events: auto; }
        .country-dot { width: 4px; height: 4px; background-color: #3b82f6; border-radius: 50%; box-shadow: 0 0 8px 2px rgba(59, 130, 246, 0.8); margin-bottom: 3px; }
        .country-label { color: rgba(255, 255, 255, 0.6); font-size: 8px; font-weight: 700; text-shadow: 0 0 6px rgba(0,0,0,1); }
      `}} />

      {/* SEE-THROUGH BANNER */}
      <div className={`fixed top-8 md:top-12 left-1/2 -translate-x-1/2 z-[200] max-w-2xl w-[90%] transition-all duration-700 ${showBanner ? 'translate-y-0 opacity-100' : '-translate-y-32 opacity-0 pointer-events-none'}`}>
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl pointer-events-auto text-center">
          <div className="flex justify-between items-start mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <button onClick={() => setShowBanner(false)} className="text-gray-400 hover:text-white transition-all">✕</button>
          </div>
          <h3 className="text-blue-400 font-black tracking-widest text-xs uppercase mb-3">Welcome to EarthLookup 🌍</h3>
          <p className="text-gray-200 text-sm font-light leading-relaxed">
            Spin the globe or search to pull up the intelligence dossier on any country. Used by schools for geography exploration. 🚀
          </p>
        </div>
      </div>

      {/* HEADER LOGO */}
      <div className="fixed top-8 left-8 z-[100] pointer-events-none select-none hidden md:block">
        <h1 className="text-xl md:text-2xl font-black tracking-tighter m-0 p-0">EARTH<span className="text-blue-500">LOOKUP</span></h1>
        <h2 className="text-[8px] font-bold tracking-[0.2em] text-gray-400 uppercase">Ultimate Geography Encyclopedia</h2>
      </div>

      {/* DON SYSTEMS BRANDING FOOTER */}
      <div className="fixed bottom-8 left-4 md:left-8 z-[100] flex flex-col gap-2 bg-black/40 border border-white/10 p-4 rounded-xl backdrop-blur-md pointer-events-auto">
        <div className="flex gap-4">
          <Link href="/about" className="text-[10px] font-bold text-gray-400 hover:text-blue-400 uppercase tracking-widest">About</Link>
          <Link href="/contact" className="text-[10px] font-bold text-gray-400 hover:text-blue-400 uppercase tracking-widest">Contact</Link>
          <Link href="/policy" className="text-[10px] font-bold text-gray-400 hover:text-blue-400 uppercase tracking-widest">Privacy</Link>
        </div>
        <div className="text-[9px] font-mono text-gray-500 font-bold tracking-widest uppercase italic">
          Don Systems Holding - Don Odibat
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="fixed top-8 right-4 md:right-8 z-[100] w-[calc(100%-2rem)] md:w-full md:max-w-[280px]">
        <div className="bg-black/60 border border-white/10 rounded-full flex items-center px-4 backdrop-blur-md pointer-events-auto">
          <input type="text" className="w-full bg-transparent border-none py-3 text-sm focus:outline-none placeholder:text-gray-500" placeholder="Search a country..." value={searchQuery} onChange={(e: any) => setSearchQuery(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setTimeout(() => setIsFocused(false), 200)} />
        </div>
        {searchQuery && isFocused && (
          <div className="mt-2 bg-black/90 border border-white/10 rounded-xl max-h-60 overflow-y-auto backdrop-blur-xl pointer-events-auto">
            {filteredNations.slice(0, 10).map((n: any) => (
              <button key={n.slug} onClick={() => flyToTarget(n)} className="w-full text-left px-4 py-3 hover:bg-blue-500/10 text-sm flex items-center gap-3 border-b border-white/5 last:border-0">
                <img src={n.flag} className="w-4 h-auto rounded-sm" alt="" /> 
                <span className="font-bold">{n.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ZOOM CONTROLS */}
      <div className="fixed bottom-12 right-4 md:right-8 z-[100] flex flex-col bg-black/50 border border-white/10 rounded-lg backdrop-blur-md pointer-events-auto overflow-hidden">
        <button onClick={() => handleZoom('in')} className="w-10 h-10 text-white hover:bg-blue-500/20">+</button>
        <button onClick={() => handleZoom('out')} className="w-10 h-10 text-white hover:bg-blue-500/20">−</button>
      </div>

      <div className="absolute inset-0 z-0">
        {dimensions.width > 0 && (
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            polygonsData={worldPolygons}
            polygonSideColor={() => 'rgba(0, 0, 0, 0.05)'}
            polygonCapColor={(poly: any) => {
              const isSelected = selectedTarget && poly.properties.name === selectedTarget.name;
              return isSelected ? 'rgba(0, 246, 255, 0.3)' : 'rgba(10, 10, 10, 0.01)';
            }}
            polygonStrokeColor={(poly: any) => {
              const isSelected = selectedTarget && poly.properties.name === selectedTarget.name;
              return isSelected ? '#00f6ff' : 'rgba(30, 58, 138, 0.3)';
            }}
            polygonHoverColor={() => 'rgba(59, 130, 246, 0.4)'}
            onPolygonClick={(poly: any) => {
                const target = nations.find((n: any) => n.name === poly.properties.name);
                if (target) {
                    if (selectedTarget && selectedTarget.name === target.name) navigateToDossier(target.slug);
                    else flyToTarget(target);
                }
            }}
            htmlElementsData={nations}
            htmlLat="lat"
            htmlLng="lng"
            htmlElement={(d: any) => {
              const el = document.createElement('div');
              el.className = 'country-wrapper';
              el.innerHTML = `<div class="country-dot"></div><div class="country-label">${d.name}</div>`;
              el.onclick = () => flyToTarget(d);
              return el;
            }}
            onZoom={(pov: any) => setIsZoomedIn(pov.altitude < 1.8)}
          />
        )}
      </div>
    </div>
  );
}