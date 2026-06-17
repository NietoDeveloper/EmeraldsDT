import { HeroSection } from '@/components/sections/HeroSection';
import { MainButton } from '@/components/ui/MainButton';
import { Footer } from "@/components/shared/Footer"; // Importamos el Footer aquí

interface HomePageProps {
  params: Promise<{ lang: string }>;
}
  return (
    <main className="fixed inset-0 w-full bg-black snap-y snap-mandatory overflow-y-auto scrollbar-hide selection:bg-gold/30 z-0">
      
      {/* SECCIÓN 1: HERO */}
      <section className="snap-start h-screen w-full shrink-0">
        <HeroSection />
            </div>
            <div className="hidden md:block h-[350px] border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm relative group overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-white/5 font-mono text-[10px] uppercase tracking-[1.5em] rotate-90 whitespace-nowrap group-hover:text-white/20 transition-all duration-1000">
                Technical Specifications // Ciclo S+
    </main>
  );
}