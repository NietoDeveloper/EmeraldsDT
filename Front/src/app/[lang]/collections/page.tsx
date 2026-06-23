impallo crítico
                <dsName="text-zinc-600 block text-[8px] uppercase tracking-wider">{isEs ? 'CLARIDAD' : 'CLARITY'}</span>
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