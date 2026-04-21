import React from 'react';

// Sub-componente para abstraer el estilo de las tarjetas y mantener el DRY
const DashboardCard = ({ children, className = "", title = "" }: { children: React.ReactNode, className?: string, title?: string }) => (
  <div className={`bg-card rounded-2xl shadow-sm border border-black/5 p-5 flex flex-col ${className}`}>
    {title && <h3 className="text-[10px] font-bold text-black/40 uppercase tracking-[0.15em] mb-3">{title}</h3>}
    <div className="flex-1 relative overflow-hidden">
      {children}
    </div>
  </div>
);

export default function DashboardPage() {
  return (
    <main className="flex h-screen w-screen overflow-hidden bg-main text-headingColor selection:bg-gold/30">
      
      {/* --- SIDEBAR ESTRATÉGICO --- */}
      <aside className="hidden lg:flex flex-col w-72 bg-black text-white shrink-0">
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center text-black font-black">E</div>
            <span className="text-xl font-bold tracking-tighter text-white">EMERALD <span className="text-gold">DT</span></span>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 w-full bg-white/5 border border-white/5 rounded-xl flex items-center px-4 gap-3 group hover:bg-gold/10 transition-all cursor-pointer">
              <div className="w-5 h-5 rounded bg-white/10 group-hover:bg-gold/40" />
              <div className="h-2 w-24 bg-white/10 rounded group-hover:bg-gold/20" />
            </div>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold to-yellowColor shadow-lg shadow-gold/20" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white leading-none">M. Nieto</span>
              <span className="text-[10px] text-white/40 uppercase font-medium mt-1">Senior Architect</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- ÁREA DE TRABAJO PRINCIPAL --- */}
      <section className="flex-1 flex flex-col min-w-[310px] h-full relative">
        
        {/* HEADER FLOTANTE */}
        <header className="h-20 shrink-0 bg-white/80 backdrop-blur-md border-b border-black/5 flex items-center justify-between px-6 lg:px-10 z-10">
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight">System Overview</h1>
            <p className="text-[10px] text-black/50 font-medium uppercase tracking-widest">Bogotá, CO • Live Hub</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] font-bold text-green-500 uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Operational
              </span>
              <span className="text-[10px] text-black/40 font-mono tracking-tighter">LATENCY: 24ms</span>
            </div>
            <button className="p-2.5 bg-black text-white rounded-xl hover:bg-gold hover:text-black transition-colors duration-300">
              <div className="w-5 h-5 flex flex-col justify-between items-center py-1">
                <span className="w-full h-[2px] bg-current" />
                <span className="w-full h-[2px] bg-current" />
              </div>
            </button>
          </div>
        </header>

        {/* --- GRID DINÁMICO (Sin Scroll) --- */}
        <div className="flex-1 p-4 lg:p-8 overflow-hidden overflow-y-auto lg:overflow-hidden custom-scrollbar">
          <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-none lg:grid-rows-4 gap-4 lg:gap-6">
            
            {/* KPI: Sales */}
            <DashboardCard title="Real-time Revenue" className="col-span-1 lg:col-span-1 row-span-1">
              <div className="flex flex-col justify-end h-full">
                <span className="text-4xl font-black tracking-tighter">$12,840</span>
                <span className="text-xs text-green-600 font-bold mt-1">+14.2% today</span>
              </div>
            </DashboardCard>

            {/* KPI: Orders */}
            <DashboardCard title="Active Shipments" className="col-span-1 lg:col-span-1 row-span-1">
              <div className="flex flex-col justify-end h-full font-mono text-2xl font-bold">
                48 / <span className="text-black/30 text-lg">150</span>
              </div>
            </DashboardCard>

            {/* MAIN FEATURE: Digital Twin Viewport */}
            <DashboardCard className="col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-3 bg-black !p-0 border-2 border-gold/40 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 flex flex-col justify-end p-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Live Digital Twin Feed</span>
                </div>
              </div>
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-black flex items-center justify-center italic text-white/10 font-black text-6xl select-none">
                DT VIEW
              </div>
            </DashboardCard>

            {/* SECONDARY: Inventory Matrix */}
            <DashboardCard title="Inventory Flow" className="col-span-1 lg:col-span-1 lg:row-span-3">
              <div className="space-y-3 mt-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-12 w-full bg-gainsboro/50 rounded-xl border border-black/[0.03]" />
                ))}
              </div>
            </DashboardCard>

            {/* ANALYTICS: System Performance */}
            <DashboardCard title="Performance Analytics" className="col-span-1 md:col-span-2 lg:col-span-3 lg:row-span-1">
              <div className="flex items-center justify-between h-full">
                <div className="flex gap-2 items-end flex-1 max-w-xs h-12">
                   {[40, 70, 45, 90, 65, 80, 30].map((h, i) => (
                     <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-black/10 rounded-t-sm group-hover:bg-gold transition-all" />
                   ))}
                </div>
              </div>
            </DashboardCard>

          </div>
        </div>
      </section>
    </main>
  );
}