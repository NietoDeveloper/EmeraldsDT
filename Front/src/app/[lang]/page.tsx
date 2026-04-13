import { HeroSection } from '@/components/sections/HeroSection';
import { MainButton } from '@/components/ui/MainButton';
import { Footer } from "@/components/shared/Footer"; // Importamos el Footer aquí

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  const isEs = lang === 'es';

  const mines = [
    {
      id: 'muzo',
      name: 'Muzo',
      tag: 'The World Capital of Emeralds',
      tagEs: 'La Capital Mundial de las Esmeraldas',
      desc: 'Legendary for their deep "warm" green. The Muzo mines produce the most coveted gems on Earth, characterized by their incomparable saturation.',
      descEs: 'Legendarias por su verde profundo y "cálido". Las minas de Muzo producen las gemas más codiciadas de la Tierra, caracterizadas por su saturación incomparable.',
      // CORRECCIÓN: Se elimina '/public' y se usa el path directo
      image: '/img/Muzo1.png', 
    },
    {
      id: 'chivor',
      name: 'Chivor',
      tag: 'Vibrancy and Blue Undertones',
      tagEs: 'Vibrancia y Tonos Azulados',
      desc: 'Nested in the steep mountains of Boyacá, Chivor emeralds are famous for their crystalline purity and unique bluish-green fire.',
      descEs: 'Enclavadas en las escarpadas montañas de Boyacá, las esmeraldas de Chivor son famosas por su pureza cristalina y su fuego verde-azulado único.',
      image: '/img/Chivor4.png',
    },
    {
      id: 'coscuez',
      name: 'Coscuez',
      tag: 'Geometry and Brilliance',
      tagEs: 'Geometría y Brillo',
      desc: 'Known for producing gems with exceptional brilliance and a slightly yellowish-green tint that captures the sunlight of the Colombian Andes.',
      descEs: 'Conocidas por producir gemas con un brillo excepcional y un tinte verde-amarillento que captura la luz del sol de los Andes colombianos.',
      image: '/img/Coscuez2.png',
    }
  ];

  return (
    <main className="fixed inset-0 w-full bg-black snap-y snap-mandatory overflow-y-auto scrollbar-hide selection:bg-gold/30 z-0">
      
      {/* SECCIÓN 1: HERO */}
      <section className="snap-start h-screen w-full shrink-0">
        <HeroSection />
      </section>

      {/* SECCIONES DINÁMICAS DE LAS MINAS */}
      {mines.map((mine, index) => (
        <section 
          key={mine.id}
          className="snap-start h-screen w-full flex items-end pb-20 md:pb-32 overflow-hidden relative border-t border-white/5 shrink-0"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-black/10 z-0" /> 
            <div 
              className="w-full h-full bg-cover bg-center transition-transform duration-[4000ms] ease-out hover:scale-110"
              style={{ backgroundImage: `url('${mine.image}')` }}
            />
          </div>

          <div className="w-full px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 relative z-20 max-w-[1900px] mx-auto">
            <div className="animate-fade-in-up duration-1000">
              <h2 className="text-emerald-500 font-mono tracking-[0.4em] uppercase mb-4 text-[10px] md:text-xs font-bold opacity-90">
                {isEs ? `// Origen: Boyacá, Colombia` : `// Origin: Boyacá, Colombia`}
              </h2>
              
              <h3 className="text-5xl md:text-8xl font-black uppercase mb-6 tracking-tighter text-white leading-[0.85]">
                {mine.name} <br/>
                <span className="text-gold italic font-light text-2xl md:text-4xl block mt-4 tracking-normal normal-case">
                  {isEs ? mine.tagEs : mine.tag}
                </span>
              </h3>
              
              <p className="text-zinc-300 text-sm md:text-lg mb-10 max-w-xl opacity-80 leading-relaxed font-medium">
                {isEs ? mine.descEs : mine.desc}
              </p>
              
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