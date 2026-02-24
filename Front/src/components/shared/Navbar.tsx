"use client";

import { useScrollDirection } from "@/hooks/useScrollDirection";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, Package } from "lucide-react";

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

  const navLinks = [
    { name: "Catalog", href: "/catalog" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] 
        ${scrollDirection === "down" && !isMobileMenuOpen ? "-translate-y-full" : "translate-y-0"} 
        ${isAtTop ? "bg-transparent mt-6 md:mt-10 py-10" : "bg-black/95 backdrop-blur-3xl mt-0 py-5 border-b border-emerald/20 shadow-2xl"}`}
      >
        <div className="w-full max-w-[2200px] mx-auto flex justify-between items-center px-10 sm:px-20 md:px-28 lg:px-36 xl:px-44 uw:px-64">
          
          {/* LOGO: Emerald DT en una sola línea */}
          <Link href="/" className="group flex items-center gap-4 z-[110] outline-none">
            <div className="relative w-12 h-12 md:w-16 md:h-16 transition-all duration-700 group-hover:rotate-[360deg] animate-float">
              <Image src="/assets/img/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold tracking-tight uppercase text-emerald text-xl md:text-3xl">Emerald</span>
              <span className="font-black tracking-tighter uppercase text-gold text-3xl md:text-5xl italic animate-pulse-slow">DT</span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-14">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-[13px] uppercase tracking-[0.5em] font-black text-emerald/80 hover:text-gold transition-all duration-500">
                {link.name}
              </Link>
            ))}
          </div>

          {/* ICONS & HAMBURGER */}
          <div className="flex items-center gap-8 md:gap-12">
            <div className="hidden md:flex items-center gap-8 border-l border-emerald/20 pl-10">
              <Link href="/cart" className="text-emerald hover:text-gold transition-all"><ShoppingCart size={24} /></Link>
              <Link href="/login" className="text-[12px] uppercase tracking-[0.3em] font-black text-emerald">Log In</Link>
            </div>

            {/* HAMBURGER: Movimiento Moderno Verde/Gold */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-[110] p-4 group outline-none overflow-visible"
            >
              {/* Círculo de fondo con pulso magnético */}
              <div className="absolute inset-0 bg-emerald/10 rounded-full blur-md group-hover:bg-gold/20 transition-all duration-500 group-hover:scale-150 animate-pulse" />
              
              <div className="relative flex items-center justify-center w-14 h-14 bg-black border border-emerald/30 rounded-full group-hover:border-gold transition-all duration-500 animate-magnetic">
                <Menu 
                  size={40} 
                  className={`absolute transition-all duration-700 ${isMobileMenuOpen ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'} text-emerald group-hover:text-gold`} 
                />
                <X 
                  size={40} 
                  className={`absolute transition-all duration-700 ${isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'} text-gold`} 
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 bg-black/98 backdrop-blur-3xl z-[105] transition-all duration-1000 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
        <div className="flex flex-col h-full justify-center items-end px-16 sm:px-32 gap-8">
          {navLinks.map((item, i) => (
            <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-5xl sm:text-7xl uppercase font-black text-emerald hover:text-gold transition-all" style={{ transitionDelay: `${i * 50}ms` }}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        .animate-float { animation: float 4s ease-in-out infinite; }
        @keyframes magnetic { 0%, 100% { transform: translate(0,0); } 25% { transform: translate(2px, -2px); } 75% { transform: translate(-2px, 2px); } }
        .animate-magnetic { animation: magnetic 3s ease-in-out infinite; }
      `}</style>
    </>
  );
};