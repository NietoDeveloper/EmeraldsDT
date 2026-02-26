import { HeroSection } from '@/components/sections/HeroSection';
import Footer from '@/components/shared/Footer'; 
import { MainButton } from '@/components/ui/MainButton';

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

/**
 * Emerald DT - Home Orchestrator
 * Ajustado para Responsive 310px - 1900px+
 * Inspiración: SpaceX / Nieto Laboratory Standard
 */
export default async function Home({ params }: HomePageProps) {
  // Manejo seguro de params para evitar errores de hidratación/tokens
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const isEs = lang === 'es';

  return (
    
    </main>
  );
}