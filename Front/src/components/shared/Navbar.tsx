"use client";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import Link from "next/link";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const scrollDirection = useScrollDirection();
  const [isAtTop, setIsAtTop] = useState(true);

  // Detectamos si el usuario está en el tope de la página
  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out px-10 py-6 ${
        scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
      } ${
        isAtTop 
          ? "bg-transparent" 
          : "bg-black/80 backdrop-blur-md border-b border-emerald/20"
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald rounded-sm group-hover:bg-gold transition-colors duration-500 shadow-[0_0_15px_rgba(4,120,87,0.4)]" />
          <span className="font-bold tracking-[0.3em] uppercase text-xl">
            Emerald <span className="text-white/50 group-hover:text-gold transition-colors italic">DT</span>
          </span>
        </Link>

        {/* LINKS DE NAVEGACIÓN */}
        <div className="hidden md:flex items-center gap-10">
          {["Products", "Certification", "Laboratory", "About"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="relative text-[11px] uppercase tracking-[0.25em] font-semibold text-white/70 hover:text-gold transition-all duration-300 group"
            >
              {item}
              {/* Línea decorativa inferior Gold */}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* ACCIÓN PRINCIPAL (GOLD HOVER) */}
        <button className="px-6 py-2 border border-emerald/50 text-[10px] uppercase tracking-widest hover:border-gold hover:text-gold transition-all duration-500 bg-emerald/5 backdrop-blur-sm">
          Reserve Access
        </button>
      </div>
    </nav>
  );
};