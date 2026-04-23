import React from 'react';

// DashboardCard: El átomo inteligente con lógica de expansión visual
const DashboardCard = ({ 
  children, 
  className = "", 
  title = "",
  dark = false,
  colSpan = "col-span-1",
  rowSpan = "row-span-1"
}: { 
  children: React.ReactNode, 
  className?: string, 
  title?: string,
  dark?: boolean,
  colSpan?: string,
  rowSpan?: string
}) => (
  <div className={`
    ${dark ? 'bg-black border-gold/30' : 'bg-white border-black/5'} 
    ${colSpan} ${rowSpan}
    rounded-2xl shadow-sm border p-4 
    flex flex-col transition-all duration-500 hover:shadow-2xl 
    hover:border-gold/50 group relative overflow-hidden active:scale-[0.98] cursor-pointer
  `}>
    {title && (
      <h3 className={`text-[9px] font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-2 ${dark ? 'text-gold/60' : 'text-black/40'}`}>
        <span className="w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)] opacity-0 group-hover:opacity-100 transition-opacity" />
        {title}
      </h3>
    )}
    <div className="flex-1 relative overflow-hidden">
      {children}
    </div>
  </div>
);

export default function DashboardPage() {
  return (
    <main className="flex h-screen w-screen overflow-hidden bg-[#DCDCDC] text-black selection:bg-gold/30 font-sans">
      
      {/* --- SIDEBAR ESTRATÉGICO --- */}
      <aside className="hidden lg:flex flex-col w-64 bg-black text-white shrink-0 z-20 border-r border-white/10">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gold rounded-lg flex items-center justify-center text-black font-black">E</div>
            <span className="text-lg font-bold tracking-tighter uppercase">Emerald <span className="text-gold">DT</span></span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {["Overview", "Inventory", "Drones", "Vault", "Analytics"].map((text, i) => (
            <div key={i} className={`h-11 w-full rounded-xl flex items-center px-4 gap-4 transition-all cursor-pointer ${i === 0 ? 'bg-gold/10 text-gold border border-gold/20' : 'text-white/40 hover:bg-white/5'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-gold shadow-[0_0_8px_#D4AF37]' : 'bg-white/20'}`} />
              <span className="text-[10px] font-bold uppercase tracking-widest">{text}</span>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
            <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center text-black font-black text-[10px]">MN</div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-white uppercase">M. Nieto</span>
              <span className="text-[8px] text-gold/60 font-black tracking-tighter uppercase">Bogotá Hub #1</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- ÁREA DE TRABAJO PRINCIPAL (GRID DE 15 ESPACIOS) --- */}
      <section className="flex-1 flex flex-col h-full relative">
        <header className="h-16 bg-white/40 backdrop-blur-md border-b border-black/5 flex items-center justify-between px-8 z-10 shrink-0">
          <div className="flex flex-col">
            <h1 className="text-[11px] font-black uppercase tracking-[0.4em]">Operational Command</h1>
            <span className="text-[9px] text-black/40 font-bold uppercase tracking-widest mt-0.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Live Status: Verified
            </span>
          </div>
          <button className="px-5 py-2 bg-black text-white text-[9px] font-black rounded-full hover:bg-gold hover:text-black transition-all uppercase tracking-widest shadow-xl">
            Execute Command
          </button>
        </header>

        {/* --- GRID DINÁMICO (LA MATRIZ) --- */}
        <div className="flex-1 p-4 overflow-hidden bg-[#DCDCDC]">
          <div className="h-full w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-10 grid-rows-6 gap-3 grid-flow-dense">
            
            {/* 1. HEART: DIGITAL TWIN STREAM (4x4) */}
            <DashboardCard title="Live Digital Twin Feed" dark={true} colSpan="xl:col-span-4" rowSpan="row-span-4">
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,_#222_0%,_#000_100%)] flex items-center justify-center">
                 <div className="relative group">
                    <div className="w-40 h-40 border border-gold/5 rounded-full animate-[spin_20s_linear_infinite] absolute -inset-10" />
                    <span className="text-white/5 font-black text-9xl tracking-tighter uppercase transition-all group-hover:text-gold/5">DT</span>
                 </div>
              </div>
            </DashboardCard>

            {/* 2. ASSET DISTRIBUTION (2x3) */}
            <DashboardCard title="Asset Matrix" colSpan="xl:col-span-2" rowSpan="row-span-3">
              <div className="space-y-2 custom-scrollbar overflow-y-auto h-full pr-1">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-black/[0.03] rounded-lg border border-black/5">
                    <span className="text-[10px] font-mono font-bold">SKU-0{i+1}</span>
                    <span className="text-[10px] text-gold font-black">ACTIVE</span>
                  </div>
                ))}
              </div>
            </DashboardCard>

            {/* 3. REVENUE (2x1) */}
            <DashboardCard title="Revenue Stream" colSpan="xl:col-span-2" rowSpan="row-span-1">
               <div className="flex flex-col justify-center h-full">
                 <span className="text-3xl font-black tracking-tighter leading-none">$14,500.00</span>
               </div>
            </DashboardCard>

            {/* 4. PERFORMANCE (2x1) */}
            <DashboardCard title="Node Performance" colSpan="xl:col-span-2" rowSpan="row-span-1">
              <div className="flex items-end gap-1 h-full pb-2">
                {[40, 70, 45, 90, 65, 80, 30, 100].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-black/5 rounded-t-sm group-hover:bg-gold/40 transition-all" />
                ))}
              </div>
            </DashboardCard>

            {/* 5. COMMAND LOG (2x2) */}
            <DashboardCard title="Command History" colSpan="xl:col-span-2" rowSpan="row-span-2">
              <div className="text-[8px] font-mono text-black/40 space-y-1">
                <p>{`> Initializing Nieto Lab...`}</p>
                <p className="text-green-600">{`> Security protocols active`}</p>
                <p>{`> Bogota Node connected`}</p>
              </div>
            </DashboardCard>

            {/* 6-15. AUXILIARY SLOTS (Distribuidos para llenar la matriz) */}
            <DashboardCard title="Staff" />
            <DashboardCard title="Vault" dark={true} />
            <DashboardCard title="Sync" />
            <DashboardCard title="Cloud" />
            <DashboardCard title="AI Meta" colSpan="xl:col-span-2" />
            <DashboardCard title="Alerts" />
            <DashboardCard title="Weather" />
            <DashboardCard title="Export" />
            <DashboardCard title="Audit" dark={true} />
            <DashboardCard title="Status" />

          </div>
        </div>
      </section>
    </main>
  );
}