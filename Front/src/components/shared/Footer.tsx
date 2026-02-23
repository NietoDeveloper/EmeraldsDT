import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-300 border-t border-emerald-900/30 py-16 font-sans">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Branding - Estilo SpaceX */}
          <div className="col-span-1">
            <h2 className="text-2xl font-bold tracking-[0.2em] text-white mb-6">
              EMERALD<span className="text-emerald-500">DT</span>
            </h2>
            <p className="text-xs leading-relaxed uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity duration-500">
              The standard of Colombian gems. <br />
              Excellence. Transparency. <br />
              Nieto Laboratory Legacy.
            </p>
          </div>

          {/* Navigation - Verde Esmeralda en Titulos */}
          <div>
            <h3 className="text-emerald-500 font-bold mb-6 uppercase text-[10px] tracking-[0.3em]">
              Navigation
            </h3>
            <ul className="space-y-3 text-[11px] uppercase tracking-widest font-medium">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-amber-400 transition-colors duration-300">Collections</Link>
              </li>
              <li>
                <Link href="/traceability" className="hover:text-amber-400 transition-colors duration-300">Traceability</Link>
              </li>
            </ul>
          </div>

          {/* Ecosystem - Gold Hovers */}
          <div>
            <h3 className="text-emerald-500 font-bold mb-6 uppercase text-[10px] tracking-[0.3em]">
              DT Ecosystem
            </h3>
            <ul className="space-y-3 text-[11px] uppercase tracking-widest font-medium">
              <li className="flex items-center group cursor-pointer hover:text-amber-400 transition-colors">
                Drone DT <ExternalLink size={10} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
              <li className="flex items-center group cursor-pointer hover:text-amber-400 transition-colors">
                Software DT <ExternalLink size={10} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
              <li className="flex items-center group cursor-pointer hover:text-amber-400 transition-colors">
                Drunvity DT <ExternalLink size={10} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </li>
            </ul>
          </div>

          {/* Contact & Social - Minimalist */}
          <div>
            <h3 className="text-emerald-500 font-bold mb-6 uppercase text-[10px] tracking-[0.3em]">
              Social
            </h3>
            <div className="flex space-x-5 mb-8">
              <a href="https://github.com/NietoDeveloper" target="_blank" className="hover:text-amber-400 transition-all transform hover:scale-110">
                <Github size={18} strokeWidth={1.5} />
              </a>
              <a href="#" className="hover:text-amber-400 transition-all transform hover:scale-110">
                <Linkedin size={18} strokeWidth={1.5} />
              </a>
              <a href="#" className="hover:text-amber-400 transition-all transform hover:scale-110">
                <Mail size={18} strokeWidth={1.5} />
              </a>
            </div>
            <p className="text-[10px] tracking-[0.2em] opacity-40">BOGOTÁ, COLOMBIA</p>
          </div>
        </div>

        {/* Bottom Bar - Nieto Developer Signature */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] tracking-[0.2em] uppercase opacity-50">
          <p>© {currentYear} EMERALD DT. ALL RIGHTS RESERVED.</p>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <span>Developed by</span>
            <span className="text-amber-400 font-bold tracking-[0.3em]">NietoDeveloper</span>
            <span className="text-emerald-500 px-2 py-0.5 border border-emerald-500/30 rounded-full">
              GitHub Top #1 Colombia
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;