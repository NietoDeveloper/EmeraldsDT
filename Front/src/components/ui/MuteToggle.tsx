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



        {/* Decoración técnica (Bordes esquineros) */}
        <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white/0 group-hover:border-gold transition-all duration-500" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white/0 group-hover:border-gold transition-all duration-500" />
      </div>
    </button>
  );
};