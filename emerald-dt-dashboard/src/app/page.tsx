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



          