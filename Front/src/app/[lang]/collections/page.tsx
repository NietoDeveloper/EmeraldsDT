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
