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
    <main className="relative min-h-screen w-full bg-black select-none overflow-x-hidden">
      
      </section>

      {/* SECCIÓN 3: Security & Footer Integrado */}
      <section className="min-h-[80vh] w-full flex flex-col justify-between bg-black pt-32">
        <div className="flex-grow flex items-center px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48">
            <div className="max-w-4xl">
                <h4 className="text-emerald text-xl md:text-3xl font-black uppercase tracking-widest mb-8">Maximum Security Architecture</h4>
                <p className="text-zinc-500 text-base md:text-xl leading-relaxed mb-6">
                    Absolute traceability for every high-value asset. Our double cluster infrastructure ensures your investment is backed by the highest standards of digital and physical security.
                </p>
                <div className="w-16 h-[1px] bg-emerald/50" />
            </div>
        </div>
        
        {/* Footer cargado al final de la página */}
        <Footer />
      </section>

    </main>
  );
}