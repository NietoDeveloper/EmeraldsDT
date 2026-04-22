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
              ani
ation: 2.5, repeat: Infinity }}
                className="mt-6 text-[9px] text-emerald-300/30 font-mono tracking-[0.4em] uppercase"
              >
      )}
    </AnimatePresence>
  );
}