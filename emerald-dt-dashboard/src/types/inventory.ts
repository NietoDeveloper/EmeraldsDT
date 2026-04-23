export interface EmeraldProduct {
  id: string;
  sku: string;
  name: string;
  carat: number;
  price: number;
  stock: number;
  status: 'available' | 'sold' | 'reserved';
}