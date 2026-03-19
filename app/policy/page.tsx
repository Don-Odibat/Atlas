// @ts-nocheck
"use client";

import React from "react";
import Link from "next/link";
import TrustFooter from "../../components/TrustFooter";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-blue-500/30">
      
      {/* TOP NAVIGATION BANNER */}
      <nav className="w-full border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50 px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-black tracking-tighter hover:text-blue-400 transition-colors">
          EARTH<span className="text-blue-500">LOOKUP</span>
        </Link>
        <div className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">
          Intelligence Core / Privacy Policy
        </div>
      </nav>

      {/* POLICY CONTENT */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-20 flex flex-col gap-10">
        
        <header className="border-b border-white/10 pb-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">Privacy Policy</h1>
          <div className="flex flex-col md:flex-row gap-4 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <span>Last Updated: March 19, 2026</span>
            <span className="hidden md:inline">•</span>
            <span>Operated by Don Systems Holding</span>
          </div>
        </header>

        <article className="prose prose-invert prose-blue max-w-none text-gray-300 leading-relaxed space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-blue-500 pl-4">1. Information Collection And Use</h2>
            <p>
              Welcome to <strong>EarthLookup.com</strong>, a platform proudly developed by <strong>Don Systems Holding</strong>. We are committed to protecting your privacy. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our global intelligence service and the choices you have associated with that data.
            </p>
            <p className="mt-4">
              We use your data to provide and improve the service. By using EarthLookup, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-blue-500 pl-4">2. Types of Data Collected</h2>
            <h3 className="text-lg font-bold text-blue-400 mt-4 mb-2">Usage Data</h3>
            <p>
              We may collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
            </p>
            <h3 className="text-lg font-bold text-blue-400 mt-4 mb-2">Tracking & Cookies Data</h3>
            <p>
              We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-blue-500 pl-4">3. Google AdSense & Third-Party Advertising</h2>
            <p>
              We use third-party advertising companies, including Google AdSense, to serve ads when you visit our website. These companies may use aggregated information (not including your name, address, email address, or telephone number) about your visits to this and other Web sites in order to provide advertisements about goods and services of interest to you.
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
              <li>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
              <li>Users may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" className="text-blue-400 hover:text-white">Google Ads Settings</a>.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-blue-500 pl-4">4. The Don Systems Network</h2>
            <p>
              EarthLookup is part of a larger network of utilities owned by Don Systems Holding. Navigating to our partner sites (including TellMyLocation.com, WaterInMySpeaker.com, and CheckThisPhone.com) will subject you to the individual privacy policies of those respective domains.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-blue-500 pl-4">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact the Executive Director:
            </p>
            <ul className="list-none mt-4 space-y-2 font-mono bg-white/5 p-6 rounded-lg border border-white/10">
              <li><strong className="text-blue-400">Email:</strong> don.odibat@gmail.com</li>
              <li><strong className="text-blue-400">Mail:</strong> Don Systems Holding, Tupelo, MS, USA 38801</li>
            </ul>
          </section>

        </article>

      </main>

      {/* UNIVERSAL FOOTER */}
      <TrustFooter />
      
    </div>
  );
}