/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, ExternalLink, ShieldCheck, Cpu } from 'lucide-react';

/**
 * Emerald DT - Footer Final 
 * Calibrado para: 310px - 1900px
 * Author: NietoDeveloper
 */
export const Footer = () => {
  const [time, setTime] = useState(new Date());
  // FIX: Definición de currentYear para evitar ReferenceError
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
          
          {/* Branding */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <h2 className="text-xl md:text-2xl font-black tracking-[0.2em] text-emerald mb-6 flex items-center gap-2">
              EMERALD<span className="text-gold italic">DT</span>
            </h2>
            <div className="space-y-4">
              <p className="text-[10px] leading-relaxed uppercase tracking-[0.3em] text-gold font-bold">
                // Colombian Emeralds
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
            
          
export default Footer;