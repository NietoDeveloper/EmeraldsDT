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

      setLoading(false);
    }, 5000);


      )}
    </AnimatePresence>
  );
}