"use client";

import { useScrollDirection } from "@/hooks/useScrollDirection";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";

export const Navbar = () => {
  const scrollDirection = useScrollDirection();
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsAtTop(window.scrollY < 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>


      {/* MOBILE MENU OVERLAY: Botones en Blanco con Hover Gold */}
      <div className={`fixed inset-0 bg-black z-[130] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] 
        ${isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"}`}
      >
        <div className="flex flex-col h-full justify-center items-end px-10 sm:px-32 gap-6">
          {navLinks.map((item, index) => (
            <div key={item.name} className="flex flex-col items-end">
              <Link 
                href={item.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-3xl sm:text-5xl uppercase tracking-[0.2em] font-black text-white hover:text-gold transition-all duration-700 ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-40 opacity-0"}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item.name}
              </Link>
              {item.subItems && <span className="text-[9px] text-gold/50 tracking-[.4em] uppercase mt-2">Explore Series →</span>}
            </div>
          ))}
          <div className="h-[1px] w-20 bg-white/10 my-4" />
          <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="text-lg uppercase tracking-[.3em] text-white/50 hover:text-gold transition-colors">Cart</Link>
          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-lg uppercase tracking-[.3em] text-white/50 hover:text-gold transition-colors">Log In</Link>
        </div>
      </div>
    </>
  );
};
