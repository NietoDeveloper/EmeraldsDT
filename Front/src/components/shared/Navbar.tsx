"use client";

import { useScrollDirection } from "@/hooks/useScrollDirection";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";

export const Navbar = () => {
  const scrollDirection = useScrollDirection();
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsAtTop(window.scrollY < 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] 
          ${scrollDirection === "down" && !isMobileMenuOpen ? "-translate-y-full" : "translate-y-0"} 
          ${isAtTop 
            ? "bg-transparent mt-1 md:mt-4 py-6 md:py-8" 
            : "bg-black/95 backdrop-blur-3xl mt-0 pt-[15px] pb-4 border-b border-emerald/20 shadow-2xl"
          }`}
      >
        {/* max-w-[1900px] con padding extendido para pantallas grandes */}
        <div className="w-full max-w-[1900px] mx-auto flex justify-between items-center px-6 sm:px-12 md:px-20 lg:px-24 xl:px-32 transition-all duration-500">
          
          {/* LOGO & BRAND: Colores originales Emerald/Gold */}
          <Link href="/" className="group flex items-center gap-3 md:gap-5 z-[120] outline-none cursor-pointer flex-shrink-0">
            <div className="relative w-10 h-10 md:w-14 md:h-14 transition-all duration-700 group-hover:rotate-[360deg] flex-shrink-0 animate-float">
              <Image src="/assets/img/logo.png" alt="Emerald DT Logo" fill className="object-contain" />
            </div>

            <div className="flex items-center gap-2 md:gap-3 whitespace-nowrap -mt-1 transition-all duration-500 group-hover:-translate-y-1">
              <span className="font-bold tracking-tight uppercase text-emerald text-lg md:text-3xl group-hover:text-gold transition-colors duration-500 leading-none">
                Emerald
              </span>
              <span className="font-black tracking-tighter uppercase text-emerald text-lg md:text-3xl italic leading-none group-hover:text-gold transition-colors duration-500 drop-shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                DT
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU: Botones en Blanco con Hover Gold Flotante */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group/item">
                <Link 
                  href={link.href} 
                  className="flex items-center gap-2 text-[11px] xl:text-[12px] uppercase tracking-[0.4em] font-black text-white hover:text-gold hover:-translate-y-1 transition-all duration-500 py-2"
                >
                  {link.name}
                  {link.subItems && (
                    <ChevronDown size={14} className="group-hover/item:rotate-180 transition-transform duration-300 text-white group-hover/item:text-gold" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {link.subItems && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-black/98 border border-emerald/20 backdrop-blur-3xl p-6 opacity-0 translate-y-4 pointer-events-none group-hover/item:opacity-100 group-hover/item:translate-y-0 group-hover/item:pointer-events-auto transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-[110]">
                    {/* Pequeña flecha indicativa superior */}
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black border-t border-l border-emerald/20 rotate-45" />
                    <div className="flex flex-col gap-4 relative">
                      {link.subItems.map((sub) => (
                        <Link key={sub.name} href={sub.href} className="text-[10px] uppercase tracking-[0.2em] text-white/70 hover:text-gold transition-colors duration-300">
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ICONS & HAMBURGER */}
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex items-center gap-8 border-l border-white/10 pl-8 text-white">
              <Link href="/cart" className="hover:text-gold transition-all hover:-translate-y-1 inline-block">
                <ShoppingCart size={22} />
              </Link>
              <Link href="/login" className="text-[11px] uppercase tracking-[0.3em] font-black hover:text-gold hover:-translate-y-0.5 transition-all">
                Log In
              </Link>
            </div>

            {/* Hamburguesa y X: Color Blanco/Gold */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-[150] cursor-pointer group outline-none"
              aria-label="Toggle Menu"
            >
              <div className="relative w-12 h-12 flex items-center justify-center bg-white/5 rounded-full border border-white/10 group-hover:border-gold group-hover:-translate-y-1 transition-all duration-500">
                <Menu 
                  size={26} 
                  className={`absolute transition-all duration-700 ${isMobileMenuOpen ? 'opacity-0 scale-0 rotate-180' : 'opacity-100 scale-100 rotate-0'} text-white group-hover:text-gold`} 
                />
                <X 
                  size={26} 
                  className={`absolute transition-all duration-700 ${isMobileMenuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 -rotate-180'} text-white group-hover:text-gold`} 
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY: Botones en Blanco con Hover Gold */}
      <div className={`fixed inset-0 bg-black z-[130] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] 
        ${isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"}`}
      >
        <div className="flex flex-col h-full justify-center items-end px-10 sm:px-32 gap-6">
          {navLinks.map((item, index) => (
            <div key={item.name} className="flex flex-col items-end">
              <Link 
                href={item.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-3xl sm:text-5xl uppercase tracking-[0.2em] font-black text-white hover:text-gold transition-all duration-700 ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-40 opacity-0"}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item.name}
              </Link>
              {item.subItems && <span className="text-[9px] text-gold/50 tracking-[.4em] uppercase mt-2">Explore Series →</span>}
            </div>
          ))}
          <div className="h-[1px] w-20 bg-white/10 my-4" />
          <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="text-lg uppercase tracking-[.3em] text-white/50 hover:text-gold transition-colors">Cart</Link>
          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-lg uppercase tracking-[.3em] text-white/50 hover:text-gold transition-colors">Log In</Link>
        </div>
      </div>
    </>
  );
};
