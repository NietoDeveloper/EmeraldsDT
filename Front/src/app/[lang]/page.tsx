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

      <section className="snap-start">
        <HeroSection />
      </section>

   
      <section className="snap-start min-h-screen flex items-center bg-black border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-xl animate-fade-in-up">

            <h3 className="text-4xl md:text-6xl font-bold uppercase mb-6">
      
            </h3>
            <p className="text-gray-400 text-lg mb-8">
              {lang === 'es' 
                ? 'La pureza del cristal colombiano alcanza nuevas alturas. Una serie limitada de 12 piezas maestras certificadas.' 
                : 'The purity of Colombian crystal reaches new heights. A limited series of 12 certified masterpieces.'}
            </p>
            <button className="px-12 py-4 border-2 border-white hover:bg-white hover:text-black transition-all duration-300 uppercase font-bold tracking-tighter">
              {lang === 'es' ? 'Ver Detalles' : 'View Details'}
            </button>
          </div>
        </div>
      </section>

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