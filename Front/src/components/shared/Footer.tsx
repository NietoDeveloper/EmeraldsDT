import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-gray-300 border-t border-emerald/20 py-16 md:py-24 font-sans relative overflow-hidden">
      {/* Sincronización de Paddings con Navbar y Home (310px - 1900px) */}
      <div className="w-full px-12 sm:px-24 md:px-32 lg:px-40 xl:px-56 uw:px-72 transition-all duration-500">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24 mb-20">
          
          {/* Branding - Estilo SpaceX / Nieto Lab */}
          <div className="col-span-1">
            <h2 className="text-2xl font-black tracking-[0.2em] text-white mb-8 flex items-center gap-2">
              EMERALD<span className="text-gold italic">DT</span>
            </h2>
            <div className="space-y-2">
              <p className="text-[10px] leading-relaxed uppercase tracking-[0.3em] text-emerald font-bold">
                // Nieto Laboratory Legacy
              </p>
              <p className="text-[11px] leading-relaxed uppercase tracking-[0.15em] opacity-50 max-w-xs">
                The standard of Colombian gems. <br />
                Excellence. Transparency. High Engineering.
              </p>
            </div>
          </div>

          {/* Navigation - Verde Esmeralda en Titulos */}
          <div>
            <h3 className="text-emerald font-bold mb-8 uppercase text-[10px] tracking-[0.4em] flex items-center gap-2">
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

          {/* Ecosystem - Gold Hovers */}
          <div>
            <h3 className="text-emerald font-bold mb-8 uppercase text-[10px] tracking-[0.4em] flex items-center gap-2">
              <span className="w-4 h-[1px] bg-emerald/30" /> DT Ecosystem
            </h3>
            <ul className="space-y-4 text-[11px] uppercase tracking-[0.2em] font-medium text-zinc-400">
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

          {/* Contact & Social - Minimalist */}
          <div>
            <h3 className="text-emerald font-bold mb-8 uppercase text-[10px] tracking-[0.4em] flex items-center gap-2">
              <span className="w-4 h-[1px] bg-emerald/30" /> Social
            </h3>
            <div className="flex space-x-6 mb-10">
              <a href="https://github.com/NietoDeveloper" target="_blank" className="text-zinc-500 hover:text-gold transition-all transform hover:scale-125">
                <Github size={20} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-zinc-500 hover:text-gold transition-all transform hover:scale-125">
                <Linkedin size={20} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-zinc-500 hover:text-gold transition-all transform hover:scale-125">
                <Mail size={20} strokeWidth={1.5} />
              </a>
            </div>
            <p className="text-[10px] tracking-[0.3em] text-zinc-600 font-mono">BOGOTÁ // COLOMBIA</p>
          </div>
        </div>

        {/* Bottom Bar - Nieto Developer Signature */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] tracking-[0.3em] uppercase">
          <p className="opacity-40 mb-6 md:mb-0">© {currentYear} EMERALD DT. ALL RIGHTS RESERVED.</p>
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="flex items-center gap-2">
              <span className="opacity-40">Developed by</span>
              <span className="text-gold font-black tracking-[0.4em]">NietoDeveloper</span>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-emerald/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <span className="relative flex items-center text-emerald px-4 py-1.5 border border-emerald/30 rounded-full bg-black/50 backdrop-blur-sm transition-all duration-500 group-hover:border-emerald">
                GitHub Top #1 Colombia
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;