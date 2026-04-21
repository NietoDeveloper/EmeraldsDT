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
        <div className="flex-1 p-4 lg:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-4 gap-4 overflow-hidden">
          
          {/* Tarjeta de Ventas en Vivo (Ejemplo de espacio) */}
          <div className="col-span-1 lg:col-span-2 row-span-1 bg-white rounded-xl shadow-sm border border-black/5 p-4">
            <p className="text-xs font-bold text-black/40 uppercase">Real-time Sales</p>
            <div className="mt-2 text-3xl font-bold">$0.00</div>
          </div>

          {/* Espacio para el Video Digital Twin */}
          <div className="col-span-1 lg:col-span-2 row-span-2 bg-black rounded-xl overflow-hidden relative border-2 border-gold/30">
            <div className="absolute inset-0 flex items-center justify-center text-gold/50">
              [ Digital Twin Video Feed ]
            </div>
          </div>

          {/* Inventario / Stock */}
          <div className="col-span-1 row-span-2 bg-white rounded-xl shadow-sm border border-black/5 p-4">
            <p className="text-xs font-bold text-black/40 uppercase">Inventory Status</p>
          </div>


        </div>

      </section>
    </main>
  );
}