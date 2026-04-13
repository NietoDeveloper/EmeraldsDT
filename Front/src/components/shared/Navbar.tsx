"use client";

import { useScrollDirection } from "@/hooks/useScrollDirection";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingCart, ChevronDown } from "lucide-react";

// Configuración de navegación
const navLinks = [
  { name: "Home", href: "/" },
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
  const [isLoggedIn] = useState(false); 

  // REFRESH FORZADO: Solo para los logos. Usamos un div para evitar conflictos con <Link>
  const handleRefresh = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/';
  };

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsAtTop(window.scrollY < 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] 
          ${scrollDirection === "down" && !isMobileMenuOpen ? "-translate-y-full" : "translate-y-0"} 
          ${isAtTop ? "bg-transparent py-6 md:py-8" : "bg-black/80 backdrop-blur-xl py-4 shadow-2xl"}`}
      >
        <div className="w-full max-w-[1900px] mx-auto flex justify-between items-center px-6 sm:px-12 md:px-20 lg:px-24">
          
          {/* LOGO (REFRESH FORZADO) */}
          <div onClick={handleRefresh} className="group flex items-center gap-3 md:gap-5 z-[120] cursor-pointer">
            <div className="relative w-10 h-10 md:w-14 md:h-14 transition-all duration-700 group-hover:rotate-[360deg] group-hover:scale-110">
              <Image src="/assets/img/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <div className="hidden sm:flex items-center gap-1 md:gap-2">
              <span className="font-bold tracking-[0.2em] uppercase text-emerald-500 text-lg md:text-2xl">Emerald</span>
              <span className="font-black tracking-tighter uppercase text-gold text-lg md:text-2xl italic">DT</span>
            </div>
          </div>

          {/* DESKTOP MENU - SPA (No refresh) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-[10px] xl:text-[11px] uppercase tracking-[0.4em] font-bold text-gold/70 hover:text-gold transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* ICONS & AUTH - SPA (No refresh) */}
          <div className="flex items-center gap-4 md:gap-8">
            <Link href="/cart" className="text-gold/80 hover:text-gold transition-all">
              <ShoppingCart size={20} strokeWidth={1.5} />
            </Link>
            <Link 
              href={isLoggedIn ? "/logout" : "/login"} 
              className="hidden md:block text-[10px] uppercase tracking-[0.4em] font-bold border border-gold/20 px-4 py-2 hover:border-gold transition-colors"
            >
              {isLoggedIn ? "Logout" : "Login"}
            </Link>

            {/* HAMBURGER */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-[200] w-10 h-10 flex flex-col items-center justify-center bg-emerald-500/5 rounded-full border border-emerald-500/20"
            >
              <div className="relative w-5 h-4 flex flex-col justify-between">
                <span className={`w-full h-[2px] bg-emerald-500 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`w-full h-[2px] bg-emerald-500 transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-[2px] bg-emerald-500 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY - SPA (No refresh) */}
      <div className={`fixed inset-0 z-[130] transition-all duration-700 ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" />
        <div className="relative flex flex-col h-full justify-center items-center gap-10">
          <div onClick={handleRefresh} className="cursor-pointer mb-5">
              <div className="relative w-16 h-16"><Image src="/assets/img/logo.png" alt="Logo" fill className="object-contain" /></div>
          </div>
          {navLinks.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl uppercase tracking-[0.4em] font-black text-gold/60 hover:text-gold"
            >
              {item.name}
            </Link>
          ))}
          <Link 
            href="/cart" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="text-gold flex items-center gap-3 text-lg uppercase font-bold"
          >
            <ShoppingCart size={24}/> Cart
          </Link>
        </div>
      </div>
    </>
  );
};