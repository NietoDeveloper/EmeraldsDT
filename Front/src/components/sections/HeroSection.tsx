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

  );
};