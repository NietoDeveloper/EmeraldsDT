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


  );
}