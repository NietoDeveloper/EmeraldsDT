'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              clas[1px] w-6 bg-emerald-500" />
              </div>

              {/* BARRA DE PROGRESO - CARGA EN 4 SEGUNDOS */}
    
              
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