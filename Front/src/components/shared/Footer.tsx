/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ExternalLink, ShieldCheck, Cpu } from 'lucide-react';

/**
 * Emerald DT - Footer Final 
 * Calibrated for: 310px - 1900px (Strict Responsive)
 * Engineering & Architecture: Software DT
 */
export const Footer = () => {
  const params = useParams();
  const lang = (params?.lang as string) || "es";
  const isEs = lang === "es";

  const [time, setTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setMounted(true);
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date: Date | null) => {
    if (!date) return "";
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
    <footer className="w-full bg-black text-[#D4AF37] border-t border-[#10b981]/30 pt-12 pb-8 md:pt-20 md:pb-12 font-sans relative box-border overflow-hidden min-w-[310px]">
      
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 max-w-[1900px] mx-auto transition-all duration-500">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 lg:gap-20 mb-16">
          
          {/* Branding & Boyacá System Status */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <h2 className="text-xl md:text-2xl font-black tracking-[0.2em] text-[#10b981] mb-6 flex items-center gap-2 select-none">
              EMERALD<span className="text-[#D4AF37] italic">DT</span>
            </h2>
            <div className="space-y-4">
              <p className="text-[10px] leading-relaxed uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
                // BOYACÁ COLOMBIAN EMERALD DIGITAL TWIN
              </p>
              <div className="flex flex-col gap-2 font-mono text-[10px] tracking-widest text-[#10b981]/80 border-l border-[#10b981]/30 pl-4">
                <span>SYSTEM: ONLINE</span>
                <span>ORIGIN: MUZO / CHIVOR / COSCUEZ</span>
                <span>LOCATION: BOGOTÁ, COL</span>
                <span className="text-[#D4AF37] min-h-[15px]">
                  {mounted && time ? formatDateTime(time) : "LOADING SYNC..."}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Sincronizada */}
          <div>
            <h3 className="text-[#10b981] font-black mb-6 uppercase text-[10px] tracking-[0.4em] flex items-center gap-2 select-none">
              <span className="w-4 h-[1px] bg-[#10b981]/50" /> {isEs ? "APLICACIÓN" : "EMERALD APP"}
            </h3>
            <ul className="space-y-4 text-[11px] uppercase tracking-[0.2em] font-medium">
              <li className="hover:text-white transition-all duration-300 cursor-pointer">
                <Link href={`/${lang}/collections`} className="cursor-pointer block w-full">
                  {isEs ? "COLECCIONES" : "COLLECTIONS"}
                </Link>
              </li>
              <li className="hover:text-white transition-all duration-300 cursor-pointer">
                <Link href={`/${lang}#about`} className="cursor-pointer block w-full">
                  {isEs ? "ACERCA DE" : "ABOUT"}
                </Link>
              </li>
              <li className="hover:text-white transition-all duration-300 cursor-pointer">
                <Link href={`/${lang}#contact`} className="cursor-pointer block w-full">
                  {isEs ? "CONTACTO" : "CONTACT"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Software DT Engineering Specs */}
          <div>
            <h3 className="text-[#10b981] font-black mb-6 uppercase text-[10px] tracking-[0.4em] flex items-center gap-2 select-none">
              <span className="w-4 h-[1px] bg-[#10b981]/50" /> ARCHITECTURE
            </h3>
            <ul className="space-y-4 text-[11px] uppercase tracking-[0.2em] font-medium text-[#D4AF37]/80">
              <li className="flex items-center group cursor-pointer hover:text-white transition-all duration-300">
                <a href="https://softwaredt.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center cursor-pointer">
                  SOFTWARE DT <ExternalLink size={10} className="ml-2 transition-transform group-hover:translate-x-0.5" />
                </a>
              </li>
              <li className="flex items-center select-none text-[#D4AF37]/60">
                MAX SECURITY <ShieldCheck size={10} className="ml-2 text-[#10b981]" />
              </li>
              <li className="flex items-center select-none text-[#D4AF37]/60">
                DOUBLE CLUSTER <Cpu size={10} className="ml-2 text-[#10b981]" />
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#10b981]/10 flex flex-col md:flex-row justify-between items-center text-[8px] md:text-[9px] tracking-[0.3em] uppercase gap-8">
          <p className="text-[#10b981]/40 text-center md:text-left font-mono select-none">
            © {currentYear} EMERALD DT. POWERED BY SOFTWARE DT ARCHITECTURE.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10">
            <div className="flex items-center gap-2">
              <span className="text-[#10b981]/40 select-none">Architected by:</span>
              <a href="https://softwaredt.vercel.app/" target="_blank" rel="noopener noreferrer" 
                 className="text-[#D4AF37] font-black tracking-[0.4em] hover:text-white transition-colors cursor-pointer">
                SOFTWARE DT
              </a>
            </div>
            
            <div className="relative group select-none">
              <div className="absolute -inset-1 bg-[#D4AF37]/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-700"></div>
              <span className="relative flex items-center text-[#D4AF37] px-5 py-2 border border-[#D4AF37]/30 rounded-full bg-black backdrop-blur-sm transition-all duration-500 text-[7px] md:text-[9px] font-bold tracking-widest">
                SOFTWARE DT // HIGH-END SYSTEMS
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;