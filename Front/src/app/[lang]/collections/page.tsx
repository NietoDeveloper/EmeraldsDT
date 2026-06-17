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
    </main>
  );
}