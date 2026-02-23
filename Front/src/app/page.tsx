import { HeroSection } from '@/components/sections/HeroSection';
// Intenta con la ruta completa o verifica que el archivo exista en src/components/
import Footer from '../components/Footer'; 

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export default async function Home({ params }: HomePageProps) {
  const { lang } = await params;
  const isEs = lang === 'es';

  return (
    <main className="relative w-full bg-black h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth select-none">
      
      {/* SECCIÓN 1: Hero Video */}
      <section className="snap-start h-screen w-full">
        <HeroSection />
      </section>

      {/* SECCIÓN 2: Preview de Colección */}
      <section className="snap-start h-screen w-full flex items-center bg-black border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-10 md:px-20 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-emerald-500 font-mono tracking-[0.4em] uppercase mb-6 text-sm">
              {isEs ? '// Patrimonio Colombiano' : '// Colombian Heritage'}
            </h2>
            <h3 className="text-5xl md:text-8xl font-bold uppercase mb-8 tracking-tighter leading-none text-white">
              Muzo Star <br/> <span className="text-white/50 italic">Collection</span>
            </h3>
            <p className="text-zinc-400 text-xl mb-12 max-w-xl leading-relaxed">
              {isEs 
                ? 'Descubra la perfección tallada por la naturaleza y certificada por el Nieto Laboratory.' 
                : 'Discover perfection carved by nature and certified by the Nieto Laboratory.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="px-12 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all duration-300">
                {isEs ? 'Ver Colección' : 'View Collection'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: Footer Snap */}
      <section className="snap-start h-screen w-full flex flex-col justify-end bg-black">
        <Footer />
      </section>

    </main>
  );
}