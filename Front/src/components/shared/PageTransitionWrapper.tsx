'use client';
import { motion } from 'framer-motion';

export default function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 1, 
        delay: 5, // Sincronizado para empezar justo cuando termina el Preloader
        ease: "easeOut" 
      }}
    >
      {children}
    </motion.div>
  );
}