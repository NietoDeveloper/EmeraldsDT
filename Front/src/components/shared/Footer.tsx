"use client";

import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

/**
 * Emerald DT - Footer Component
 * Calibrado para: 310px - 1900px
 * Signature: Nieto Laboratory / GitHub Top #1 Colombia
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-gray-300 border-t border-emerald/20 py-12 md:py-20 font-sans relative overflow-hidden">
      
      {/* Sistema Responsive Dinámico */}
      <div className="w-full px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 max-w-[1900px] mx-auto transition-all duration-500">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 lg:gap-20 mb-16">
          
          {/* Branding - Estilo SpaceX */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <h2 className="text-xl md:text-2xl font-black tracking-[0.2em] text-white mb-6 flex items-center gap-2">
              EMERALD<span className="text-gold italic">DT</span>
            </h2>
            <div className="space-y-3">
              <p className="text-[10px] leading-relaxed uppercase tracking-[0.3em] text-emerald font-bold">
                // Nieto Laboratory Legacy
              </p>
              <p className="text-[11px] leading-relaxed uppercase tracking-[0.15em] opacity-40 max-w-xs font-mono">
                The standard of Colombian gems. <br />
                Excellence. Transparency. <br />
                High Engineering.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-emerald font-bold mb-6 uppercase text-[9px] md:text-[10px] tracking-[0.4em] flex items-center gap-2">
              <span className="w-4 h-[1px] bg-emerald/30" /> Navigation
            </h3>
            <ul className="space-y-4 text-[11px] uppercase tracking-[0.2em] font-medium">
              <li>
                <Link href="/" className="hover:text-gold transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-gold transition-colors duration-300">Collections</Link>
              </li>
              <li>
                <Link href="/traceability" className="hover:text-gold transition-colors duration-300">Traceability</Link>
              </li>
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h3 className="text-emerald font-bold mb-6 uppercase text-[9px] md:text-[10px] tracking-[0.4em] flex items-center gap-2">
              <span className="w-4 h-[1px] bg-emerald/30" /> DT Ecosystem
            </h3>
            <ul className="space-y-4 text-[11px] uppercase tracking-[0.2em] font-medium text-zinc-500">
              <li className="flex items-center group cursor-pointer hover:text-gold transition-colors">
                Drone DT <ExternalLink size={10} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
              <li className="flex items-center group cursor-pointer hover:text-gold transition-colors">
                Software DT <ExternalLink size={10} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
              <li className="flex items-center group cursor-pointer hover:text-gold transition-colors">
                Drunvity DT <ExternalLink size={10} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
            </ul>
          </div>


        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[8px] md:text-[9px] tracking-[0.3em] uppercase gap-8">
          <p className="opacity-30 text-center md:text-left">© {currentYear} EMERALD DT. ALL RIGHTS RESERVED.</p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10">
            <div className="flex items-center gap-2">
              <span className="opacity-30">Developed by</span>
              <span className="text-gold font-black tracking-[0.3em]">
                NietoDeveloper
              </span>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-emerald/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-700"></div>
              <span className="relative flex items-center text-emerald px-4 py-2 border border-emerald/20 rounded-full bg-black/80 backdrop-blur-sm transition-all duration-500 group-hover:border-emerald group-hover:text-white text-[7px] md:text-[9px]">
                GitHub Top #1 Colombia
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Exportación dual para evitar errores de importación en layout.tsx y page.tsx
export default Footer;