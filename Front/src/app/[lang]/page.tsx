import { HeroSection } from '@/components/sections/HeroSection';
import { MainButton } from '@/components/ui/MainButton';
import { Footer } from "@/components/shared/Footer"; // Importamos el Footer aquí

interface HomePageProps {
  params: Promise<{ lang: string }>;
}
  return (
    <main className="fixed inset-0 w-full bg-black snap-y snap-mandatory overflow-y-auto scrollbar-hide selection:bg-gold/30 z-0">
      
      {/* SECCIÓN 1: HERO */}
      <section className="snap-start h-screen w-full shrink-0">
        <HeroSection />
      </section>

      {/* SECCIONES DINÁMICAS DE LAS MINAS */}
              
              <div className="flex flex-col sm:flex-row gap-4">
                <MainButton 
                  text={isEs ? 'VER COLECCIÓN' : 'VIEW COLLECTION'} 
                  variant="gold" 
                  className="border-2 border-gold text-gold hover:bg-gold hover:text-black font-bold py-4 px-12 transition-all duration-500 tracking-widest text-[11px]"
                />
              </div>
            </div>
          </div>

          <div className="absolute right-8 md:right-16 bottom-32 hidden md:flex flex-col items-center gap-4 z-20">
            <span className="text-gold font-mono text-sm font-bold opacity-60">0{index + 2}</span>
            <div className="w-[1px] h-24 bg-gradient-to-b from-gold to-transparent opacity-30" />
          </div>
        </section>
      ))}

      {/* SECCIÓN FINAL: TECNOLOGÍA */}
      <section className="snap-start h-screen w-full bg-black relative flex items-center shrink-0 border-t border-white/5 overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-emerald-900/10 blur-[150px] rounded-full opacity-50" />
        <div className="container mx-auto px-6 sm:px-12 md:px-24 lg:px-32 max-w-[1900px] z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-bold uppercase mb-8 leading-tight text-white tracking-tighter">
                Nieto Lab <br /> <span className="text-gold italic font-extralight uppercase tracking-normal">Engineering</span>
              </h2>
              <div className="space-y-6 border-l border-emerald-500/50 pl-8">
                <p className="text-emerald-500/80 text-lg italic font-medium">"Building scalable systems with 100% discipline."</p>
                <p className="text-zinc-500 max-w-md text-sm md:text-base leading-relaxed">
                  {isEs ? 'Arquitectura de seguridad máxima y trazabilidad absoluta...' : 'Maximum security architecture and absolute traceability...'}
                </p>
              </div>
            </div>
            <div className="hidden md:block h-[350px] border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm relative group overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-white/5 font-mono text-[10px] uppercase tracking-[1.5em] rotate-90 whitespace-nowrap group-hover:text-white/20 transition-all duration-1000">
                Technical Specifications // Ciclo S+
              </div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-gold/40" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-gold/40" />
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN FOOTER: Para que sea parte del Snap Scroll */}
      <section className="snap-start w-full bg-black shrink-0">
        <Footer />
      </section>
    </main>
  );
}