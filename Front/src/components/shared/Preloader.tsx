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
            transition: { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] } 
          }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#020a05] select-none pointer-events-auto"
        >
          {/* FONDO VERDE ULTRA-NOTORIO (Vignette & Blur) */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Glow Central Primario (Más intenso) */}
            <motion.div 
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.6, 0.9, 0.6] 
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/40 blur-[120px] rounded-full" 
            />
            
            {/* Glow Perimetral (Crea la atmósfera verde en toda la pantalla) */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/40 to-emerald-900/30 opacity-80" />
            
            {/* Destellos Laterales Notorios */}
            <motion.div 
              animate={{ opacity: [0.2, 0.5, 0.2], x: [0, 30, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-emerald-400/20 blur-[150px] rounded-full" 
            />
            <motion.div 
              animate={{ opacity: [0.2, 0.5, 0.2], x: [0, -30, 0] }}
              transition={{ duration: 7, repeat: Infinity }}
              className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-emerald-600/20 blur-[180px] rounded-full" 
            />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            
            {/* LOGO PNG CON MOVIMIENTO DINÁMICO */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ 
                scale: [0.95, 1.05, 0.95],
                opacity: 1,
                rotateY: [0, 5, -5, 0],
                filter: [
                  "brightness(1.1) drop-shadow(0 0 20px rgba(16,185,129,0.4))",
                  "brightness(1.6) drop-shadow(0 0 50px rgba(16,185,129,0.7))",
                  "brightness(1.1) drop-shadow(0 0 20px rgba(16,185,129,0.4))"
                ]
              }}
              transition={{ 
                duration: 4, 
                ease: "easeInOut", 
                repeat: Infinity 
              }}
              className="relative w-40 h-40 md:w-52 md:h-52 mb-8"
            >
              <Image
                src="/assets/img/logo.png"
                alt="Emerald DT Logo"
                fill
                className="object-contain p-2"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-center"
            >
              <h2 className="text-white font-mono text-3xl md:text-4xl tracking-[1.2em] uppercase mb-2 font-bold">
                EMERALD<span className="text-emerald-400">DT</span>
              </h2>
              
              <div className="flex items-center justify-center gap-4 mb-8">
                 <span className="h-[1px] w-12 bg-emerald-500/30" />
                 <span className="text-emerald-500 font-mono text-[10px] tracking-[0.4em] uppercase">Laboratory Grade</span>
                 <span className="h-[1px] w-12 bg-emerald-500/30" />
              </div>

              {/* BARRA DE PROGRESO CINEMÁTICA */}
              <div className="w-80 h-[2px] bg-white/5 relative overflow-hidden rounded-full">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 4.8, ease: [0.645, 0.045, 0.355, 1.000] }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
                />
              </div>
              
              <motion.p 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mt-6 text-[10px] text-emerald-300/40 font-mono tracking-[0.6em] uppercase"
              >
                {pathname === '/' ? 'Establishing Secure Cluster' : 'Synchronizing Heritage'}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}