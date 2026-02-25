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

          </div>

;
};
