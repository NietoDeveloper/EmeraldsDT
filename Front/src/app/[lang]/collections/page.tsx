import Link from 'next/link';
import { notFound } from 'next/navigation';
import { apiClient } from '@/lib/apiClient';

interface EmeraldProduct {
  _id: string;
  name: string;
  mine: 'muzo' | 'chivor' | 'coscuez';
  carats: number;
  price: number;
  status: 'AVAILABLE' | 'SOLD' | 'RESERVED';
  images: string[];
  clarity: string;
  cut: string;
  serialNumber: string;
}

interface CollectionPageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ mine?: string }>;
}

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const { lang } = await params;
  const { mine } = await searchParams;
  const isEs = lang === 'es';

  if (lang !== 'en' && lang !== 'es') notFound();

  let products: EmeraldProduct[] = [];
  let connectionError = false;

  try {
    const endpoint = mine ? `/products?mine=${mine}` : '/products';
    const response = await apiClient.get<EmeraldProduct[]>(endpoint);
    products = (response || []).filter((p) => p.status === 'AVAILABLE');
  } catch (error) {
    connectionError = true;
  }

  const mineNames = {
    muzo: 'Muzo (Capital)',
    chivor: 'Chivor (Blue Fire)',
    coscuez: 'Coscuez (Andean Sun)',
  };

  return (
    <main className="min-h-screen w-full bg-black text-white px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-24 selection:bg-gold/30 relative overflow-x-hidden">
      {/* Malla de Ingeniería de Fondo de Alta Densidad */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] pointer-events-none z-0" />
      
      {/* Contenedor Fluido Estricto: 310px -> 1900px */}
      <div className="max-w-[1900px] mx-auto relative z-10 w-full min-w-[278px]">
        
        {/* ENCABEZADO MINIMALISTA */}
        <header className="border-b border-white/10 pb-6 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 animate-pulse rounded-full" />
              <p className="text-[9px] font-mono text-emerald-500 tracking-[0.3em] uppercase font-bold">
                {isEs ? '// TRAZABILIDAD DE STOCK CONTROLADA' : '// CONTROLLED STOCK TRACEABILITY'}
              </p>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter text-white">
              {mine ? `${isEs ? 'MINA' : 'MINE'}: ${mineNames[mine as keyof typeof mineNames] || mine}` : (isEs ? 'JOYAS EN STOCK' : 'AVAILABLE STOCK')}
            </h1>
          </div>

          {/* Filtros de URL Nativos Rápidos */}
          <div className="flex flex-wrap gap-1.5 font-mono text-[10px] tracking-widest font-bold">
            <Link 
              href={`/${lang}/collection`}
              className={`px-3 py-1 border transition-colors ${!mine ? 'border-gold text-gold bg-gold/5' : 'border-white/10 text-zinc-500 hover:border-white/30'}`}
            >
              {isEs ? 'TODOS' : 'ALL'}
            </Link>
            {(['muzo', 'chivor', 'coscuez'] as const).map((m) => (
              <Link
                key={m}
                href={`/${lang}/collection?mine=${m}`}
                className={`px-3 py-1 border uppercase transition-colors ${mine === m ? 'border-gold text-gold bg-gold/5' : 'border-white/10 text-zinc-500 hover:border-white/30'}`}
              >
                {m}
              </Link>
            ))}
          </div>
        </header>

        {/* ESTADOS DE RED / EXCEPCIONES */}
        {connectionError && (
          <div className="border border-red-500/20 bg-red-950/10 p-5 font-mono text-xs text-red-400 max-w-xl">
            <p className="font-bold uppercase mb-1">// LINK FAULT // </p>
            <p>{isEs ? 'Fallo crítico en el clúster de datos.' : 'Critical failure on data cluster.'}</p>
          </div>
        )}

        {!connectionError && products.length === 0 && (
          <div className="border border-white/10 bg-zinc-950/20 p-6 font-mono text-[11px] text-zinc-500 tracking-wide max-w-sm">
            {isEs ? '// Cero unidades disponibles para este origen.' : '// Zero available items for this source.'}
          </div>
        )}

        {/* GRILLA INDUSTRIAL DE BAJA LATENCIA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {products.map((gem) => (
            <article 
              key={gem._id} 
              className="group flex flex-col border border-white/5 bg-zinc-950/10 backdrop-blur-sm transition-colors duration-300 hover:border-white/15"
            >
              {/* Imagen del Activo */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900 border-b border-white/5">
                <span className="absolute top-3 left-3 z-20 font-mono text-[8px] bg-black border border-white/10 text-zinc-400 px-1.5 py-0.5 tracking-widest uppercase font-bold">
                  {gem.mine} // {gem.serialNumber}
                </span>
                
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-102"
                  style={{ backgroundImage: `url('${gem.images[0] || '/img/placeholder-emerald.png'}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>

              {/* Parámetros de la Gema */}
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-lg font-bold uppercase tracking-tight text-white group-hover:text-gold transition-colors">
                      {gem.name}
                    </h3>
                    <span className="font-mono text-xs font-bold text-gold shrink-0">
                      ${gem.price.toLocaleString('en-US')} USD
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-b border-white/5 py-2.5 my-3 font-mono text-[10px] text-zinc-400">
                    <div>
                      <span className="text-zinc-600 block text-[8px] uppercase tracking-wider">{isEs ? 'MASA' : 'MASS'}</span>
                      <span className="text-zinc-200 font-bold">{gem.carats.toFixed(2)} CTS</span>
                    </div>
                    <div>
                      <span className="text-zinc-600 block text-[8px] uppercase tracking-wider">{isEs ? 'CLARIDAD' : 'CLARITY'}</span>
                      <span className="text-zinc-200 font-bold">{gem.clarity}</span>
                    </div>
                  </div>
                </div>

                <Link 
                  href={`/${lang}/collection/${gem._id}`}
                  className="w-full border border-white/10 text-white hover:bg-white hover:text-black transition-colors font-mono text-[9px] tracking-[0.2em] font-bold py-2.5 text-center uppercase block"
                >
                  {isEs ? 'ESPECIFICACIONES' : 'SPECIFICATIONS'}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}