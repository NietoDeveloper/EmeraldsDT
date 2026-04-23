import { EmeraldProduct } from "@/types/inventory";

interface Props {
  products: EmeraldProduct[];
}

export default function LiveInventory({ products }: Props) {
  // Función para determinar el color según el nivel de stock (Lógica de Negocio)
  const getStockStatusColor = (stock: number) => {
    if (stock === 0) return "text-red-600 shadow-[0_0_10px_rgba(220,38,38,0.2)]";
    if (stock < 5) return "text-orange-500";
    return "text-[#D4AF37]"; // Oro para stock saludable
  };

  return (
    <div className="h-full flex flex-col bg-black/60 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-[#D4AF37]/40 group">
      
      {/* HEADER TÉCNICO */}
      <div className="bg-gradient-to-r from-black via-zinc-900 to-black p-3 border-b border-white/5 flex justify-between items-center shrink-0">
        <div className="flex flex-col">
          <h2 className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] font-black">
            Asset Inventory
          </h2>
          <span className="text-[8px] text-white/30 font-mono">ID: 0x-NIETO-LAB</span>
        </div>
        <div className="flex items-center gap-2 bg-black/50 px-2 py-1 rounded-full border border-white/5">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
          <span className="text-[8px] text-white/60 font-black tracking-widest uppercase">Syncing</span>
        </div>
      </div>

      {/* BODY DE TABLA - ZERO SCROLL FOCUS */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse table-fixed">
          <thead className="sticky top-0 bg-[#0a0a0a] z-10">
            <tr className="text-[8px] text-white/20 uppercase tracking-widest">
              <th className="p-3 font-medium border-b border-white/5 w-[45%]">SKU / Origin</th>
              <th className="p-3 font-medium border-b border-white/5 text-center">Status</th>
              <th className="p-3 font-medium border-b border-white/5 text-right w-[25%]">Units</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.03]">
            {products.map((item) => (
              <tr 
                key={item.id} 
                className="group/row hover:bg-[#D4AF37]/5 transition-all duration-300"
              >
                {/* SKU & Origin */}
                <td className="p-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono font-bold text-white/80 group-hover/row:text-white transition-colors">
                      {item.sku}
                    </span>
                    <span className="text-[7px] text-white/30 uppercase tracking-tighter">
                      Colombian Cut
                    </span>
                  </div>
                </td>

                {/* Status Indicator */}
                <td className="p-3 text-center">
                  <div className="inline-flex items-center justify-center w-4 h-4 rounded-sm bg-white/5 border border-white/10 group-hover/row:border-gold/30">
                    <div className={`w-1 h-1 rounded-full ${item.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                  </div>
                </td>

                {/* Units with Logic Color */}
                <td className={`p-3 text-right font-mono text-[11px] font-black ${getStockStatusColor(item.stock)}`}>
                  {item.stock.toString().padStart(2, '0')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER DE CONTROL */}
      <div className="p-3 bg-black/40 border-t border-white/5 flex items-center justify-between shrink-0">
        <div className="text-[8px] text-white/20 font-bold uppercase tracking-widest">
          Total SKUs: {products.length}
        </div>
        <div className="flex gap-1">
          <div className="w-1 h-1 bg-white/10 rounded-full" />
          <div className="w-1 h-1 bg-white/10 rounded-full" />
          <div className="w-1 h-1 bg-gold/50 rounded-full" />
        </div>
      </div>
    </div>
  );
}