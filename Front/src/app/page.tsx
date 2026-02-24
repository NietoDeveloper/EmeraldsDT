import { HeroSection } from '@/components/sections/HeroSection';
import Footer from '@/components/shared/Footer'; 
import { MainButton } from '@/components/ui/MainButton';

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export default async function Home({ params }: HomePageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const isEs = lang === 'es';

  return (
    // "w-full" sin márgenes laterales externos previene que el scrollbar se mueva
    <main className="relative w-full bg-black select-none overflow-x-hidden">
      
      {/* SECCIÓN 1: Hero Video */}
      <section className="snap-start h-screen w-full relative overflow-hidden">
        <HeroSection />
      </section>

      {/* SECCIÓN 2: Muzo Star Collection */}
      <section className="snap-start h-screen w-full flex items-center bg-black border-t border-emerald/10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[700px] h-[300px] md:h-[700px] bg-emerald/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="w-full px-12 sm:px-24 md:px-32 lg:px-40 xl:px-56 uw:px-72 relative z-10">
          <div className="max-w-[2200px] mx-auto">
            <div className="max-w-5xl">
              <h2 className="text-emerald font-mono tracking-[0.8em] uppercase mb-8 text-[10px] md:text-xs">
                {isEs ? '// Próximo Lanzamiento' : '// Upcoming Release'}
              </h2>
              
              <h3 className="text-5xl sm:text-7xl md:text-9xl lg:text-[130px] font-black uppercase mb-10 tracking-tighter leading-[0.85] text-white">
                Muzo Star <br/> 
                <span className="text-white/30 italic font-light hover:text-white transition-all duration-1000">
                  Collection
                </span>
              </h3>
              
              <p className="text-zinc-400 text-lg md:text-2xl mb-14 max-w-2xl leading-relaxed">
                {isEs 
                  ? 'La pureza del cristal colombiano alcanza nuevas alturas. Una serie limitada de 12 obras maestras certificadas bajo el rigor científico del Nieto Laboratory.' 
                  : 'The purity of Colombian crystal reaches new heights. A limited series of 12 masterpieces certified under the scientific rigor of the Nieto Laboratory.'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 md:gap-10 items-start sm:items-center">
                <MainButton text={isEs ? 'Ver Detalles' : 'View Details'} variant="white" />
                <div className="flex flex-col border-l border-emerald/30 pl-6">
                    <span className="text-gold font-black uppercase tracking-widest text-xs">Nieto Lab Engineering</span>
                    <span className="text-zinc-500 text-[10px] italic">"Building scalable systems with 100% discipline."</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: Footer Snap - Reintegrado con texto técnico */}
      <section className="snap-start min-h-screen w-full flex flex-col justify-between bg-black pt-20">
        <div className="flex-grow flex items-center px-12 sm:px-24 md:px-32 lg:px-40 xl:px-56 uw:px-72">
            <div className="max-w-4xl">
                <h4 className="text-emerald text-xl md:text-3xl font-black uppercase tracking-widest mb-6">Maximum Security Architecture</h4>
                <p className="text-zinc-500 text-lg md:text-xl leading-relaxed">
                    Absolute traceability for every high-value asset. Our double cluster infrastructure ensures your investment is backed by the highest standards of digital and physical security.
                </p>
            </div>
        </div>
        
        {/* FOOTER FINAL */}
        <Footer />
      </section>

    </main>
  );
}