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
            ? "bg-transparent py-6 md:py-10" 
            : "bg-black/60 backdrop-blur-xl py-4 shadow-2xl"
          }`}
      >
        <div className="w-full max-w-[1900px] mx-auto flex justify-between items-center px-6 sm:px-12 md:px-20 lg:px-24">
          
          {/* LOGO & BRAND */}
          <Link href="/" onClick={handleRefresh} className="group flex items-center gap-3 md:gap-5 z-[120] outline-none cursor-pointer">
            <div className="relative w-10 h-10 md:w-16 md:h-16 transition-all duration-700 group-hover:rotate-[360deg] group-hover:scale-110">
              <Image src="/assets/img/logo.png" alt="Emerald DT Logo" fill className="object-contain" />
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <span className="font-bold tracking-[0.2em] uppercase text-emerald-500 text-lg md:text-3xl transition-all duration-500 group-hover:text-gold group-hover:-translate-y-1">
                Emerald
              </span>
              <span className="font-black tracking-tighter uppercase text-gold text-lg md:text-3xl italic transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-105">
                DT
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-14">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group/item">
                <Link 
                  href={link.href} 
                  className="flex items-center gap-2 text-[10px] xl:text-[11px] uppercase tracking-[0.5em] font-bold text-gold/70 hover:text-gold hover:-translate-y-1.5 hover:scale-110 transition-all duration-300"
                >
                  {link.name}
                  {link.subItems && (
                    <ChevronDown size={12} className="group-hover/item:rotate-180 transition-transform duration-300 opacity-70" />
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* ICONS & MODERN CUSTOM HAMBURGER */}
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex items-center gap-8 text-gold/80">
              <Link href="/cart" className="hover:text-gold transition-all hover:-translate-y-1.5 hover:scale-110">
                <ShoppingCart size={20} strokeWidth={1.5} />
              </Link>
              <Link href="/login" className="text-[10px] uppercase tracking-[0.4em] font-bold hover:text-gold hover:-translate-y-1 transition-all">
                Access
              </Link>
            </div>

            {/* CUSTOM ANIMATED HAMBURGER */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-[200] w-12 h-12 flex flex-col items-center justify-center bg-emerald-500/5 rounded-full border border-emerald-500/20 transition-all duration-500 hover:border-gold hover:scale-110 hover:-translate-y-1 group outline-none overflow-hidden"
            >
              <div className="relative w-6 h-5 flex flex-col justify-between items-center transition-all duration-500">
                <span className={`w-full h-[2px] transition-all duration-500 ease-in-out transform 
                  ${isMobileMenuOpen ? 'rotate-45 translate-y-[9px] bg-gold' : 'bg-emerald-500 group-hover:bg-gold'}`} 
                />
                <span className={`w-full h-[2px] transition-all duration-500 ease-in-out 
                  ${isMobileMenuOpen ? 'opacity-0 -translate-x-8' : 'bg-emerald-500 group-hover:bg-gold'}`} 
                />
                <span className={`w-full h-[2px] transition-all duration-500 ease-in-out transform 
                  ${isMobileMenuOpen ? '-rotate-45 -translate-y-[9px] bg-gold' : 'bg-emerald-500 group-hover:bg-gold'}`} 
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 z-[130] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] 
        ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <div className="absolute inset-0 bg-black opacity-98" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-40" />

        <div className="relative flex flex-col h-full justify-center items-center px-10 gap-16">
          <div onClick={handleRefresh} className="cursor-pointer mb-4 transition-transform hover:scale-110">
             <div className="relative w-24 h-24">
                <Image src="/assets/img/logo.png" alt="Logo" fill className="object-contain" />
             </div>
          </div>

          <div className="flex flex-col items-center gap-10 w-full">
            {navLinks.map((item, index) => (
              <Link 
                key={item.name} 
                href={item.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-3xl md:text-5xl uppercase tracking-[0.5em] font-black text-gold/60 hover:text-gold hover:-translate-y-2 hover:scale-105 transition-all duration-500
                  ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className={`flex gap-16 items-center transition-all duration-1000 delay-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}>
             <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="text-gold hover:text-gold hover:scale-125 transition-all hover:-translate-y-2"><ShoppingCart size={32}/></Link>
             <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-sm uppercase tracking-[0.5em] font-black text-gold/80 hover:text-gold hover:scale-110 transition-all hover:-translate-y-1">Access</Link>
          </div>
        </div>
      </div>
    </>
  );
};