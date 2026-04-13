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
    <section className="relative h-[100dvh] w-full overflow-hidden flex flex-col justify-end pb-12 md:pb-24 lg:pb-32 bg-black">
      
      {/* Video Background - Responsive 310px a 1900px */}
      <div className="absolute inset-0 z-0 bg-black">
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          muted={isMuted}
          className="w-full h-full object-cover md:object-contain object-center transition-opacity duration-700"
        >
          <source src="/videos/hero-emerald.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Efecto Scanline SpaceX */}
      <div className="absolute inset-0 z-[1] opacity-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%]" />

      {/* Gradiente base */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-[2] pointer-events-none" />

      {/* Content Layer - Ajuste mobile -50px (bottom-12 aprox -> mb-[50px]) */}
      <div className="w-full max-w-[1900px] mx-auto px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 z-10 animate-fade-in relative -translate-y-[50px] md:translate-y-0">
        
        {/* Etiqueta Técnica */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[1px] bg-gold" />
          <h2 className="text-gold tracking-[0.3em] md:tracking-[0.5em] uppercase text-[9px] md:text-xs font-mono font-bold drop-shadow-md">
            Emerald DT <span className="text-gold/50 px-2">//</span> Boyaca - Bogota
          </h2>
        </div>

        {/* Título Principal - Colombian ahora es GOLD */}
        <h1 className="text-[14vw] sm:text-[10vw] md:text-[90px] lg:text-[110px] xl:text-[130px] font-bold uppercase mb-8 leading-[0.85] tracking-tighter drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
          <span className="text-gold">Colombian</span> <br /> 
          <span className="text-emerald drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]">
            Emeralds
          </span>
        </h1>

        {/* Botones Estilo SpaceX - Sin Blanco, Todo Gold */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto">
          <div className="w-full sm:w-auto">
            <MainButton 
              text="EXPLORE CATALOGUE" 
              variant="gold" 
              className="w-full sm:w-auto border-2 border-gold text-gold tracking-[0.2em] text-[11px] font-bold py-4 hover:bg-gold hover:text-black transition-all duration-300" 
            />
          </div>
          <div className="w-full sm:w-auto">
            <MainButton 
              text="VIEW CATEGORIES" 
              variant="gold" 
              className="w-full sm:w-auto border-2 border-gold text-gold tracking-[0.2em] text-[11px] font-bold py-4 hover:bg-gold hover:text-black transition-all duration-300" 
            />
          </div>
        </div>
      </div>

      {/* Control de Audio Flotante */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20">
        <MuteToggle isMuted={isMuted} onToggle={toggleMute} />
      </div>

      {/* Indicador de Scroll */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-50 z-10 pointer-events-none">
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent" />
      </div>

    </section>
  );
};