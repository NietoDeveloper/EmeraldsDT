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

      </section>


    </main>
  );
}