"use client";

import { useScrollDirection } from "@/hooks/useScrollDirection";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";

// Interfaces con Strict Type para el Nieto Laboratory
interface NavSubItem {
  name: string;
  href: string;
}

interface NavLink {
  name: string;
  href: string;
  subItems?: NavSubItem[];
}

const navLinks: NavLink[] = [
  { name: "Catalog", href: "/catalog" },
  { 
    name: "Categories", 
    href: "/categories",
    subItems: [
      { name: "Muzo Selection", href: "/categories/muzo" },
      { name: "Chivor Heritage", href: "/categories/chivor" },
      { name: "Coscuez Shine", href: "/categories/coscuez" },
    ]
  },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const scrollDirection = useScrollDirection();
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/';
  };

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
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
            ? "bg-transparent py-6 md:py-10" 
            : "bg-transparent backdrop-blur-md py-4 border-b border-emerald-500/10"
          }`}
      >
        {/* Ajuste de ancho máximo para pantallas de 1900px */}
        <div className="w-full max-w-[1900px] mx-auto flex justify-between items-center px-6 sm:px-12 md:px-20 lg:px-24 transition-all duration-500">
          
          {/* LOGO & BRAND */}
          <Link href="/" onClick={handleLogoClick} className="group flex items-center gap-3 md:gap-5 z-[120] outline-none cursor-pointer">
            <div className="relative w-10 h-10 md:w-16 md:h-16 transition-all duration-700 group-hover:rotate-[360deg] group-hover:scale-110">
              <Image src="/assets/img/logo.png" alt="Emerald DT Logo" fill className="object-contain" />
            </div>

            <div className="flex flex-col -gap-1">
              <div className="flex items-center gap-1 md:gap-2">
                <span className="font-bold tracking-[0.2em] uppercase text-white text-lg md:text-2xl group-hover:text-emerald-400 transition-colors duration-500">
                  Emerald
                </span>
                <span className="font-black tracking-tighter uppercase text-emerald-500 text-lg md:text-2xl italic group-hover:text-white transition-colors duration-500">
                  DT
                </span>
              </div>
              <span className="text-[7px] md:text-[8px] uppercase tracking-[0.6em] text-zinc-500 font-mono">Colombian Engineering</span>
            </div>
          </Link>

          {/* DESKTOP MENU - Siempre transparente para ver el banner */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-14">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group/item">
                <Link 
                  href={link.href} 
                  className="flex items-center gap-2 text-[10px] xl:text-[11px] uppercase tracking-[0.5em] font-bold text-white/80 hover:text-white transition-all duration-300"
                >
                  {link.name}
                  {link.subItems && link.subItems.length > 0 && (
                    <ChevronDown size={12} className="group-hover/item:rotate-180 transition-transform duration-300 opacity-50" />
                  )}
                </Link>

                {link.subItems && link.subItems.length > 0 && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 pt-6 opacity-0 translate-y-2 pointer-events-none group-hover/item:opacity-100 group-hover/item:translate-y-0 group-hover/item:pointer-events-auto transition-all duration-500">
                    <div className="bg-black/40 backdrop-blur-3xl border border-white/5 p-6 shadow-2xl">
                      <div className="flex flex-col gap-4 relative">
                        {link.subItems.map((sub) => (
                          <Link key={sub.name} href={sub.href} className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 hover:text-emerald-400 transition-colors duration-300">
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ICONS & MENU TOGGLE */}
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex items-center gap-8 text-white/70">
              <Link href="/cart" className="hover:text-emerald-400 transition-all hover:-translate-y-0.5">
                <ShoppingCart size={20} strokeWidth={1.5} />
              </Link>
              <Link href="/login" className="text-[10px] uppercase tracking-[0.4em] font-bold hover:text-white transition-all">
                Access
              </Link>
            </div>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-[150] w-10 h-10 flex items-center justify-center bg-white/5 rounded-full border border-white/10"
            >
              <div className="relative w-5 h-5">
                <Menu size={20} className={`absolute transition-all duration-500 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <X size={20} className={`absolute transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY - Blur Esmeralda Cinematográfico */}
      <div className={`fixed inset-0 z-[130] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] 
        ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[60px]" />
        
        {/* Glow Esmeralda de fondo en el menú */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full" />

        <div className="relative flex flex-col h-full justify-center items-center px-10 gap-12">
          <div className="flex flex-col items-center gap-8 w-full">
            {navLinks.map((item, index) => (
              <Link 
                key={item.name} 
                href={item.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-2xl uppercase tracking-[0.5em] font-black text-white transition-all duration-700
                  ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className={`flex flex-col items-center gap-4 transition-all duration-1000 delay-500 ${isMobileMenuOpen ? "opacity-40" : "opacity-0"}`}>
            <p className="text-[8px] uppercase tracking-[0.8em]">Emerald DT // 2026</p>
          </div>
        </div>
      </div>
    </>
  );
};