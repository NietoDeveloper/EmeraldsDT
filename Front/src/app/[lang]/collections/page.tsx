impallo crítico en el clúster de datos.' : 'Critical failure on data cluster.'}</p>
          </div>e/10 bg-zinc-950/20 p-6 font-mono text-[11px] text-zinc-500 tracking-wide max-w-sm">
            {isEs ? '// Cero unidades disponibles para este origen.' : '// Zero available items for this source.'}
          </div>
        )}

        {/* GRILLA INDUSTRIAL DE BAJA LATENCIA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {products.map((gem) => (
            <article 
              key={gem._id} 
              className="group flex flex-col border border-white/5 bg-zinc-950/10 backdrop-blur-sm transition-colors duration-300 hover:border-white/15"
            >
              {/* Imagen del Activo */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900 border-b border-white/5">
                <span className="absolute top-3 left-3 z-20 font-mono text-[8px] bg-black border border-white/10 text-zinc-400 px-1.5 py-0.5 tracking-widest uppercase font-bold">
                  {gem.mine} // {gem.serialNumber}
                </span>
                
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-102"
                  style={{ backgroundImage: `url('${gem.images[0] || '/img/placeholder-emerald.png'}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>

              {/* Parámetros de la Gema */}
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-lg font-bold uppercase tracking-tight text-white group-hover:text-gold transition-colors">
                      {gem.name}
                    </h3>
                    <span className="font-mono text-xs font-bold text-gold shrink-0">
                      ${gem.price.toLocaleString('en-US')} USD
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-b border-white/5 py-2.5 my-3 font-mono text-[10px] text-zinc-400">
                    <div>
                      <span className="text-zinc-600 block text-[8px] uppercase tracking-wider">{isEs ? 'MASA' : 'MASS'}</span>
                      <span className="text-zinc-200 font-bold">{gem.carats.toFixed(2)} CTS</span>
                    </div>
                    <div>
                      <span className="text-zinc-600 block text-[8px] uppercase tracking-wider">{isEs ? 'CLARIDAD' : 'CLARITY'}</span>
                      <span className="text-zinc-200 font-bold">{gem.clarity}</span>
                    </div>
                  </div>
                </div>

                <Link 
                  href={`/${lang}/collection/${gem._id}`}
                  className="w-full border border-white/10 text-white hover:bg-white hover:text-black transition-colors font-mono text-[9px] tracking-[0.2em] font-bold py-2.5 text-center uppercase block"
                >
                  {isEs ? 'ESPECIFICACIONES' : 'SPECIFICATIONS'}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}