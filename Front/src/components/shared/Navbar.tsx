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

  // BLOQUEO DE SCROLL: Evita el doble scroll cuando el menú está abierto
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


            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-[150] cursor-pointer group outline-none overflow-visible"
              aria-label="Toggle Menu"
            >
              <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-emerald/5 rounded-full border border-emerald/20 group-hover:border-gold transition-all duration-500">
                <Menu 
                  size={28} 
                  className={`absolute transition-all duration-700 ${isMobileMenuOpen ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'} text-emerald`} 
                />
                <X 
                  size={32} 
                  className={`absolute transition-all duration-700 ${isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'} text-gold font-bold`} 
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 bg-black z-[130] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] 
        ${isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"}`}
      >
        <div className="flex flex-col h-full justify-center items-end px-10 sm:px-32 gap-6 md:gap-8">
          {navLinks.map((item, index) => (
            <div key={item.name} className="flex flex-col items-end">
              <Link 
                href={item.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-3xl sm:text-6xl uppercase tracking-[0.3em] font-black text-emerald hover:text-gold transition-all duration-700 ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-40 opacity-0"}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item.name}
              </Link>
              {item.subItems && <span className="text-[10px] text-gold/50 tracking-[.5em] uppercase mt-2">Explore Series →</span>}
            </div>
          ))}
          <div className="h-[1px] w-20 bg-emerald/20 my-4" />
          <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="text-xl uppercase tracking-[.4em] text-white/50 hover:text-gold">Cart</Link>
          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-xl uppercase tracking-[.4em] text-white/50 hover:text-gold">Log In</Link>
        </div>
      </div>
    </>
  );
};

const navLinks = [
  { name: "Catalog", href: "/catalog", subItems: [{ name: "Rough Emeralds", href: "/catalog/rough" }, { name: "Faceted Gems", href: "/catalog/faceted" }, { name: "Investment Grade", href: "/catalog/investment" }] },
  { name: "Categories", href: "/categories", subItems: [{ name: "Muzo Mine", href: "/categories/muzo" }, { name: "Chivor Mine", href: "/categories/chivor" }, { name: "Coscuez Collection", href: "/categories/coscuez" }] },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];