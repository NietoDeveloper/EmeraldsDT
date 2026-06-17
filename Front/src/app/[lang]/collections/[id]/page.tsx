import Link from 'next/link';
import { notFound } from 'next/navigation';
import { apiClient } from '@/lib/apiClient';

interface EmeraldDetail {
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
  cryptoHash: string;
  dimensions: string;
}

interface ProductPageProps {
  params: Promise<{ lang: string; id: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { lang, id } = await params;
  const isEs = lang === 'es';

  if (lang !== 'en' && lang !== 'es') notFound();

  let gem: EmeraldDetail | null = null;

  try {
    const response = await apiClient.get<EmeraldDetail>(`/products/${id}`);
    gem = response || null;
  } catch (error) {
    // Falla controlada en terminal de SSR
    console.error(`ERROR // Data fetch failed for asset ID: ${id}`);
  }

  // Escudo perimetral de seguridad: si el activo no existe o no está libre, se deniega el acceso
  if (!gem || gem.status !== 'AVAILABLE') {
    notFound();
  }

  return (
    <main className="min-h-screen w-full bg-black text-white px-4 sm:px-8 md:px-16 py-24 selection:bg-gold/30 relative overflow-x-hidden">
      {/* Retícula monocromática de precisión */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f0f_1px,transparent_1px),linear-gradient(to_bottom,#0f0f0f_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      {/* Contenedor responsivo estricto desde 310px hasta 1900px */}
      <div className="max-w-[1900px] mx-auto relative z-10 w-full min-w-[278px]">
        
        <Link 
          href={`/${lang}/collection`}
          className="inline-flex items-center font-mono text-[9px] tracking-[0.3em] text-zinc-500 hover:text-gold transition-colors mb-10 uppercase font-bold"
        >
          {isEs ? '← RETORNAR AL STOCK' : '← BACK TO STOCK'}
        </Link>

        {/* Módulo de Telemetría Bipartito */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
          
          {/* Bloque Visual */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/5] w-full bg-zinc-950 border border-white/5 overflow-hidden">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${gem.images[0] || '/img/placeholder-emerald.png'}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* Bloque de Especificaciones (Estilo SpaceX) */}
          <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-10 xl:pl-14 space-y-6">
            
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-1 h-1 bg-gold rounded-full" />
                <span className="font-mono text-[8px] text-zinc-500 tracking-[0.25em] uppercase font-bold">
                  {isEs ? 'ID DE NODO' : 'NODE ID'} // {gem.serialNumber}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter text-white">
                {gem.name}
              </h1>
              <p className="font-mono text-lg font-bold text-gold mt-1">
                ${gem.price.toLocaleString('en-US')} USD
              </p>
            </div>

            {/* Datos Materiales */}
            <div className="space-y-2">
              <h2 className="text-[9px] font-mono tracking-[0.2em] text-zinc-600 uppercase font-bold">
                {isEs ? '// PARÁMETROS DEL ACTIVO' : '// ASSET PARAMETERS'}
              </h2>
              
              <div className="divide-y divide-white/5 font-mono text-[11px]">
                <div className="flex justify-between py-2.5">
                  <span className="text-zinc-500 uppercase">{isEs ? 'ORIGEN' : 'ORIGIN'}</span>
                  <span className="text-white font-bold uppercase tracking-wide">{gem.mine}</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-zinc-500 uppercase">{isEs ? 'MASA' : 'MASS'}</span>
                  <span className="text-white font-bold">{gem.carats.toFixed(2)} CTS</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-zinc-500 uppercase">{isEs ? 'CLARIDAD' : 'CLARITY'}</span>
                  <span className="text-white font-bold">{gem.clarity}</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-zinc-500 uppercase">{isEs ? 'CORTE' : 'CUT SPECS'}</span>
                  <span className="text-white font-bold uppercase">{gem.cut}</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-zinc-500 uppercase">{isEs ? 'DIMENSIONES' : 'DIMENSIONS'}</span>
                  <span className="text-zinc-300">{gem.dimensions || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Ficha de Cripto-Autenticidad */}
            <div className="border border-white/5 bg-zinc-950/40 p-4 font-mono relative">
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-emerald-500/30" />
              <p className="text-[8px] text-emerald-500 tracking-[0.2em] uppercase font-bold mb-2">
                {isEs ? '// LEDGER INMUTABLE' : '// IMMUTABLE LEDGER'}
              </p>
              
              <div className="bg-black border border-white/5 p-2 break-all text-zinc-400 text-[9px] leading-relaxed font-mono select-all">
                {gem.cryptoHash || '0x0000000000000000000000000000000000000000'}
              </div>
            </div>

            {/* Acción Comercial Directa */}
            <Link
              href={`/${lang}/checkout?product=${gem._id}`}
              className="w-full border border-gold text-gold hover:bg-gold hover:text-black transition-colors font-mono text-[10px] tracking-[0.2em] font-bold py-3.5 text-center uppercase block"
            >
              {isEs ? 'INICIAR COMPRA' : 'INITIATE PURCHASE'}
            </Link>

          </div>
        </div>
      </div>
    </main>
  );
}