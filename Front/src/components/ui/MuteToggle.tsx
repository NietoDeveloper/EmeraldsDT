"use client";
import { Volume2, VolumeX } from "lucide-react"; // npm install lucide-react

interface MuteToggleProps {
  isMuted: boolean;
  onToggle: () => void;
}

export const MuteToggle = ({ isMuted, onToggle }: MuteToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-10 right-10 z-50 flex items-center gap-3 group"
      aria-label="Toggle Sound"
    >
      <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center bg-black/20 backdrop-blur-sm group-hover:border-emerald transition-all">
        {isMuted ? (
          <VolumeX className="text-white w-5 h-5 group-hover:text-emerald" />
        ) : (
          <Volume2 className="text-white w-5 h-5 group-hover:text-emerald" />
        )}
      </div>
      <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 group-hover:text-white transition-opacity hidden md:block">
        {isMuted ? "Sound Off" : "Sound On"}
      </span>
    </button>
  );
};