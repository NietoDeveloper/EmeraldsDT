'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Preloader() {
  const pathname = usePathname();
  const initialPathnameRef = useRef(pathname);
  
  // Bloqueo y control exclusivo para el montaje inicial de la infraestructura
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Desbloqueo aséptico global de clases en el DOM (raíz html sincronizada con globals.css)
  const releaseDOM = () => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove("js-loading");
      document.documentElement.classList.add("js-loaded");
    }
  };

  useEffect(() => {
    setIsMounted(true);
    
    // Si hay un cambio de ruta originado internamente por componentes SPA,
    // se puentea el preloader inicial para que actúe de inmediato el loading.tsx asíncrono.
    if (pathname !== initialPathnameRef.current) {
      setLoading(false);
      releaseDOM();
      return;
    }

    // Inicialización del perímetro de aislamiento estricto en el F5 inicial
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add("js-loading");
      document.documentElement.classList.remove("js-loaded");
    }

    // Ciclo de inicialización controlado (5 segundos para la atmósfera de arranque)
    const timer = setTimeout(() => {
      setLoading(false);
      releaseDOM();
    }, 5000);

    return () => {
      clearTimeout(timer);
      releaseDOM();
    };
  }, [pathname]);

  const handleExitComplete = () => {
    releaseDOM();
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      {loading && (
        <motion.div
          key="emerald-preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } 
          }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#010502] select-none pointer-events-auto"
        >
          {/* FONDO VERDE ATMOSFÉRICO - SINCRONIZADO CON GLOBALS */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.5, 0.3] 
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/15 blur-[140px] rounded-full" 
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.95)_100%)]" />
          </div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-[310px] md:max-w-none px-6">
            
            {/* LOGO CON FILTRO DE LUMINISCENCIA EMERALD */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ 
                scale: [0.98, 1.03, 0.98],
                opacity: 1,
                filter: [
                  "brightness(1) drop-shadow(0 0 15px rgba(16,185,129,0.2))",
                  "brightness(1.3) drop-shadow(0 0 35px rgba(16,185,129,0.45))",
                  "brightness(1) drop-shadow(0 0 15px rgba(16,185,129,0.2))"
                ]
              }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
              className="relative w-40 h-40 md:w-52 md:h-52 mb-8"
            >
              <Image
                src="/img/logo.png"
                alt="Emerald DT Corporate Mark"
                fill
                sizes="(max-width: 768px) 160px, 208px"
                className="object-contain"
                priority
                unoptimized
              />
            </motion.div>

            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, ease: "easeOut" }}
              className="text-center w-full flex flex-col items-center"
            >
              <h2 className="text-white font-mono text-xl md:text-3xl tracking-[0.8em] uppercase mb-6 font-bold ml-[0.8em]">
                EMERALD<span className="text-emerald-400">DT</span>
              </h2>
              
              <div className="flex items-center gap-3 mb-10 opacity-30">
                 <span className="h-[1px] w-6 bg-emerald-500" />
                 <span className="text-emerald-400 font-mono text-[8px] tracking-[0.3em] uppercase">Security Cluster Active</span>
                 <span className="h-[1px] w-6 bg-emerald-500" />
              </div>

              {/* BARRA DE PROGRESO CONTROLADA POR TIMEOUT */}
              <div className="w-full max-w-[260px] h-[1px] bg-emerald-950/50 relative overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ 
                    duration: 4.8, 
                    ease: [0.33, 1, 0.68, 1] 
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400 to-emerald-500 shadow-[0_0_12px_rgba(52,211,153,0.4)]"
                />
              </div>
              
              <motion.p 
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-6 text-[9px] text-emerald-400/40 font-mono tracking-[0.4em] uppercase"
              >
                Establishing Secure Link
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}