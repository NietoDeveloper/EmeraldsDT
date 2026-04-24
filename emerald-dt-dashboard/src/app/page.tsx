"use client";
import React, { useState } from 'react';

// DashboardCard con refinamiento Gold-Space
const DashboardCard = ({ 
  children, 
  className = "", 
  title = "",
  defaultCol = "xl:col-span-1",
  defaultRow = "row-span-1",
  noClickExpand = false


    <div 
      className={`
        bg-black/60 border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border p-4 
        flex flex-col transition-all duration-500 ease-in-out
        hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:border-[#D4AF37] group relative overflow-hidden 
        ${defaultCol} ${defaultRow}
        ${className}
      `}
    >
      {title && (
        <h3 className="text-[9px] font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2 text-[#D4AF37] group-hover:text-white transition-colors">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
          {title}
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

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-[#020202] text-white selection:bg-[#D4AF37]/40 font-sans relative">
      
      {/* BACKGROUND ETHER */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      {/* SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-64 bg-black/80 backdrop-blur-3xl shrink-0 z-40 border-r border-[#D4AF37]/20">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center text-black font-black shadow-[0_0_20px_rgba(212,175,55,0.4)]">E</div>
            <span className="text-xl font-bold tracking-tighter uppercase italic">Emerald <span className="text-[#D4AF37]">DT</span></span>
          </div>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-2">
          {["Overview", "Inventory", "Drones", "Vault", "Analytics"].map((text, i) => (
            <div key={i} className={`h-11 w-full rounded-xl flex items-center px-4 gap-4 transition-all cursor-pointer border ${i === 0 ? 'bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#D4AF37]' : 'text-white/30 border-transparent hover:bg-white/5 hover:text-white'}`}>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{text}</span>
            </div>
          ))}
        </nav>
      </aside>

      <section className="flex-1 flex flex-col h-full relative z-10">
        <header className="h-20 bg-black/40 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-10 shrink-0">
          <div className="flex flex-col">
            <h1 className="text-[12px] font-black uppercase tracking-[0.5em] text-[#D4AF37]">Operational Command</h1>
            <span className="text-[9px] text-white/40 uppercase tracking-widest mt-1">Bogotá Hub // Secure Session</span>
          </div>
        </header>

        <div className="flex-1 p-6 relative overflow-hidden">
          
          {/* GRID PRINCIPAL */}
          <div className="h-full w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-10 grid-rows-6 gap-4">
            
            {/* 1. CAM CONTROL (El 8% del dashboard aprox) */}
            <DashboardCard title="Cam Links" defaultCol="xl:col-span-2" defaultRow="row-span-2">
              <div className="grid grid-cols-1 gap-2 h-full">
                {[1, 2, 3].map((num) => (
                  <button 
                    key={num}
                    onClick={() => setActiveCam(num)}
                    className="w-full flex items-center justify-between px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all group"
                  >
                    <span className="text-[10px] font-mono text-white group-hover:text-[#D4AF37]">UPLINK_0{num}</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full group-hover:shadow-[0_0_8px_#22c55e]" />
                  </button>
                ))}
              </div>
            </DashboardCard>

            {/* RESTO DE COMPONENTES */}
            <DashboardCard title="Revenue Stream" defaultCol="xl:col-span-2" />
            <DashboardCard title="Uplink Node" defaultCol="xl:col-span-2" />
            <DashboardCard title="Asset Matrix" defaultCol="xl:col-span-2" defaultRow="row-span-4" />
            <DashboardCard title="Vault Status" defaultCol="xl:col-span-2" />
            <DashboardCard title="System Logs" defaultCol="xl:col-span-4" defaultRow="row-span-2" />
            <DashboardCard title="Staff" />
            <DashboardCard title="Cloud" />
            <DashboardCard title="AI Meta" defaultCol="xl:col-span-2" />
            <DashboardCard title="Status" />
          </div>

          {/* 2. CAMERA FEED OVERLAY (Ocupa el 25% de la pantalla al activarse) */}
          {activeCam && (
            <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
              <div className="w-[45%] h-[45%] bg-black/90 border-2 border-[#D4AF37] rounded-3xl shadow-[0_0_100px_rgba(212,175,55,0.3)] backdrop-blur-2xl overflow-hidden pointer-events-auto animate-in zoom-in-95 duration-300">
                <div className="h-10 bg-[#D4AF37] flex items-center justify-between px-6">
                  <span className="text-black font-black text-[10px] tracking-widest uppercase">Live Stream // Node_0{activeCam}</span>
                  <button onClick={() => setActiveCam(null)} className="text-black font-black hover:scale-125 transition-transform">✕</button>
                </div>
                <div className="absolute inset-0 top-10 flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                   {/* Inserción de Link de Video */}
                   <div className="text-[#D4AF37] text-[12px] font-mono animate-pulse">
                     ESTABLISHING SECURE CONNECTION...
                   </div>
                   {/* <iframe src={camLinks[activeCam-1]} className="w-full h-full" /> */}
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center pointer-events-none">
                  <span className="text-white/20 text-[8px] font-mono tracking-tighter">SEC_LEVEL: MAXIMUM</span>
                  <div className="flex gap-2">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping" />
                    <span className="text-white/40 text-[8px] font-mono uppercase">Recording</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}