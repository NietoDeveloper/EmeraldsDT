"use client";
import React, { useState } from 'react';

// DashboardCard optimizada para el Motor Smart-Grid de Nieto Laboratory
const DashboardCard = ({ 
  children, 
  className = "", 
  title = "",
}: { 
  children: React.ReactNode, 
  className?: string, 
  title?: string,
}) => {
  return (
    <div 
      className={`
        bg-black border border-white/10 rounded-2xl p-4 
        flex flex-col transition-all duration-500 ease-in-out
        hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] hover:border-[#D4AF37]/40 
        group relative overflow-hidden 
        ${className}
      `}
    >
      {title && (
        <h3 className="text-[9px] font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-2 text-[#D4AF37]">
          <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-[0_0_5px_#D4AF37]" />
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
      
      {/* SIDEBAR FIJO */}
      <aside className="hidden lg:flex flex-col w-64 bg-black shrink-0 z-40 border-r border-white/5">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#D4AF37] rounded flex items-center justify-center text-black font-black text-xs">E</div>
            <span className="text-sm font-bold tracking-tighter uppercase italic">Emerald <span className="text-[#D4AF37]">DT</span></span>
          </div>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-1">
          {["Overview", "Inventory", "Drones", "Vault", "Analytics", "Network"].map((text, i) => (
            <div key={i} className={`h-10 w-full rounded-lg flex items-center px-4 transition-all cursor-pointer text-[9px] font-black uppercase tracking-widest ${i === 0 ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20' : 'text-white/40 hover:text-[#D4AF37] hover:bg-white/5'}`}>
              {text}
            </div>
          ))}
        </nav>
      </aside>

      <section className="flex-1 flex flex-col h-full relative z-10 overflow-hidden">
        <header className="h-16 border-b border-white/5 flex items-center px-8 shrink-0 bg-black/50 backdrop-blur-md">
          <h1 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37]">
            Nieto Laboratory // Emerald DT Control Center
          </h1>
        </header>

        {/* CONTENEDOR SMART-GRID CON ORDEN PRIORIZADO */}
        <div className="flex-1 overflow-y-auto smart-grid custom-scrollbar bg-true-black">
          
          {/* 1. VENTAS (REVENUE STREAM) */}
          <DashboardCard title="Revenue Stream" className="card-wide">
            <div className="flex h-full items-center justify-between px-4">
              <div className="flex flex-col">
                <span className="text-3xl font-black tracking-tighter text-white">$145,200.00</span>
                <span className="text-[7px] text-[#047857] font-black uppercase tracking-[0.3em]">Total Gross Assets // +12.4%</span>
              </div>
              <div className="flex gap-1 h-12 items-end">
                {[30, 50, 45, 80, 60, 95].map((h, i) => (
                   <div key={i} style={{ height: `${h}%` }} className="w-2 bg-[#D4AF37]/20 rounded-t-sm" />
                ))}
              </div>
            </div>
          </DashboardCard>

          {/* 2. INVENTARIO (ASSET MATRIX - BIG) */}
          <DashboardCard title="Asset Matrix" className="card-big">
            <div className="space-y-1.5 h-full overflow-y-auto pr-2 custom-scrollbar">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-white/[0.02] rounded-lg border border-white/5 hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5 transition-all cursor-crosshair group">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase group-hover:text-white transition-colors">EMERALD_RAW_{450 + i}</span>
                    <span className="text-[6px] text-white/20 uppercase tracking-widest group-hover:text-[#D4AF37]">Certified Origin: Muzo</span>
                  </div>
                  <span className="text-[11px] text-[#D4AF37] font-mono font-bold">{(80 - i).toFixed(2)}ct</span>
                </div>
              ))}
            </div>
          </DashboardCard>

          {/* 3. MENSAJES (OPERATIONAL LOGS - WIDE) */}
          <DashboardCard title="Operational Logs" className="card-wide">
            <div className="font-mono text-[8px] text-white/40 space-y-1.5 p-2 bg-black/40 rounded-lg">
              <p className="flex gap-3"><span className="text-[#D4AF37] shrink-0">[08:42:01]</span> <span className="truncate uppercase font-black tracking-widest text-white/60">System Core Initialize: Nieto_Lab_Online</span></p>
              <p className="flex gap-3"><span className="text-[#047857] shrink-0">[08:43:15]</span> <span className="truncate uppercase font-black tracking-widest text-white/60">Encryption Layer (AES-256): Established</span></p>
              <p className="flex gap-3"><span className="text-[#D4AF37] shrink-0">[08:45:00]</span> <span className="truncate uppercase font-black tracking-widest text-white/60">Satellite Uplink Sync: Bogota_DC_Node</span></p>
              <p className="flex gap-3"><span className="text-red-500 shrink-0">[08:46:12]</span> <span className="truncate uppercase font-black tracking-widest text-white/60">Drone Fleet 01: Status Standby</span></p>
            </div>
          </DashboardCard>

          {/* 4. CÁMARAS (UPLINKS - TALL) */}
          <DashboardCard title="Camera Uplinks" className="card-tall">
            <div className="flex flex-col gap-2.5">
              {[1, 2, 3, 4].map((num) => (
                <button 
                  key={num} 
                  onClick={() => setActiveCam(num)} 
                  className={`flex items-center justify-between p-3 rounded border text-[8px] font-black transition-all ${activeCam === num ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-transparent text-[#D4AF37] border-[#D4AF37]/30 hover:border-[#D4AF37]'}`}
                >
                  <span className="tracking-[0.2em]">SOURCE_CAM_0{num}</span>
                  <div className={`w-1.5 h-1.5 rounded-full ${activeCam === num ? 'bg-black' : 'bg-[#047857] animate-pulse'}`} />
                </button>
              ))}
              <div className="mt-4 p-3 bg-white/5 border border-white/5 rounded italic text-[7px] text-white/20 text-center uppercase tracking-widest">
                Scanning Active Nodes...
              </div>
            </div>
          </DashboardCard>

          {/* RESTO DE NODOS (RELLENO TÉCNICO) */}
          <DashboardCard title="Vault Status" />
          <DashboardCard title="Security Node" />
          <DashboardCard title="Cloud Sync" />
          <DashboardCard title="Network Load" className="card-wide" />
          <DashboardCard title="Satellite Link" />
          <DashboardCard title="Encryption Key" />
          <DashboardCard title="Thermal Map" />
          <DashboardCard title="Power Grid" />
          <DashboardCard title="AI Processor" />

        </div>

        {/* FEED OVERLAY */}
        {activeCam && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 lg:p-20">
            <div className="w-full h-full max-w-6xl bg-black border-2 border-[#D4AF37] rounded-3xl overflow-hidden flex flex-col shadow-[0_0_100px_rgba(212,175,55,0.2)]">
              <div className="h-14 border-b border-[#D4AF37]/20 flex items-center justify-between px-8 bg-black">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
                  <span className="text-[#D4AF37] font-black text-[10px] tracking-widest uppercase italic">Live_Feed // Source_0{activeCam}</span>
                </div>
                <button onClick={() => setActiveCam(null)} className="!border border-[#D4AF37]/30 !bg-transparent hover:!bg-[#D4AF37] hover:!text-black text-[9px] px-4 py-1 transition-all rounded font-black">DISCONNECT [X]</button>
              </div>
              <div className="flex-1 relative bg-[#050505] flex items-center justify-center">
                <div className="animate-scan" />
                <span className="text-[#D4AF37] font-mono text-[10px] animate-pulse uppercase tracking-[1em]">Establishing Encrypted Tunnel...</span>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}