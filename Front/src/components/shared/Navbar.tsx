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
            ? "bg-transparent mt-4 md:mt-10 py-6 md:py-10" 
            : "bg-black/95 backdrop-blur-3xl mt-0 py-4 border-b border-emerald/20 shadow-2xl"
          }`}
      >
        <div className="w-full max-w-[1900px] mx-auto flex justify-between items-center px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 transition-all duration-500">
          
          {/* LOGO & BRAND */}
          <Link href="/" className="group flex items-center gap-3 md:gap-5 z-[120] outline-none cursor-pointer flex-shrink-0">
            <div className="relative w-10 h-10 md:w-16 md:h-16 transition-all duration-700 group-hover:rotate-[360deg] animate-float flex-shrink-0">
              <Image src="/assets/img/logo.png" alt="Emerald DT Logo" fill className="object-contain" />
            </div>

            {/* Texto del logo con ajuste de altura y hover flotante */}
            <div className="flex items-center gap-2 md:gap-4 whitespace-nowrap -mt-1 md:-mt-2 transition-all duration-500 group-hover:-translate-y-1">
              <span className="font-bold tracking-tight uppercase text-emerald text-lg md:text-3xl group-hover:text-gold transition-colors duration-500 leading-none">
                Emerald
              </span>
              <span className="font-black tracking-tighter uppercase text-gold text-2xl md:text-5xl italic leading-none drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                DT
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU CON SUBMENÚS */}
          <div className="hidden lg:flex items-center gap-10 xl:gap-16">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group/item">
                <Link 
                  href={link.href} 
                  className="flex items-center gap-2 text-[11px] xl:text-[13px] uppercase tracking-[0.4em] xl:tracking-[0.5em] font-black text-emerald/80 hover:text-gold transition-all duration-500 py-2"
                >
                  {link.name}
                  {link.subItems && <ChevronDown size={14} className="group-hover/item:rotate-180 transition-transform duration-300" />}
                </Link>

                {/* Dropdown Menu (SpaceX Style) */}
                {link.subItems && (
                  <div className="absolute top-full left-0 w-64 bg-black/95 border border-emerald/20 backdrop-blur-3xl p-6 opacity-0 translate-y-4 pointer-events-none group-hover/item:opacity-100 group-hover/item:translate-y-0 group-hover/item:pointer-events-auto transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className="flex flex-col gap-4">
                      {link.subItems.map((sub) => (
                        <Link key={sub.name} href={sub.href} className="text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-gold transition-colors">
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
          <div className="flex items-center gap-4 md:gap-10">
            <div className="hidden md:flex items-center gap-8 border-l border-emerald/30 pl-10 text-emerald">
              <Link href="/cart" className="hover:text-gold transition-transform hover:scale-125">
                <ShoppingCart size={24} />
              </Link>
              <Link href="/login" className="text-[12px] uppercase tracking-[0.3em] font-black hover:text-gold transition-colors">
                Log In
              </Link>
            </div>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-[150] cursor-pointer group outline-none overflow-visible"
            >
              <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-emerald/5 rounded-full border border-emerald/20 group-hover:border-gold transition-all duration-500">
                <Menu 
                  size={28} 
                  className={`absolute transition-all duration-700 ${isMobileMenuOpen ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'} text-emerald`} 
                />
                <X 
                  size={32} 
                  className={`absolute transition-all duration-700 ${isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'} text-gold font-bold`} 
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 bg-black z-[130] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] 
        ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
      >
        <div className="flex flex-col h-full justify-center items-end px-10 sm:px-32 gap-6 md:gap-8">
          {navLinks.map((item, index) => (
            <div key={item.name} className="flex flex-col items-end">
              <Link 
                href={item.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-3xl sm:text-6xl uppercase tracking-[0.3em] font-black text-emerald hover:text-gold transition-all duration-700 ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-40 opacity-0"}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item.name}
              </Link>
              {/* Indicador de submenús en móvil */}
              {item.subItems && <span className="text-[10px] text-gold/50 tracking-[.5em] uppercase mt-2">Explore Series →</span>}
            </div>
          ))}
          <div className="h-[1px] w-20 bg-emerald/20 my-4" />
          <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="text-xl uppercase tracking-[.4em] text-white/50 hover:text-gold">Cart</Link>
          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-xl uppercase tracking-[.4em] text-white/50 hover:text-gold">Log In</Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
      `}</style>
    </>
  );
};

const navLinks = [
  { 
    name: "Catalog", 
    href: "/catalog",
    subItems: [
      { name: "Rough Emeralds", href: "/catalog/rough" },
      { name: "Faceted Gems", href: "/catalog/faceted" },
      { name: "Investment Grade", href: "/catalog/investment" },
    ]
  },
  { 
    name: "Categories", 
    href: "/categories",
    subItems: [
      { name: "Muzo Mine", href: "/categories/muzo" },
      { name: "Chivor Mine", href: "/categories/chivor" },
      { name: "Coscuez Collection", href: "/categories/coscuez" },
    ]
  },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];