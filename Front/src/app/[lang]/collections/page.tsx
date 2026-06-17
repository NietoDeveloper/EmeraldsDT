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
px-24 xl:px-32 py-24 selection:bg-gold/30 relative overflow-x-hidden">
      {/* Líneas de cuadrícula de fondo estilo ingeniería SpaceX */}
              <span className="w-2 h-2 bg-emerald-500 animate-pulse rounded-full" />
              <p className="text-[10px] font-mono text-emeral
          </div>

              </Link>
            ))}
          </div>
        </header>

    </main>
  );
}