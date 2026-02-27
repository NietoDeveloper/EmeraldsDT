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
            ? "bg-transparent mt-1 py-4 md:py-6" // mt-1 + padding ajustado para ~15px del borde superior
            : "bg-black/95 backdrop-blur-3xl mt-0 py-4 border-b border-emerald/20 shadow-2xl"
          }`}
      >
        {/* Contenedor expandido para pantallas grandes (Nieto Lab Standard) */}
        <div className="w-full max-w-[1900px] mx-auto flex justify-between items-center px-8 sm:px-16 md:px-24 lg:px-32 xl:px-40 transition-all duration-500">
          
          {/* LOGO & BRAND */}
          <Link href="/" className="group flex items-center gap-4 z-[120] outline-none cursor-pointer flex-shrink-0">
            <div className="relative w-10 h-10 md:w-14 md:h-14 transition-all duration-700 group-hover:rotate-[360deg] flex-shrink-0">
              <Image src="/assets/img/logo.png" alt="Emerald DT Logo" fill className="object-contain" />
            </div>

            <div className="flex items-center gap-2 md:gap-3 whitespace-nowrap transition-all duration-500 group-hover:-translate-y-1">
              <span className="font-bold tracking-tight uppercase text-white text-lg md:text-3xl group-hover:text-gold transition-colors duration-500 leading-none">
                Emerald
              </span>
              <span className="font-black tracking-tighter uppercase text-white text-lg md:text-3xl italic leading-none group-hover:text-gold transition-colors duration-500">
                DT
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU - Texto Blanco con Hover Gold Flotante */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group/item">
                <Link 
                  href={link.href} 
                  className="flex items-center gap-2 text-[12px] xl:text-[14px] uppercase tracking-[0.3em] font-bold text-white hover:text-gold hover:-translate-y-1 transition-all duration-500 py-2"
                >
                  {link.name}
                  {link.subItems && <ChevronDown size={14} className="group-hover/item:rotate-180 transition-transform duration-300" />}
                </Link>

                {link.subItems && (
                  <div className="absolute top-full left-0 w-64 bg-black/98 border border-white/10 backdrop-blur-3xl p-6 opacity-0 translate-y-4 pointer-events-none group-hover/item:opacity-100 group-hover/item:translate-y-0 group-hover/item:pointer-events-auto transition-all duration-500 shadow-2xl">
                    <div className="flex flex-col gap-4">
                      {link.subItems.map((sub) => (
                        <Link key={sub.name} href={sub.href} className="text-[10px] uppercase tracking-[0.2em] text-white/70 hover:text-gold transition-colors">
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
          <div className="flex items-center gap-6 md:gap-10">
            <div className="hidden md:flex items-center gap-8 border-l border-white/10 pl-10 text-white">
              <Link href="/cart" className="hover:text-gold transition-all hover:-translate-y-1 inline-block">
                <ShoppingCart size={22} />
              </Link>
              <Link href="/login" className="text-[11px] uppercase tracking-[0.3em] font-bold hover:text-gold hover:-translate-y-1 transition-all">
                Log In
              </Link>
            </div>

            {/* Hamburguesa y X: Color Blanco con Hover Gold */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-[150] cursor-pointer group outline-none"
            >
              <div className="relative w-12 h-12 flex items-center justify-center rounded-full border border-white/10 group-hover:border-gold transition-all duration-500">
                <Menu 
                  size={26} 
                  className={`absolute transition-all duration-500 ${isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'} text-white group-hover:text-gold`} 
                />
                <X 
                  size={26} 
                  className={`absolute transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'} text-white group-hover:text-gold`} 
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY - Estilo Mejorado */}
      <div className={`fixed inset-0 bg-black z-[130] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] 
        ${isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"}`}
      >
        <div className="flex flex-col h-full justify-center items-end px-12 sm:px-32 gap-8">
          {navLinks.map((item, index) => (
            <div key={item.name} className="flex flex-col items-end group/mob">
              <Link 
                href={item.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-4xl sm:text-6xl uppercase tracking-[0.2em] font-black text-white hover:text-gold transition-all duration-500 ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-40 opacity-0"}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                   {item.name}
                   {item.subItems && <ChevronDown size={24} className="text-gold/50" />}
                </div>
              </Link>
            </div>
          ))}
          <div className="h-[1px] w-32 bg-white/10 my-4" />
          <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="text-xl uppercase tracking-[.4em] text-white/60 hover:text-gold transition-all">Cart</Link>
          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-xl uppercase tracking-[.4em] text-white/60 hover:text-gold transition-all">Log In</Link>
        </div>
      </div>
    </>
  );
};

const navLinks = [
  { name: "Catalog", href: "/catalog", subItems: [{ name: "Rough Emeralds", href: "/catalog/rough" }, { name: "Faceted Gems", href: "/catalog/faceted" }, { name: "Investment Grade", href: "/catalog/investment" }] },
  { name: "Categories", href: "/categories", subItems: [{ name: "Muzo Mine", href: "/categories/muzo" }, { name: "Chivor Mine", href: "/categories/chivor" }, { name: "Coscuez Collection", href: "/categories/coscuez" }] },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];