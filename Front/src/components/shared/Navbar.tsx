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

  useEffect(() => {
