import { HeroSection } from '@/components/sections/HeroSection';
import { MainButton } from '@/components/ui/MainButton';

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export default async function Home({ params }: HomePageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const isEs = lang === 'es';

  // Configuración de las Minas de Boyacá
  const mines = [
    {
      id: 'muzo',
      name: 'Muzo',
      tag: 'The World Capital of Emeralds',
      tagEs: 'La Capital Mundial de las Esmeraldas',
      desc: 'Legendary for their deep "warm" green. The Muzo mines produce the most coveted gems on Earth, characterized by their incomparable saturation.',
      descEs: 'Legendarias por su verde profundo y "cálido". Las minas de Muzo producen las gemas más codiciadas de la Tierra, caracterizadas por su saturación incomparable.',
      image: '/assets/img/Muzo1.2.png', // Reemplazar con video/foto real
    },
    {
      id: 'chivor',
      name: 'Chivor',
      tag: 'Vibrancy and Blue Undertones',
      tagEs: 'Vibrancia y Tonos Azulados',
      desc: 'Nested in the steep mountains of Boyacá, Chivor emeralds are famous for their crystalline purity and unique bluish-green fire.',
      descEs: 'Enclavadas en las escarpadas montañas de Boyacá, las esmeraldas de Chivor son famosas por su pureza cristalina y su fuego verde-azulado único.',
      image: '/assets/img/mines/chivor-bg.jpg',
    },
    {
      id: 'coscuez',
      name: 'Coscuez',
      tag: 'Geometry and Brilliance',
      tagEs: 'Geometría y Brillo',
      desc: 'Known for producing gems with exceptional brilliance and a slightly yellowish-green tint that captures the sunlight of the Colombian Andes.',
      descEs: 'Conocidas por producir gemas con un brillo excepcional y un tinte verde-amarillento que captura la luz del sol de los Andes colombianos.',
      image: '/assets/img/mines/coscuez-bg.jpg',
    }
  ];

  return (
    <div className="relative w-full bg-black select-none">
      
      {/* SECCIÓN 1: Hero Video (SpaceX Style) */}
      <section className="relative w-full h-[100dvh]">
        <HeroSection />
      </section>

      {/* SECCIONES DE LAS MINAS (Iteración Dinámica) */}
      {mines.map((mine, index) => (
        <section 
          key={mine.id}
          className="relative w-full h-[100dvh] flex items-end pb-24 md:pb-32 overflow-hidden border-t border-white/5"
        >
          {/* Fondo: Video o Imagen High-End (Tipo SpaceX) */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
            {/* Aquí puedes alternar entre <video> y <Image> según el asset */}
            <div 
              className="w-full h-full bg-cover bg-center transition-transform duration-[2000ms] hover:scale-105"
              style={{ backgroundImage: `url(${mine.image})` }}
            />
          </div>

          <div className="w-full px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 relative z-20">
            <div className="max-w-[1900px] mx-auto">
              <div className="max-w-4xl animate-fade-in-up">
                
                <h2 className="text-emerald font-mono tracking-[0.4em] md:tracking-[0.6em] uppercase mb-4 text-[10px] md:text-xs font-bold">
                  {isEs ? `// Origen: Boyacá, Colombia` : `// Origin: Boyacá, Colombia`}
                </h2>
                
                <h3 className="text-5xl sm:text-7xl md:text-8xl lg:text-[120px] font-black uppercase mb-6 tracking-tighter leading-none text-white">
                  {mine.name} <br/> 
                  <span className="text-gold italic font-light text-3xl sm:text-4xl md:text-5xl tracking-normal block mt-2">
                    {isEs ? mine.tagEs : mine.tag}
                  </span>
                </h3>
                
                <p className="text-zinc-300 text-sm md:text-lg lg:text-xl mb-10 max-w-xl leading-relaxed font-medium opacity-80">
                  {isEs ? mine.descEs : mine.desc}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6">
                  <MainButton 
                    text={isEs ? 'VER COLECCIÓN' : 'VIEW COLLECTION'} 
                    variant="gold" 
                    className="border-2 border-gold text-gold hover:bg-gold hover:text-black tracking-[0.2em] text-[11px] font-bold py-4 px-12 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Indicador Numérico Lateral (SpaceX Style) */}
          <div className="absolute right-8 md:right-16 bottom-32 hidden md:flex flex-col items-center gap-4">
            <span className="text-gold font-mono text-sm font-bold">0{index + 1}</span>
            <div className="w-[1px] h-24 bg-gradient-to-b from-gold to-transparent opacity-30" />
          </div>
        </section>
      ))}

      {/* SECCIÓN FINAL: Pureza del Producto */}
      <section className="relative w-full py-32 bg-black flex flex-col items-center text-center px-6 border-t border-white/5">
        <div className="max-w-3xl">
          <h4 className="text-emerald text-[10px] tracking-[0.5em] uppercase font-bold mb-8">Earth's Natural Art</h4>
          <p className="text-zinc-400 text-lg md:text-2xl font-light leading-relaxed mb-12 italic">
            "Each emerald is a unique fragment of Colombia's soul, formed over 65 million years ago in the depths of Boyacá's mountains."
          </p>
          <div className="w-12 h-[1px] bg-gold mx-auto" />
        </div>
      </section>

    </div>
  );
}