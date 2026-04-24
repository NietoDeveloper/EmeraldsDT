"use client";
import React, { useState } from 'react';

const DashboardCard = ({ 
  children, 
  className = "", 
  title = "",
  variant = "default",
}: { 
  children: React.ReactNode, 
  className?: string, 
  title?: string,
  variant?: "default" | "wide" | "tall" | "big"
}) => {
  const sizeClasses = {
    default: "",
    wide: "card-wide",
    tall: "card-tall",
    big: "card-big"
  };

  return (
    <div 
      className={`
        bg-black border border-white/10 rounded-xl p-3 
        flex flex-col transition-all duration-500 ease-in-out
        hover:shadow-[0_0_20px_rgba(212,175,55,0.05)] hover:border-[#D4AF37]/40 group relative overflow-hidden 
        ${sizeClasses[variant]}
        ${className}
      `}
    >
      {title && (
        <h3 className="text-[7px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2 text-[#D4AF37] shrink-0">
          <span className="w-1 h-1 bg-[#D4AF37] rounded-full shadow-[0_0_5px_#D4AF37]" />
          {title}
        </h3>
      )}
      <div className="flex-1 relative overflow-hidden custom-scrollbar">
        {children}
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const [activeCam, setActiveCam] = useState<number | null>(null);

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-[#020202] text-white font-sans relative">
      
      {/* SIDEBAR MINIMALISTA - FIJO */}
      <aside className="hidden lg:flex flex-col w-56 bg-black shrink-0 z-40 border-r border-white/5">
        <div className="p-6 border-b border-white/5 text-center">
          <span className="text-[10px] font-black tracking-widest uppercase italic">
            Emerald <span className="text-[#D4AF37]">DT</span>
          </span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {["Overview", "Inventory", "Drones", "Vault", "Nodes", "Security"].map((text, i) => (
            <div key={i} className={`h-8 w-full rounded flex items-center px-4 transition-all cursor-pointer text-[7px] font-black uppercase tracking-[0.2em] ${i === 0 ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/10' : 'text-white/40 hover:text-[#D4AF37] hover:bg-white/5'}`}>
              {text}
            </div>
          ))}
        </nav>
      </aside>

      <section className="flex-1 flex flex-col h-full relative overflow-hidden">
        <header className="h-12 border-b border-white/5 flex items-center px-6 shrink-0 justify-between bg-black/50 backdrop-blur-md">
          <h1 className="text-[8px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">
            Nieto Laboratory // Industrial Control
          </h1>
          <div className="text-[7px] font-mono text-white/20 uppercase tracking-widest hidden sm:block">
            STABLE_CONNECTION // LATENCY: 14MS
          </div>
        </header>

        {/* CONTENEDOR SMART-GRID (15 COMPONENTES) */}
        <div className="flex-1 p-3 smart-grid overflow-hidden h-full">
          
          {/* 1. UPLINKS (TALL) */}
          <DashboardCard title="Uplinks" variant="tall">
            <div className="flex flex-col gap-1 h-full">
              {[1, 2, 3, 4].map((num) => (
                <button 
                  key={num}
                  onClick={() => setActiveCam(num)}
                  className={`
                    w-full py-2 px-3 rounded border text-[7px] font-black transition-all cursor-pointer flex items-center justify-between
                    ${activeCam === num ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-black text-[#D4AF37] border-[#D4AF37]/20 hover:border-[#D4AF37]'}
                  `}
                >
                  <span>SRCE_0{num}</span>
                  <div className={`w-1 h-1 rounded-full ${activeCam === num ? 'bg-black' : 'bg-green-500 animate-pulse'}`} />
                </button>
              ))}
            </div>
          </DashboardCard>

          {/* 2. ASSET MATRIX (BIG) */}
          <DashboardCard title="Asset Matrix" variant="big">
            <div className="flex flex-col gap-1 h-full overflow-y-auto custom-scrollbar pr-1">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-white/5 border border-white/5 rounded-lg hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5 transition-all">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-bold text-white uppercase italic">EM_ID_{2024 + i}</span>
                    <span className="text-[5px] text-[#D4AF37]/60 font-black uppercase tracking-widest">Certified Origin</span>
                  </div>
                  <div className="text-[8px] text-white font-black">{90 + i}ct</div>
                </div>
              ))}
            </div>
          </DashboardCard>

          {/* 3. REVENUE (DEFAULT) */}
          <DashboardCard title="Revenue Stream">
            <div className="h-full flex flex-col justify-center items-center">
              <span className="text-lg font-black tracking-tighter">$145.2K</span>
              <span className="text-[6px] text-green-500 font-mono tracking-widest">+12.4% Δ</span>
            </div>
          </DashboardCard>
          
          {/* 4. TELEMETRY (WIDE) */}
          <DashboardCard title="Real-time Telemetry" variant="wide">
            <div className="h-full flex items-end gap-1 pb-1">
              {[30, 60, 45, 90, 70, 85, 40, 55, 95, 65].map((h, i) => (
                <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-[#D4AF37]/20 rounded-t-sm group-hover:bg-[#D4AF37]/40 transition-all" />
              ))}
            </div>
          </DashboardCard>

          {/* 5. LOGS (WIDE) */}
          <DashboardCard title="Operational Logs" variant="wide">
             <div className="font-mono text-[6px] text-white/30 space-y-1">
                <p><span className="text-[#D4AF37]">[08:42:01]</span> > NIETO_LAB_CORE: ONLINE</p>
                <p><span className="text-[#D4AF37]">[08:43:15]</span> > ENCRYPTION_LAYER_v3: ACTIVE</p>
                <p><span className="text-[#D4AF37]">[08:45:00]</span> > EMERALD_VAULT: MAXIMUM_SECURITY</p>
             </div>
          </DashboardCard>

          {/* 6-15. NODOS RESTANTES (Acomodación automática) */}
          {["Vault Status", "Security Node", "Network Hub", "Cloud Sync", "Drone Fleet", "AI Matrix", "Encryption", "Power Grid", "System Health", "Auth Gate"].map((name, i) => (
            <DashboardCard key={i} title={name}>
              <div className="h-full flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity">
                <div className="w-full h-[1px] bg-white/10" />
              </div>
            </DashboardCard>
          ))}

        </div>

        {/* VIDEO OVERLAY */}
        {activeCam && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6 sm:p-12">
            <div className="w-full h-full max-w-6xl bg-black border border-[#D4AF37] rounded-2xl overflow-hidden flex flex-col shadow-[0_0_100px_rgba(212,175,55,0.1)] scale-in-center">
              <div className="h-10 border-b border-[#D4AF37]/20 flex items-center justify-between px-6 bg-black">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping" />
                  <span className="text-white font-black text-[8px] tracking-[0.3em] uppercase italic">Streaming: Source_0{activeCam}</span>
                </div>
                <button onClick={() => setActiveCam(null)} className="text-[#D4AF37] hover:text-white font-black text-[8px] transition-colors cursor-pointer border border-[#D4AF37]/20 px-4 py-1 rounded hover:bg-[#D4AF37]/10">CLOSE_UPLINK [X]</button>
              </div>
              <div className="flex-1 bg-[#050505] relative flex items-center justify-center overflow-hidden">
                <div className="animate-scan" />
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(212,175,55,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.2)_1px,transparent_1px)] bg-[size:30px_30px]" />
                <div className="text-[#D4AF37] text-[9px] font-mono animate-pulse tracking-[1em] uppercase z-10">Establishing Encrypted Stream...</div>
              </div>
            </div>
          </div>
        )}

      </section>
    </main>
  );
}