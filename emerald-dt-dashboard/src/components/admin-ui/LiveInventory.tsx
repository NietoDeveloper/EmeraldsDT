import { EmeraldProduct } from "@/types/inventory";

interface Props {
  products: EmeraldProduct[];
}

export default function LiveInventory({ products }: Props) {
  return (
    <div className="h-full flex flex-col bg-black/40 border border-[#D4AF37]/20 rounded-sm overflow-hidden">
      {/* Header del Componente */}
      <div className="bg-[#D4AF37]/10 p-2 border-b border-[#D4AF37]/20 flex justify-between items-center">
        <h2 className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">
          Live Inventory
        </h2>
        <span className="text-[10px] text-green-500 animate-pulse">● REAL-TIME</span>
      </div>

      {/* Lista de Productos (Scroll interno sutil si es necesario, pero el contenedor es fijo) */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-black text-[9px] text-gray-500 uppercase">
            <tr>
              <th className="p-2 border-b border-white/5">SKU</th>
              <th className="p-2 border-b border-white/5 text-right">Stock</th>
            </tr>
          </thead>
          <tbody className="text-[11px]">
            {products.map((item) => (
              <tr key={item.id} className="hover:bg-white/5 transition-colors border-b border-white/5">
                <td className="p-2 font-mono text-gray-300">{item.sku}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}