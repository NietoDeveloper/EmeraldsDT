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




    </main>
  );
}