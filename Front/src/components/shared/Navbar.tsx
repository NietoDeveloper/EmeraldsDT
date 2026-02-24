"use client";

import { useScrollDirection } from "@/hooks/useScrollDirection";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, History, Package } from "lucide-react";

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

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "/";
  };

  const navLinks = [
    { name: "Catalog", href: "/catalog" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ease-in-out 
        ${scrollDirection === "down" && !isMobileMenuOpen ? "-translate-y-full" : "translate-y-0"} 
        ${isAtTop ? "bg-transparent py-10" : "bg-black/95 backdrop-blur-2xl py-5 border-b border-emerald/20 shadow-2xl"}`}
      >
        {/* ELIMINAMOS mx-auto y USAMOS w-full con PADDING LATERAL FIJO Y FUERTE */}
        <div className="w-full flex justify-between items-center px-10 sm:px-16 md:px-24 lg:px-32 xl:px-48">
          
          {/* LOGO & BRAND */}
          <a href="/" onClick={handleLogoClick} className="group flex items-center gap-4 z-[110] outline-none cursor-pointer flex-shrink-0">
            <div className="relative w-10 h-10 md:w-14 md:h-14 transition-all duration-700 group-hover:scale-110 animate-float flex-shrink-0">
              <Image 
                src="/assets/img/logo.png" 
                alt="Emerald DT Logo" 
                fill 
                className="object-contain"
              />
            </div>
            {/* Contenedor de texto con ancho mínimo para evitar saltos */}
            <div className="flex flex-col md:flex-row md:items-baseline md:gap-3 whitespace-nowrap min-w-[150px] md:min-w-[300px]">
              <span className="font-bold tracking-[0.4em] uppercase text-emerald text-lg md:text-3xl group-hover:text-gold transition-colors duration-500">
                Emerald
              </span>
              <span className="font-black tracking-[0.2em] uppercase text-gold text-sm md:text-xl italic animate-pulse-slow">
                DT
              </span>
            </div>
          </a>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="relative text-[12px] uppercase tracking-[0.4em] font-extrabold text-emerald hover:text-gold transition-all duration-500 group">
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gold transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* ICONS & TOOLS */}
          <div className="flex items-center gap-6 md:gap-10">
            <div className="hidden md:flex items-center gap-8 border-l border-emerald/30 pl-10">
              <Link href="/cart" className="text-emerald hover:text-gold transition-transform hover:scale-125"><ShoppingCart size={22} /></Link>
              <Link href="/orders" className="text-emerald hover:text-gold transition-transform hover:scale-125"><Package size={22} /></Link>
              <Link href="/login" className="text-[12px] uppercase tracking-[0.3em] font-black text-emerald hover:text-gold transition-colors">Log In</Link>
            </div>

            {/* HAMBURGUER BUTTON - Forzamos el cursor y el tamaño */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-[110] cursor-pointer p-4 group outline-none"
              style={{ cursor: 'pointer' }} 
            >
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Menu 
                  size={42} 
                  className={`absolute transition-all duration-500 ${isMobileMenuOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'} text-emerald group-hover:text-gold`} 
                />
                <X 
                  size={42} 
                  className={`absolute transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'} text-gold`} 
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 bg-black/98 backdrop-blur-3xl z-[105] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] 
        ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
      >
        <div className="flex flex-col h-full justify-center items-end pr-16 sm:pr-32 gap-12">
          {[...navLinks, {name: "Cart", href: "/cart"}, {name: "My Orders", href: "/orders"}, {name: "Log In", href: "/login"}].map((item, index) => (
            <Link 
              key={item.name} 
              href={item.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-4xl sm:text-6xl uppercase tracking-[0.5em] font-black text-emerald hover:text-gold transition-all duration-500
                ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse {
          0%, 100% { opacity: 1; filter: brightness(1); }
          50% { opacity: 0.7; filter: brightness(1.5); }
        }
      `}</style>
    </>
  );
};