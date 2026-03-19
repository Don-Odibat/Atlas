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
  const overlayRef = useRef<HTMLDivElement>(null); // 🟢 ADDED: Ref for the pure React overlay

  const getInitialAltitude = (w: number) => (w < 768 ? 4.8 : 2.2);

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
            
            return {
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
          });
        setNations(formatted);
      });
  }, []);

  // 🟢 ADDED: High-performance coordinate tracking loop. Runs entirely outside of React state to prevent lag.
  useEffect(() => {
    if (!selectedTarget || !globeRef.current) return;

    let animationFrameId: number;
    const updatePosition = () => {
      if (globeRef.current && overlayRef.current) {
        try {
          const coords = globeRef.current.getScreenCoords(selectedTarget.lat, selectedTarget.lng);
          if (coords) {
            // Centers the dot perfectly on the converted X/Y coordinates
            overlayRef.current.style.transform = `translate(${coords.x}px, ${coords.y}px) translate(-50%, -50%)`;
          }
        } catch (e) {
          // Silent catch if canvas isn't ready
        }
      }
      animationFrameId = requestAnimationFrame(updatePosition);
    };
    
    updatePosition();
    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedTarget, dimensions]);

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
      globeRef.current.pointOfView({ lat: target.lat, lng: target.lng, altitude: 0.6 }, 2000);
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
      setIsZoomedIn(newAltitude < 1.8);
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#050505] relative font-sans text-white">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap');
        body { font-family: 'Inter', sans-serif !important; background: #050505; margin: 0; padding: 0; }
        
        .country-wrapper { position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer; pointer-events: auto; z-index: 1000; }
        .country-dot { width: 8px; height: 8px; background-color: #00f6ff; border-radius: 50%; box-shadow: 0 0 15px 5px rgba(0, 246, 255, 0.8); animation: radar-ping 2s infinite cubic-bezier(0.66, 0, 0, 1); }
        @keyframes radar-ping { 0% { box-shadow: 0 0 0 0 rgba(0, 246, 255, 0.8); } 70% { box-shadow: 0 0 0 20px rgba(0, 246, 255, 0); } 100% { box-shadow: 0 0 0 0 rgba(0, 246, 255, 0); } }
        
        .country-popover { position: absolute; bottom: 20px; background: #0a0a0a; border: 1px solid #00f6ff; padding: 12px; border-radius: 8px; display: flex; flex-direction: column; gap: 8px; box-shadow: 0 10px 30px rgba(0,246,255,0.15); min-width: 150px; text-align: left; z-index: 50; }
        .popover-header { display: flex; align-items: center; gap: 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 8px; }
        .popover-data { display: flex; flex-direction: column; gap: 4px; font-size: 9px; color: #9ca3af; letter-spacing: 0.5px; }
        .popover-data span { color: white; font-weight: 600; }
        .popover-arrow { display: flex; align-items: center; gap: 4px; font-size: 8px; font-weight: 800; color: #00f6ff; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
      `}} />

      <div className={`fixed top-8 md:top-12 left-1/2 -translate-x-1/2 z-[200] max-w-2xl w-[92%] transition-all duration-700 ease-out ${showBanner ? 'translate-y-0 opacity-100' : '-translate-y-32 opacity-0 pointer-events-none'}`}>
        <div className="bg-[#0a0a0a]/95 border border-white/10 p-6 rounded-2xl shadow-2xl pointer-events-auto">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
              <h3 className="text-white font-bold tracking-[0.2em] text-[10px] uppercase">Welcome to EarthLookup</h3>
            </div>
            <button onClick={() => setShowBanner(false)} className="text-gray-400 hover:text-white p-1">✕</button>
          </div>
          <p className="text-gray-300 text-sm font-light leading-relaxed">
            Spin the globe or use the search bar to pull up the full intelligence dossier on any country.
          </p>
        </div>
      </div>

      <div className="fixed top-8 left-8 z-[100] pointer-events-none select-none hidden md:block">
        <h1 className="text-2xl font-black tracking-tighter m-0 p-0 leading-none">EARTH<span className="text-blue-500">LOOKUP</span></h1>
        <h2 className="text-[8px] font-bold tracking-[0.2em] text-gray-400 uppercase mt-1">Ultimate Geography Encyclopedia</h2>
      </div>

      <div className="fixed bottom-8 left-4 md:left-8 z-[100] flex flex-col gap-2 bg-[#0a0a0a]/90 border border-white/10 p-4 rounded-xl shadow-2xl pointer-events-auto">
        <div className="flex gap-4">
          <Link href="/about" className="text-[9px] font-bold text-gray-400 hover:text-white uppercase tracking-widest">About</Link>
          <Link href="/contact" className="text-[9px] font-bold text-gray-400 hover:text-white uppercase tracking-widest">Contact</Link>
          <Link href="/policy" className="text-[9px] font-bold text-gray-400 hover:text-white uppercase tracking-widest">Privacy</Link>
        </div>
        <div className="text-[8px] font-mono text-gray-500 font-bold tracking-widest uppercase">
          2025 all right received Don Odibat - Don Systems Holding
        </div>
      </div>

      <div className="fixed top-8 right-4 md:right-8 z-[100] w-[calc(100%-2rem)] md:w-full md:max-w-[280px]">
        <div className="bg-[#0a0a0a]/90 border border-white/10 rounded-full flex items-center px-4 pointer-events-auto focus-within:border-blue-500/50">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 min-w-[16px]"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" className="w-full bg-transparent border-none py-3 px-3 text-sm focus:outline-none placeholder:text-gray-500 text-white" placeholder="Search a country..." value={searchQuery} onChange={(e: any) => setSearchQuery(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setTimeout(() => setIsFocused(false), 200)} onKeyDown={(e: any) => e.key === 'Enter' && filteredNations[0] && flyToTarget(filteredNations[0])} />
        </div>
        {searchQuery && isFocused && (
          <div className="mt-2 bg-[#0a0a0a]/95 border border-white/10 rounded-xl max-h-60 overflow-y-auto shadow-2xl pointer-events-auto">
            {filteredNations.slice(0, 10).map((n: any) => (
              <button key={n.slug} onClick={() => flyToTarget(n)} className="w-full text-left px-4 py-3 hover:bg-blue-500/20 text-sm flex items-center gap-3 border-b border-white/5 last:border-0">
                <img src={n.flag} className="w-5 h-auto rounded-sm" alt="" /> 
                <span className="font-bold text-gray-200">{n.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-12 right-4 md:right-8 z-[100] flex flex-col bg-[#0a0a0a]/90 border border-white/10 rounded-lg shadow-2xl pointer-events-auto overflow-hidden">
        <button onClick={() => handleZoom('in')} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-blue-500/20 hover:text-white border-b border-white/10 text-xl font-light">+</button>
        <button onClick={() => handleZoom('out')} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-blue-500/20 hover:text-white text-xl font-light">−</button>
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
            polygonSideColor={() => 'rgba(0, 0, 0, 0.1)'}
            polygonCapColor={(poly: any) => selectedTarget && poly.properties.name === selectedTarget.name ? 'rgba(0, 246, 255, 0.3)' : 'rgba(10, 10, 10, 0.3)'}
            polygonStrokeColor={(poly: any) => selectedTarget && poly.properties.name === selectedTarget.name ? '#00f6ff' : 'rgba(30, 58, 138, 0.4)'}
            polygonHoverColor={() => 'rgba(0, 246, 255, 0.3)'}
            
            // 🟢 RESTORED: Your original logic that maps 100% of the countries correctly
            onPolygonClick={(poly: any) => {
                let target = nations.find((n: any) => n.name === poly.properties.name);
                if (!target) {
                    target = nations.find((n: any) => n.searchTerms.includes(poly.properties.name.toLowerCase()));
                }
                if (target) {
                    if (selectedTarget && selectedTarget.name === target.name) navigateToDossier(target.slug);
                    else flyToTarget(target);
                }
            }}
            
            labelsData={nations}
            labelLat="lat"
            labelLng="lng"
            labelText={(d: any) => selectedTarget && selectedTarget.name === d.name ? "" : d.name}
            labelSize={0.6}
            labelDotRadius={0.3}
            labelColor={() => 'rgba(255, 255, 255, 0.7)'}
            labelResolution={2}
            onLabelClick={(d: any) => flyToTarget(d)}

            // 🟢 REMOVED: All the htmlElementsData properties that were crashing the WebGL canvas
          />
        )}
      </div>

      {/* 🟢 ADDED: Pure React Overlay rendering based on 3D coordinates. No memory leaks. */}
      {selectedTarget && (
        <div 
          ref={overlayRef}
          className="country-wrapper absolute top-0 left-0 pointer-events-auto"
          style={{ willChange: 'transform' }} // Tells browser to hardware-accelerate this div
          onClick={() => navigateToDossier(selectedTarget.slug)}
        >
          <div className="country-dot"></div>
          <div className="country-popover">
            <div className="popover-header">
              <img src={selectedTarget.flag} style={{ width: '24px', borderRadius: '2px' }} alt="Flag" /> 
              <span style={{ fontWeight: 800, fontSize: '11px', color: 'white' }}>{selectedTarget.name}</span>
            </div>
            <div className="popover-data">
              <div>CAPITAL: <span>{selectedTarget.capital}</span></div>
              <div>POP: <span>{selectedTarget.population}</span></div>
            </div>
            <div className="popover-arrow">ACCESS DOSSIER <span>→</span></div>
          </div>
        </div>
      )}
    </div>
  );
}