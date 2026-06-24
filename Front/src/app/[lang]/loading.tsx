export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#010502] font-mono select-none">
      {/* Atmósfera esmeralda sutil de carga en servidor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#042f1a_0%,transparent_70%)] opacity-40 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
        {/* Spinner técnico minimalista estilo SpaceX */}
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 border border-white/5 rounded-full" />
          <div className="absolute inset-0 border-t border-emerald-500 rounded-full animate-spin" />
        </div>

        <div className="flex flex-col gap-1.5 mt-2">
          <p className="text-[9px] text-emerald-400 tracking-[0.3em] uppercase font-bold animate-pulse">
            // STREAMING SECURE DATA
          </p>
          <p className="text-[8px] text-zinc-500 tracking-[0.2em] uppercase">
            Resolving server cluster assets...
          </p>
        </div>
      </div>
    </div>
  );
}