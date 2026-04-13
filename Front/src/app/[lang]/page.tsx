import { HeroSection } from '@/components/sections/HeroSection';
import { MainButton } from '@/components/ui/MainButton';

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
      desc: 'Legendary for their deep "warm" green. The Muzo mines produce the most coveted gems on Earth.',
      descEs: 'Legendarias por su verde profundo y "cálido". Las minas de Muzo producen las gemas más codiciadas de la Tierra.',
      image: '/assets/img/Muzo1.png',
    },
    {
      id: 'chivor',
      name: 'Chivor',
      tag: 'Vibrancy and Blue Undertones',
      tagEs: 'Vibrancia y Tonos Azulados',
      desc: 'Famous for their crystalline purity and unique bluish-green fire.',
      descEs: 'Famosas por su pureza cristalina y su fuego verde-azulado único.',
      image: '/assets/img/Chivor4.png',
    },
    {
      id: 'coscuez',
      name: 'Coscuez',
      tag: 'Geometry and Brilliance',
      tagEs: 'Geometría y Brillo',
      desc: 'Known for exceptional brilliance and a slightly yellowish-green tint.',
      descEs: 'Conocidas por producir gemas con un brillo excepcional y un tinte verde-amarillento.',
      image: '/assets/img/Coscuez2.png',
    }
  ];

  return (
    /* Eliminamos cualquier margen que pueda interferir con el snap */
    <main className="relative w-full bg-black snap-y snap-mandatory h-screen overflow-y-auto scrollbar-hide">
      
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
          {/* Fondo: Optimizado con overlay de contraste */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-black/20 z-0" /> 
            <div 
              className="w-full h-full bg-cover bg-center transition-transform duration-[3000ms] ease-out hover:scale-110"
              style={{ backgroundImage: `url('${mine.image}')` }}
            />
          </div>

          <div className="w-full px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 relative z-20 max-w-[1900px] mx-auto">
            <div className="animate-fade-in-up">
              <h2 className="text-emerald-500 font-mono tracking-[0.4em] uppercase mb-4 text-[10px] md:text-xs font-bold opacity-90">
                {isEs ? `// Origen: Boyacá, Colombia` : `// Origin: Boyacá, Colombia`}
              </h2>
              <h3 className="text-5xl md:text-8xl font-black uppercase mb-6 tracking-tighter text-white leading-[0.85]">
                {mine.name} <br/>
                <span className="text-gold italic font-light text-2xl md:text-4xl block mt-4 tracking-normal">
                  {isEs ? mine.tagEs : mine.tag}
                </span>
              </h3>
              <p className="text-zinc-300 text-sm md:text-lg mb-10 max-w-xl opacity-80 leading-relaxed">
                {isEs ? mine.descEs : mine.desc}
              </p>
              <MainButton 
                text={isEs ? 'VER COLECCIÓN' : 'VIEW COLLECTION'} 
                variant="gold" 
                className="border-2 border-gold text-gold hover:bg-gold hover:text-black font-bold py-4 px-12 transition-all duration-500 tracking-widest"
              />
            </div>
          </div>

          {/* Indicador Numérico Lateral */}
          <div className="absolute right-8 md:right-16 bottom-32 hidden md:flex flex-col items-center gap-4 z-20">
            <span className="text-gold font-mono text-sm font-bold">0{index + 2}</span>
            <div className="w-[1px] h-24 bg-gradient-to-b from-gold to-transparent opacity-40" />
          </div>
        </section>
      ))}

      {/* SECCIÓN: TECNOLOGÍA (Nieto Lab) */}
      <section className="snap-start h-screen w-full bg-black relative flex items-center shrink-0 border-t border-white/5 overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-emerald-900/10 blur-[150px] rounded-full" />
        
        <div className="container mx-auto px-6 sm:px-12 md:px-24 lg:px-32 max-w-[1900px] z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-bold uppercase mb-8 leading-tight text-white tracking-tighter">
                Nieto Lab <br /> <span className="text-gold italic font-extralight uppercase tracking-normal">Engineering</span>
              </h2>
              <div className="space-y-6 border-l border-emerald-500/50 pl-8">
                <p className="text-emerald-500/80 text-lg italic font-medium">
                  "Building scalable systems with 100% discipline."
                </p>
                <p className="text-zinc-500 max-w-md text-sm md:text-base leading-relaxed">
                  {isEs
                    ? 'Arquitectura de seguridad máxima y trazabilidad absoluta para cada activo de alto valor en la cadena de suministros.'
                    : 'Maximum security architecture and absolute traceability for every high-value asset in the supply chain.'}
                </p>
              </div>
            </div>
            
            <div className="hidden md:block h-[350px] border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm relative group">
              <div className="absolute inset-0 flex items-center justify-center text-white/5 font-mono text-[10px] uppercase tracking-[1.5em] rotate-90 whitespace-nowrap group-hover:text-white/20 transition-colors duration-700">
                Technical Specifications // 2026
              </div>
              {/* Decoración geométrica mínima */}
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-gold/30" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-gold/30" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}