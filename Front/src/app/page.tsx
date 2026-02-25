import { HeroSection } from '@/components/sections/HeroSection';
import Footer from '@/components/shared/Footer'; 
import { MainButton } from '@/components/ui/MainButton';

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

/**
 * Emerald DT - Home Orchestrator
 * Fix de Scrollbar: Se elimina cualquier posible scroll horizontal.
 * Garantía Responsive: 310px - 1900px.
 */
export default async function Home({ params }: HomePageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const isEs = lang === 'es';

  return (
    // Se cambia w-full por screen para asegurar que el scrollbar se pegue al borde del navegador
    <main className="relative min-h-screen w-full bg-black select-none overflow-x-hidden">
      
      {/* SECCIÓN 1: Hero Video (Estilo SpaceX) */}
      <section className="snap-start h-screen w-full relative overflow-hidden">
        <HeroSection />
      </section>

      {/* SECCIÓN 2: Preview de Colección / Heritage */}
      <section className="snap-start min-h-screen w-full flex items-center bg-black border-t border-emerald/10 relative overflow-hidden">
        
        {/* Resplandor Esmeralda ambiental */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[700px] h-[300px] md:h-[700px] bg-emerald/10 blur-[150px] rounded-full pointer-events-none animate-pulse-slow" />
        
        {/* CONTENEDOR MAESTRO: Paddings sincronizados con el Navbar (310px a 1900px+) */}
        <div className="w-full px-12 sm:px-24 md:px-32 lg:px-40 xl:px-56 uw:px-72 relative z-10 py-20">
          <div className="max-w-[2200px] mx-auto">
            <div className="max-w-5xl transition-all duration-1000">
              
              <h2 className="text-emerald font-mono tracking-[0.8em] uppercase mb-8 text-[10px] md:text-xs hover:text-gold transition-colors cursor-default inline-block">
                {isEs ? '// Próximo Lanzamiento' : '// Upcoming Release'}
              </h2>
              
              <h3 className="text-5xl sm:text-7xl md:text-9xl lg:text-[130px] font-black uppercase mb-10 tracking-tighter leading-[0.85] text-white">
                Muzo Star <br/> 
                <span className="text-white/30 italic font-light hover:text-white transition-all duration-1000 cursor-default">
                  Collection
                </span>
              </h3>
              
              <p className="text-zinc-400 text-lg md:text-2xl mb-14 max-w-2xl leading-relaxed font-medium">
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
                    <span className="text-gold font-black uppercase tracking-widest text-xs">Nieto Lab Engineering</span>
                    <span className="text-zinc-500 text-[10px] italic">"Building scalable systems with 100% discipline."</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decoración lateral técnica */}
        <div className="absolute right-12 md:right-24 bottom-24 hidden xl:block">
          <div className="flex flex-col gap-6 items-center">
            <span className="[writing-mode:vertical-lr] uppercase tracking-[0.6em] text-[11px] text-zinc-600 font-mono">
              Nieto Lab — 2026
            </span>
            <div className="w-[1px] h-24 bg-gradient-to-t from-emerald to-transparent" />
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: Footer Snap - Reintegrado con texto técnico de seguridad */}
      <section className="snap-start min-h-screen w-full flex flex-col justify-between bg-black pt-32">
        <div className="flex-grow flex items-center px-12 sm:px-24 md:px-32 lg:px-40 xl:px-56 uw:px-72">
            <div className="max-w-4xl">
                <h4 className="text-emerald text-2xl md:text-4xl font-black uppercase tracking-widest mb-8">Maximum Security Architecture</h4>
                <p className="text-zinc-500 text-lg md:text-2xl leading-relaxed mb-6">
                   
                </p>
                <div className="w-20 h-[2px] bg-gold" />
            </div>
        </div>
        
        {/* COMPONENTE FOOTER: Ahora incluido correctamente al final del flujo */}
        <div className="w-full">
          <Footer />
        </div>
      </section>

    </main>
  );
}