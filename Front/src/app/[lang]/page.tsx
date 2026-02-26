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

      </section>



    </main>
  );
}