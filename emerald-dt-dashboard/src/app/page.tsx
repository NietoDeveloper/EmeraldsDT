import React from 'react';

// Sub-componente optimizado con transiciones suaves
const DashboardCard = ({ 
  children, 
  className = "", 
  title = "" 
}: { 
  children: React.ReactNode, 
  className?: string, 
  title?: string 
}) => (
  <div className={`
    bg-card rounded-2xl shadow-sm border border-black/5 p-5 
    flex flex-col transition-all duration-300 hover:shadow-md 
    hover:border-black/10 group ${className}
  `}>
    {title && (
      <h3 className="text-[10px] font-bold text-black/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
        <span className="w-1 h-1 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
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
    <main className="flex h-screen w-screen overflow-hidden bg-main text-headingColor selection:bg-gold/30">
      
      {/* --- SIDEBAR ESTRATÉGICO --- */}
      <aside className="hidden lg:flex flex-col w-72 bg-black text-white shrink-0 z-20">
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center text-black font-black shadow-lg shadow-gold/10">
              E
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">
              EMERALD <span className="text-gold uppercase">DT</span>
            </span>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
          {["Dashboard", "Inventory", "Live Feed", "Analytics", "Settings"].map((text, i) => (
            <div 
              key={i} 
              className="h-12 w-full bg-white/5 border border-white/5 rounded-xl flex items-center px-4 gap-3 group hover:bg-gold/10 hover:border-gold/20 transition-all cursor-pointer"
            >
              <div className="w-5 h-5 rounded bg-white/10 group-hover:bg-gold group-hover:shadow-[0_0_10px_rgba(255,215,0,0.4)] transition-all" />
              <span className="text-xs font-bold text-white/60 group-hover:text-white transition-colors uppercase tracking-widest">{text}</span>
            </div>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold to-yellowColor shadow-lg shadow-gold/20 flex items-center justify-center text-black font-bold">
              MN
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white leading-none">M. Nieto</span>
              <span className="text-[10px] text-white/40 uppercase font-medium mt-1 tracking-tighter">Architect • Colombia #1</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- ÁREA DE TRABAJO PRINCIPAL --- */}
      <section className="flex-1 flex flex-col min-w-[310px] h-full relative">
        
        {/* HEADER FLOTANTE */}
        <header className="h-20 shrink-0 bg-white/80 backdrop-blur-md border-b border-black/5 flex items-center justify-between px-6 lg:px-10 z-10">
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight uppercase">System Overview</h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-[10px] text-black/50 font-medium uppercase tracking-widest">Live Hub • Bogotá, CO</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] font-bold text-black uppercase tracking-tighter">
                Server Status: <span className="text-green-600">Optimal</span>
              </span>
              <span className="text-[10px] text-black/40 font-mono tracking-tighter uppercase">Latency: 24ms</span>
            </div>
            <button className="px-5 py-2.5 bg-black text-white text-[10px] font-bold rounded-xl hover:bg-gold hover:text-black transition-all duration-300 uppercase tracking-widest border border-black shadow-lg shadow-black/5">
              Command Log
            </button>
          </div>
        </header>

        {/* --- GRID DINÁMICO --- */}
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto lg:overflow-hidden custom-scrollbar bg-[#F5F5F5]">
          <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-4 gap-4 lg:gap-6">
            
            {/* KPI: Sales */}
            <DashboardCard title="Real-time Revenue" className="col-span-1 lg:col-span-1 row-span-1">
              <div className="flex flex-col justify-end h-full">
                <span className="text-4xl font-black tracking-tighter leading-none">$12,840</span>
                <div className="flex items-center gap-1.5 mt-2">
                   <span className="px-1.5 py-0.5 rounded bg-green-100 text-green-700 text-[9px] font-black">+14.2%</span>
                   <span className="text-[9px] text-black/40 font-bold uppercase">vs yesterday</span>
                </div>
              </div>
            </DashboardCard>

            {/* KPI: Orders */}
            <DashboardCard title="Active Operations" className="col-span-1 lg:col-span-1 row-span-1">
              <div className="flex flex-col justify-end h-full">
                <span className="text-4xl font-black tracking-tighter leading-none">48 <span className="text-black/20 text-xl font-medium">/ 150</span></span>
                <div className="w-full bg-black/5 h-1.5 rounded-full mt-3 overflow-hidden">
                   <div className="bg-gold h-full w-[32%] rounded-full shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
                </div>
              </div>
            </DashboardCard>

            {/* MAIN FEATURE: Digital Twin Viewport */}
            <DashboardCard className="col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-3 bg-black !p-0 border-2 border-gold/40 shadow-2xl shadow-gold/5 relative">
   
