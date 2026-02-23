import { HeroSection } from '@/components/sections/HeroSection';

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

/**
 * Emerald DT - Orquestador de la Home
 * Aquí se apilan las secciones snap-start para el efecto SpaceX.
 */
export default async function Home({ params }: HomePageProps) {
  const { lang } = await params;

  return (
    // El contenedor principal maneja el scroll magnético
    <main className="relative w-full bg-black h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
      
      {/* SECCIÓN 1: El video 4K con sonido y CTA principal */}
      <section className="snap-start h-screen w-full">
        <HeroSection />
      </section>

      {/* SECCIÓN 2: Preview de Colección / Próximo Drop */}
      <section className="snap-start h-screen w-full flex items-center bg-black border-t border-white/5 relative overflow-hidden">
        {/* Resplandor Esmeralda de fondo para profundidad */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald/10 blur-[120px] rounded-full" />
        
        <div className="container mx-auto px-10 md:px-20 relative z-10">
          <div className="max-w-3xl animate-fade-in-up">
            <h2 className="text-emerald font-mono tracking-[0.4em] uppercase mb-6 text-sm">
              {lang === 'es' ? '// Patrimonio Colombiano' : '// Colombian Heritage'}
            </h2>
            <h3 className="text-5xl md:text-8xl font-bold uppercase mb-8 tracking-tighter leading-none">
              Muzo Star <br/> <span className="text-white/50 italic">Collection</span>
            </h3>
            <p className="text-zinc-400 text-xl mb-12 max-w-xl leading-relaxed">
              {lang === 'es' 
                ? 'Descubra la perfección tallada por la naturaleza y certificada por los estándares más rigurosos del Nieto Laboratory.' 
                : 'Discover perfection carved by nature and certified by the most rigorous standards of the Nieto Laboratory.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="px-12 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-emerald hover:text-white transition-all duration-300">
                {lang === 'es' ? 'Ver Colección' : 'View Collection'}
              </button>
              <button className="px-12 py-4 border border-white/20 font-bold uppercase tracking-widest hover:bg-white/10 transition-all duration-300">
                {lang === 'es' ? 'Certificación GIA' : 'GIA Certification'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: Footer Técnico / Contacto */}
      <section className="snap-start h-[40vh] w-full bg-zinc-950 flex flex-col justify-between p-10 border-t border-white/10">
        <div className="flex justify-between items-start">
          <span className="font-bold tracking-tighter text-2xl">EMERALD DT</span>
          <nav className="flex gap-8 text-xs uppercase tracking-widest text-zinc-500">
            <a href="#" className="hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-gold transition-colors">Lab Specs</a>
            <a href="#" className="hover:text-gold transition-colors">Twitter</a>
          </nav>
        </div>
        <div className="text-[10px] text-zinc-600 uppercase tracking-[0.5em] text-center">
          © 2026 Nieto Laboratory - Building the future of assets.
        </div>
      </section>

    </main>
  );
}