"use client";

import { useScrollDirection } from "@/hooks/useScrollDirection";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // 1. Inyección de useRouter nativo
import { ShoppingCart } from "lucide-react";

interface NavLink {
  name: string;
  href: string;
}

export const Navbar = () => {
  const scrollDirection = useScrollDirection();
  const params = useParams();
  const router = useRouter(); // 2. Instancia del enrutador de Next.js
  
  // Captura el idioma dinámico actual (por defecto 'es' para evitar fallos de SSR)
  const lang = (params?.lang as string) || "es";
  const isEs = lang === "es";

  const [isAtTop, setIsAtTop] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mapeo de rutas aséptico basado en los módulos funcionales del monorepo
  const navLinks: NavLink[] = [
    { name: isEs ? "Inicio" : "Home", href: `/${lang}` },
    { name: isEs ? "Colección" : "Collection", href: `/${lang}/collection` },
  ];

  // 3. Modificación aséptica: Navegación suave sin destruir el estado del cliente
  const handleRefresh = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/${lang}`);
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
        <div className="w-full max-w-[1900px] mx-auto flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-20 min-w-[278px]">
          
          {/* LOGO & BRAND */}
          <Link href={`/${lang}`} onClick={handleRefresh} className="group flex items-center gap-2 md:gap-4 z-[120] outline-none cursor-pointer">
            <div className="relative w-8 h-8 md:w-11 md:h-11 transition-all duration-700 group-hover:rotate-[360deg]">
              <Image src="/img/logo.png" alt="Emerald DT Logo" fill className="object-contain animate-fade-in" priority />
            </div>
            <div className="flex items-center gap-1 font-mono">
              <span className="font-black tracking-[0.15em] uppercase text-emerald-500 text-xs md:text-lg transition-colors group-hover:text-gold">
                Emerald
              </span>
              <span className="font-black tracking-tighter uppercase text-gold text-xs md:text-lg italic">
                DT
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU (Vistas Reales) */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="text-[10px] xl:text-[11px] uppercase tracking-[0.3em] font-bold text-zinc-400 hover:text-gold transition-colors duration-300 font-mono"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* ACCESOS CORPORATIVOS */}
          <div className="flex items-center gap-4 md:gap-8 font-mono">
            <div className="flex items-center gap-6 text-emerald-500">
              {/* Carrito enlazado temporalmente a colección/checkout según requerimiento */}
              <Link href={`/${lang}/collection`} className="hover:text-gold transition-colors">
                <ShoppingCart size={18} strokeWidth={2} />
              </Link>
              <Link href={`/${lang}/auth`} className="text-[10px] uppercase tracking-[0.3em] font-bold hover:text-gold transition-colors">
                {isEs ? "ACCESO" : "ACCESS"}
              </Link>
            </div>

            {/* HAMBURGER MENÚ RESPONSIVO */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-[200] w-10 h-10 flex flex-col items-center justify-center bg-zinc-900/40 border border-white/5 transition-colors hover:border-gold outline-none"
            >
              <div className="relative w-5 h-4 flex flex-col justify-between items-center">
                <span className={`w-full h-[1.5px] transition-all duration-300 transform ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px] bg-gold' : 'bg-emerald-500'}`} />
                <span className={`w-full h-[1.5px] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'bg-emerald-500'}`} />
                <span className={`w-full h-[1.5px] transition-all duration-300 transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px] bg-gold' : 'bg-emerald-500'}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 z-[130] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] lg:hidden
        ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="absolute inset-0 bg-black/98" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-950/20 via-transparent to-transparent opacity-60 pointer-events-none" />

        <div className="relative flex flex-col h-full justify-center items-center px-6 gap-12 font-mono">
          <div className="flex flex-col items-center gap-8 w-full text-center">
            {navLinks.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg uppercase tracking-[0.3em] font-bold text-zinc-400 hover:text-gold transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Footer del Panel Móvil */}
          <div className="flex gap-10 items-center mt-6 border-t border-white/5 pt-8 w-32 justify-center">
             <Link href={`/${lang}/collection`} onClick={() => setIsMobileMenuOpen(false)} className="text-emerald-500 hover:text-gold transition-colors">
               <ShoppingCart size={22}/>
             </Link>
        
             </Link>
          </div>
        </div>
      </div>
    </>
  );
};