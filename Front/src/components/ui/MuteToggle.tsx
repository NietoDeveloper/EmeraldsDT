"use client";
import { Volume2, VolumeX } from "lucide-react";

interface MuteToggleProps {
  isMuted: boolean;
  onToggle: () => void;
}

export const MuteToggle = ({ isMuted, onToggle }: MuteToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-10 right-10 z-50 flex items-center gap-4 group"
      aria-label={isMuted ? "Enable Sound" : "Disable Sound"}
    >
      {/* Label técnico - Aparece en hover */}
      <div className="flex flex-col items-end">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 group-hover:text-gold transition-colors duration-300 hidden md:block">
          Audio System
        </span>
        <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-white/20 group-hover:text-white transition-opacity hidden md:block">
          {isMuted ? "Status: Muted" : "Status: Active"}
        </span>
      </div>

      {/* Botón Circular */}
      <div className="relative">
        {/* Efecto de pulso cuando el sonido está activo */}
        {!isMuted && (
          <div className="absolute inset-0 rounded-full bg-emerald/20 animate-ping z-0" />
        )}
        
        <div className={`
          relative z-10 w-14 h-14 rounded-full border border-white/10 
          flex items-center justify-center bg-black/40 backdrop-blur-md 
          transition-all duration-500 ease-in-out
          group-hover:border-emerald group-active:scale-95
          ${!isMuted ? 'border-emerald/50 bg-emerald/5' : 'border-white/20'}
        `}>
          {isMuted ? (
            <VolumeX className="text-white/60 w-5 h-5 group-hover:text-white transition-colors" />
          ) : (
            <Volume2 className="text-emerald w-5 h-5 group-hover:text-emerald-light transition-colors" />
          )}
        </div>

        {/* Decoración técnica (Bordes esquineros) */}
        <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white/0 group-hover:border-gold transition-all duration-500" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white/0 group-hover:border-gold transition-all duration-500" />
      </div>
    </button>
  );
};