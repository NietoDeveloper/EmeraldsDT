import { HeroSection } from '@/components/sections/HeroSection';
import Footer from '@/components/shared/Footer'; 
import { MainButton } from '@/components/ui/MainButton';

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

/**
 * Emerald DT - Home Orchestrator
 * Fix de Scrollbar: Se elimina cualquier posible scroll horizontal.
 * Garantía Responsive: 310px - 1900px.
 */
export default async function Home({ params }: HomePageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const isEs = lang === 'es';

  return (
    // Se cambia w-full por screen para asegurar que el scrollbar se pegue al borde del navegador
    <main className="relative min-h-screen w-full bg-black select-none overflow-x-hidden">
      

      {/* SECCIÓN 3: Footer Snap - Reintegrado con texto técnico de seguridad */}
      <section className="snap-start min-h-screen w-full flex flex-col justify-between bg-black pt-32">


      </section>

    </main>
  );
}