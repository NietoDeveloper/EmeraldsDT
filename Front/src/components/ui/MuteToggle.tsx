"use client";

import { Volume2, VolumeX } from "lucide-react";

interface MuteToggleProps {
  isMuted: boolean;
  onToggle: () => void;
}

/**
 * MuteToggle - Emerald DT Audio Control
 * Rigor: Nieto Laboratory Standard
 * Responsive: 310px - 1900px
 */
export const MuteToggle = ({ isMuted, onToggle }: MuteToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex items-center gap-4 group cursor-pointer border-none outline-none"
      aria-label={isMuted ? "Enable Sound" : "Disable Sound"}
    >
      {/* Label técnico - Oculto en móviles muy pequeños para limpieza visual */}
      <div className="flex flex-col items-end pointer-events-none select-none">
        <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 group-hover:text-emerald transition-colors duration-300 hidden sm:block">
          Audio System
        </span>
        <span className="text-[8px] md:text-[9px] font-mono uppercase tracking-[0.1em] text-white/20 group-hover:text-white transition-opacity hidden sm:block">
          {isMuted ? "Status: Muted" : "Status: Active"}
        </span>
      </div>

      {/* Botón Circular */}
      <div className="relative">
        {/* Efecto de pulso Esmeralda */}
        {!isMuted && (
          <div className="absolute inset-0 rounded-full bg-emerald/30 animate-ping z-0" />
        )}
        
        <div className={`
          relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-full border 
          flex items-center justify-center bg-black/60 backdrop-blur-md 
          transition-all duration-500 ease-in-out
          group-hover:border-emerald group-active:scale-90
          ${!isMuted ? 'border-emerald/60 shadow-[0_0_20px_rgba(16,185,129,0.15)]' : 'border-white/20'}
        `}>
          {isMuted ? (
            <VolumeX className="text-white/60 w-4 h-4 md:w-5 md:h-5 group-hover:text-white transition-colors" />
          ) : (
            <Volume2 className="text-emerald w-4 h-4 md:w-5 md:h-5 transition-colors" />
          )}
        </div>

        {/* Decoración técnica (Bordes esquineros) */}
        <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-transparent group-hover:border-emerald/50 transition-all duration-500" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-transparent group-hover:border-emerald/50 transition-all duration-500" />
      </div>
    </button>
  );
};