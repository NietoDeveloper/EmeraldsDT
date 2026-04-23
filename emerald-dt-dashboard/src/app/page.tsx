import React from 'react';

// DashboardCard: El átomo de la interfaz con hover effects y bordes dorados sutiles
const DashboardCard = ({ 
  children, 
  className = "", 
  title = "",
  dark = false
}: { 
  children: React.ReactNode, 
  className?: string, 
  title?: string,
  dark?: boolean
}) => (
  <div className={`
    ${dark ? 'bg-black border-gold/30' : 'bg-white border-black/5'} 
    rounded-2xl shadow-sm border p-5 
    flex flex-col transition-all duration-500 hover:shadow-xl 
    hover:border-gold/50 group relative overflow-hidden ${className}
  `}>
    {title && (
      <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2 ${dark ? 'text-gold/60' : 'text-black/40'}`}>
        <span className="w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)] opacity-0 group-hover:opacity-100 transition-opacity" />
        {title}
      </h3>
    )}
    <div className="flex-1 relative">
      {children}
    </div>
  </div>
);

export default function DashboardPage() {
  return (
    <main className="flex h-screen w-screen overflow-hidden bg-[#DCDCDC] text-black selection:bg-gold/30">
      
      {/* --- SIDEBAR: NIETO LABORATORY CONTROL --- */}
      <aside className="hidden lg:flex flex-col w-72 bg-black text-white shrink-0 z-20 border-r border-white/10">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center text-black font-black shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              E
            </div>
            <span className="text-xl font-bold tracking-tighter">
              EMERALD <span className="text-gold">DT</span>
            </span>
          </div>
        </div>
        
        <nav className="flex-1 px-6 space-y-2">
          {["Dashboard", "Inventory", "Live Feed", "Analytics", "Settings"].map((text, i) => (
            <div 
              key={i} 
              className={`h-12 w-full rounded-xl flex items-center px-4 gap-4 group transition-all cursor-pointer border ${i === 0 ? 'bg-gold/10 border-gold/20 text-white' : 'bg-transparent border-transparent text-white/50 hover:bg-white/5'}`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-gold shadow-[0_0_10px_#D4AF37]' : 'bg-white/20 group-hover:bg-gold'} transition-all`} />
              <span className="text-[11px] font-bold uppercase tracking-widest">{text}</span>
            </div>
          ))}
        </nav>

        <div className="p-6">
          <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center text-black font-black text-xs">
              MN
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">M. Nieto</span>
              <span className="text-[9px] text-gold uppercase font-black tracking-tighter">Architect • CO #1</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN OPERATIONAL AREA --- */}
      <section className="flex-1 flex flex-col min-w-[310px] h-full relative">
        
        {/* TOP COMMAND BAR */}
        <header className="h-20 shrink-0 bg-white/40 backdrop-blur-xl border-b border-black/5 flex items-center justify-between px-6 lg:px-10 z-10">
          <div className="flex flex-col">
            <h1 className="text-sm font-black uppercase tracking-[0.3em]">System Overview</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
              <p className="text-[10px] text-black/60 font-bold uppercase tracking-widest">Live Hub • Bogotá, CO</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end border-r border-black/10 pr-6">
              <span className="text-[10px] font-black uppercase tracking-tighter">
                Server: <span className="text-green-600">Optimal</span>
              </span>
              <span className="text-[9px] text-black/40 font-mono font-bold uppercase">24ms Latency</span>
            </div>
            <button className="px-6 py-3 bg-black text-white text-[10px] font-black rounded-full hover:bg-gold hover:text-black transition-all duration-500 uppercase tracking-[0.2em] shadow-2xl shadow-black/20">
              Command Log
            </button>
          </div>
        </header>

        {/* --- SPACEX STYLE GRID --- */}
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto lg:overflow-hidden bg-[#DCDCDC]">
          <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-4 gap-4">
            
            {/* KPI: REVENUE */}
            <DashboardCard title="Real-time Revenue" className="lg:row-span-1">
              <div className="flex flex-col justify-end h-full">
                <span className="text-4xl font-black tracking-tighter leading-none">$12,840</span>
                <div className="flex items-center gap-2 mt-2">
                   <span className="bg-green-500 text-white text-[9px] px-1.5 py-0.5 rounded-sm font-black">+14.2%</span>
                   <span className="text-[9px] text-black/40 font-bold uppercase">v. yesterday</span>
                </div>
              </div>
            </DashboardCard>

