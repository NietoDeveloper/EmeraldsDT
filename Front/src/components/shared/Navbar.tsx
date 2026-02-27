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


           
          </div>
        </div>
      </nav>

     
  );
};

const navLinks = [
  { name: "Catalog", href: "/catalog", subItems: [{ name: "Rough Emeralds", href: "/catalog/rough" }, { name: "Faceted Gems", href: "/catalog/faceted" }, { name: "Investment Grade", href: "/catalog/investment" }] },
  { name: "Categories", href: "/categories", subItems: [{ name: "Muzo Mine", href: "/categories/muzo" }, { name: "Chivor Mine", href: "/categories/chivor" }, { name: "Coscuez Collection", href: "/categories/coscuez" }] },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];