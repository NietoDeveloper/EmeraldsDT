'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  // Función unificada y segura de desbloqueo global del DOM
  const releaseDOM = () => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove("js-loading");
      document.documentElement.classList.add("js-loaded");
    }
  };

  useEffect(() => {
    setIsMounted(true);
    
    // Inicialización perimetral de bloqueo
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add("js-loading");
      document.documentElement.classList.remove("js-loaded");
    }

    // Ciclo total de 5 segundos de carga del Security Cluster
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);


      )}
    </AnimatePresence>
  );
}