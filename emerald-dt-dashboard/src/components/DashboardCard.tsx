"use client";
import React, { useState } from 'react';

interface DashboardCardProps {
  children: React.ReactNode;
  title: string;
  defaultColSpan?: string; // e.g., "col-span-2"
  defaultRowSpan?: string; // e.g., "row-span-1"
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
  dark = false 
}: DashboardCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Manejador de expansión
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div 
      onClick={toggleExpand}
      className={`
        relative flex flex-col transition-all duration-500 ease-in-out cursor-pointer
        ${isExpanded ? `${expandedColSpan} ${expandedRowSpan} z-30 scale-[1.02]` : `${defaultColSpan} ${defaultRowSpan} z-10`}
        ${dark ? 'bg-[#0a0a0a] border-white/10' : 'bg-white border-black/5'}
        rounded-xl border shadow-sm hover:border-gold/50 group overflow-hidden
      `}
    >
      {/* Header técnico */}
      <div className={`
        px-3 py-2 border-b flex justify-between items-center shrink-0
        ${dark ? 'bg-white/5 border-white/5' : 'bg-black/5 border-black/5'}
      `}>
        <h3 className={`text-[9px] font-black uppercase tracking-[0.2em] ${dark ? 'text-gold' : 'text-black/60'}`}>
          {title}
        </h3>
        <div className={`w-1.5 h-1.5 rounded-full ${isExpanded ? 'bg-gold animate-ping' : 'bg-black/20'}`} />


      {/* Indicador de expansión en el hover */}
      {!isExpanded && (

      )}
    </div>
  );
}