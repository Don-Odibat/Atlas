"use client";

import React, { useState } from "react";
import Link from "next/link";
import TrustFooter from "../../components/TrustFooter";

const FAQ_DATA = [
  {
    category: "01. GENERAL CLEARANCE",
    color: "bg-blue-500",
    questions: [
      { q: "What is the EarthLookup mainframe?", a: "EarthLookup is a highly advanced, centralized geographic intelligence terminal. It bypasses fragmented web searches by syndicating global data—from live macroeconomics to historical archives—into a single, high-density dashboard for all 195 sovereign states and major territories." },
      { q: "Who engineered this platform?", a: "EarthLookup is a flagship digital asset engineered and maintained by Don Systems Holding, headquartered in Tupelo, Mississippi." },
      { q: "Is EarthLookup free to use?", a: "Yes. Core mainframe access is completely free for researchers, students, and global explorers. The infrastructure is sustained through strategic AdSense integrations." },
      { q: "Do I need to create an operator account?", a: "No. The system is designed for frictionless access. No account, registration, or login is required to initialize a global scan." },
      { q: "What is the primary use case for this terminal?", a: "It is designed for rapid geographic, demographic, and economic analysis. It is actively used by educational institutions, data analysts, and geography enthusiasts." },
      { q: "How does the 3D interactive globe work?", a: "The launch interface utilizes a high-performance WebGL 3D globe. You can physically spin the earth and click on geopolitical polygons, or use the HUD search bar to instantly fly to a target nation." },
      { q: "Which languages does the translation matrix support?", a: "Our UI and historical data parsers currently support English, Russian, Dutch, Arabic, Chinese, Hindi, and French." },
      { q: "Can educational institutions use this platform?", a: "Absolutely. EarthLookup complies with standard COPPA guidelines and is an exceptional tool for classroom environments requiring instant geographic intelligence." },
      { q: "Is there a mobile application available?", a: "EarthLookup is built as a highly responsive web application. The entire UI automatically scales and reformats into a vertical intelligence feed for iOS and Android devices directly through your mobile browser." },
      { q: "How do I initiate a global search?", a: "Click the 'Search a country...' input field on the top right of the globe interface, type your target, and tap the result to instantly deploy the dossier." }
    ]
  },
  {
    category: "02. DATA PROVENANCE",
    color: "bg-green-500",
    questions: [
      { q: "Where does the mainframe source its intelligence?", a: "We aggregate data from leading open-source APIs, primarily utilizing the RestCountries API for base metrics, Open-Meteo for atmospheric tracking, and the Wikimedia Foundation for historical archives." },
      { q: "How frequently is the data updated?", a: "Data is pulled live upon execution. Macroeconomic fiat and crypto rates update daily, while atmospheric data is pulled in real-time." },
      { q: "How does EarthLookup handle disputed borders?", a: "We maintain strict geopolitical neutrality. Our borders, flags, and names reflect the standardized data provided by ISO 3166 and international open-source registries." },
      { q: "Why is the population counter constantly ticking?", a: "The demographic engine calculates continuous estimations of population momentum by applying global standard birth and death rates to the nation's baseline population." },
      { q: "How accurate are the birth and death pulses?", a: "They are mathematical extrapolations designed to visualize biological momentum. They are highly accurate statistical averages, not literal real-time hospital tracking." },
      { q: "Why do some territories display 'N/A' for certain metrics?", a: "If a sovereign state or island territory does not publish specific data (e.g., Gini coefficients or vehicle signs) to the global databases, our terminal accurately reports the absence of data as 'N/A' or 'CLASSIFIED'." },
      { q: "How do you source the declassified historical archives?", a: "We utilize a secure uplink to the Wikipedia API, actively parsing, cleaning, and formatting the primary historical extracts of the target nation." },
      { q: "What should I do if I spot a data anomaly?", a: "Operators should submit a formal Data Correction Request through our Secure Comms Relay (Contact Page), citing the target nation and a verified source." },
      { q: "Are the national insignias and flags legally verified?", a: "Yes, all vector (SVG) images of national flags and coats of arms are standardized digital assets recognized by the United Nations and international protocols." },
      { q: "Why does the terminal fallback to English for some history?", a: "If a specific foreign language Wikipedia server does not possess an article for a highly obscure territory, the mainframe safely falls back to the English archive to ensure you receive data." }
    ]
  },
  {
    category: "03. MACROECONOMICS",
    color: "bg-yellow-500",
    questions: [
      { q: "What is the Gini Coefficient?", a: "The Gini index measures wealth inequality. 0 represents perfect equality, while 100 implies maximal inequality. It is a critical indicator of economic stratification." },
      { q: "What does it mean if a Gini index is 'CLASSIFIED'?", a: "It means the target nation's government has not released reliable, internationally verified wealth distribution data to the global banking registries." },
      { q: "How are live fiat exchange rates calculated?", a: "We ping the ExchangeRate-API (ER-API) to pull the most recent global market exchange rates against the US Dollar." },
      { q: "Why does the terminal convert currencies to Bitcoin (BTC)?", a: "Alongside traditional fiat, we display BTC parity to provide a decentralized, mathematically hard-capped counter-metric for economic analysts." },
      { q: "Is the macroeconomic data considered financial advice?", a: "No. All financial metrics are provided strictly for educational and geopolitical analysis. We are not financial advisors. Please read our Operational Disclaimer." },
      { q: "How often do the exchange rates refresh?", a: "The ER-API updates currency parities globally once every 24 hours." },
      { q: "What happens if a nation uses multiple official currencies?", a: "The mainframe defaults to displaying the primary sovereign currency or the dominant global currency (e.g., USD) used in their local economy." },
      { q: "Why does the US Dollar (USD) act as the baseline fiat metric?", a: "The USD is the internationally recognized global reserve currency, making it the most standard baseline for comparative economic health." },
      { q: "Do you track historical economic inflation rates?", a: "Currently, our ledger focuses on live market parity. Historical economic collapses are typically detailed within the right-hand History terminal." },
      { q: "Can I execute currency trades through this platform?", a: "No. EarthLookup is a read-only intelligence dashboard. No transactional pipelines exist on this network." }
    ]
  },
  {
    category: "04. GEOGRAPHIC METRICS",
    color: "bg-purple-500",
    questions: [
      { q: "How is population density calculated?", a: "The mainframe divides the live population by the nation's total land area to show exact human compression metrics." },
      { q: "Why do you display both metric and imperial measurements?", a: "To accommodate global operators. The system automatically performs real-time math to convert Celsius to Fahrenheit and Square Kilometers to Square Miles." },
      { q: "What determines the 'Local Time' clock?", a: "The engine pulls the precise GPS coordinates of the nation's Capital City and pings the Open-Meteo network to calculate the exact, DST-adjusted local timezone." },
      { q: "Where is the 'Live Temp' reading taken from?", a: "Temperatures are gathered from atmospheric weather stations located directly in the target nation's seat of government (Capital)." },
      { q: "What is the difference between a Region and a Subregion?", a: "A region is continental (e.g., 'Americas'), while a subregion is localized (e.g., 'Caribbean' or 'Central America')." },
      { q: "How does the system define a 'Landlocked' state?", a: "A state is designated as YES if it possesses no sovereign coastline or direct access to international oceanic maritime routes." },
      { q: "What are ISO 3166 codes used for?", a: "These Alpha-2 and Alpha-3 designations are the internationally recognized codes used by aviation, databases, and global logistics to track countries." },
      { q: "What does 'Demonym' mean?", a: "A demonym is the official term used to identify the citizens of a specific place (e.g., 'Jordanians' for Jordan, 'Dutch' for the Netherlands)." },
      { q: "How are bordering nations tracked for island territories?", a: "If a nation is entirely surrounded by water and shares no physical land borders, the terminal classifies it as an 'ISOLATED LANDMASS / ISLAND'." },
      { q: "Do the geographic borders account for maritime claims?", a: "Our bordering algorithms only calculate physical, contiguous land boundaries, ignoring oceanic Exclusive Economic Zones (EEZ)." }
    ]
  },
  {
    category: "05. SYSTEM PROTOCOLS",
    color: "bg-red-500",
    questions: [
      { q: "Why didn't the national anthem audio play?", a: "If you receive a 'Mainframe Error', it means the specific MP3 file for that territory has not yet been uploaded to our cloud servers. We continuously patch these gaps." },
      { q: "How are the anthem audio files sourced?", a: "We utilize high-quality instrumental, public domain, or open-source audio recordings of global national anthems." },
      { q: "What is the Top Level Domain (TLD) metric?", a: "The TLD is the designated sovereign internet extension for that country (e.g., '.fr' for France, '.jp' for Japan)." },
      { q: "What does the 'Vehicle Signs' metric represent?", a: "It is the official international vehicle registration code used on license plates when crossing global borders." },
      { q: "How do I report a technical bug in the UI?", a: "Route a message through our Secure Comms Relay (Contact Page) to the Director of Operations. Include your browser and device type." },
      { q: "Does EarthLookup utilize tracking cookies?", a: "Yes, we utilize standard tracking cookies specifically to support our Google AdSense integrations. Review our Privacy Directive for details." },
      { q: "Can commercial entities purchase AdSense space?", a: "For direct strategic partnerships or bespoke advertisement placements outside of the AdSense network, contact Don Systems Holding directly." },
      { q: "Is the EarthLookup source code publicly available?", a: "No. The proprietary UI architecture, layout engines, and custom APIs built by Don Systems Holding are closed-source." },
      { q: "How do I submit a DMCA or copyright request?", a: "Direct all legal and copyright inquiries to our Corporate Headquarters email listed on the Contact page." },
      { q: "How do I contact Don Systems Holding directly?", a: "You can find our direct email and the physical address of our Tupelo, Mississippi headquarters on the Secure Comms Relay (Contact) page." }
    ]
  }
];

export default function FAQCommand() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="min-h-screen w-screen bg-black text-white font-sans selection:bg-blue-500/30 relative overflow-x-hidden flex flex-col">
      
      {/* BACKGROUND STYLING */}
      <style dangerouslySetInnerHTML={{__html: `
        .glass-panel { background: rgba(10,10,10,0.7); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.3); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(59,130,246,0.6); }
      `}} />

      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black"></div>

      {/* TOP COMMAND HEADER */}
      <nav className="w-full border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl sticky top-0 z-50 px-4 md:px-8 py-4 flex justify-between items-center shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-6">
            <Link href="/" className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-400 hover:text-white uppercase transition-colors flex items-center gap-2">
              <span className="text-blue-500 text-lg">←</span> BACK TO GLOBE
            </Link>
        </div>
        <div className="text-[9px] md:text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            KNOWLEDGE BASE
        </div>
      </nav>

      {/* MAIN FAQ FEED */}
      <main className="flex-1 w-full max-w-4xl mx-auto relative z-10 px-4 md:px-8 py-12 pb-24">
        
        {/* HERO SECTION */}
        <div className="mb-12 border-b border-white/10 pb-10 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white drop-shadow-2xl uppercase">Operator <span className="text-blue-500">FAQ Matrix</span></h1>
            <p className="text-sm md:text-base text-gray-400 font-light tracking-widest uppercase mb-2">Status: <span className="text-white font-medium">50 Logs Decrypted</span></p>
            <p className="text-xs text-blue-400 font-mono tracking-widest uppercase">Search the intelligence archives below.</p>
        </div>

        {/* ACCORDION MATRIX */}
        <div className="space-y-12">
          {FAQ_DATA.map((section, secIdx) => (
            <div key={secIdx} className="glass-panel border border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${section.color.split('-')[1]}-500 to-transparent opacity-50`}></div>
              
              <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className={`w-3 h-3 ${section.color} rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]`}></span> 
                  {section.category}
              </h2>

              <div className="space-y-3">
                {section.questions.map((faq, qIdx) => {
                  const id = `${secIdx}-${qIdx}`;
                  const isOpen = openIndex === id;
                  return (
                    <div key={qIdx} className={`border ${isOpen ? 'border-white/20 bg-white/5' : 'border-white/5 bg-black/40 hover:bg-white/5'} rounded-xl transition-all duration-300`}>
                      <button 
                        onClick={() => toggleFAQ(id)}
                        className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
                      >
                        <span className={`font-bold text-sm md:text-base tracking-wide pr-4 ${isOpen ? 'text-white' : 'text-gray-300'}`}>
                          {faq.q}
                        </span>
                        <span className={`text-2xl font-light transition-transform duration-300 ${isOpen ? 'rotate-45 text-blue-400' : 'text-gray-500'}`}>
                          +
                        </span>
                      </button>
                      
                      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                          <p className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4 mt-2">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center border-t border-white/10 pt-8">
          <p className="text-xs font-mono text-gray-600 uppercase tracking-widest">
            &gt; If your query is not resolved, contact the Mainframe Director via the Secure Comms Relay.
          </p>
        </div>

      </main>

      {/* UNIVERSAL FOOTER */}
      <div className="relative z-20 bg-black/90 border-t border-white/10 backdrop-blur-md">
        <TrustFooter />
      </div>

    </div>
  );
}