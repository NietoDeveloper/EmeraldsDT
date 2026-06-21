'use client';
    }
  };
                  "brightness(1) drop-shadow(0 0 10px rgba(16,185,129,0.2))",
                  "brightness(1.4) drop-shadow(0 0 35px rgba(16,185,129,0.5))",
                  "brightness(1) drop-shadow(0 0 10px rgba(16,185,129,0.2))"
                ]
              }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
              className="relative w-40 h-40 md:w-52 md:h-52 mb-8"
            >
              <Image
                src="/img/logo.png" // RUTA CORREGIDA: public/img/logo.png -> /img/logo.png
                alt="Emerald DT Logo"
                fill
                sizes="(max-width: 768px) 160px, 208px"
                className="object-contain"
                priority
                unoptimized // Úsalo si el logo es un GIF o para evitar latencia de optimización en el preloader
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

              {/* BARRA DE PROGRESO */}
              <div className="w-full max-w-[260px] h-[1px] bg-emerald-950/50 relative overflow-hidden rounded-full border border-white/5">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ 
                    duration: 4, 
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