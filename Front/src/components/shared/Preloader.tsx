'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Duración exacta de 5 segundos para mantener la calidad DT
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
        >
          {/* FONDO VERDE BLUR (Efecto Esmeralda Profunda) */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/30 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-emerald-900/20 blur-[100px] rounded-full" />
          </div>

          {/* LOGO CON MOVIMIENTO */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, letterSpacing: "0.5em" }}
              animate={{ 
                scale: [0.8, 1.1, 1], 
                opacity: [0, 1, 1],
                letterSpacing: ["0.5em", "0.2em", "0.4em"] 
              }}
              transition={{ duration: 4, ease: "circOut" }}
              className="flex flex-col items-center"
            >
              {/* Aquí iría tu SVG o Imagen del Logo Emerald DT */}
              <div className="w-24 h-24 mb-8 relative">
                <motion.div 
                  animate={{ 
                    rotateY: [0, 180, 360],
                    filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full bg-gradient-to-tr from-emerald-400 to-emerald-700 rounded-sm rotate-45 border border-white/20 shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                />
              </div>
              
              <h1 className="text-white font-mono text-xl tracking-[0.6em] uppercase">
                Emerald <span className="text-emerald-500">DT</span>
              </h1>
              
              {/* BARRA DE PROGRESO MINIMALISTA */}
              <div className="mt-12 w-48 h-[1px] bg-white/10 relative overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 5, ease: "easeInOut" }}
                  className="absolute inset-0 bg-emerald-500"
                />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 1, duration: 3 }}
              className="mt-4 text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-mono"
            >
              { "// Nieto Laboratory Certification In Progress" }
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}