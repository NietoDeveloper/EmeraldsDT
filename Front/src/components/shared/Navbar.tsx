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
              </Link>gap-10">


              </div>
          </div>


              <Link 


              >

              </Link>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};