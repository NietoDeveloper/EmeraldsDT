import { HeroSection } from '@/components/sections/HeroSection';

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;

  return (
    // 'h-screen overflow-y-auto' habilita el scroll-snap
    <main className="relative w-full bg-black h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
      
      {/* SECCIÓN 1: HERO */}
      <section className="snap-start h-screen shrink-0">
        <HeroSection />
      </section>

      {/* SECCIÓN 2: PRÓXIMO LANZAMIENTO */}
      <section className="snap-start h-screen shrink-0 flex items-center bg-black border-t border-white/5 relative overflow-hidden">
        {/* Sutil resplandor de fondo esmeralda */}
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-emerald/10 blur-[120px] rounded-full" />
        
        <div className="container mx-auto px-10 md:px-20 relative z-10">
          <div className="max-w-2xl animate-fade-in-up">
            <h2 className="text-emerald font-mono tracking-[0.3em] uppercase mb-6 text-sm">
              {lang === 'es' ? '// Próximo Lanzamiento' : '// Upcoming Release'}
            </h2>
            <h3 className="text-5xl md:text-7xl font-bold uppercase mb-8 tracking-tighter">
              Muzo Star <br/> Collection
            </h3>
            <p className="text-gray-400 text-xl mb-10 leading-relaxed font-light">
              {lang === 'es' 
                ? 'La pureza del cristal colombiano alcanza nuevas alturas. Una serie limitada de 12 piezas maestras certificadas bajo rigor científico.' 
                : 'The purity of Colombian crystal reaches new heights. A limited series of 12 masterpieces certified under scientific rigor.'}
            </p>
            <button className="group relative px-12 py-4 border border-white/30 overflow-hidden transition-all hover:border-emerald">
               <span className="relative z-10 uppercase font-bold tracking-widest text-sm">
                 {lang === 'es' ? 'Ver Detalles' : 'View Details'}
               </span>
               <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>



    </main>
  );
}