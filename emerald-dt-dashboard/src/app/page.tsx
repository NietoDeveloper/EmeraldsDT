"use client";
import React, { useState } from 'react';

// DashboardCard: Refactorizado con Hovers Dorados y Textos Blancos
const DashboardCard = ({ 
  children, 
  className = "", 
  title = "",
  dark = true, // Forzamos dark por defecto para el look espacial
  defaultCol = "xl:col-span-1",
  defaultRow = "row-span-1",
  expandCol = "xl:col-span-2",
  expandRow = "row-span-2",
  noClickExpand = false
}: { 
  children: React.ReactNode, 
  className?: string, 
  title?: string,
  dark?: boolean,
  defaultCol?: string,
  defaultRow?: string,
  expandCol?: string,
  expandRow?: string,
  noClickExpand?: boolean
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      onClick={() => !noClickExpand && setIsExpanded(!isExpanded)}
      className={`
        ${dark ? 'bg-black/60 border-white/10' : 'bg-zinc-900/40 border-white/5'} 
        ${isExpanded ? `${expandCol} ${expandRow} z-30 scale-[1.01]` : `${defaultCol} ${defaultRow} z-10`}
        backdrop-blur-xl rounded-2xl shadow-2xl border p-4 
        flex flex-col transition-all duration-500 ease-in-out
        hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:border-[#D4AF37] group relative overflow-hidden 
        ${!noClickExpand ? 'cursor-pointer active:scale-[0.98]' : ''}
        ${className}
      `}
    >
      {title && (
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center justify-between text-[#D4AF37] group-hover:text-white transition-colors">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px_#D4AF37] ${isExpanded ? 'bg-white animate-pulse' : 'bg-[#D4AF37]'}`} />
            {title}
          </div>
          {isExpanded && <span className="text-[7px] border border-[#D4AF37] px-2 py-0.5 rounded-full text-[#D4AF37]">SYSTEM_ACTIVE</span>}
        </h3>
      )}
      <div className="flex-1 relative overflow-hidden text-white/90">
        {children}
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const [activeCam, setActiveCam] = useState<number | null>(null);

  // Links para ajustar video
  const camLinks = [
    "https://stream.provider.com/cam1",
    "https://stream.provider.com/cam2",
    "https://stream.provider.com/cam3"
  ];

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-[#020202] text-white selection:bg-[#D4AF37]/40 font-sans relative">
      
      {/* CAPA ESPACIAL (Nebulosa y Estrellas) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[150px] opacity-50" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[120px] opacity-30" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>

      {/* --- SIDEBAR ORO/NEGRO --- */}
      <aside className="hidden lg:flex flex-col w-64 bg-black/80 backdrop-blur-3xl text-white shrink-0 z-40 border-r border-[#D4AF37]/20">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center text-black font-black shadow-[0_0_20px_rgba(212,175,55,0.5)] group-hover:rotate-6 transition-all">E</div>
            <span className="text-xl font-bold tracking-tighter uppercase italic text-white group-hover:text-[#D4AF37]">Emerald <span className="text-[#D4AF37] group-hover:text-white">DT</span></span>
          </div>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-4">
          {["Overview", "Inventory", "Drones", "Vault", "Analytics"].map((text, i) => (
            <div key={i} className={`h-12 w-full rounded-xl flex items-center px-4 gap-4 transition-all cursor-pointer border group ${i === 0 ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'text-white/40 border-transparent hover:border-[#D4AF37]/40 hover:text-white hover:bg-[#D4AF37]/5'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-black' : 'bg-[#D4AF37] opacity-20 group-hover:opacity-100 shadow-[0_0_5px_#D4AF37]'}`} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{text}</span>
            </div>
          ))}
        </nav>
      </aside>

      <section className="flex-1 flex flex-col h-full relative z-10">
        <header className="h-20 bg-black/40 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-10 shrink-0">
          <div className="flex flex-col">
            <h1 className="text-[14px] font-black uppercase tracking-[0.6em] text-[#D4AF37] drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">Operational Command</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
              <span className="text-[9px] text-white/60 font-black uppercase tracking-[0.2em]">Bogotá Node • Nieto Laboratory</span>
            </div>
          </div>
          <button className="px-8 py-3 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] text-[10px] font-black rounded-full hover:bg-[#D4AF37] hover:text-black hover:scale-105 transition-all uppercase tracking-widest">
            Execute Sync
          </button>
        </header>

        <div className="flex-1 p-6 overflow-hidden">
          <div className="h-full w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-10 grid-rows-6 gap-4 grid-flow-dense">
            
            {/* HUB DE CÁMARAS */}
            <DashboardCard title="Visual Telemetry Hub" defaultCol="xl:col-span-4" defaultRow="row-span-4" expandCol="xl:col-span-6" noClickExpand={activeCam !== null}>
              <div className="w-full h-full bg-[#050505] flex flex-col rounded-xl overflow-hidden border border-[#D4AF37]/10">
                 <div className="flex-1 relative bg-black flex items-center justify-center border-b border-white/5">
                    {activeCam !== null ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                        <div className="text-[#D4AF37] text-[11px] font-mono animate-pulse tracking-widest">
                          [ LIVE_FEED // CAM_0{activeCam} ]
                        </div>
                        {/* El iframe o video iría aquí: src={camLinks[activeCam - 1]} */}
                      </div>
                    ) : (
                      <div className="text-center group-hover:scale-110 transition-transform">
                        <span className="text-[#D4AF37]/5 font-black text-[120px] tracking-tighter uppercase italic block">NIETO</span>
                        <span className="text-white/20 text-[10px] tracking-[1em] uppercase -mt-10 block">Select Stream</span>
                      </div>
                    )}
                 </div>
                 <div className="h-16 bg-white/[0.02] flex items-center justify-center gap-6 px-4">
                    {[1, 2, 3].map((num) => (
                      <button 
                        key={num}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCam(activeCam === num ? null : num);
                        }}
                        className={`px-6 h-9 rounded-md border text-[10px] font-black uppercase tracking-tighter transition-all
                        ${activeCam === num ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-black text-white/40 border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37]'}`}
                      >
                        CAM_0{num}
                      </button>
                    ))}
                 </div>
              </div>
            </DashboardCard>

            {/* INVENTORY DORADO */}
            <DashboardCard title="Asset Matrix" defaultCol="xl:col-span-2" defaultRow="row-span-3">
              <div className="flex flex-col h-full space-y-2 custom-scrollbar overflow-y-auto pr-1">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/[0.03] rounded-xl border border-white/5 hover:border-[#D4AF37]/50 transition-all group/item">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono font-bold text-white uppercase group-hover/item:text-[#D4AF37]">EM-MOD-{i+1}</span>
                      <span className="text-[7px] text-white/30 font-black">CERTIFIED_MUZO</span>
                    </div>
                    <span className="text-[11px] text-[#D4AF37] font-black bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">{25 - i}u</span>
                  </div>
                ))}
              </div>
            </DashboardCard>

            {/* REVENUE */}
            <DashboardCard title="Revenue Stream" defaultCol="xl:col-span-2">
               <div className="flex flex-col justify-center h-full">
                 <span className="text-[11px] text-[#D4AF37] uppercase font-black tracking-widest mb-2 shadow-sm">Total Valuation</span>
                 <span className="text-4xl font-black tracking-tighter text-white drop-shadow-2xl">$14,500<span className="text-[#D4AF37]">.00</span></span>
               </div>
            </DashboardCard>

            {/* PERFORMANCE */}
            <DashboardCard title="Uplink Node" defaultCol="xl:col-span-2">
              <div className="flex items-end gap-1.5 h-full pb-2">
                {[40, 70, 45, 90, 65, 80, 30, 100, 60, 45].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-white/10 rounded-t-sm group-hover:bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0)] group-hover:shadow-[0_0_10px_#D4AF37] transition-all duration-700" />
                ))}
              </div>
            </DashboardCard>

            {/* STATUS LOGS */}
            <DashboardCard title="System Logs" defaultCol="xl:col-span-2" defaultRow="row-span-2">
              <div className="text-[9px] font-mono text-white/50 space-y-2">
                <p className="text-[#D4AF37] animate-pulse">{`> [OK] ENCRYPTED_UPLINK`}</p>
                <p>{`> [INFO] HUB_BOGOTA_CONNECTED`}</p>
                <p className="text-blue-400">{`> [VEO] AI_GENERATION_READY`}</p>
              </div>
            </DashboardCard>

            {/* AUXILIARY SLOTS */}
            <DashboardCard title="Vault" />
            <DashboardCard title="Staff" />
            <DashboardCard title="Cloud" />
            <DashboardCard title="Alerts" className="hover:border-red-500/50" />
            <DashboardCard title="Status" />
          </div>
        </div>
      </section>
    </main>
  );
}