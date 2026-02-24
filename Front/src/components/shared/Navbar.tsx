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

          {/* ICONS & TOOLS */}
          <div className="flex items-center gap-5 md:gap-8">
            <div className="hidden md:flex items-center gap-6 border-l border-emerald/30 pl-8">
              <Link href="/cart" className="text-emerald hover:text-gold hover:scale-110 transition-all duration-300"><ShoppingCart size={20} /></Link>
              <Link href="/orders" className="text-emerald hover:text-gold hover:scale-110 transition-all duration-300"><Package size={20} /></Link>
              <Link href="/history" className="text-emerald hover:text-gold hover:scale-110 transition-all duration-300"><History size={20} /></Link>
              <Link href="/login" className="text-[11px] uppercase tracking-[0.3em] font-black text-emerald hover:text-gold transition-colors ml-2">Log In</Link>
            </div>

            {/* HAMBURGUER / CLOSE BUTTON */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 group transition-all duration-500 z-[110] outline-none"
              aria-label="Menu"
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                <Menu 
                  size={32} 
                  className={`absolute transition-all duration-500 transform ${isMobileMenuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'} text-emerald group-hover:text-gold group-hover:rotate-12`} 
                />
                <X 
                  size={32} 
                  className={`absolute transition-all duration-500 transform ${isMobileMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'} text-gold group-hover:scale-110`} 
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY (SPACEX STYLE) */}
      <div className={`fixed inset-0 bg-black/95 backdrop-blur-3xl z-[105] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] 
        ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
      >
        <div className="flex flex-col h-full justify-center items-end pr-10 sm:pr-20 gap-8">
          {[...navLinks, {name: "Cart", href: "/cart"}, {name: "My Orders", href: "/orders"}, {name: "Log In", href: "/login"}].map((item, index) => (
            <Link 
              key={item.name} 
              href={item.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-3xl sm:text-4xl uppercase tracking-[0.5em] font-black text-emerald hover:text-gold transition-all duration-500 transform
                ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; filter: brightness(1); }
          50% { opacity: 0.8; filter: brightness(1.3); }
        }
      `}</style>
    </>
  );
};