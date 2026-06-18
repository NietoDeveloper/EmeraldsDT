import { notFound } from 'next/navigation';
import { apiClient } from '@/lib/apiClient';
import CheckoutForm from './CheckoutForm';

interface ProductCheckout {
  _id: string;
  name: string;
  price: number;
  mine: string;
  serialNumber: string;
}

interface CheckoutPageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ product?: string }>;
}

export default async function CheckoutPage({ params, searchParams }: CheckoutPageProps) {
  const { lang } = await params;
  const { product: productId } = await searchParams;
  const isEs = lang === 'es';

  if (lang !== 'en' && lang !== 'es') notFound();
  if (!productId) notFound();

  let product: ProductCheckout | null = null;

  try {
    // SSR: Validación perimetral del activo antes de permitir el intento de pago
    const response = await apiClient.get<ProductCheckout>(`/products/${productId}`);
    product = response || null;
  } catch (error) {
    console.error('ERROR // Checkout product verification failed:', error);
  }

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen w-full bg-black text-white px-4 sm:px-8 md:px-16 py-24 selection:bg-gold/30 relative overflow-x-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f0f_1px,transparent_1px),linear-gradient(to_bottom,#0f0f0f_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      <div className="max-w-[1900px] mx-auto relative z-10 w-full min-w-[278px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
          
          {/* COLUMNA: RESUMEN INDUSTRIAL DEL ACTIVO */}
          <div className="lg:col-span-5 bg-zinc-950/40 border border-white/5 p-6 space-y-4 font-mono">
            <h2 className="text-[10px] text-zinc-500 tracking-[0.2em] uppercase font-bold">// ORDER MANIFEST</h2>
            <div className="border-b border-white/5 pb-4">
              <h1 className="text-xl font-black uppercase text-white tracking-tight">{product.name}</h1>
              <p className="text-[11px] text-zinc-400 mt-1 uppercase">Node: {product.mine} // #{product.serialNumber}</p>
            </div>
            <div className="flex justify-between items-center text-sm pt-2">
              <span className="text-zinc-400 uppercase">{isEs ? 'TOTAL NETO' : 'NET TOTAL'}</span>
              <span className="text-gold font-bold">${product.price.toLocaleString('en-US')} USD</span>
            </div>
          </div>

          {/* COLUMNA: FORMULARIO SEGURO Y MANEJO DE ESTADOS */}
          <div className="lg:col-span-7 border border-white/5 bg-zinc-950/20 p-6 sm:p-8">
            <CheckoutForm productId={product._id} isEs={isEs} price={product.price} />
          </div>

        </div>
      </div>
    </main>
  );
}