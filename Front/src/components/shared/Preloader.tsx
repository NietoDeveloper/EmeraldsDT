'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  if (!isMounted) return nul
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#010502] select-none pointer-events-auto"
        >
          {/* FONDO VERDE ATMOSFÉRICO */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3] 
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/20 blur-[140px] rounded-full" 
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.9)_100%)]" />
          </div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-[310px] md:max-w-none px-6">
            
            {/* LOGO ANIMADO */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: [0.98, 1.05, 0.98],
                opacity: 1,
                filter: [
                  "brightness(1) drop-shadow(0 0 10px rgba(16,185,129,0.2))",
                  "brightness(1.4) drop-shadow(0 0 35px rgba(16,185,129,0.5))",
                  "brightness(1) drop-shadow(0 0 10px rgba(16,185,129,0.2))"
                ]
              }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
              className="relative w-40 h-40 md:w-52 md:h-52 mb-8"
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
              transition={{ delay: 0.2 }}
              className="text-center w-full flex flex-col items-center"
            >
              <h2 className="text-white font-mono text-xl md:text-3xl tracking-[0.8em] uppercase mb-6 font-bold ml-[0.8em]">
                EMERALD<span className="text-emerald-400">DT</span>
              </h2>
              
              <div className="flex items-center gap-3 mb-10 opacity-40">
                 <span className="h-[1px] w-6 bg-emerald-500" />
                 <span className="text-emerald-400 font-mono text-[8px] tracking-[0.3em] uppercase">Security Cluster Active</span>
                 <span className="h-[1px] w-6 bg-emerald-500" />
              </div>

              {/* BARRA DE PROGRESO - CARGA EN 4 SEGUNDOS */}
              <div className="w-full max-w-[260px] h-[1px] bg-emerald-950/50 relative overflow-hidden rounded-full border border-white/5">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ 
                    duration: 4, // AJUSTE: Carga en 4 segundos
                    ease: [0.65, 0, 0.35, 1] 
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400 to-emerald-600 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                />
              </div>
              
              <motion.p 
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="mt-6 text-[9px] text-emerald-300/30 font-mono tracking-[0.4em] uppercase"
              >
                {pathname === '/' ? 'Establishing Secure Link' : `Syncing ${pathname}`}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}