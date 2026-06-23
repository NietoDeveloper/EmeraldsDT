"use client";

import { useScrollDirection } from "@/hooks/useScrollDirection";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ShoppingCart, X } from "lucide-react";

interface NavLink {
  name: string;
  href: string;
}

export const Navbar = () => {
  const scrollDirection = useScrollDirection();
  const params = useParams();
  
  const lang = (params?.lang as string) || "es";
  const isEs = lang === "es";

  const [isAtTop, setIsAtTop] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mapeo completo de opciones requeridas para el menú
  const navLinks: NavLink[] = [
    { name: isEs ? "Inicio" : "Home", href: `/${lang}` },
    { name: isEs ? "Productos" : "Products", href: `/${lang}/products` },
    { name: isEs ? "Colección" : "Collection", href: `/${lang}/collection` },
    { name: isEs ? "Acerca de" : "About", href: `/${lang}/about` },
    { name: isEs ? "Contacto" : "Contact", href: `/${lang}/contact` },
  ];

  // Forzar recarga nativa real del navegador al pulsar el logotipo
  const handleNativeReload = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `/${lang}`;
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
            : "bg-black/80 backdrop-blur-md py-4 border-b border-white/5"
          }`}
      >
        {/* Contenedor responsive rígido (310px a 1900px) */}
        <div className="w-full max-w-[1900px] mx-auto flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-20 min-w-[310px]">
          
          {/* LOGO & BRAND (Fuerza recarga completa) */}
          <a href={`/${lang}`} onClick={handleNativeReload} className="group flex items-center gap-2 md:gap-4 z-[120] outline-none cursor-pointer">
            <div className="relative w-8 h-8 md:w-11 md:h-11 transition-all duration-700 group-hover:rotate-[360deg]">
              <Image src="/img/logo.png" alt="Emerald DT Logo" fill className="object-contain" priority />
            </div>
            <div className="flex items-center gap-1 font-mono select-none">
              <span className="font-black tracking-[0.15em] uppercase text-emerald-500 text-xs md:text-lg transition-colors group-hover:text-gold">
                Emerald
              </span>
              <span className="font-black tracking-tighter uppercase text-gold text-xs md:text-lg italic">
                DT
              </span>
            </div>
          </a>

          {/* MENÚ HORIZONTAL (Escritorio - Desde md:flex en adelante) */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-12">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="text-[10px] xl:text-[11px] uppercase tracking-[0.3em] font-bold text-zinc-400 hover:text-gold transition-colors duration-300 font-mono cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* ACCESOS CORPORATIVOS (Escritorio) */}
          <div className="hidden md:flex items-center gap-4 md:gap-8 font-mono">
            <div className="flex items-center gap-6 text-emerald-500">
              <Link href={`/${lang}/collection`} className="hover:text-gold transition-colors cursor-pointer">
                <ShoppingCart size={18} strokeWidth={2} />
              </Link>
              <Link href={`/${lang}/auth`} className="text-[10px] uppercase tracking-[0.3em] font-bold hover:text-gold transition-colors cursor-pointer">
                {isEs ? "ACCESO" : "ACCESS"}
              </Link>
            </div>
          </div>

          {/* BOTÓN HAMBURGUER (Visible estrictamente de 310px hasta md) */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className={`md:hidden relative z-[120] w-10 h-10 flex flex-col items-center justify-center bg-zinc-900/40 border border-white/5 transition-opacity duration-300 outline-none cursor-pointer ${isMobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            aria-label="Open Menu"
          >
            <div className="relative w-5 h-4 flex flex-col justify-between items-center">
              <span className="w-full h-[1.5px] bg-emerald-500" />
              <span className="w-full h-[1.5px] bg-emerald-500" />
              <span className="w-full h-[1.5px] bg-emerald-500" />
            </div>
          </button>
        </div>
      </nav>

      {/* INTERFAZ MÓVIL OVERLAY MODERNA (Fondo Color Esmeralda & Letras Gold) */}
      <div className={`fixed inset-0 z-[200] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] md:hidden
        ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        {/* Fondo Esmeralda Alta Costura */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-emerald-900 to-zinc-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent opacity-40 pointer-events-none" />

        {/* Botón de cierre X Rojo Independiente y Operativo */}
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-4 w-10 h-10 flex items-center justify-center bg-black/40 border border-white/10 rounded-none cursor-pointer outline-none group hover:border-gold transition-colors z-[210]"
          aria-label="Close Menu"
        >
          <X size={22} className="text-red-500 transition-transform group-hover:scale-110" />
        </button>

        <div className="relative flex flex-col h-full justify-between py-20 items-center px-6 font-mono min-w-[310px] overflow-y-auto">
          
          {/* Enlaces Principales del Menú Móvil en Color Gold */}
          <div className="flex flex-col items-center gap-6 w-full text-center mt-8">
            {navLinks.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-md uppercase tracking-[0.25em] font-bold text-gold/90 hover:text-white transition-colors cursor-pointer py-1 block"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Sección de Accesos Inferiores (Carrito y Acceso / Log in) */}
          <div className="flex flex-col items-center gap-5 w-full max-w-[240px] border-t border-gold/20 pt-6 mb-4">
            <Link 
              href={`/${lang}/collection`} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-gold hover:text-white transition-colors flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-bold cursor-pointer"
            >
              <ShoppingCart size={20} className="text-gold" />
              <span>{isEs ? "Carrito" : "Cart"}</span>
            </Link>
            
            <Link 
              href={`/${lang}/auth`} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-center text-[10px] uppercase tracking-[0.2em] font-bold text-black bg-gold hover:bg-white transition-colors px-4 py-3 w-full font-black tracking-[0.25em] cursor-pointer"
            >
              {isEs ? "LOG IN / ACCESO" : "LOG IN / ACCESS"}
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};