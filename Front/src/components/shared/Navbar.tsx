
"use client";

import { useScrollDirection } from "@/hooks/useScrollDirection";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";

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
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] 
          ${scrollDirection === "down" && !isMobileMenuOpen ? "-translate-y-full" : "translate-y-0"} 
          ${isAtTop 
            ? "bg-transparent mt-4 md:mt-10 py-6 md:py-10" 
            : "bg-black/95 backdrop-blur-3xl mt-0 py-4 border-b border-emerald/20 shadow-2xl"
          }`}
      >
        <div className="w-full max-w-[1900px] mx-auto flex justify-between items-center px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 transition-all duration-500">
          
          {/* LOGO & BRAND: Emerald DT */}
          <Link href="/" className="group flex items-center gap-3 md:gap-5 z-[110] outline-none cursor-pointer flex-shrink-0">
            <div className="relative w-10 h-10 md:w-16 md:h-16 transition-all duration-700 group-hover:rotate-[360deg] animate-float flex-shrink-0">
              <Image src="/assets/img/logo.png" alt="Emerald DT Logo" fill className="object-contain" />
            </div>

            <div className="flex items-center gap-2 md:gap-4 whitespace-nowrap">
              <span className="font-bold tracking-tight uppercase text-emerald text-lg md:text-3xl group-hover:text-white transition-colors duration-500 leading-none">
                Emerald
              </span>

            </div>

          </div>
        </div>
      </nav>


    </>
  );
};

const navLinks = [

];