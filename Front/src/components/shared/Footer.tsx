/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, ExternalLink, ShieldCheck, Cpu } from 'lucide-react';

/**
 * Emerald DT - Footer Final 
 * Calibrated for: 310px - 1900px
 * Engineering: Software DT
 */
export const Footer = () => {
  const [time, setTime] = useState(new Date());
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour12: false
    }).toUpperCase();
  };

  return (
    <footer className="w-full bg-black text-gold border-t border-emerald/30 pt-12 pb-8 md:pt-20 md:pb-12 font-sans relative box-border overflow-hidden">
      
      <div className="w-full px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 max-w-[1900px] mx-auto transition-all duration-500">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 lg:gap-20 mb-16">
          
          {/* Branding & System Status */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <h2 className="text-xl md:text-2xl font-black tracking-[0.2em] text-emerald mb-6 flex items-center gap-2">
              EMERALD<span className="text-gold italic">DT</span>
            </h2>
            <div className="space-y-4">
              <p className="text-[10px] leading-relaxed uppercase tracking-[0.3em] text-gold font-bold">
                // Colombian Emerald Digital Twin
              </p>
              <div className="flex flex-col gap-2 font-mono text-[10px] tracking-widest text-emerald/80 border-l border-emerald/30 pl-4">
                <span>SYSTEM: ONLINE</span>
                <span>LOCATION: BOGOTÁ, COL</span>
                <span className="text-gold">{formatDateTime(time)}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-emerald font-black mb-6 uppercase text-[10px] tracking-[0.4em] flex items-center gap-2">
              <span className="w-4 h-[1px] bg-emerald/50" /> EMERALD APP
            </h3>
            <ul className="space-y-4 text-[11px] uppercase tracking-[0.2em] font-medium">
              <li className="hover:text-gold transition-all duration-300 cursor-pointer">
                <Link href="/catalog">CATALOGUE</Link>
              </li>
              <li className="hover:text-gold transition-all duration-300 cursor-pointer">
                <Link href="/categories">CATEGORIES</Link>
              </li>
              <li className="hover:text-gold transition-all duration-300 cursor-pointer">
                <Link href="/traceability">TRACEABILITY</Link>
              </li>
            </ul>
          </div>

          {/* Software DT Engineering */}
          <div>
            <h3 className="text-emerald font-black mb-6 uppercase text-[10px] tracking-[0.4em] flex items-center gap-2">
              <span className="w-4 h-[1px] bg-emerald/50" /> ENGINEERING
            </h3>
            <ul className="space-y-4 text-[11px] uppercase tracking-[0.2em] font-medium text-gold/80">
              <li className="flex items-center group cursor-pointer hover:text-gold transition-all duration-300">
                <a href="https://softwaredt.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  SOFTWARE DT <ExternalLink size={10} className="ml-2" />
                </a>
              </li>
              <li className="flex items-center group cursor-pointer hover:text-gold transition-all duration-300">
                MAX SECURITY <ShieldCheck size={10} className="ml-2 text-emerald" />
              </li>
              <li className="flex items-center group cursor-pointer hover:text-gold transition-all duration-300">
                DOUBLE CLUSTER <Cpu size={10} className="ml-2 text-emerald" />
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald/10 flex flex-col md:flex-row justify-between items-center text-[8px] md:text-[9px] tracking-[0.3em] uppercase gap-8">
          <p className="text-emerald/40 text-center md:text-left font-mono">
            © {currentYear} EMERALD DT. BUILT BY SOFTWARE DT WITH TOTAL CLARITY.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10">
            <div className="flex items-center gap-2">
              <span className="text-emerald/40">Architect:</span>
              <a href="https://softwaredt.vercel.app/" target="_blank" rel="noopener noreferrer" 
                 className="text-gold font-black tracking-[0.4em] hover:scale-110 transition-transform cursor-pointer">
                SOFTWARE DT
              </a>
            </div>
            
            <a href="https://committers.top/colombia" target="_blank" rel="noopener noreferrer" className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gold/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-700"></div>
              <span className="relative flex items-center text-gold px-5 py-2 border border-gold/30 rounded-full bg-black backdrop-blur-sm transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-black text-[7px] md:text-[9px] font-bold">
                GitHub Top #1 Colombia
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;