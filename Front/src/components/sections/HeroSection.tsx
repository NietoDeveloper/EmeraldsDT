"use client";
import { useState, useRef, useEffect } from "react";
import { MainButton } from '@/components/ui/MainButton';
import { MuteToggle } from '@/components/ui/MuteToggle';

export const HeroSection = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    /* CAMBIO CLAVE: Usamos h-[100dvh] para ajustar la altura real disponible.
       Eliminamos cualquier overflow que no sea 'hidden' para evitar que el video 
       asome por los bordes.
    */
    <section className="relative h-[100dvh] w-full overflow-hidden flex flex-col justify-end pb-12 md:pb-24 lg:pb-32">
      
      {/* Video Background - Optimized WebM 
          Aseguramos que no tenga márgenes y use 'inset-0'
      */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          muted={isMuted}
          className="w-full h-full object-cover grayscale-[20%] brightness-[0.8]"
        >
          <source src="/assets/videos/hero-emerald.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* SpaceX Scanline Effect */}
      <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      {/* Overlays de Contraste */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-[2]" />
      <div className="absolute inset-0 bg-black/20 z-[2]" />

      {/* Content Layer - Z-10 para estar sobre los gradientes */}
      <div className="w-full max-w-[1900px] mx-auto px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 z-10 animate-fade-in relative">
        
        {/* Etiqueta Técnica */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[1px] bg-gold/50" />
          <h2 className="text-gold tracking-[0.3em] md:tracking-[0.5em] uppercase text-[9px] md:text-xs font-mono font-bold">
            Emerald DT <span className="text-white/30 px-2">//</span> Nieto Lab
          </h2>
        </div>

        {/* Título Principal */}
        <h1 className="text-[14vw] sm:text-[10vw] md:text-[90px] lg:text-[110px] xl:text-[130px] font-bold uppercase mb-8 leading-[0.85] tracking-tighter text-white">
          Eternal <br /> 
          <span className="text-emerald drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            Emeralds
          </span>
        </h1>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto">
          <div className="w-full sm:w-auto">
            <MainButton text="Explore Collection" variant="white" className="w-full sm:w-auto" />
          </div>
          <div className="w-full sm:w-auto">
            <MainButton text="Technical Specs" variant="gold" className="w-full sm:w-auto" />
          </div>
        </div>
      </div>

      {/* Control de Audio Flotante - Z-20 para asegurar click */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20">
        <MuteToggle isMuted={isMuted} onToggle={toggleMute} />
      </div>

      {/* Indicador de Scroll SpaceX Style */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-30 z-10 pointer-events-none">
         <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </div>

    </section>
  );
};