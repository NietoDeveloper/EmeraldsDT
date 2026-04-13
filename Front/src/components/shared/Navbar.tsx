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

      
      </div>
    </>
  );
};