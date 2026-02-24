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
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ease-in-out px-6 sm:px-10 md:px-16 
        ${scrollDirection === "down" && !isMobileMenuOpen ? "-translate-y-full" : "translate-y-0"} 
        ${isAtTop ? "bg-transparent py-10" : "bg-black/95 backdrop-blur-2xl py-5 border-b border-emerald/20 shadow-2xl"}`}
      >
        <div className="max-w-[1900px] mx-auto flex justify-between items-center">
          
          {/* LOGO & BRAND */}
          <a href="/" onClick={handleLogoClick} className="group flex items-center gap-4 z-[110] outline-none">
            <div className="relative w-10 h-10 md:w-12 md:h-12 transition-all duration-700 group-hover:scale-110 group-hover:rotate-[5deg] animate-float">
              <Image 
                src="/assets/img/logo.png" 
                alt="Emerald DT Logo" 
                fill 
                className="object-contain drop-shadow-[0_0_8px_rgba(4,120,87,0.5)]"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline md:gap-2 overflow-hidden">
              <span className="font-bold tracking-[0.4em] uppercase text-emerald text-base md:text-2xl group-hover:text-gold transition-colors duration-500">
                Emerald
              </span>
              <span className="font-black tracking-[0.2em] uppercase text-gold text-sm md:text-xl italic animate-pulse-slow group-hover:scale-110 transition-transform inline-block origin-left">
                DT
              </span>
            </div>
          </a>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-10 xl:gap-14">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="relative text-[11px] xl:text-[13px] uppercase tracking-[0.4em] font-extrabold text-emerald hover:text-gold transition-all duration-500 group">
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[1.5px] bg-gold transition-all duration-500 group-hover:w-full shadow-[0_0_8px_#D4AF37]" />
              </Link>
            ))}
          </div>


      {/* MOBILE MENU OVERLAY (SPACEX STYLE) */}
      <div className={`fixed inset-0 bg-black/95 backdrop-blur-3xl z-[105] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] 
        ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
      >

    </>
  );
};