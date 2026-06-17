import Link from 'next/link';
import { notFound } from 'next/navigation';
import { apiClient } from '@/lib/apiClient';

// Interfaz para el tipado estricto de la Esmeralda (Nivel L5)
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

  // Validar códigos de idioma soportados
  if (lang !== 'en' && lang !== 'es') {
    notFound();
  }

  let products: EmeraldProduct[] = [];
  let connectionError = false;

  try {
    // 1. Fetching directo desde el Servidor hacia el clúster del Back-End
    // Pasamos el filtro opcional de la mina directamente a tu API
    const endpoint = mine ? `/products?mine=${mine}` : '/products';
    const response = await apiClient.get<EmeraldProduct[]>(endpoint);
    
    // 2. Filtrado perimetral: Renderizar ÚNICAMENTE piezas en estado AVAILABLE
    products = (response.data || []).filter(p => p.status === 'AVAILABLE');
  } catch (error) {
    console.error('CRITICAL // Cluster connection failed during SSR:', error);
    connectionError = true;
  }

  // Mapeo de nombres de minas para consistencia visual
  const mineNames = {
    muzo: 'Muzo (Capital)',
    chivor: 'Chivor (Blue Fire)',
    coscuez: 'Coscuez (Andean Sun)'
  };

  return (
    <main className="min-h-screen w-full bg-black text-white px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-24 selection:bg-gold/30 relative overflow-x-hidden">
      {/* Líneas de cuadrícula de fondo estilo ingeniería SpaceX */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />
      
      {/* Contenedor fluido con rango responsivo estricto 310px -> 1900px */}
      <div className="max-w-[1900px] mx-auto relative z-10 w-full min-w-[278px]">
        
        {/* ENCABEZADO TÉCNICO DE LA COLECCIÓN */}
        <header className="border-b border-white/10 pb-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-emerald-500 animate-pulse rounded-full" />
              <p className="text-[10px] font-mono text-emerald-500 tracking-[0.25em] uppercase font-bold">
                {isEs ? '// SISTEMA DE TRAZABILIDAD EN TIEMPO REAL' : '// REAL-TIME TRACEABILITY SYSTEM'}
              </p>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
              {mine ? `${isEs ? 'ORIGEN' : 'ORIGIN'}: ${mineNames[mine as keyof typeof mineNames] || mine}` : (isEs ? 'JOYAS DISPONIBLES' : 'AVAILABLE GEMS')}
            </h1>
          </div>

          {/* Menú de filtrado rápido nativo por URL */}
          <div className="flex flex-wrap gap-2 font-mono text-[11px] tracking-wider">
            <Link 
              href={`/${lang}/collection`}
              className={`px-3 py-1.5 border transition-all ${!mine ? 'border-gold text-gold bg-gold/5' : 'border-white/10 text-zinc-400 hover:border-white/30'}`}
            >
              {isEs ? '[ TODOS ]' : '[ ALL ]'}
            </Link>
            {(['muzo', 'chivor', 'coscuez'] as const).map((m) => (
              <Link
                key={m}
                href={`/${lang}/collection?mine=${m}`}
                className={`px-3 py-1.5 border uppercase transition-all ${mine === m ? 'border-gold text-gold bg-gold/5' : 'border-white/10 text-zinc-400 hover:border-white/30'}`}
              >
                {m}
              </Link>
            ))}
          </div>
        </header>

        {/* MANEJO DE ESTADOS (ERROR / VACÍO) */}
        {connectionError && (
          <div className="border border-red-500/30 bg-red-950/10 p-6 font-mono text-sm text-red-400 max-w-xl">
            <p className="font-bold uppercase mb-2">// SECURITY ALERT //</p>
            <p>{isEs ? 'Fallo en el enlace con el clúster de datos de la app. Verifica tu conexión de red.' : 'App data cluster link failure. Check your network link.'}</p>
          </div>
        )}

        {!connectionError && products.length === 0 && (
          <div className="border border-white/10 bg-zinc-950/30 p-8 font-mono text-xs text-zinc-500 tracking-wide max-w-md">
            {isEs ? '// No hay gemas disponibles actualmente con estos criterios.' : '// No gems currently available matching these specifications.'}
          </div>
        )}

        {/* GRILLA DINÁMICA ASIMÉTRICA */}
        {/* Modifica los paddings y tamaños de celda alternando el índice para romper la monotonía clásica */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((gem, index) => {
            // Generación de asimetría controlada mediante clases de espaciado según la posición
            const isEven = index % 2 === 0;
            const cardSpacing = index % 3 === 1 ? 'lg:translate-y-8' : index % 3 === 2 ? 'lg:-translate-y-4' : '';

            return (
              <article 
                key={gem._id} 
                className={`group flex flex-col justify-between border border-white/[0.06] bg-zinc-950/20 backdrop-blur-sm transition-all duration-500 hover:border-white/20 ${cardSpacing}`}
              >
                {/* Contenedor de Imagen de Carga Optimizada */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900 border-b border-white/[0.06]">
                  {/* Tag indicador de procedencia industrial */}
                  <span className="absolute top-4 left-4 z-20 font-mono text-[9px] bg-black/80 border border-white/10 text-zinc-400 px-2 py-1 tracking-widest uppercase">
                    {gem.mine} // {gem.serialNumber}
                  </span>
                  
                  {/* Imagen del producto con efecto zoom SpaceX */}
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-[2000ms] ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url('${gem.images[0] || '/img/placeholder-emerald.png'}')` }}
                  />
                  
                  {/* Degradado de sombra interior */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>

                {/* CUERPO DE DATOS TÉCNICOS */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline gap-2 mb-2">
                      <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-gold transition-colors duration-300">
                        {gem.name}
                      </h3>
                      <span className="font-mono text-sm font-semibold text-gold">
                        ${gem.price.toLocaleString('en-US')} USD
                      </span>
                    </div>

                    {/* Ficha técnica abreviada */}
                    <div className="grid grid-cols-2 gap-y-2 border-t border-b border-white/5 py-3 my-4 font-mono text-[11px] text-zinc-400">
                      <div>
          })}
        </div>
      </div>
    </main>
  );
}