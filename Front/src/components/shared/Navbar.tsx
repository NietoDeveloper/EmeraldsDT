"use client";

import { useScrollDirection } from "@/hooks/useScrollDirection";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingCart, ChevronDown } from "lucide-react";

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

  const handleRefresh = (e: React.MouseEvent) => {
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
            ? "bg-transparent py-6 md:py-8" 
            : "bg-black/60 backdrop-blur-xl py-4 shadow-2xl"
          }`}
      >
        <div className="w-full max-w-[1900px] mx-auto flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-20">
          
          {/* LOGO & BRAND */}
          <Link href="/" onClick={handleRefresh} className="group flex items-center gap-2 md:gap-4 z-[120] outline-none cursor-pointer">
            <div className="relative w-8 h-8 md:w-14 md:h-14 transition-all duration-700 group-hover:rotate-[360deg] group-hover:scale-110">
              <Image src="/img/logo.png" alt="Emerald DT Logo" fill className="object-contain" />
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold tracking-[0.15em] uppercase text-emerald-500 text-sm md:text-2xl transition-all duration-500 group-hover:text-gold">
                Emerald
              </span>
              <span className="font-black tracking-tighter uppercase text-gold text-sm md:text-2xl italic">
                DT
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group/item">
                <Link 
                  href={link.href} 
                  className="flex items-center gap-1.5 text-[10px] xl:text-[11px] uppercase tracking-[0.3em] font-bold text-zinc-400 hover:text-gold hover:-translate-y-1 transition-all duration-300"
                >
                  {link.name}
                  {link.subItems && (
                    <ChevronDown size={10} className="group-hover/item:rotate-180 transition-transform duration-300 opacity-70" />
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* ICONS & HAMBURGER */}
          <div className="flex items-center gap-3 md:gap-6">
            {/* Seccion Carrito y Acceso: Verde Esmeralda con Hover Gold Flotante */}
            <div className="hidden md:flex items-center gap-6 text-emerald-500">
              <Link href="/cart" className="hover:text-gold transition-all duration-500 hover:-translate-y-2 hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                <ShoppingCart size={20} strokeWidth={2} />
              </Link>
              <Link href="/login" className="text-[10px] uppercase tracking-[0.3em] font-black hover:text-gold hover:-translate-y-1 transition-all duration-500">
                Access
              </Link>
            </div>

            {/* CUSTOM HAMBURGER: Ajustada para evitar que se pisen las rayas */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-[200] w-11 h-11 flex flex-col items-center justify-center bg-emerald-500/5 rounded-full border border-emerald-500/20 transition-all duration-500 hover:border-gold outline-none"
            >
              <div className="relative w-6 h-5 flex flex-col justify-between items-center transition-all duration-500">
                <span className={`w-full h-[2px] transition-all duration-500 ease-in-out transform ${isMobileMenuOpen ? 'rotate-45 translate-y-[9px] bg-gold' : 'bg-emerald-500'}`} />
                <span className={`w-full h-[2px] transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : 'bg-emerald-500'}`} />
                <span className={n-out transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-[9px] bg-gold' : 'bg-emerald-500'}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 z-[130] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] 
        ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent opacity-40" />

        <div className="relative flex flex-col h-full justify-center items-center px-6 gap-10">
          <div onClick={handleRefresh} className="cursor-pointer mb-2">
              <div className="relative w-16 h-16">
                <Image src="/img/logo.png" alt="Logo" fill className="object-contain" />
              </div>
          </div>

          <div className="flex flex-col items-center gap-6 w-full">
            {navLinks.map((item, index) => (
              <Link 
                key={item.name} 
                href={item.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-2xl md:text-4xl uppercase tracking-[0.4em] font-black text-emerald-500/60 hover:text-gold transition-all duration-500
                  ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Footer Mobile: Carrito y Login ajustados */}
          <div className={`flex gap-12 items-center mt-4 transition-all duration-1000 delay-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}>
             <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="text-emerald-500 hover:text-gold hover:scale-125 transition-all duration-500"><ShoppingCart size={32}/></Link>
             <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-xs uppercase tracking-[0.4em] font-black text-emerald-500 hover:text-gold transition-all duration-500">Access</Link>
          </div>
        </div>
      </div>
    </>
  );
};