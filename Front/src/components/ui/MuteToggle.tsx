"use client";
import { Volume2, VolumeX } from "lucide-react";

interface MuteToggleProps {
  isMuted: boolean;
  onToggle: () => void;
}




        {/* Decoración técnica (Bordes esquineros) */}
        <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white/0 group-hover:border-gold transition-all duration-500" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white/0 group-hover:border-gold transition-all duration-500" />
      </div>
    </button>
  );
};