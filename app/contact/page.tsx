import React from "react";
import Link from "next/link";

export default function ContactUs() {
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
      <main className="relative z-10 max-w-5xl mx-auto p-8 md:p-16">
        
        <header className="mb-16 border-b border-white/10 pb-8">
          <p className="text-blue-500 font-black tracking-widest uppercase mb-4 text-sm">Secure Communications</p>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-4">Contact Command</h1>
          <p className="text-gray-400 text-sm tracking-wide">Global Support, Business Inquiries, and NGO Partnerships</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Contact Info */}
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Establish a Connection</h2>
              <p className="text-sm font-light leading-relaxed mb-6">
                Whether you are a university researcher utilizing our dossiers, an educator integrating the mainframe into your curriculum, or a user reporting a data anomaly, our terminal is open. Please allow 24-48 hours for a response from our engineering team.
              </p>
            </section>

            <section className="space-y-6">
              <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                <p className="text-[10px] uppercase tracking-widest text-blue-500 font-bold mb-1">General Support & Data Correction</p>
                <p className="text-white text-lg">support@earthlookup.com</p>
              </div>
              
              <div className="bg-white/5 border border-blue-500/30 p-5 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <p className="text-[10px] uppercase tracking-widest text-blue-400 font-bold mb-1">NGO & Humanitarian Partnerships</p>
                <p className="text-sm font-light leading-relaxed mb-2">
                  EarthLookup is actively expanding our verified humanitarian network. If you represent an apolitical, internationally recognized non-profit operating in an active crisis zone and wish to be integrated into our specific country dossiers, contact our integration team directly.
                </p>
                <p className="text-white font-medium">ngo-integration@earthlookup.com</p>
              </div>
            </section>
          </div>

          {/* Right Column: Contact Form */}
          <div>
            <form className="bg-black/50 border border-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-sm space-y-6">
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Identification (Name)</label>
                <input 
                  type="text" 
                  placeholder="Enter your full name" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Return Address (Email)</label>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Subject Directive</label>
                <select className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none cursor-pointer">
                  <option value="general">General Inquiry</option>
                  <option value="data">Data Correction Request</option>
                  <option value="ngo">NGO Partnership</option>
                  <option value="business">Business / Media</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Message Payload</label>
                <textarea 
                  rows={5}
                  placeholder="Enter your message transmission here..." 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600 resize-none"
                ></textarea>
              </div>

              <button 
                type="button" 
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-widest uppercase text-xs py-4 rounded-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
              >
                Transmit Message
              </button>
              
            </form>
          </div>

        </div>

        <footer className="mt-20 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 text-xs uppercase tracking-widest">EarthLookup Intelligence Systems © 2026. All Rights Reserved.</p>
        </footer>

      </main>
    </div>
  );
}