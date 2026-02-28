'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const startLoadingCycle = () => {
    setLoading(true);
    // 5 segundos exactos de ciclo de vida
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    setIsMounted(true);
    startLoadingCycle();
  }, []);

  useEffect(() => {
    if (isMounted) {
      startLoadingCycle();
    }
  }, [pathname, searchParams]);

  if (!isMounted) return null;

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="emerald-preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            transition: { duration: 1, ease: "easeInOut" } 
          }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#010502] select-none pointer-events-auto"
        >
          {/* FONDO VERDE ATMOSFÉRICO */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5] 
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/30 blur-[140px] rounded-full" 
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)]" />
          </div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-[310px] md:max-w-none px-6">
            
            {/* LOGO PNG - ANIMACIÓN DE PULSO Y BRILLO */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.98, 1.02, 0.98],
                opacity: 1,
                filter: [
                  "brightness(1) drop-shadow(0 0 15px rgba(16,185,129,0.2))",
                  "brightness(1.3) drop-shadow(0 0 40px rgba(16,185,129,0.6))",
                  "brightness(1) drop-shadow(0 0 15px rgba(16,185,129,0.2))"
                ]
              }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
              className="relative w-44 h-44 md:w-56 md:h-56 mb-6"
            >
              <Image
                src="/assets/img/logo.png"
                alt="Emerald DT Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center w-full flex flex-col items-center"
            >
              <h2 className="text-white font-mono text-2xl md:text-4xl tracking-[1em] uppercase mb-4 font-bold ml-[1em]">
                EMERALD<span className="text-emerald-400">DT</span>
              </h2>
              
              <div className="flex items-center gap-3 mb-10 opacity-50">
                 <span className="h-[1px] w-8 bg-emerald-500" />
                 <span className="text-emerald-400 font-mono text-[9px] tracking-[0.3em] uppercase">Security Cluster Active</span>
                 <span className="h-[1px] w-8 bg-emerald-500" />
              </div>

              {/* BARRA DE PROGRESO SINCRONIZADA A 5s */}
              <div className="w-full max-w-[300px] h-[2px] bg-emerald-950/50 relative overflow-hidden rounded-full border border-white/5">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ 
                    duration: 5, // Sincronizado con el setTimeout
                    ease: [0.65, 0, 0.35, 1] // Curva de aceleración técnica
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400 to-emerald-600 shadow-[0_0_15px_rgba(52,211,153,0.8)]"
                />
              </div>
              
              <motion.p 
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-6 text-[10px] text-emerald-300/40 font-mono tracking-[0.5em] uppercase"
              >
                {pathname === '/' ? 'Establishing Connection' : `Navigating to ${pathname}`}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}