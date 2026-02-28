'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Preloader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Función para disparar el preloader de 5 segundos (Calidad DT)
  const triggerPreloader = () => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  };

  // Detectar cambios de ruta o recargas
  useEffect(() => {
    triggerPreloader();
  }, [pathname, searchParams]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="emerald-preloader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black select-none pointer-events-auto"
        >
          {/* FONDO VERDE BLUR CINEMÁTICO */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3] 
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/20 blur-[150px] rounded-full" 
            />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* LOGO EMERALD DT CON ROTACIÓN 3D */}
            <motion.div
              animate={{ 
                rotateY: [0, 180, 360],
                filter: ["drop-shadow(0 0 10px #10b981)", "drop-shadow(0 0 30px #10b981)", "drop-shadow(0 0 10px #10b981)"]
              }}
              transition={{ duration: 5, ease: "linear", repeat: Infinity }}
              className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-800 rotate-45 border border-white/30 shadow-2xl mb-10"
            />

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center"
            >
              <h2 className="text-white font-mono text-2xl tracking-[0.8em] uppercase">
                EMERALD<span className="text-emerald-500 italic">DT</span>
              </h2>
              
              {/* STATUS BAR TÉCNICA */}
              <div className="mt-8 w-64 h-[2px] bg-white/5 relative overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 4.5, ease: "slow" }}
                  className="absolute inset-0 bg-emerald-500 shadow-[0_0_15px_#10b981]"
                />
              </div>
              
              <p className="mt-4 text-[9px] text-zinc-500 font-mono tracking-[0.5em] uppercase">
                {pathname === '/' ? 'Initializing Laboratory' : `Syncing: ${pathname}`}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}