import React from "react";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans selection:bg-white/20 relative overflow-y-auto">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black"></div>
      </div>

      {/* Top Navigation */}
      <nav className="relative z-50 w-full px-8 md:px-12 pt-8 pb-4 flex justify-between items-center border-b border-white/10 bg-black/60 backdrop-blur-md sticky top-0 shadow-2xl">
        <Link href="/" className="text-[10px] font-bold tracking-[0.2em] text-gray-400 hover:text-white uppercase transition-colors flex items-center gap-2">
          <span className="text-blue-500">←</span> Return to Mainframe
        </Link>
        <h1 className="text-xl font-black tracking-tighter m-0 p-0 leading-none select-none text-white">
            EARTH<span className="text-blue-500">LOOKUP</span>
        </h1>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto p-8 md:p-16">
        
        <header className="mb-16 border-b border-white/10 pb-8">
          <p className="text-blue-500 font-black tracking-widest uppercase mb-4 text-sm">Legal & Compliance</p>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-4">Terms of Service & Disclaimer</h1>
          <p className="text-gray-400 text-sm tracking-wide">Last Updated: March 2026 | Operational Guidelines</p>
        </header>

        <article className="space-y-12 text-sm md:text-base leading-relaxed font-light">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and utilizing the EarthLookup intelligence mainframe (the "Service"), you accept and agree to be bound by the terms and provisions of this agreement. Furthermore, when using this Service's specific data endpoints, you shall be subject to any posted guidelines or rules applicable to such services. 
            </p>
            <p>
              Any participation in this Service will constitute acceptance of this agreement. If you do not agree to abide by the above, please disconnect from the mainframe and exit the application immediately.
            </p>
          </section>

          <section className="bg-white/5 border border-blue-500/30 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-blue-400 mb-4">2. Educational Purpose & Data Accuracy Disclaimer</h2>
            <p className="mb-4 text-gray-300">
              EarthLookup is designed strictly as a high-density educational tool for students, researchers, and global citizens. While we strive to provide university-grade intelligence and utilize live API endpoints for macroeconomic and meteorological data, <strong>we do not guarantee absolute real-time accuracy.</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Information provided regarding national borders, economic metrics, military rankings, and historical events is for informational purposes only.</li>
              <li>EarthLookup must <strong>not</strong> be used for official diplomatic, legal, financial, or navigational reliance.</li>
              <li>Live data streams (such as currency exchange rates and weather) are provided "as is" via third-party APIs and may experience latency or outages.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Geopolitical Neutrality & Historical Sensitivity</h2>
            <p className="mb-4">
              Our dossiers cover the complex, and often violent, history of human civilization. We document historical conflicts, border disputes, decolonization, and modern geopolitical realities. 
            </p>
            <p>
              EarthLookup maintains a stance of strict geopolitical neutrality. The inclusion of specific historical events, terminology, or territorial lines is intended solely to reflect the current, prevailing international consensus and historical record. It does not constitute a political endorsement of any specific government, regime, or territorial claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Third-Party Links & Humanitarian Non-Profits</h2>
            <p className="mb-4">
              EarthLookup may occasionally feature links to external, third-party websites, including verified non-profit organizations and international NGOs operating in global crisis zones. 
            </p>
            <p>
              While we curate these links to direct users to globally recognized organizations (e.g., United Nations agencies, Doctors Without Borders), EarthLookup has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party sites or services. Users who choose to navigate to these sites or make financial donations do so entirely at their own discretion and risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
            <p className="mb-4">
              The Site and its original content, customized interface, features, and functionality are owned by EarthLookup and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
            <p>
              Public domain assets utilized in our database, including national anthems, geographical data, and flag SVG files, remain the property of their respective international governing bodies and open-source providers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
            <p className="mb-4">
              In no event shall EarthLookup, nor its developers, partners, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Your access to or use of or inability to access or use the Service.</li>
              <li>Any conduct or content of any third party on the Service.</li>
              <li>Any unauthorized access, use or alteration of your transmissions or content.</li>
            </ul>
          </section>

        </article>

        <footer className="mt-20 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 text-xs uppercase tracking-widest">EarthLookup Intelligence Systems © 2026. All Rights Reserved.</p>
        </footer>

      </main>
    </div>
  );
}