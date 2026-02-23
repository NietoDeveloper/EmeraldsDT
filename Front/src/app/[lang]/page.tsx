import { HeroSection } from '@/components/sections/HeroSection';
// Importa aquí las secciones adicionales a medida que las crees:
// import { LaunchSection } from '@/components/sections/LaunchSection';
// import { TechSection } from '@/components/sections/TechSection';

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

/**
 * Emerald DT - Home Page
 * Diseñada bajo el estándar Nieto Laboratory.
 * Implementa scroll-snap para una experiencia cinemática similar a SpaceX.
 */
export default async function HomePage({ params }: HomePageProps) {
  // En Next.js 15, los params de rutas dinámicas son promesas.
  const { lang } = await params;

  return (
    <main className="relative w-full bg-black">



    

      {/* SECCIÓN 3: TECNOLOGÍA (Nieto Lab Standards) */}
      <section className="snap-start min-h-screen bg-[url('/assets/images/tech-bg.jpg')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-6 md:px-12 h-full flex flex-col justify-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold uppercase mb-4">
            Nieto Lab <br /> <span className="text-gold">Engineering</span>
          </h2>
          <p className="max-w-md text-gray-300 mb-6">
            {lang === 'es'
              ? 'Arquitectura de seguridad máxima y trazabilidad blockchain para cada activo.'
              : 'Maximum security architecture and blockchain traceability for every asset.'}
          </p>
        </div>
      </section>

    </main>
  );
}