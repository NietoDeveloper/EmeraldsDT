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
        
          