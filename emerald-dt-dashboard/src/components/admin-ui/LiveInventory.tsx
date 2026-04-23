import { EmeraldProduct } from "@/types/inventory";

interface Props {
  products: EmeraldProduct[]; // Idealmente 12 productos
}

export default function LiveInventory({ products }: Props) {
  // Lógica de color y alertas de stock para Emerald DT
  const getStockUI = (stock: number) => {
    if (stock === 0) return { color: "text-red-600", bg: "bg-red-600/20", width: "w-0", label: "VOID" };
    if (stock < 5) return { color: "text-orange-500", bg: "bg-orange-500/20", width: "w-1/4", label: "LOW" };
    if (stock < 15) return { color: "text-[#D4AF37]", bg: "bg-[#D4AF37]/20", width: "w-2/4", label: "MED" };
    return { color: "text-green-500", bg: "bg-green-500/20", width: "w-full", label: "FULL" };
  };

  return (
    <div className="h-full flex flex-col bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl group transition-all duration-500 hover:border-[#D4AF37]/30">
      
      {/* HEADER: SISTEMA DE INVENTARIO CRÍTICO */}
      <div className="bg-zinc-900/50 p-4 border-b border-white/5 flex justify-between items-center shrink-0">
        <div className="flex flex-col">
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-black">
            Asset Inventory
          </h2>
          <span className="text-[8px] text-white/20 font-mono tracking-tighter">NIETO-LAB // BOG-HQ</span>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-md border border-white/5">
            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]" />
            <span className="text-[7px] text-white/70 font-black uppercase tracking-widest">Live Sync</span>
          </div>
        </div>
      </div>

      {/* TABLA DE ALTA DENSIDAD (Optimizado para 12 filas) */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse table-fixed">
          <thead className="sticky top-0 bg-black z-20">
            <tr className="text-[7px] text-white/30 uppercase tracking-[0.2em] font-bold">
              <th className="p-4 border-b border-white/5 w-[50%]">Model / SKU</th>
              <th className="p-4 border-b border-white/5 text-center">Visual Load</th>
              <th className="p-4 border-b border-white/5 text-right w-[20%]">Qty</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.02]">
            {products.slice(0, 12).map((item) => {
              const ui = getStockUI(item.stock);
              return (
                <tr 
                  key={item.id} 
                  className="group/row hover:bg-white/[0.02] transition-colors duration-200"
                >
                  {/* Identificador del Modelo */}
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono font-black text-white/90 group-hover/row:text-[#D4AF37] transition-colors">
                        {item.sku}
                      </span>
                      <span className="text-[7px] text-white/20 uppercase font-bold tracking-widest mt-0.5">
                        Origin: Muzo / High-Grade
                      </span>
                    </div>
                  </td>

                  {/* Indicador Visual de Carga (SpaceX Style) */}
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-center px-0.5">
                        <span className={`text-[6px] font-black tracking-tighter ${ui.color}`}>
                          {ui.label}
                        </span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${ui.color.replace('text', 'bg')} transition-all duration-1000 ease-out`}
                          style={{ width: `${Math.min((item.stock / 25) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Cantidad Numérica */}
                  <td className={`p-4 text-right font-mono text-[12px] font-black ${ui.color}`}>
                    {item.stock.toString().padStart(2, '0')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* FOOTER DE ESTADO OPERATIVO */}
      <div className="p-3 bg-black border-t border-white/5 flex items-center justify-between shrink-0">
        <span className="text-[8px] text-white/40 font-bold uppercase tracking-widest">
          Batch Capacity: {((products.reduce((acc, p) => acc + p.stock, 0) / 300) * 100).toFixed(1)}%
        </span>
        <div className="flex gap-2">
           <button className="text-[8px] text-[#D4AF37] hover:text-white transition-colors font-black uppercase">Export CSV</button>
           <span className="text-white/10">|</span>
           <button className="text-[8px] text-[#D4AF37] hover:text-white transition-colors font-black uppercase">Refresh</button>
        </div>
      </div>
    </div>
  );
}