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

     

        
    </div>
  );
}