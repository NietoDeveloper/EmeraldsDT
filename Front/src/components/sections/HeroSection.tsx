"use client";
import { useState, useRef, useEffect } from "react";
import { MainButton } from '@/components/ui/MainButton';
import { MuteToggle } from '@/components/ui/MuteToggle';

export const HeroSection = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Aseguramos que el video intente reproducirse tras el montaje (Next.js 15 Fix)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.play().catch(error => {
        console.warn("Autoplay preventivo: ", error);
      });
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col justify-end pb-20 md:pb-24 lg:pb-32">
      
      {/* Video Background - Optimized WebM */}
      <video
        ref={videoRef}
        autoPlay
        loop
        playsInline
        muted={isMuted}
        className="absolute top-0 left-0 w-full h-full object-cover z-0 grayscale-[20%] brightness-[0.8]"
      >
        <source src="/assets/videos/hero-emerald.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* SpaceX Scanline Effect: Capa de textura técnica */}
      <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      {/* Overlays de Contraste */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-[2]" />
      <div className="absolute inset-0 bg-black/20 z-[2]" />

      {/* Content Layer - Adaptativo 310px - 1900px */}
      <div className="w-full max-w-[1900px] mx-auto px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 z-10 animate-fade-in">



      </div>

      {/* Control de Audio Flotante */}
      <MuteToggle isMuted={isMuted} onToggle={toggleMute} />

      {/* Indicador de Scroll SpaceX Style (Solo Visible en pantallas grandes) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-30 z-10">
         <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </div>

    </section>
  );
};