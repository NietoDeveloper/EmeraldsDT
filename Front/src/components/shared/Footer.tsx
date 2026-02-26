"use client";

import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

// Cambiamos a export const para evitar el error de "undefined" en el layout
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-gray-300 border-t border-emerald/20 py-12 md:py-20 font-sans relative overflow-hidden">
      
      {/* Sistema Responsive Dinámico (310px - 1900px) */}
      <div className="w-full px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 max-w-[1900px] mx-auto transition-all duration-500">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 lg:gap-20 mb-16">


          {/* Navigation - Verde Esmeralda en Titulos */}
          <div>
            <h3 className="text-emerald font-bold mb-6 uppercase text-[9px] md:text-[10px] tracking-[0.4em] flex items-center gap-2">
              <span className="w-4 h-[1px] bg-emerald/30" /> Navigation
            </h3>
            <ul className="space-y-4 text-[11px] uppercase tracking-[0.2em] font-medium">
              <li>
                <Link href="/" className="hover:text-gold transition-colors duration-300 cursor-pointer">Home</Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-gold transition-colors duration-300 cursor-pointer">Collections</Link>
              </li>
              <li>
                <Link href="/traceability" className="hover:text-gold transition-colors duration-300 cursor-pointer">Traceability</Link>
              </li>
            </ul>
          </div>

    </footer>
  );
};