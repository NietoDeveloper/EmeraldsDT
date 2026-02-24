import { HeroSection } from '@/components/sections/HeroSection';
// Ajustado: Importación desde la carpeta shared confirmada
import Footer from '@/components/shared/Footer'; 

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

/**
 * Emerald DT - Home Orchestrator
 * Arquitectura de secciones snap-start optimizada para el Nieto Laboratory.
 */
export default async function Home({ params }: HomePageProps) {
  // Resolvemos la promesa de params para evitar el ReferenceError en Next.js 15+
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en'; // Fallback por seguridad
  const isEs = lang === 'es';

  return (
    <main className="relative w-full bg-black h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth select-none">
      
      {/* SECCIÓN 1: Hero Video (Estilo SpaceX) */}
      <section className="snap-start h-screen w-full">
        <HeroSection />
      </section>

      {/* SECCIÓN 2: Preview de Colección / Heritage */}
      <section className="snap-start h-screen w-full flex items-center bg-black border-t border-white/5 relative overflow-hidden">
        {/* Resplandor Esmeralda ambiental para profundidad visual */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-10 md:px-20 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-emerald-500 font-mono tracking-[0.4em] uppercase mb-6 text-sm">
              {isEs ? '// Patrimonio Colombiano' : '// Colombian Heritage'}
            </h2>

            <p className="text-zinc-400 text-xl mb-12 max-w-xl leading-relaxed">
              {isEs 
                ? 'Descubra la perfección tallada por la naturaleza y certificada por el Nieto Laboratory.' 
                : 'Discover perfection carved by nature and certified by the Nieto Laboratory.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">

            </div>
          </div>
        </div>
      </section>


    </main>
  );
}