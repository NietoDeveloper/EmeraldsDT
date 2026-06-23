import { HeroSection } from '@/components/sections/HeroSection';
import { MainButton } from '@/components/ui/MainButton';
import { Footer } from "@/components/shared/Footer";

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  // Sincronización asíncrona estricta de parámetros para Next.js 16
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const isEs = lang === 'es';

  const mines = [
    {
      id: 'muzo',
      name: 'Muzo',
      tag: 'The World Capital of Emeralds',
      tagEs: 'La Capital Mundial de las Esmeraldas',
      desc: 'Legendary for their deep "warm" green. The Muzo mines produce the most coveted gems on Earth, characterized by their incomparable saturation.',
      descEs: 'Legendarias por su verde profundo y "cálido". Las minas de Muzo producen las gemas más codiciadas de la Tierra, caracterizadas por su saturación incomparable.',
      image: '/img/Muzo1.2.png', 
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
