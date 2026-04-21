import React from 'react';

export default function DashboardPage() {
  return (
    <main className="flex h-screen w-screen overflow-hidden bg-main">
      
      {/* SIDEBAR (Base) - Se oculta en móviles muy pequeños o se vuelve icono */}
      <aside className="hidden md:flex flex-col w-64 bg-black text-white border-r border-gold/20">
        <div className="p-6 text-2xl font-bold text-gold border-b border-gold/10">
          EMERALD DT
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <div className="h-10 w-full bg-white/5 rounded animate-pulse" />
          <div className="h-10 w-full bg-white/5 rounded animate-pulse" />
          <div className="h-10 w-full bg-white/5 rounded animate-pulse" />
        </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <section className="flex-1 flex flex-col min-w-[310px]">
        
        {/* TOPBAR / HEADER */}
        <header className="h-16 border-b border-black/10 bg-white flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold uppercase tracking-wider">Live Monitoring</h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gold"></div>
          </div>
        </header>

        {/* DASHBOARD GRID (El "Canvas") */}
 
          {/* Inventario / Stock */}

}