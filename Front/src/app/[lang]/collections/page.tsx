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

              </p>
            </div>
            <h1 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-white font-mono break-words">
              {mine ? `${isEs ? 'COLECCIÓN' : 'COLLECTION'}: ${mineNames[mine as keyof typeof mineNames] || mine}` : (isEs ? 'JOYAS EXHIBIDAS' : 'DISPLAYED STOCK')}
            </h1>
          </div>

          {/* Filtros de Navegación por Mina */}
          <div className="flex flex-wrap gap-2 font-mono text-[9px] tracking-widest font-bold w-full md:w-auto">
       
}