"use client";

import { useScrollDirection } from "@/hooks/useScrollDirection";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingCart, User, Menu, X, History, Package } from "lucide-react";

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

  // Forzar recarga al hacer click en el logo (Requerimiento Nieto Lab)
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
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out px-4 md:px-12 
        ${scrollDirection === "down" && !isMobileMenuOpen ? "-translate-y-full" : "translate-y-0"} 
        ${isAtTop ? "bg-transparent py-8" : "bg-black/90 backdrop-blur-xl py-4 border-b border-emerald/20"}`}
      >
        <div className="max-w-[1900px] mx-auto flex justify-between items-center">
          
          {/* LOGO & BRAND - RECARGA AL CLICK */}
          <a href="/" onClick={handleLogoClick} className="group flex items-center gap-3 z-[110]">
            <div className="relative w-10 h-10 transition-transform duration-500 group-hover:scale-110">
              <Image 
                src="/assets/img/logo.png" 
                alt="Emerald DT Logo" 


          ))}
        </div>
      </div>
    </>
  );
};