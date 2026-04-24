"use client";
import React, { useState } from 'react';

// DashboardCard: Estética SpaceX optimizada
const DashboardCard = ({ 
  children, 
  className = "", 
  title = "",
  defaultCol = "xl:col-span-1",
  defaultRow = "row-span-1",
}: { 
  children: React.ReactNode, 
  className?: string, 
  title?: string,
  defaultCol?: string,
  defaultRow?: string,
}) => {
  return (
    <div 
      className={`
        bg-black border border-white/10 rounded-2xl p-4 
        flex flex-col transition-all duration-500 ease-in-out
        hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] hover:border-[#D4AF37]/40 group relative overflow-hidden 
        ${defaultCol} ${defaultRow}
        ${className}
      `}
    >
      {title && (
        <h3 className="text-[9px] font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-2 text-[#D4AF37]">
          <span className="w-1 h-1 bg-[#D4AF37] rounded-full" />
          {title}
        </h3>
      )}
      <div className="flex-1 relative overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const [activeCam, setActiveCam] = useState<number | null>(null);

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-[#020202] text-white font-sans relative">
      
      {/* SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-64 bg-black shrink-0 z-40 border-r border-white/5">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#D4AF37] rounded flex items-center justify-center text-black font-black text-xs shadow-[0_0_15px_rgba(212,175,55,0.3)]">E</div>
            <span className="text-sm font-bold tracking-tighter uppercase italic">Emerald <span className="text-[#D4AF37]">DT</span></span>
          </div>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-1">
          {["Overview", "Inventory", "Drones", "Vault"].map((text, i) => (
            <div key={i} className={`h-10 w-full rounded-lg flex items-center px-4 transition-all cursor-pointer text-[9px] font-black uppercase tracking-widest ${i === 1 ? 'bg-[#D4AF37] text-black' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
              {text}
            </div>
          ))}
        </nav>
      </aside>

      <section className="flex-1 flex flex-col h-full relative z-10">
        <header className="h-16 border-b border-white/5 flex items-center px-8 shrink-0">
          <h1 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37]">
            Panel de control Emerald DT
          </h1>
        </header>

        <div className="flex-1 p-6 relative">
          
          <div className="h-full w-full grid grid-cols-10 grid-rows-6 gap-4">
            
            {/* 1. CAM LINKS: BOTONES NEGROS / LETRAS DORADAS */}
            <DashboardCard title="Camera Uplinks" defaultCol="xl:col-span-2" defaultRow="row-span-2">
              <div className="flex flex-col gap-2 h-full">
                {[1, 2, 3].map((num) => (
                  <button 
                    key={num}
                    onClick={() => setActiveCam(num)}
                    className={`
                      w-full py-3 px-4 rounded-lg border text-[9px] font-black transition-all cursor-pointer flex items-center justify-between
                      ${activeCam === num 
                        ? 'bg-[#D4AF37] text-black border-[#D4AF37]' 
                        : 'bg-black text-[#D4AF37] border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]'}
                    `}
                  >
                    <span>UPLINK_0{num}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${activeCam === num ? 'bg-black' : 'bg-green-500 animate-pulse'}`} />
                  </button>
                ))}
              </div>
            </DashboardCard>

            {/* 2. ASSET MATRIX (INVENTARIO): TEXTO BLANCO / HOVER GOLD */}
            <DashboardCard title="Asset Matrix" defaultCol="xl:col-span-3" defaultRow="row-span-6">
              <div className="flex flex-col gap-2 h-full overflow-y-auto custom-scrollbar pr-2">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i} 
                    className="group flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-xl cursor-pointer hover:border-[#D4AF37]/50 transition-all"
                  >
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-white group-hover:text-[#D4AF37] transition-colors uppercase">
                        Emerald_Item_0{i+1}
                      </span>
                      <span className="text-[7px] text-[#D4AF37]/60 font-black uppercase tracking-widest mt-0.5">Premium Certified</span>
                    </div>
                    <div className="text-right">
             
            
    </main>
  );
}