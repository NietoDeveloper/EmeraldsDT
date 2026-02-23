"use client";

import { useState, useEffect } from "react";

/**
 * Hook robusto para detectar la dirección del scroll.
 * Optimizado para el Navbar de Emerald DT (Estilo SpaceX).
 */
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;

      // Umbral de 10px para evitar saltos nerviosos en el Navbar
      if (Math.abs(scrollY - lastScrollY) < 10) {
        ticking = false;
        return;
      }

      const direction = scrollY > lastScrollY ? "down" : "up";
      
      if (direction !== scrollDirection) {
        setScrollDirection(direction);
      }
      
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        // RequestAnimationFrame asegura que el cálculo ocurra 
        // a 60fps sin bloquear el hilo principal.
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [scrollDirection]);

  return scrollDirection;
};