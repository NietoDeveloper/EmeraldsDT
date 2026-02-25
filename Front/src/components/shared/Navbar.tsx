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

;
};
