"use client";
import { useState, useRef } from "react";
import { MainButton } from '@/components/ui/MainButton';
import { MuteToggle } from '@/components/ui/MuteToggle';

export const HeroSection = () => {
  // Iniciamos en true para asegurar que el Autoplay funcione siempre
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);




      {/* Overlay: Degradado SpaceX (más oscuro abajo para legibilidad) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-1" />

      {/* Content */}
      <div className="container mx-auto px-10 z-10 animate-fade-in-up">


      </div>

      {/* Control de Audio Minimalista */}
      <MuteToggle isMuted={isMuted} onToggle={toggleMute} />
    </section>
  );
};