import Link from 'next/link';
import { notFound } from 'next/navigation';
import { apiClient, Product } from '@/lib/apiClient';

interface CollectionPageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ mine?: string }>;
}

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const { lang } = await params;
  const { mine } = await searchParams;
  const isEs = lang === 'es';

  if (lang !== 'en' && lang !== 'es') notFound();

  let products: Product[] = [];
  let isMocked = false;

  try {
    // Apunta al endpoint de productos. El apiClient L5 interceptará si el Back está apagado
    const response = await apiClient.get<Product[]>('/products');
    
    // Filtrado opcional por origen (mina) si viene por searchParams
    if (response && Array.isArray(response)) {
      products = mine 
        ? response.filter((p) => p.origin.toLowerCase() === mine.toLowerCase())
        : response;
    }
  } catch (error) {
    // Si la llamada falla radicalmente y no hay mocks, evitamos la caída con un array vacío
    products = [];
  }

  const mineNames = {
    muzo: 'Muzo (Deep Green Capital)',
    chivor: 'Chivor (Blue Fire)',
    coscuez: 'Coscuez (Imperial Andean Sun)',
    gachala: 'Gachalá (Exotic Glow)'
  };

  return (
    <main className="min-h-screen w-full bg-black text-white px-4 sm:px-8 md:px-12 lg:px-20 py-32 selection:bg-gold/30 relative overflow-x-hidden">
      {/* Malla de Ingeniería de Fondo de Alta Densidad */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] pointer-events-none z-0" />
      
      {/* Contenedor Fluido Estricto: 310px -> 1900px */}
      <div className="max-w-[1900px] mx-auto relative z-10 w-full min-w-[278px]">
        
        {/* ENCABEZADO MINIMALISTA ESTILO SPACEX */}
        <header className="border-b border-white/10 pb-6 mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 animate-pulse rounded-full" />
              <p className="text-[9px] font-mono text-emerald-500 tracking-[0.3em] uppercase font-bold">
                {isEs ? '// SATELLITE LIVE INVENTORY CONTROL' : '// CONTROL DE INVENTARIO SATELITAL EN VIVO'}
              </p>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter text-white font-mono">
              {mine ? `${isEs ? 'MINA' : 'MINE'}: ${mineNames[mine as keyof typeof mineNames] || mine}` : (isEs ? 'JOYAS EN STOCK' : 'AVAILABLE STOCK')}
            </h1>
          </div>

          {/* Filtros de URL Nativos Rápidos */}
          <div className="flex flex-wrap gap-2 font-mono text-[9px] tracking-widest font-bold">
            <Link 
              href={`/${lang}/collections`}
              className={`px-4 py-2 border transition-all duration-300 ${!mine ? 'border-gold text-gold bg-gold/5' : 'border-white/10 text-zinc-400 hover:border-gold hover:text-gold'}`}
            >
              {isEs ? 'TODOS' : 'ALL'}
            </Link>
            {(['muzo', 'chivor', 'coscuez'] as const).map((m) => (
              <Link
                key={m}
                href={`/${lang}/collections?mine=${m}`}
                className={`px-4 py-2 border uppercase transition-all duration-300 ${mine === m ? 'border-gold text-gold bg-gold/5' : 'border-white/10 text-zinc-400 hover:border-gold hover:text-gold'}`}
              >
                {m}
              </Link>
            ))}
          </div>
        </header>

        {/* EXCEPCIÓN: PRODUCTOS VACÍOS */}
        {products.length === 0 && (
          <div className="border border-white/10 bg-zinc-950/40 p-8 font-mono text-[11px] text-zinc-500 tracking-wide max-w-md">
            {isEs ? '// Cero unidades disponibles para este origen en este ciclo.' : '// Zero available items for this source in this current cycle.'}
          </div>
        )}

        {/* GRILLA INDUSTRIAL RESPONSIVA ESTRICTA (310px a 1900px) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {products.map((gem) => (
            <article 
              key={gem.id} 
              className="group flex flex-col border border-white/5 bg-zinc-950/20 backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/20"

  );
}