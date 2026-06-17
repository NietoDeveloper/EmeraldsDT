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
      </section>

              <h2 className="text-4xl md:text-6xl font-bold uppercase mb-8 leading-tight text-white tracking-tighter">
                Nieto Lab <br /> <span className="text-gold italic font-extralight uppercase tracking-normal">Engineering</span>
              </h2>
              <div className="space-y-6 border-l border-emerald-500/50 pl-8">
                <p className="text-emerald-500/80 text-lg italic font-medium">"Building scalable systems with 100% discipline."</p>
                <p className="text-zinc-500 max-w-md text-sm md:text-base leading-relaxed">
                  {isEs ? 'Arquitectura de seguridad máxima y trazabilidad absoluta...' : 'Maximum security architecture and absolute traceability...'}
                </p>
              </div>
            </div>
            <div className="hidden md:block h-[350px] border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm relative group overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-white/5 font-mono text-[10px] uppercase tracking-[1.5em] rotate-90 whitespace-nowrap group-hover:text-white/20 transition-all duration-1000">
                Technical Specifications // Ciclo S+
    </main>
  );
}