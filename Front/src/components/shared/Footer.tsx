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