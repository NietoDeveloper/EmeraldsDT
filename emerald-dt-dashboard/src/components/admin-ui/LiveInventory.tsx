"use client";
import { EmeraldProduct } from "@/types/inventory";

interface Props {
  products: EmeraldProduct[]; // Idealmente 12 productos para el "Zero Scroll"
}

export default function LiveInventory({ products }: Props) {
  // Lógica de color optimizada: Verde Esmeralda para salud, Dorado para advertencia
  const getStockUI = (stock: number) => {
    if (stock === 0) return { color: "text-red-500", bg: "bg-red-500/20", label: "DEPLETED" };
    if (stock < 5) return { color: "text-orange-500", bg: "bg-orange-500/20", label: "CRITICAL" };
    if (stock < 15) return { color: "text-[#D4AF37]", bg: "bg-[#D4AF37]/20", label: "RESERVE" };
    return { color: "text-[#047857]", bg: "bg-[#047857]/20", label: "OPTIMAL" };
  };

  return (
    <div className="h-full flex flex-col bg-black border border-white/10 rounded-2xl overflow-hidden group transition-all duration-500 hover:border-[#D4AF37]/40 shadow-[0_0_40px_rgba(0,0,0,1)]">
      
      {/* HEADER TÉCNICO */}
      <div className="bg-zinc-900/30 p-4 border-b border-white/5 flex justify-between items-end shrink-0">
        <div className="flex flex-col gap-1">
          <h2 className="text-[9px] uppercase tracking-[0.5em] text-[#D4AF37] font-black">
            Asset Inventory Matrix
          </h2>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#047857] animate-pulse" />
            <span className="text-[7px] text-white/40 font-mono uppercase tracking-widest">System Active // Node_Bogota</span>
          </div>
        </div>
        <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest hidden sm:block">
          Ref: DT-2026-EM
        </span>
      </div>

      {/* TABLA DE ALTA PRECISIÓN */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#020202]">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-black/90 backdrop-blur-md z-20">
            <tr className="text-[7px] text-white/30 uppercase tracking-[0.2em] font-black border-b border-white/5">
              <th className="p-4 w-[35%]">Identificación / Asset</th>
              <th className="p-4">Categoría</th>
              <th className="p-4">Estado Telemetría</th>
              <th className="p-4 text-right">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.03]">
            {products.slice(0, 12).map((item) => {
              const ui = getStockUI(item.stock);
              return (
                <tr 
                  key={item.id} 
                  className="group/row hover:bg-[#D4AF37]/5 transition-all duration-300 cursor-crosshair"
                >
                  {/* PRODUCTO & SKU */}
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-white group-hover/row:text-white transition-colors uppercase tracking-tight">
                        {item.name || "Emerald Specimen"}
                      </span>
                      <span className="text-[7px] text-[#D4AF37] font-mono mt-0.5 opacity-60 group-hover/row:opacity-100">
                        SKU: {item.sku}
                      </span>
                    </div>
                  </td>

                  {/* CATEGORÍA */}
                  <td className="p-4">
                    <div className="inline-flex items-center px-2 py-0.5 rounded-sm border border-white/5 bg-white/[0.02]">
                      <span className="text-[7px] text-white/50 uppercase font-black tracking-widest group-hover/row:text-white transition-colors">
                        {item.category || "Uncut Gem"}
                      </span>
                    </div>
                  </td>

                  {/* BARRA DE ESTADO (VIVO) */}
                  <td className="p-4">
                    <div className="flex flex-col gap-1.5 w-32">
                      <div className="flex justify-between items-center">
                        <span className={`text-[6px] font-black tracking-widest uppercase ${ui.color}`}>
                          {ui.label}
                        </span>
                        <span className="text-[6px] text-white/20 font-mono">{(item.stock / 25 * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${ui.color.replace('text', 'bg')} transition-all duration-700 ease-in-out`}
                          style={{ width: `${Math.min((item.stock / 25) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* CANTIDAD */}
                  <td className="p-4 text-right">
                    <div className="flex flex-col items-end">
                      <span className={`text-[12px] font-black font-mono group-hover/row:text-white ${ui.color}`}>
                        {item.stock.toString().padStart(2, '0')}
                      </span>
                      <span className="text-[6px] text-white/10 uppercase font-bold group-hover/row:text-[#D4AF37]/50">Units</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* FOOTER: RESUMEN OPERATIVO */}
      <div className="p-4 bg-black border-t border-white/5 flex items-center justify-between shrink-0">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <span className="text-[6px] text-white/20 uppercase font-black tracking-widest">Global Vault</span>
            <span className="text-[9px] text-[#047857] font-black uppercase">Secure / S+</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[6px] text-white/20 uppercase font-black tracking-widest">Total Carats</span>
            <span className="text-[9px] text-[#D4AF37] font-black uppercase">
              {products.reduce((acc, p) => acc + (p.carats || 0), 0).toFixed(2)} CT
            </span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-transparent border border-[#D4AF37]/20 hover:border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all rounded text-[8px] font-black uppercase tracking-widest">
            Audit Matrix
          </button>
        </div>
      </div>
    </div>
  );
}