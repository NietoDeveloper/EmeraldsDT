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

  // Mapeo unificado apuntando a las rutas físicas existentes de tu app
  const navLinks: NavLink[] = [
    { name: isEs ? "Inicio" : "Home", href: `/${lang}` },
    { name: isEs ? "Colección" : "Collection", href: `/${lang}/collections` },
    { name: isEs ? "Acerca de" : "About", href: `/${lang}#about` },
    { name: isEs ? "Contacto" : "Contact", href: `/${lang}#contact` },
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
    r
             

        </div>
      </div>
    </>
  );
};