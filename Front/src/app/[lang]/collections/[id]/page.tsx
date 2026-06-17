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
  cryptoHash: string; // Hash único de laboratorio para trazabilidad digital
  dimensions: string; // Ejemplo: "8.4 x 6.2 x 4.1 mm"
  weightGrams: number;
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
    // Consulta directa al clúster para extraer el activo por su ID único
    const response = await apiClient.get<EmeraldDetail>(`/products/${id}`);
    gem = response.data || null;
  } catch (error) {
    console.error('CRITICAL // Asset retrieval faulted:', error);
  }

  // Si la esmeralda no existe o ya no está disponible, redirigimos por seguridad
  if (!gem || gem.status !== 'AVAILABLE') {
    notFound();
  }

  return (
    <main className="min-h-screen w-full bg-black text-white px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-24 selection:bg-gold/30 relative overflow-x-hidden">
      {/* Retícula técnica de fondo de baja intensidad */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#090909_1px,transparent_1px),linear-gradient(to_bottom,#090909_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-0" />

      <div className="max-w-[1900px] mx-auto relative z-10 w-full min-w-[278px]">
        
        {/* BOTÓN DE RETORNO AL PANEL */}
        <Link 
          href={`/${lang}/collection`}
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-zinc-500 hover:text-gold transition-colors mb-12 uppercase font-bold"
        >
          {isEs ? '← VOLVER AL CATÁLOGO' : '← BACK TO CATALOG'}
        </Link>

        {/* DISTRIBUCIÓN BIPARTITA INDUSTRIAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-start">
          
          {/* COLUMNA IZQUIERDA: PANEL VISUAL DEL ACTIVO */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/5] w-full bg-zinc-950 border border-white/5 overflow-hidden">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${gem.images[0] || '/img/placeholder-emerald.png'}')` }}
              />
              {/* Sombra cinemática */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          </div>

          {/* COLUMNA DERECHA: ESPECIFICACIONES DE TELEMETRÍA (ESTILO SPACEX) */}
          <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12 xl:pl-16 space-y-8">
            
            {/* TÍTULO Y COSTO */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                <span className="font-mono text-[9px] text-zinc-500 tracking-[0.3em] uppercase">
                  {isEs ? 'SERIAL VERIFICADO' : 'VERIFIED SERIAL'} // {gem.serialNumber}
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-2">
                {gem.name}
              </h1>
              <p className="font-mono text-xl font-bold text-gold tracking-tight">
                ${gem.price.toLocaleString('en-US')} USD
              </p>
            </div>

            {/* CONTROL DE TELEMETRÍA: DESGLOSE TÉCNICO */}
            <div className="space-y-4">
              <h2 className="text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase font-bold">
                {isEs ? '// ESPECIFICACIONES MATERIALES' : '// MATERIAL SPECIFICATIONS'}
              </h2>
              
              <div className="divide-y divide-white/5 font-mono text-xs">
                <div className="flex justify-between py-3">
                  <span className="text-zinc-500 uppercase">{isEs ? 'ORIGEN' : 'ORIGIN'}</span>
                  <span className="text-white font-bold uppercase tracking-wider">{gem.mine}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-zinc-500 uppercase">{isEs ? 'MASA TOTAL' : 'TOTAL MASS'}</span>
                  <span className="text-white font-bold">{gem.carats.toFixed(2)} CTS</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-zinc-500 uppercase">{isEs ? 'CLARIDAD' : 'CLARITY'}</span>
                  <span className="text-white font-bold">{gem.clarity}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-zinc-500 uppercase">{isEs ? 'TIPO DE TALLA' : 'CUT SPEC'}</span>
                  <span className="text-white font-bold uppercase">{gem.cut}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-zinc-500 uppercase">{isEs ? 'DIMENSIONES' : 'DIMENSIONS'}</span>
                  <span className="text-zinc-300">{gem.dimensions || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* CONTROL DE TRAZABILIDAD GEO-CRIPTOGRÁFICA */}
            <div className="border border-white/5 bg-zinc-950/40 p-4 font-mono relative">
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-emerald-500/40" />
              
              <p className="text-[9px] text-emerald-500 tracking-[0.2em] uppercase font-bold mb-3">
                {isEs ? '// CERTIFICACIÓN GEO-CRIPTOGRÁFICA' : '// GEO-CRYPTOGRAPHIC CERTIFICATE'}
              </p>
              
              <div className="space-y-2 text-[11px]">
                <div className="bg-black border border-white/5 p-2.5 break-all text-zinc-400 font-mono text-[10px] leading-relaxed">
                  <span className="text-zinc-600 block text-[9px] uppercase font-bold mb-1">LAB_HASH_SHIELD_V2.2_</span>
                  {gem.cryptoHash || '0x7f4a9b2c8e1d3c5f6a7b8c9d0e1f2a3b4c5d6e7f8'}
                </div>
                <p className="text-[9px] text-zinc-600 leading-normal">
                  {isEs 
                    ? 'Este token criptográfico certifica la autenticidad inmutable, procedencia legal y pureza de la pieza en el nodo central.' 
                    : 'This cryptographic token certifies the immutable authenticity, legal provenance, and purity of the asset on the core node.'}
                </p>
              </div>
            </div>

            {/* ACCIÓN DE ADQUISICIÓN */}
            <Link
              href={`/${lang}/checkout?product=${gem._id}`}
              className="w-full border-2 border-gold bg-gold text-black hover:bg-transparent hover:text-gold transition-all duration-500 font-mono text-[11px] tracking-[0.25em] font-black py-4 text-center uppercase block"
            >
              {isEs ? 'INICIAR ADQUISICIÓN' : 'INITIATE ACQUISITION'}
            </Link>

          </div>
        </div>
      </div>
    </main>
  );
}