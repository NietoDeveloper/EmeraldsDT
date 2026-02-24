import { HeroSection } from '@/components/sections/HeroSection';
import Footer from '@/components/shared/Footer'; 
import { MainButton } from '@/components/ui/MainButton';

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

/**
 * Emerald DT - Home Orchestrator
 * Arquitectura de secciones optimizada para el Nieto Laboratory.
 * Responsive: 310px - 1900px.
 * Sincronización de paddings con el Navbar Maestro.
 */
export default async function Home({ params }: HomePageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const isEs = lang === 'es';

  return (
    <div className="relative w-full bg-black select-none">
      
      {/* SECCIÓN 1: Hero Video (Estilo SpaceX) */}
      <section className="snap-start h-screen w-full relative overflow-hidden">
        <HeroSection />
      </section>

      {/* SECCIÓN 2: Preview de Colección / Heritage */}
      <section className="snap-start h-screen w-full flex items-center bg-black border-t border-emerald/10 relative overflow-hidden">
        
        {/* Resplandor Esmeralda ambiental - Optimización visual Nieto Lab */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[700px] h-[300px] md:h-[700px] bg-emerald/10 blur-[80px] md:blur-[150px] rounded-full pointer-events-none animate-pulse-slow" />
        
        {/* CONTENEDOR MAESTRO: Paddings sincronizados con el nuevo Navbar (px-12 a uw:px-72) */}
        <div className="w-full px-12 sm:px-24 md:px-32 lg:px-40 xl:px-56 uw:px-72 relative z-10">
          <div className="max-w-[2200px] mx-auto">
            <div className="max-w-5xl transition-all duration-1000">
              
              {/* Tag técnico con hover gold */}
              <h2 className="text-emerald font-mono tracking-[0.5em] md:tracking-[0.8em] uppercase mb-8 text-[10px] md:text-xs hover:text-gold transition-colors cursor-default inline-block">
                {isEs ? '// Patrimonio Colombiano' : '// Colombian Heritage'}
              </h2>
              
              {/* Título Monumental: Escalado para competir con el nuevo logo */}
              <h3 className="text-5xl sm:text-7xl md:text-9xl lg:text-[130px] font-black uppercase mb-10 tracking-tighter leading-[0.85] text-white">
                Muzo Star <br/> 
                <span className="text-white/30 italic font-light hover:text-white transition-all duration-1000 cursor-default">
                  Collection
                </span>
              </h3>
              
              <p className="text-zinc-400 text-lg md:text-2xl mb-14 max-w-2xl leading-relaxed font-medium">
                {isEs 
                  ? 'Descubra la perfección tallada por la naturaleza y certificada bajo los estándares de ingeniería del Nieto Laboratory.' 
                  : 'Discover perfection carved by nature and certified under the engineering standards of the Nieto Laboratory.'}
              </p>
              
              {/* Botones con mayor separación para balancear el nuevo aire */}
              <div className="flex flex-col sm:flex-row gap-6 md:gap-10">
                <MainButton 
                  text={isEs ? 'Ver Colección' : 'View Collection'} 
                  variant="white" 
                />
                <MainButton 
                  text={isEs ? 'Certificación GIA' : 'GIA Certification'} 
                  variant="emerald" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Decoración lateral técnica (SpaceX Style) - Ajustada al nuevo margen */}
        <div className="absolute right-12 md:right-24 bottom-24 hidden xl:block">
          <div className="flex flex-col gap-6 items-center">
            <span className="[writing-mode:vertical-lr] uppercase tracking-[0.6em] text-[11px] text-zinc-600 font-mono">
              Nieto Lab — 2026
            </span>
            <div className="w-[1px] h-24 bg-gradient-to-t from-emerald to-transparent" />
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: Footer Snap */}
      <section className="snap-start h-screen w-full flex flex-col justify-end bg-black">
        <Footer />
      </section>

    </div>
  );
}