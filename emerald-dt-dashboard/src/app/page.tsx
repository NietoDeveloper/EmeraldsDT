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

