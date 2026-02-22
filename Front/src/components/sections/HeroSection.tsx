"use client";
import { MainButton } from '@/components/ui/MainButton';

export const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col justify-end pb-20">
      {/* Video Background */}
      <video
        autoPlay
        loop
        playsInline
        /* Quita 'muted' si quieres sonido, pero recuerda que el autoplay podría fallar */
        muted={false} 
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/videos/hero-emerald.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay para legibilidad técnica */}
      <div className="absolute inset-0 bg-black/30 z-1" />

      {/* Content */}
      <div className="container mx-auto px-10 z-10 animate-fade-in-up">
        <h2 className="text-gold tracking-[0.3em] uppercase text-sm mb-2 font-mono">
          Emerald DT
        </h2>
        <h1 className="text-5xl md:text-8xl font-bold uppercase mb-6 leading-none">
          Eternal <br /> Emeralds
        </h1>
        <div className="flex gap-4">
          <MainButton text="Explore Collection" variant="white" />
          <MainButton text="Technical Specs" variant="gold" />
        </div>
      </div>
    </section>
  );
};