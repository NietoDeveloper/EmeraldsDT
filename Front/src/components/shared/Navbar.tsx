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

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] 
        ${scrollDirection === "down" && !isMobileMenuOpen ? "-translate-y-full" : "translate-y-0"} 
        ${isAtTop ? "bg-transparent mt-6 md:mt-10 py-10" : "bg-black/95 backdrop-blur-3xl mt-0 py-5 border-b border-emerald/20 shadow-2xl"}`}
      >
        <div className="w-full max-w-[2200px] mx-auto flex justify-between items-center 
          px-12 sm:px-24 md:px-32 lg:px-40 xl:px-56 uw:px-72 transition-all duration-500"
        >
          
          {/* LOGO & BRAND: Emerald DT en una sola línea */}
          <Link href="/" className="group flex items-center gap-5 z-[110] outline-none cursor-pointer flex-shrink-0">
            <div className="relative w-12 h-12 md:w-16 md:h-16 transition-all duration-700 group-hover:rotate-[360deg] animate-float flex-shrink-0">
              <Image src="/assets/img/logo.png" alt="Emerald DT Logo" fill className="object-contain" />
            </div>

            <div className="flex items-center gap-3 md:gap-4 whitespace-nowrap">
              <span className="font-bold tracking-tight uppercase text-emerald text-xl md:text-3xl group-hover:text-white transition-colors duration-500 leading-none">
                Emerald
              </span>
              <span className="font-black tracking-tighter uppercase text-gold text-3xl md:text-5xl italic leading-none drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                DT
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-16">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-[13px] uppercase tracking-[0.5em] font-black text-emerald/80 hover:text-gold transition-all duration-500">
                {link.name}
              </Link>
            ))}
          </div>

          {/* ICONS & HAMBURGER */}
          <div className="flex items-center gap-10 md:gap-14">
            <div className="hidden md:flex items-center gap-12 border-l border-emerald/30 pl-14 text-emerald">
              <Link href="/cart" className="hover:text-gold transition-transform hover:scale-125"><ShoppingCart size={28} /></Link>
              <Link href="/login" className="text-[13px] uppercase tracking-[0.3em] font-black hover:text-gold transition-colors">Log In</Link>
            </div>

            {/* HAMBURGUER: Movimiento moderno Verde y Gold flotante */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-[110] cursor-pointer group outline-none ml-6 mt-2 md:mt-4 overflow-visible"
            >
              <div className="relative w-16 h-16 flex items-center justify-center bg-emerald/5 rounded-full border border-emerald/20 group-hover:border-gold group-hover:bg-gold/10 transition-all duration-500 group-hover:animate-magnetic">
                {/* Aura de pulso */}
                <div className="absolute inset-0 bg-emerald/20 rounded-full blur-md group-hover:bg-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <Menu 
                  size={42} 
                  className={`absolute transition-all duration-700 ${isMobileMenuOpen ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'} text-emerald group-hover:text-gold`} 
                />
                <X 
                  size={42} 
                  className={`absolute transition-all duration-700 ${isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'} text-gold`} 
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 bg-black/98 backdrop-blur-3xl z-[105] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] 
        ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
      >
        <div className="flex flex-col h-full justify-center items-end px-16 sm:px-32 gap-10">
          {[...navLinks, {name: "Cart", href: "/cart"}, {name: "Orders", href: "/orders"}, {name: "Log In", href: "/login"}].map((item, index) => (
            <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)}
              className={`text-5xl sm:text-8xl uppercase tracking-[0.4em] font-black text-emerald hover:text-gold transition-all duration-700 ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-40 opacity-0"}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes magnetic {
          0%, 100% { transform: translate(0,0) scale(1); }
          25% { transform: translate(4px, -4px) scale(1.05); }
          75% { transform: translate(-4px, 4px) scale(1.05); }
        }
        .group-hover\:animate-magnetic:hover { animation: magnetic 2.5s ease-in-out infinite; }
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
  { name: "Catalog", href: "/catalog" },
  { name: "Categories", href: "/categories" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];