"use client";
import React, { useState } from 'react';

// DashboardCard: Estética SpaceX optimizada para el Nieto Laboratory
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
          <span className="w-1 h-1 bg-[#D4AF37] rounded-full shadow-[0_0_5px_#D4AF37]" />
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
      
      {/* SIDEBAR MINIMALISTA */}
      <aside className="hidden lg:flex flex-col w-64 bg-black shrink-0 z-40 border-r border-white/5">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#D4AF37] rounded flex items-center justify-center text-black font-black text-xs shadow-[0_0_15px_rgba(212,175,55,0.3)]">E</div>
            <span className="text-sm font-bold tracking-tighter uppercase italic">Emerald <span className="text-[#D4AF37]">DT</span></span>
          </div>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-1">
          {["Overview", "Inventory", "Drones", "Vault"].map((text, i) => (
            <div key={i} className={`h-10 w-full rounded-lg flex items-center px-4 transition-all cursor-pointer text-[9px] font-black uppercase tracking-widest ${i === 1 ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/10' : 'text-white/40 hover:text-[#D4AF37] hover:bg-white/5'}`}>
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
          
          {/* GRID ESTRUCTURAL */}
          <div className="h-full w-full grid grid-cols-10 grid-rows-6 gap-4">
            
            {/* 1. CAM LINKS */}
            <DashboardCard title="Camera Uplinks" defaultCol="xl:col-span-2" defaultRow="row-span-2">
              <div className="flex flex-col gap-2 h-full">
                {[1, 2, 3].map((num) => (
                  <button 
                    key={num}
                    onClick={() => setActiveCam(num)}
                    className={`
                      w-full py-3 px-4 rounded-lg border text-[9px] font-black transition-all cursor-pointer flex items-center justify-between group
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

            {/* 2. ASSET MATRIX (INVENTARIO MEJORADO) */}
            <DashboardCard title="Asset Matrix" defaultCol="xl:col-span-3" defaultRow="row-span-6">
              <div className="flex flex-col gap-2 h-full overflow-y-auto custom-scrollbar pr-2">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i} 
                    className="group flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-xl cursor-pointer hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 transition-all"
                  >
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-white group-hover:text-[#D4AF37] transition-colors uppercase">
                        Emerald_Item_0{i+1}
                      </span>
                      <span className="text-[7px] text-[#D4AF37]/60 font-black uppercase tracking-widest mt-0.5">Bogotá Certified</span>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-white font-black group-hover:text-[#D4AF37] transition-colors">{120 - i * 5}ct</div>
                      <div className="text-[7px] text-white/30 uppercase font-mono">In Stock</div>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>

            {/* 3. NODOS DE DATOS TÉCNICOS */}
            <DashboardCard title="Revenue Stream" defaultCol="xl:col-span-2">
               <div className="h-full flex items-center">
                  <span className="text-2xl font-black tracking-tighter">$145.200</span>
               </div>
            </DashboardCard>
            
            <DashboardCard title="Uplink Health" defaultCol="xl:col-span-1">
               <div className="h-full flex items-end gap-1 pb-1">
                  {[30, 80, 45, 90].map((h, i) => (
                    <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-[#D4AF37]/30 rounded-t-sm" />
                  ))}
               </div>
            </DashboardCard>

            <DashboardCard title="Vault Status" defaultCol="xl:col-span-2">
               <div className="h-full flex flex-col justify-center">
                  <span className="text-[8px] text-white/40 uppercase mb-1">Security Level</span>
                  <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Maximum [S+]</span>
               </div>
            </DashboardCard>
            
            <DashboardCard title="Operational Logs" defaultCol="xl:col-span-5" defaultRow="row-span-2">
               <div className="font-mono text-[8px] text-white/40 space-y-1">
                  <p><span className="text-[#D4AF37]">[08:42]</span> SYSTEM_READY: NIETO_LAB_ONLINE</p>
                  <p><span className="text-[#D4AF37]">[08:43]</span> ENCRYPTING_DATA_PACKETS... DONE</p>
                  <p><span className="text-[#D4AF37]">[08:45]</span> DRONE_FLEET_01_STANDBY</p>
                  <p><span className="text-[#D4AF37]">[08:47]</span> SCANNING_INVENTORY_MATRIX...</p>
               </div>
            </DashboardCard>

            <DashboardCard title="Security Node" />
            <DashboardCard title="Cloud Sync" />
          </div>

          {/* 4. CAMERA FEED OVERLAY (UX MEJORADA) */}
          {activeCam && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md transition-all duration-300">
              <div className="w-[80%] h-[80%] bg-black border-2 border-[#D4AF37] rounded-3xl shadow-[0_0_80px_rgba(212,175,55,0.25)] overflow-hidden flex flex-col scale-in-center">
                <div className="h-14 bg-black border-b border-[#D4AF37]/20 flex items-center justify-between px-8">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
                    <div className="flex flex-col">
                      <span className="text-white font-black text-[11px] tracking-[0.3em] uppercase">Live Uplink // Source_0{activeCam}</span>
                      <span className="text-[7px] text-white/30 uppercase tracking-widest">Nieto Laboratory Cryptographic Stream</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveCam(null)} 
                    className="text-[#D4AF37] hover:text-white font-black text-xs cursor-pointer px-6 py-2 border border-[#D4AF37]/30 rounded-lg hover:bg-[#D4AF37]/10 transition-all"
                  >
                    DISCONNECT [X]
                  </button>
                </div>
                
                <div className="flex-1 bg-[#050505] relative flex items-center justify-center overflow-hidden">
                  {/* Línea de escaneo animada */}
                  <div className="animate-scan" />
                  
                  {/* Grid de telemetría de fondo */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(212,175,55,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.2)_1px,transparent_1px)] bg-[size:40px_40px]" />
                  
                  <div className="text-[#D4AF37] text-[12px] font-mono animate-pulse tracking-[0.8em] uppercase z-10">
                    Establishing Secure Uplink...
                  </div>
                  
                  {/* Metadatos en las esquinas del video */}
                  <div className="absolute top-6 left-6 text-white/20 font-mono text-[8px] uppercase tracking-widest">ISO 800 // 24FPS</div>
                  <div className="absolute top-6 right-6 text-white/20 font-mono text-[8px] uppercase tracking-widest">4.5K RESOLUTION</div>
                  <div className="absolute bottom-6 left-6 text-white/20 font-mono text-[8px] uppercase tracking-widest italic">Nieto Lab // Bogota Hub</div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}