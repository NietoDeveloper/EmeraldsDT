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
              <span className="w-1.5 h-