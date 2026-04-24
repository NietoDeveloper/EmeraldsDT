"use client";
import React, { useState } from 'react';

interface DashboardCardProps {
  children: React.ReactNode;
  title: string;
  defaultColSpan?: string; 
  defaultRowSpan?: string; 
  expandedColSpan?: string;
  expandedRowSpan?: string;
  dark?: boolean;
}

export default function DashboardCard({ 
  children, 
  title, 
  defaultColSpan = "col-span-1", 
  defaultRowSpan = "row-span-1",
  expandedColSpan = "col-span-2",
  expandedRowSpan = "row-span-2",
  dark = true // Cambiado a true por defecto para el Nieto Laboratory
}: DashboardCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div 
      onClick={toggleExpand}
      className={`
        relative flex flex-col transition-all duration-500 ease-in-out cursor-pointer
        ${isExpanded ? `${expandedColSpan} ${expandedRowSpan} z-30 scale-[1.01]` : `${defaultColSpan} ${defaultRowSpan} z-10`}
        ${dark ? 'bg-black border-white/10' : 'bg-zinc-900 border-white/5'}
        rounded-xl border shadow-2xl hover:border-[#D4AF37]/50 group overflow-hidden
      `}
    >
      {/* Header técnico minimalista */}
      <div className={`
        px-3 py-2 border-b flex justify-between items-center shrink-0
        ${dark ? 'bg-white/5 border-white/5' : 'bg-white/10 border-white/10'}
      `}>
        <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">
          {title}
        </h3>
        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isExpanded ? 'bg-[#D4AF37] shadow-[0_0_8px_#D4AF37] animate-pulse' : 'bg-white/20'}`} />
      </div>

      {/* Contenido del componente con visibilidad mejorada */}
      <div className="flex-1 relative overflow-hidden p-4 text-white">
        {children}
      </div>

      {/* Indicador de expansión en el hover: Ahora discreto y dorado */}
      {!isExpanded && (
        <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center backdrop-blur-[2px]">
          <span className="text-[8px] font-black text-[#D4AF37] uppercase tracking-[0.4em] translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            Expand Control
          </span>
        </div>
      )}

      {/* Decoración de esquina estética SpaceX */}
      <div className="absolute bottom-0 right-0 w-4 h-4 opacity-20 pointer-events-none">
        <div className="absolute bottom-1 right-1 w-[1px] h-2 bg-[#D4AF37]" />
        <div className="absolute bottom-1 right-1 w-2 h-[1px] bg-[#D4AF37]" />
      </div>
    </div>
  );
}