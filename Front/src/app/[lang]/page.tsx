import { apiClient, Product } from "@/lib/apiClient";
import { Footer } from "@/components/shared/Footer";
import Link from "next/link";
import { SlidersHorizontal, Layers, Gem, ShoppingBag } from "lucide-react";

interface CollectionsPageProps {
  params: Promise<{ lang: string }>;
}

export default async function CollectionsPage({ params }: CollectionsPageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || "en";
  const isEs = lang === "es";

  // Consumo asíncrono seguro desde nuestro escudo L5 tolerante a fallos
  const products = await apiClient.get<Product[]>("/products");

  // Agrupación estricta por las categorías reales del negocio
  const categories = [
    { id: "all", name: isEs ? "Todo" : "All", icon: <Layers size={14} /> },
    { id: "raw", name: isEs ? "En Bruto" : "Raw", icon: <Gem size={14} /> },
    { id: "cut", name: isEs ? "Talladas" : "Cut", icon: <Gem size={14} /> },
    { id: "jewelry", name: isEs ? "Alta Joyería" : "Jewelry", icon: <ShoppingBag size={14} /> },
  ];

  return (
    <main className="w-full min-h-screen bg-black text-white pt-24 md:pt-32 selection:bg-gold/30 font-mono">
      {/* CONTENEDOR RESPONSIVE ULTRA-ESTRICTO (310px a 1900px) */}
      <div className="w-full max-w-[1900px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 min-w-[310px] pb-20">
        
        {/* CABECERA ESTILO SPACEX */}
        <header className="border-b border-white/10 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
              {isEs ? "COLECCIONES" : "COLLECTIONS"}
            </h1>
            <p className="text-zinc-400 text-xs md:text-sm tracking-[0.2em] uppercase mt-2 text-emerald-500">
              {isEs ? "// Disponibilidad de activos en tiempo real" : "// Real-time asset availability"}
            </p>
          </div>

          {/* Filtros rápidos informativos de categoría */}
          <div className="flex flex-wrap gap-2 text-[10px] uppercase font-bold tracking-widest">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`flex items-center gap-2 px-4 py-2 border transition-colors cursor-pointer ${
                  cat.id === "all"
                    ? "border-gold text-black bg-gold font-black"
                    : "border-white/10 text-zinc-400 hover:border-gold hover:text-gold"
                }`}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>
        </header>

        {/* GRILLA DE PRODUCTOS RESPONSIVE:
            1 columna (móvil 310px+), 2 columnas (sm), 3 columnas (lg), 4 columnas (xl hasta 1900px) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/${lang}/collections/${product.id}`}
              className="group block border border-white/5 bg-zinc-950/40 relative overflow-hidden transition-all duration-500 hover:border-emerald-500/30 flex flex-col h-full"
            >
              {/* Esquinas de diseño técnico minimalista */}
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20 transition-colors group-hover:border-gold/50" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20 transition-colors group-hover:border-gold/50" />

              {/* Contenedor de Imagen con simulación de carga y ratio fijo */}
              <div className="relative w-full aspect-square bg-zinc-900 border-b border-white/5 overflow-hidden flex items-center justify-center">
                {/* Fallback visual elegante en caso de no existir imagen física en local */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/5 tracking-[0.4em] uppercase select-none text-[10px]">
                  <span>EMERALD DT</span>
                  <span className="text-gold/5 mt-1">{product.origin}</span>
                </div>
                
                {/* Badge de Disponibilidad en Vivo */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-[9px] tracking-[0.15em] font-bold">
                  <span className={`w-1.5 h-1.5 rounded-full ${product.isAvailable ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                  <span className={product.isAvailable ? "text-white" : "text-zinc-500 uppercase"}>
                    {product.isAvailable ? (isEs ? "DISPONIBLE" : "AVAILABLE") : (isEs ? "VENDIDO" : "SOLD OUT")}
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-10 bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 px-2 py-0.5 text-[8px] font-black text-emerald-400 tracking-widest uppercase">
                  {product.category}
                </div>
              </div>

              {/* Metadatos y Precios */}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3 className="text-sm md:text-base font-bold text-white transition-colors group-hover:text-gold uppercase tracking-tight">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-3">
                    {isEs ? "Origen" : "Origin"}: <span className="text-zinc-300 font-bold">{product.origin}</span> • {product.carats} CTS
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-auto">
                  <span className="text-xs text-zinc-400 uppercase tracking-widest">
                    {isEs ? "Precio" : "Price"}
                  </span>
                  <span className="text-sm md:text-base font-black text-gold">
                    ${product.price.toLocaleString()} USD
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* FOOTER INCORPORADO */}
      <Footer />
    </main>
  );
}