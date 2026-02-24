import { HeroSection } from '@/components/sections/HeroSection';
import Footer from '@/components/shared/Footer'; 
import { MainButton } from '@/components/ui/MainButton';

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

/**
 * Emerald DT - Home Orchestrator
 * Arquitectura de secciones optimizada para el Nieto Laboratory.
 * Responsive garantizado: 310px - 1900px.
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
        
        {/* Contenedor con Padding Responsivo Sincronizado con Navbar */}
        <div className="w-full px-8 sm:px-12 md:px-20 lg:px-24 xl:px-32 uw:px-48 relative z-10">
          <div className="max-w-[1900px] mx-auto">
            <div className="max-w-4xl transition-all duration-1000">
              
              {/* Tag técnico con hover gold */}
              <h2 className="text-emerald font-mono tracking-[0.4em] uppercase mb-6 text-[10px] md:text-sm hover:text-gold transition-colors cursor-default inline-block">
                {isEs ? '// Patrimonio Colombiano' : '// Colombian Heritage'}
              </h2>
              
              {/* Título Monumental Responsive */}
              <h3 className="text-4xl sm:text-6xl md:text-8xl lg:text-[110px] font-black uppercase mb-8 tracking-tighter leading-[0.9] text-white">
                Muzo Star <br/> 
                <span className="text-white/40 italic font-light hover:text-white transition-all duration-700 cursor-default">
                  Collection
                </span>
              </h3>
              
              <p className="text-zinc-400 text-base md:text-xl mb-12 max-w-xl leading-relaxed font-medium">
                {isEs 
                  ? 'Descubra la perfección tallada por la naturaleza y certificada bajo los estándares de ingeniería del Nieto Laboratory.' 
                  : 'Discover perfection carved by nature and certified under the engineering standards of the Nieto Laboratory.'}
              </p>
              
              {/* Botones con lógica MainButton */}
              <div className="flex flex-col sm:flex-row gap-5 md:gap-8">
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

        {/* Decoración lateral técnica (SpaceX Style) */}
        <div className="absolute right-10 bottom-20 hidden xl:block">
          <div className="flex flex-col gap-4 items-center">
            <span className="[writing-mode:vertical-lr] uppercase tracking-[0.5em] text-[10px] text-zinc-600 font-mono">
              Nieto Lab — 2026
            </span>
            <div className="w-[1px] h-20 bg-gradient-to-t from-emerald to-transparent" />
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