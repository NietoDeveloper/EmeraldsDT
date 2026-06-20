'use client';

import { use } from 'react';
import Link from 'next/link';

interface LandingPageProps {
  params: Promise<{ lang: string }>;
}

export default function LandingPage({ params }: LandingPageProps) {
  const { lang } = use(params);
  const isEs = lang === 'es';

  return (
    <main className="min-h-screen w-full bg-black text-white relative overflow-hidden selection:bg-emerald-500/30">
      {/* Luz ambiental esmeralda de fondo (Inspiración Aeroespacial) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-950/10 blur-[180px] rounded-full pointer-events-none z-0" />
      
      {/* HEADER / NAVBAR COMERCIAL */}
      <header className="w-full max-w-[1900px] mx-auto h-20 px-6 sm:px-12 flex items-center justify-between border-b border-white/5 relative z-10">
        <div className="flex items-center gap-2">
          <span className="font-black text-lg tracking-widest uppercase">EMERALD DT</span>
          <span className="text-[9px] font-mono text-emerald-500 tracking-widest">// CO</span>
        </div>

        {/* Menú de Navegación */}
        <nav className="flex items-center gap-6 sm:gap-8">
          <Link href={`/${lang}/products`} className="text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
            {isEs ? 'Productos' : 'Products'}
          </Link>
          
          {/* BOTÓN LOG IN ENLAZADO DINÁMICAMENTE DENTRO DEL MENU */}
          <Link 
            href={`/${lang}/auth`}
            className="border border-white/25 text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 font-mono text-[11px] px-5 py-2 tracking-widest uppercase"
          >
            {isEs ? 'INGRESAR' : 'LOG IN'}
          </Link>
        </nav>
      </header>

      {/* CONTENIDO PRINCIPAL (HERO STYLE SPACEX) */}
      <section className="w-full max-w-[1900px] mx-auto min-h-[calc(screen-20h)] px-6 sm:px-12 flex flex-col justify-center relative z-10 py-20">
        <div className="max-w-2xl space-y-6">
          <p className="text-xs font-mono tracking-[0.4em] text-emerald-500 uppercase animate-pulse">
            // {isEs ? 'Ecosistema de Activos de Alto Valor' : 'High-Value Asset Ecosystem'}
          </p>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none text-white">
            {isEs ? 'MINERÍA E INTEGRIDAD DIGITAL' : 'DIGITAL INTEGRITY & MINING'}
          </h1>
          <p className="text-zinc-400 font-mono text-sm tracking-wide leading-relaxed">
            {isEs 
              ? 'Arquitectura de software de clase mundial para la gestión, trazabilidad y control industrial de esmeraldas colombianas.' 
              : 'World-class software architecture for the management, traceability, and industrial control of Colombian emeralds.'}
          </p>
          <div className="pt-4">
            <Link 
              href={`/${lang}/products`}
              className="border border-emerald-500 text-emerald-400 bg-transparent hover:bg-emerald-500 hover:text-black transition-all duration-500 font-bold px-8 py-4 tracking-widest text-xs uppercase"
            >
              {isEs ? 'EXPLORAR CATÁLOGO' : 'EXPLORE CATALOG'}
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER DISCRETO */}
      <footer className="absolute bottom-4 left-6 sm:left-12 z-10 text-[9px] font-mono text-white/20 tracking-widest uppercase">
        EMERALD DT // ENTERPRISE MULTI-CLUSTER ARCHITECTURE
      </footer>
    </main>
  );
}