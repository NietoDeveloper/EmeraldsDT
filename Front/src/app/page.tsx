"use client";

import { HeroSection } from '@/components/sections/HeroSection';
import { MainButton } from '@/components/ui/MainButton';
import Image from 'next/image';
import Link from 'next/link';

// Los parámetros en Client Components se manejan vía props directamente o hooks
interface HomePageProps {
  params: { lang: string };
}

export default function Home({ params }: HomePageProps) {
  const lang = params?.lang || 'en';
  const isEs = lang === 'es';

  const mines = [
    {
      id: 'muzo',
      name: 'Muzo',
      tag: 'The World Capital of Emeralds',
      tagEs: 'La Capital Mundial de las Esmeraldas',
      desc: 'Legendary for their deep "warm" green. The Muzo mines produce the most coveted gems on Earth.',
      descEs: 'Legendarias por su verde profundo y "cálido". Las minas de Muzo producen las gemas más codiciadas.',
      image: '/assets/img/Muzo1.2.png',
      href: '/catalog?mine=muzo'
    },
    {
      id: 'chivor',
      name: 'Chivor',
      tag: 'Vibrancy and Blue Undertones',
      tagEs: 'Vibrancia y Tonos Azulados',
      desc: 'Famous for their crystalline purity and unique bluish-green fire.',
      descEs: 'Famosas por su pureza cristalina y su fuego verde-azulado único.',
      image: '/assets/img/Chivor4.png',
      href: '/catalog?mine=chivor'
    },
    {
      id: 'coscuez',
      name: 'Coscuez',
      tag: 'Geometry and Brilliance',
      tagEs: 'Geometría y Brillo',
      desc: 'Known for producing gems with exceptional brilliance and a slightly yellowish-green tint.',
      descEs: 'Conocidas por producir gemas con un brillo excepcional y un tinte verde-amarillento.',
      image: '/assets/img/Coscuez2.png',
      href: '/catalog?mine=coscuez'
    }
  ];

  return (
    <div className="relative w-full bg-black select-none">
      
      {/* SECCIÓN 1: Hero Section */}
      <section className="relative w-full h-[100dvh]">
        <HeroSection />
      </section>

      {/* SECCIONES DE LAS MINAS */}
      {mines.map((mine, index) => (
        <section 
          key={mine.id}
          className="relative w-full h-[100dvh] flex items-end pb-24 md:pb-32 overflow-hidden border-t border-white/5"
        >
          {/* Background Layer: Optimización con Next Image */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
            <Image 
              src={mine.image}
              alt={mine.name}
              fill
              priority={index === 0}
              className="object-cover transition-transform duration-[3000ms] scale-105 hover:scale-100"
            />
          </div>

          <div className="w-full px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 relative z-20">
            <div className="max-w-[1900px] mx-auto">
              <div className="max-w-4xl opacity-0 animate-[fade-in-up_1s_ease-out_forwards]">
                
                <h2 className="text-emerald-500 font-mono tracking-[0.5em] uppercase mb-4 text-[10px] md:text-xs font-bold">
                  {isEs ? `// Origen: Boyacá, Colombia` : `// Origin: Boyacá, Colombia`}
                </h2>
                
                <h3 className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-black uppercase mb-6 tracking-tighter leading-none text-white">
                  {mine.name} <br/> 
                  <span className="text-gold-500 italic font-light text-2xl sm:text-4xl md:text-5xl tracking-normal block mt-2">
                    {isEs ? mine.tagEs : mine.tag}
                  </span>
                </h3>
                
                <p className="text-zinc-300 text-sm md:text-lg lg:text-xl mb-10 max-w-xl leading-relaxed font-medium opacity-80">
                  {isEs ? mine.descEs : mine.desc}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Navegación SPA sin recarga de página */}
                  <Link href={mine.href} className="w-fit">
                    <MainButton 
                      text={isEs ? 'VER COLECCIÓN' : 'VIEW COLLECTION'} 
                      variant="gold" 
                      className="border-2 border-gold text-gold hover:bg-gold hover:text-black tracking-[0.2em] text-[11px] font-bold py-4 px-12 transition-all duration-300 uppercase"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Indicador Numérico lateral estilo SpaceX */}
          <div className="absolute right-8 md:right-16 bottom-32 hidden md:flex flex-col items-center gap-4">
            <span className="text-gold font-mono text-sm font-bold opacity-60">0{index + 1}</span>
            <div className="w-[1px] h-24 bg-gradient-to-b from-gold to-transparent opacity-30" />
          </div>
        </section>
      ))}

      {/* SECCIÓN FINAL */}
      <section className="relative w-full py-40 bg-black flex flex-col items-center text-center px-6 border-t border-white/5">
        <div className="max-w-3xl">
          <h4 className="text-emerald-500 text-[10px] tracking-[0.6em] uppercase font-bold mb-8">Earth&apos;s Natural Art</h4>
          <p className="text-zinc-400 text-lg md:text-2xl font-light leading-relaxed mb-12 italic">
            &quot;Each emerald is a unique fragment of Colombia&apos;s soul, formed over 65 million years ago in the depths of Boyacá&apos;s mountains.&quot;
          </p>
          <div className="w-16 h-[1px] bg-gold/50 mx-auto" />
        </div>
      </section>
    </div>
  );
}