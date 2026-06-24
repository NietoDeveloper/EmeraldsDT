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

  let realProducts: Product[] = [];
  let isFallbackActive = false;

  try {
    const response = await apiClient.get<Product[]>('/products');
    if (response && Array.isArray(response)) {
      realProducts = response;
    } else {
      isFallbackActive = true;
    }
  } catch (error) {
    isFallbackActive = true;
  }

  const targetMines = ['muzo', 'chivor', 'coscuez'] as const;

  const mineNames = {
    muzo: 'Muzo',
    chivor: 'Chivor',
    coscuez: 'Coscuez',
    gachala: 'Gachalá'
  };

  // Generador de Skeletons de Alta Fidelidad en caso de que la API esté vacía o cargando
  const fallbackProducts: Product[] = targetMines.flatMap((m, index) => 
    Array.from({ length: 3 }).map((_, i) => ({
      id: `placeholder-${m}-${i}`,
      name: isEs ? `Esmeralda Patrimonial Elite ${i + 1}` : `Heritage Emerald Asset ${i + 1}`,
      slug: `placeholder-${m}-${i}`,
      description: isEs ? 'Activo minero de alta pureza facetado bajo estándares internacionales.' : 'High-purity mining asset faceted under strict international standards.',
      price: 15000 + (i * 4500),
      images: [],
      category: 'EMERALD',
      origin: m.toUpperCase(),
      carats: 2.5 + i,
      isAvailable: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }))
  );

  const activeDataset = isFallbackActive ? fallbackProducts : realProducts;

  // Filtrado lógico según la selección del usuario
  const displayProducts = mine 
    ? activeDataset.filter((p) => p.origin.toLowerCase() === mine.toLowerCase())
    : targetMines.flatMap((m) => 
        activeDataset.filter((p) => p.origin.toLowerCase() === m).slice(0, 3)
      );

  return (
    <main className="min-h-screen w-full bg-black text-white px-3 sm:px-8 lg:px-16 py-24 selection:bg-gold/30 relative overflow-x-hidden app-scrollbar">
      {/* Inyección nativa de Scrollbar Esmeralda de Máxima Compatibilidad */}
      <style dangerouslySetInnerHTML={{ __html: `
        .app-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .app-scrollbar::-webkit-scrollbar-track {
          background: #000000;
        }
        .app-scrollbar::-webkit-scrollbar-thumb {
          background: #059669;
          border-radius: 3px;
        }
        .app-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #10b981;
        }
        /* Garantía de renderizado para Firefox */
        html, .app-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #059669 #000000;
        }
      `}} />

      {/* Atmósfera Emerald: Gradiente Radial Orgánico al estilo SpaceX */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,#042f1a_0%,transparent_75%)] pointer-events-none z-0" />
      
      {/* Contenedor Fluido Técnico: Estricto desde 310px hasta los 1900px */}
      <div className="w-full max-w-[1900px] min-w-[286px] mx-auto relative z-10">
        
        {/* ENCABEZADO INTEGRADO */}
        <header className="border-b border-white/5 pb-6 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 animate-pulse rounded-full" />
              <p className="text-[9px] font-mono text-emerald-400 tracking-[0.3em] uppercase font-bold">
                {isFallbackActive 
                  ? (isEs ? '// MODO CONTINGENCIA / BUFFER NACIONAL' : '// CONTINGENCY MODE / LOCAL BUFFER')
                  : (isEs ? '// CONTROL DE INVENTARIO EN VIVO' : '// LIVE ASSET INVENTORY')
                }
              </p>
            </div>
            <h1 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-white font-mono break-words">
              {mine ? `${isEs ? 'COLECCIÓN' : 'COLLECTION'}: ${mineNames[mine as keyof typeof mineNames] || mine}` : (isEs ? 'JOYAS EXHIBIDAS' : 'DISPLAYED STOCK')}
            </h1>
          </div>

          {/* Filtros de Navegación por Mina */}
          <div className="flex flex-wrap gap-2 font-mono text-[9px] tracking-widest font-bold w-full md:w-auto">
            <Link 
              href={`/${lang}/collections`}
              className={`px-3 sm:px-4 py-2 border transition-all duration-300 cursor-pointer text-center flex-1 sm:flex-none ${!mine ? 'border-gold text-gold bg-gold/5' : 'border-white/5 text-zinc-400 hover:border-gold hover:text-gold'}`}
            >
              {isEs ? 'TODOS (3 POR MINA)' : 'ALL (3 PER MINE)'}
            </Link>
            {targetMines.map((m) => (
              <Link
                key={m}
                href={`/${lang}/collections?mine=${m}`}
                className={`px-3 sm:px-4 py-2 border uppercase transition-all duration-300 cursor-pointer text-center flex-1 sm:flex-none ${mine === m ? 'border-gold text-gold bg-gold/5' : 'border-white/5 text-zinc-400 hover:border-gold hover:text-gold'}`}
              >
                {m}
              </Link>
            ))}
          </div>
        </header>

        {/* GRILLA CON RESPONSIVE PROGRESIVO BALANCEADO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {displayProducts.map((gem) => (
            <article 
              key={gem.id} 
              className={`group flex flex-col border bg-zinc-950/30 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 cursor-pointer w-full ${
                isFallbackActive 
                  ? 'border-white/5 opacity-75 hover:border-emerald-500/30' 
                  : 'border-white/5 hover:border-gold/30 hover:shadow-[0_10px_30px_rgba(212,175,55,0.05)]'
              }`}
            >
              {/* Contenedor Imagen */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900/40 border-b border-white/5">
                <span className="absolute top-3.5 left-3.5 z-20 font-mono text-[9px] bg-black/80 border border-white/10 text-zinc-400 px-2 py-0.5 tracking-wider uppercase">
                  {gem.origin}
                </span>

                <span className={`absolute top-3.5 right-3.5 z-20 font-mono text-[8px] border px-2 py-0.5 tracking-widest uppercase font-bold ${
                  gem.isAvailable 
                    ? 'bg-emerald-950/90 border-emerald-500 text-emerald-400' 
                    : 'bg-red-950/90 border-red-500 text-red-400'
                }`}>
                  {gem.isAvailable ? (isEs ? 'DISPONIBLE' : 'AVAILABLE') : (isEs ? 'VENDIDO' : 'SOLD')}
                </span>
                
                {gem.images[0] ? (
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                    style={{ backgroundImage: `url('${gem.images[0]}')` }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center relative">
                    <span className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase text-center px-4">{isEs ? '// CARGANDO ACTIVO' : '// LOADING ASSET'}</span>
                    <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
              </div>

              {/* Parámetros de la Gema */}
              <div className="p-5 flex-1 flex flex-col justify-between gap-5">
                <div>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] text-gold tracking-widest uppercase font-semibold">
                      {isEs ? `MINA ${gem.origin} // ${gem.category}` : `${gem.origin} MINE // ${gem.category}`}
                    </span>
                    <h3 className="text-base font-bold uppercase tracking-tight text-white font-mono group-hover:text-gold transition-colors duration-300 break-words">
                      {gem.name}
                    </h3>
                    <p className="text-zinc-400 font-sans text-xs mt-1 line-clamp-2 leading-relaxed">
                      {gem.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center border-t border-b border-white/5 py-2.5 mt-4 font-mono text-xs">
                    <span className="text-zinc-500 font-medium">{gem.carats.toFixed(2)} CTS</span>
                    <span className="font-black text-white group-hover:text-gold transition-colors duration-300">
                      ${gem.price.toLocaleString('en-US')} USD
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Link 
                    href={`/${lang}/collections/${gem.id}`}
                    className="w-full border border-white/10 text-zinc-300 hover:bg-zinc-900 hover:text-white transition-all duration-300 font-mono text-[10px] tracking-[0.2em] font-bold py-2.5 text-center uppercase block cursor-pointer"
                  >
                    {isEs ? 'VER ESPECIFICACIONES' : 'VIEW SPECIFICATIONS'}
                  </Link>

                    {isEs ? 'COMPRAR ACTIVO' : 'ACQUIRE ASSET'}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}