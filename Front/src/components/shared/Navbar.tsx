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

// Lista de navegación unificada según tus indicaciones
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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulación para login/logout

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
            : "bg-black/80 backdrop-blur-xl py-4 shadow-2xl"
          }`}
      >
        <div className="w-full max-w-[1900px] mx-auto flex justify-between items-center px-6 sm:px-12 md:px-20 lg:px-24">
          
          {/* LOGO (REFRESH) */}
          <Link href="/" onClick={handleRefresh} className="group flex items-center gap-3 md:gap-5 z-[120] outline-none cursor-pointer">
            <div className="relative w-10 h-10 md:w-14 md:h-14 transition-all duration-700 group-hover:rotate-[360deg] group-hover:scale-110">
              <Image src="/assets/img/logo.png" alt="Emerald DT Logo" fill className="object-contain" />
            </div>
            <div className="hidden sm:flex items-center gap-1 md:gap-2">
              <span className="font-bold tracking-[0.2em] uppercase text-emerald-500 text-lg md:text-2xl transition-all duration-500 group-hover:text-gold">
                Emerald
              </span>
              <span className="font-black tracking-tighter uppercase text-gold text-lg md:text-2xl italic">
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
                  className="flex items-center gap-2 text-[10px] xl:text-[11px] uppercase tracking-[0.4em] font-bold text-gold/70 hover:text-gold hover:-translate-y-1 transition-all duration-300"
                >
                  {link.name}
                  {link.subItems && (
                    <ChevronDown size={10} className="group-hover/item:rotate-180 transition-transform duration-300 opacity-70" />
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* ICONS & AUTH */}
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex items-center gap-6 text-gold/80">
              <Link href="/cart" className="hover:text-gold transition-all hover:-translate-y-1 hover:scale-110">
                <ShoppingCart size={20} strokeWidth={1.5} />
              </Link>
              <Link 
                href={isLoggedIn ? "/logout" : "/login"} 
                className="text-[10px] uppercase tracking-[0.4em] font-bold hover:text-gold hover:-translate-y-1 transition-all border border-gold/20 px-4 py-2 rounded-sm hover:border-gold"
              >
                {isLoggedIn ? "Logout" : "Login"}
              </Link>
            </div>

            {/* HAMBURGER BUTTON */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-[200] w-12 h-12 flex flex-col items-center justify-center bg-emerald-500/5 rounded-full border border-emerald-500/20 transition-all duration-500 hover:border-gold outline-none"
            >
              <div className="relative w-6 h-5 flex flex-col justify-between items-center">
                <span className={`w-full h-[2px] transition-all duration-500 ${isMobileMenuOpen ? 'rotate-45 translate-y-[9px] bg-gold' : 'bg-emerald-500'}`} />
                <span className={`w-full h-[2px] transition-all duration-500 ${isMobileMenuOpen ? 'opacity-0' : 'bg-emerald-500'}`} />
                <span className={`w-full h-[2px] transition-all duration-500 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[9px] bg-gold' : 'bg-emerald-500'}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 z-[130] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] 
        ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent opacity-40" />

        <div className="relative flex flex-col h-full justify-center items-center px-10 gap-12">
          {/* Logo en el menú móvil (Refresh) */}
          <div onClick={handleRefresh} className="cursor-pointer mb-2 transition-transform hover:scale-110">
              <div className="relative w-20 h-20">
                <Image src="/assets/img/logo.png" alt="Logo" fill className="object-contain" />
              </div>
          </div>

          {/* Enlaces del menú móvil */}
          <div className="flex flex-col items-center gap-6 w-full">
            {navLinks.map((item, index) => (
              <Link 
                key={item.name} 
                href={item.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-2xl md:text-4xl uppercase tracking-[0.4em] font-black text-gold/60 hover:text-gold transition-all duration-500
                  ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Botones de acción móvil (Carrito + Login/Logout) */}
          <div className={`flex flex-col items-center gap-8 transition-all duration-1000 delay-500 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}>
             <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="text-gold flex items-center gap-4 text-xl uppercase tracking-widest font-bold border-b border-gold/30 pb-2">
                <ShoppingCart size={28}/> Cart
             </Link>
             <Link 
                href={isLoggedIn ? "/logout" : "/login"} 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-lg uppercase tracking-[0.5em] font-black text-white bg-emerald-600/20 px-10 py-3 border border-emerald-500/50 rounded-full hover:bg-emerald-600/40 transition-all"
             >
                {isLoggedIn ? "Logout" : "Access"}
             </Link>
          </div>
        </div>
      </div>
    </>
  );
};