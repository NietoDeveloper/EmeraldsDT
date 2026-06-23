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
