"use client";
import { useState, useRef } from "react";
import { MainButton } from '@/components/ui/MainButton';
import { MuteToggle } from '@/components/ui/MuteToggle';

export const HeroSection = () => {
  // Iniciamos en true para asegurar que el Autoplay funcione siempre
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      // Sincronizamos el estado de React con la propiedad nativa del video
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col justify-end pb-24">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        playsInline
        muted={isMuted} // Controlado dinámicamente
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/videos/hero-emerald.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay: Degradado SpaceX (más oscuro abajo para legibilidad) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-1" />

      {/* Content */}
      <div className="container mx-auto px-10 z-10 animate-fade-in-up">
        <h2 className="text-gold tracking-[0.4em] uppercase text-xs mb-4 font-mono opacity-90">
          Emerald DT // Nieto Lab
        </h2>
        <h1 className="text-6xl md:text-[100px] font-bold uppercase mb-8 leading-[0.85] tracking-tighter">
          Eternal <br /> 
          <span className="text-emerald">Emeralds</span>
        </h1>
        <div className="flex flex-wrap gap-5">
          <MainButton text="Explore Collection" variant="white" />
          <MainButton text="Technical Specs" variant="gold" />
        </div>
      </div>

      {/* Control de Audio Minimalista */}
      <MuteToggle isMuted={isMuted} onToggle={toggleMute} />
    </section>
  );
};