"use client";
import React, { useState } from 'react';

// DashboardCard: Ahora recibe 'variant' para controlar su tamaño en el smart-grid
const DashboardCard = ({ 
  children, 
  className = "", 
  title = "",
  variant = "default", // default, wide, tall, big
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
        bg-black border border-white/10 rounded-2xl p-3 
        flex flex-col transition-all duration-500 ease-in-out
        hover:shadow-[0_0_30px_rgba(212,175,55,0.05)] hover:border-[#D4AF37]/40 group relative overflow-hidden 
        ${sizeClasses[variant]}
        ${className}
      `}
    >
      {title && (
        <h3 className="text-[8px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2 text-[#D4AF37] shrink-0">
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
      
      {/* SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-60 bg-black shrink-0 z-40 border-r border-white/5">
        <div className="p-6 border-b border-white/5 text-center">
          <span className="text-xs font-bold tracking-tighter uppercase italic">
            Emerald <span className="text-[#D4AF37]">DT</span>
          </span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {["Overview", "Inventory", "Drones", "Vault"].map((text, i) => (
            <div key={i} className={`h-9 w-full rounded-lg flex items-center px-4 transition-all cursor-pointer text-[8px] font-black uppercase tracking-[0.2em] ${i === 0 ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/10' : 'text-white/40 hover:text-[#D4AF37] hover:bg-white/5'}`}>
              {text}
            </div>
          ))}
        </nav>
      </aside>

      <section className="flex-1 flex flex-col h-full relative overflow-hidden">
        <header className="h-14 border-b border-white/5 flex items-center px-8 shrink-0 justify-between">
          <h1 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">
            Nieto Laboratory // Control Center
          </h1>
          <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest">
            Lat: 4.7110° N // Lon: 74.0721° W
          </div>
        </header>

        {/* EL MOTOR DEL GRID: smart-grid definido en style.css */}
        <div className="flex-1 p-4 smart-grid overflow-hidden h-full">
          
          {/* 1. CAM LINKS (TALL) */}
          <DashboardCard title="Uplinks" variant="tall">
            <div className="flex flex-col gap-1.5 h-full">
              {[1, 2, 3].map((num) => (
                <button 
                  key={num}
                  onClick={() => setActiveCam(num)}
                  className={`
                    w-full py-2.5 px-3 rounded-lg border text-[8px] font-black transition-all cursor-pointer flex items-center justify-between
                    ${activeCam === num ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-black text-[#D4AF37] border-[#D4AF37]/20 hover:border-[#D4AF37]'}
                  `}
                >
                  <span>UPLINK_0{num}</span>
                  <div className={`w-1 h-1 rounded-full ${activeCam === num ? 'bg-black' : 'bg-green-500 animate-pulse'}`} />
                </button>
              ))}
            </div>
          </DashboardCard>

          {/* 2. ASSET MATRIX (BIG) */}
          <DashboardCard title="Asset Matrix" variant="big">
            <div className="flex flex-col gap-1.5 h-full overflow-y-auto custom-scrollbar pr-1">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-white/5 border border-white/5 rounded-xl hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5 transition-all">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-white uppercase italic">EMERALD_0{i+1}</span>
                    <span className="text-[6px] text-[#D4AF37]/60 font-black uppercase tracking-widest mt-0.5">Bogotá Hub</span>
                  </div>
                  <div className="text-[9px] text-white font-black">{120 - i * 5}ct</div>
                </div>
              ))}
            </div>
          </DashboardCard>

          {/* 3. DATOS RÁPIDOS */}
          <DashboardCard title="Revenue">
            <div className="h-full flex items-center justify-center">
              <span className="text-xl font-black tracking-tighter">$145.2K</span>
            </div>
          </DashboardCard>
          
          <DashboardCard title="Telemetry">
            <div className="h-full flex items-end gap-1 pb-1">
              {[40, 70, 45, 90, 60, 80].map((h, i) => (
                <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-[#D4AF37]/20 rounded-t-sm" />
              ))}
            </div>
          </DashboardCard>

          {/* 4. LOGS (WIDE) */}
          <DashboardCard title="Operational Logs" variant="wide">
             <div className="font-mono text-[7px] text-white/30 space-y-0.5">
                <p><span className="text-[#D4AF37]">[08:42]</span> NIETO_LAB_ONLINE</p>
                <p><span className="text-[#D4AF37]">[08:43]</span> ENCRYPT_DATA: OK</p>
                <p><span className="text-[#D4AF37]">[08:45]</span> DRONE_FLEET_STANDBY</p>
             </div>
          </DashboardCard>

          {/* 5. RESTO DE COMPONENTES PARA COMPLETAR LOS 15 */}
          {["Vault", "Security", "Network", "Cloud", "Drones", "AI Sync", "Matrix 2", "Encryption", "Power"].map((name, i) => (
            <DashboardCard key={i} title={name} />
          ))}

        </div>

        {/* OVERLAY DE VIDEO (SIN CAMBIOS, SOLO ESTÉTICA) */}
        {activeCam && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-10">
            <div className="w-full h-full max-w-5xl bg-black border border-[#D4AF37] rounded-3xl overflow-hidden flex flex-col shadow-[0_0_100px_rgba(212,175,55,0.15)]">
              <div className="h-12 border-b border-[#D4AF37]/20 flex items-center justify-between px-8 bg-black">
                <span className="text-white font-black text-[9px] tracking-[0.3em] uppercase">Uplink Source_0{activeCam}</span>
                <button onClick={() => setActiveCam(null)} className="text-[#D4AF37] hover:text-white font-black text-[9px] transition-colors">DISCONNECT [X]</button>
              </div>
              <div className="flex-1 bg-[#050505] relative flex items-center justify-center overflow-hidden">
                <div className="animate-scan" />
                <div className="text-[#D4AF37] text-[10px] font-mono animate-pulse tracking-[1em] uppercase">Secure Stream Active</div>
              </div>
            </div>
          </div>
        )}

      </section>
    </main>
  );
}