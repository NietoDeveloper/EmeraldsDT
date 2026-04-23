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


          