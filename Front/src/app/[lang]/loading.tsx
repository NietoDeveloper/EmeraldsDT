import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#010502] font-mono select-none pointer-events-auto">
      
      {/* FONDO VERDE ATMOSFÉRICO DE TRANSMISIÓN DE DATOS */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.95)_100%)]" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-[310px] px-6 text-center">
        
        {/* LOGO DE MARCA CON PULSACIÓN CINEMÁTICA EN SERVIDOR */}
        <div className="relative w-28 h-28 mb-6 animate-pulse filter drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <Image
            src="/img/logo.png"
            alt="Emerald DT Secure Proxy"
            fill
            sizes="112px"
            className="object-contain"
            priority
            unoptimized
          />
        </div>

        {/* INDICADORES DE TRANSMISIÓN DE FLUJO */}
        <div className="flex flex-col items-center w-full">
          <h3 className="text-white text-xs tracking-[0.6em] uppercase mb-4 font-bold ml-[0.6em]">
            EMERALD<span className="text-emerald-400">DT</span>
          </h3>

          {/* BARRA DE CARGA ASÍNCRONA LINEAL ESTILO DEPLOYMENT */}
          <div className="w-full max-w-[180px] h-[1px] bg-emerald-950/60 relative overflow-hidden border border-white/5 mb-5">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400 to-emerald-500 animate-[shimmer_1.5s_infinite] w-1/2" 
                 style={{
                   animationName: 'shimmer',
                   animationTimingFunction: 'linear'
                 }}
            />
          </div>

          <p className="text-[8px] text-emerald-400/50 tracking-[0.3em] uppercase animate-pulse">
            // STREAMING SECURE DATA
          </p>
          <p className="text-[7px] text-zinc-600 tracking-[0.2em] uppercase mt-1">
            Resolving node cluster assets...
          </p>
        </div>
      </div>

      {/* Inyección de la animación de la barra nativa */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}} />
    </div>
  );
}