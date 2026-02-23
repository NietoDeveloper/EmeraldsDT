{/* SECCIÓN 3: Footer Técnico / Contacto */}
      <section className="snap-start h-screen md:h-[50vh] w-full bg-black flex flex-col justify-between p-10 md:p-20 border-t border-emerald-900/20 relative overflow-hidden">
        {/* Sutil resplandor esmeralda en la esquina inferior para coherencia visual */}
        <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full" />

        <div className="flex flex-col md:flex-row justify-between items-start z-10 gap-10 md:gap-0">
          <div>
            <span className="font-bold tracking-[0.3em] text-3xl text-white">
              EMERALD<span className="text-emerald-500">DT</span>
            </span>
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] mt-4 max-w-xs leading-relaxed">
              {lang === 'es' 
                ? 'Liderando la industria de gemas con tecnología blockchain y estándares del Nieto Laboratory.' 
                : 'Leading the gemstone industry with blockchain technology and Nieto Laboratory standards.'}
            </p>
          </div>

          <nav className="grid grid-cols-2 md:flex md:gap-12 gap-6 text-[10px] uppercase tracking-[0.2em] font-bold">
            <div className="flex flex-col gap-4">
              <span className="text-emerald-500 mb-2">{lang === 'es' ? '// Social' : '// Social'}</span>
              <a href="https://github.com/NietoDeveloper" target="_blank" className="text-zinc-400 hover:text-amber-400 transition-colors">GitHub</a>
              <a href="#" className="text-zinc-400 hover:text-amber-400 transition-colors">LinkedIn</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-emerald-500 mb-2">{lang === 'es' ? '// Legal' : '// Legal'}</span>
              <a href="#" className="text-zinc-400 hover:text-amber-400 transition-colors">{lang === 'es' ? 'Privacidad' : 'Privacy'}</a>
              <a href="#" className="text-zinc-400 hover:text-amber-400 transition-colors">{lang === 'es' ? 'Términos' : 'Terms'}</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-emerald-500 mb-2">{lang === 'es' ? '// Sistema' : '// System'}</span>
              <a href="#" className="text-zinc-400 hover:text-amber-400 transition-colors">Railway Status</a>
              <a href="#" className="text-zinc-400 hover:text-amber-400 transition-colors">AWS Cloud</a>
            </div>
          </nav>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center z-10 pt-10 border-t border-white/5">
          <div className="text-[9px] text-zinc-600 uppercase tracking-[0.4em] mb-4 md:mb-0 text-center md:text-left">
            © 2026 NIETO LABORATORY — BUILDING THE FUTURE OF ASSETS.
          </div>
          
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-8 bg-emerald-500/30 hidden md:block" />
            <span className="text-[9px] text-amber-400 font-bold uppercase tracking-[0.3em]">
              #1 Committer Colombia
            </span>
          </div>
        </div>
      </section>