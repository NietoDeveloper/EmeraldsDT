import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css'; // Ajusta la ruta de tus estilos globales si es necesario
import { Navbar } from '@/components/shared/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Emerald DT | World Class Colombian Emeralds',
  description: 'Maximum security architecture e-commerce platform for high-purity Colombian emeralds.',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  // Sincronización asíncrona estricta del parámetro de idioma exigida por Next.js 16
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';

  return (
    <html lang={lang} className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased selection:bg-gold/30 selection:text-white overflow-x-hidden`}>
        
        {/* 1. NÚCLEO DE NAVEGACIÓN PERIMETRAL GLOBAL (Se declara una sola vez aquí) */}
        <Navbar lang={lang} />

        {/* 2. INYECCIÓN DEL ECOSISTEMA VISUAL (Páginas y secciones dinámicas) */}
        {children}

      </body>
    </html>
  );
}