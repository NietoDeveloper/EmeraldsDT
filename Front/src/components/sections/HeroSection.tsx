"use client";
import { useState, useRef } from "react";
import { MainButton } from '@/components/ui/MainButton';
import { MuteToggle } from '@/components/ui/MuteToggle';

export const HeroSection = () => {
  // Iniciamos en true para asegurar que el Autoplay funcione siempre
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);


le isMuted={isMuted} onToggle={toggleMute} />
    </section>
  );
};