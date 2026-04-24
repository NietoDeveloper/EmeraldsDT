"use client";
import React, { useState } from 'react';

// DashboardCard optimizada para el Motor Smart-Grid
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
      
      {/* SIDEBAR - Se mantiene fijo, el grid es el que scrollea */}
      <aside className="hidden lg:flex flex-col w-64 bg-black shrink-0 z-40 border-r border-white/5">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#D4AF37] rounded flex items-center justify-center text-black font-black text-xs">E</div>
            <span className="text-sm font-bold tracking-tighter uppercase italic">Emerald <span className="text-[#D4AF37]">DT</span></span>
          </div>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-1">
          {["Overview", "Inventory", "Drones", "Vault", "Analytics", "Network"].map((text, i) => (
            <div key={i} className={`h-10 w-full rounded-lg flex items-center px-4 transition-all cursor-pointer text-[9px] font-black uppercase tracking-widest ${i === 1 ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20' : 'text-white/40 hover:text-[#D4AF37] hover:bg-white/5'}`}>
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

        {/* EL MOTOR SMART-GRID: Aquí ocurre la magia del responsive */}
        <div className="flex-1 overflow-y-auto smart-grid custom-scrollbar">
          
          {/* 1. UPLINKS (TALL) */}
          <DashboardCard title="Camera Uplinks" className="card-tall">
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map((num) => (
                <button key={num} onClick={() => setActiveCam(num)} className={activeCam === num ? '!bg-[#D4AF37] !text-black' : ''}>
                  UPLINK_0{num}
                </button>
              ))}
            </div>
          </DashboardCard>

          {/* 2. ASSET MATRIX (BIG - Ocupa 2x2) */}
          <DashboardCard title="Asset Matrix" className="card-big">
            <div className="space-y-2">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex justify-between p-2 bg-white/5 rounded border border-white/5 hover:border-[#D4AF37]/30 transition-all cursor-pointer group">
                  <span className="text-[9px] font-bold uppercase group-hover:text-[#D4AF37]">EMERALD_RAW_{450 + i}</span>
                  <span className="text-[9px] text-[#D4AF37] font-mono">{(80 - i).toFixed(2)}ct</span>
                </div>
              ))}
            </div>
          </DashboardCard>

          {/* 3. REVENUE (NORMAL) */}
          <DashboardCard title="Revenue Stream">
            <div className="text-2xl font-black tracking-tighter text-white">$145.200</div>
            <div className="text-[7px] text-[#D4AF37] uppercase tracking-[0.2em]">Net Assets Value</div>
          </DashboardCard>

          {/* 4. HEALTH (NORMAL) */}
          <DashboardCard title="System Health">
            <div className="flex items-end gap-1 h-12">
              {[40, 70, 55, 90, 65, 85].map((h, i) => (
                <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-[#D4AF37]/40 rounded-t-sm" />
              ))}
            </div>
          </DashboardCard>

          {/* 5. OPERATIONAL LOGS (WIDE - Ocupa 2 columnas) */}
          <DashboardCard title="Operational Logs" className="card-wide">
            <div className="font-mono text-[8px] text-white/40 space-y-1">
              <p><span className="text-[#D4AF37]">[08:42]</span> SYSTEM_READY: NIETO_LAB_ONLINE</p>
              <p><span className="text-[#D4AF37]">[08:43]</span> ENCRYPTING_DATA_PACKETS... DONE</p>
              <p><span className="text-[#D4AF37]">[08:45]</span> DRONE_FLEET_01_STANDBY</p>
            </div>
          </DashboardCard>

          {/* 6-15. NODOS DE RELLENO TÉCNICO (Mezcla de tamaños) */}
          <DashboardCard title="Vault Status" className="card-tall" />
          <DashboardCard title="Security Node" />
          <DashboardCard title="Cloud Sync" />
          <DashboardCard title="Drone Telemetry" className="card-wide" />
          <DashboardCard title="Network Load" />
          <DashboardCard title="Satellite Link" />
          <DashboardCard title="Encryption Key" />
          <DashboardCard title="Thermal Map" className="card-tall" />
          <DashboardCard title="Power Grid" />
          <DashboardCard title="AI Processor" />

        </div>

        {/* FEED OVERLAY */}
        {activeCam && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 lg:p-20">
            <div className="w-full h-full max-w-6xl bg-black border-2 border-[#D4AF37] rounded-3xl overflow-hidden flex flex-col shadow-[0_0_100px_rgba(212,175,55,0.2)]">
              <div className="h-14 border-b border-[#D4AF37]/20 flex items-center justify-between px-8 bg-black">
                <span className="text-[#D4AF37] font-black text-[10px] tracking-widest uppercase">UPLINK_SOURCE_0{activeCam}</span>
                <button onClick={() => setActiveCam(null)} className="!border-none !bg-transparent hover:!text-white text-[10px]">CLOSE_STREAM [X]</button>
              </div>
              <div className="flex-1 relative bg-[#050505] flex items-center justify-center">
                <div className="animate-scan" />
                <span className="text-[#D4AF37] font-mono text-[10px] animate-pulse uppercase tracking-[1em]">Establishing Connection...</span>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}