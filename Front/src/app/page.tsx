import { HeroSection } from '@/components/sections/HeroSection';
// CORRECCIÓN: Importación nombrada para coincidir con export const Footer
import { Footer } from '@/components/shared/Footer'; 
import { MainButton } from '@/components/ui/MainButton';

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

/**
 * Emerald DT - Home Orchestrator
 * Ajustado para Responsive 310px - 1900px+
 * Garantía: Nieto Laboratory Standard
 */
export default async function Home({ params }: HomePageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const isEs = lang === 'es';

  return (
    <main className="relative w-full bg-black select-none overflow-x-hidden">
      
      {/* SECCIÓN 1: Hero Video (Full Screen Snap) */}
      <section className="h-[100dvh] w-full relative overflow-hidden">
        <HeroSection />
      </section>

      {/* SECCIÓN 2: Heritage & Collection */}
      <section className="min-h-screen w-full flex items-center bg-black border-t border-emerald/10 relative overflow-hidden py-20 lg:py-32">
        
        {/* Resplandor Esmeralda Ambiental */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[700px] h-[300px] md:h-[700px] bg-emerald/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="w-full px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 relative z-10">
          <div className="max-w-[1800px] mx-auto">
            <div className="max-w-5xl">
              
              <h2 className="text-emerald font-mono tracking-[0.4em] md:tracking-[0.8em] uppercase mb-8 text-[9px] md:text-xs">
                {isEs ? '// Próximo Lanzamiento' : '// Upcoming Release'}
              </h2>
              
              <h3 className="text-4xl sm:text-6xl md:text-8xl lg:text-[110px] font-black uppercase mb-10 tracking-tighter leading-[0.9] text-white">
                Muzo Star <br/> 
                <span className="text-white/20 italic font-light hover:text-white transition-all duration-700 cursor-default">
                  Collection
                </span>
              </h3>
              
              <p className="text-zinc-400 text-sm md:text-xl lg:text-2xl mb-14 max-w-2xl leading-relaxed font-medium">
                {isEs 
                  ? 'La pureza del cristal colombiano alcanza nuevas alturas. Una serie limitada de 12 obras maestras certificadas bajo el rigor científico del Nieto Laboratory.' 
                  : 'The purity of Colombian crystal reaches new heights. A limited series of 12 masterpieces certified under the scientific rigor of the Nieto Laboratory.'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 md:gap-10 items-start sm:items-center">
                <MainButton 
                  text={isEs ? 'Ver Detalles' : 'View Details'} 
                  variant="white" 
                />
                <div className="flex flex-col border-l border-emerald/30 pl-6">
                    <span className="text-white font-bold uppercase tracking-widest text-[9px] md:text-[10px]">Nieto Lab Engineering</span>
                    <span className="text-zinc-500 text-[9px] md:text-[10px] italic">"100% Discipline, Maximum Security."</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decoración lateral técnica */}
        <div className="absolute right-8 md:right-16 bottom-24 hidden xl:block">
          <div className="flex flex-col gap-6 items-center">
            <span className="[writing-mode:vertical-lr] uppercase tracking-[0.5em] text-[10px] text-zinc-700 font-mono">
              Nieto Laboratory — 2026
            </span>
            <div className="w-[1px] h-20 bg-gradient-to-t from-emerald/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: Security & Trust */}
      <section className="min-h-[60vh] w-full flex flex-col justify-center bg-black py-32 border-t border-white/5">
        <div className="w-full px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48">
            <div className="max-w-4xl">
                <h4 className="text-emerald text-xl md:text-3xl font-black uppercase tracking-widest mb-8">Maximum Security Architecture</h4>
                <p className="text-zinc-500 text-base md:text-xl leading-relaxed mb-10">
                    Absolute traceability for every high-value asset. Our double cluster infrastructure ensures your investment is backed by the highest standards of digital and physical security.
                </p>
                <div className="w-16 h-[1px] bg-emerald/50" />
            </div>
        </div>
      </section>
      
      {/* Footer fuera de secciones para evitar saltos de scroll */}
      <Footer />

    </main>
  );
}