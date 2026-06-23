
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-md uppercase tracking-[0.25em] font-bold text-gold/90 hover:text-white transition-colors cursor-pointer py-1 block"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Sección de Accesos Inferiores (Carrito y Acceso / Log in) */}
          <div className="flex flex-col items-center gap-5 w-full max-w-[240px] border-t border-gold/20 pt-6 mb-4">
            <Link 
              href={`/${lang}/collection`} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-gold hover:text-white transition-colors flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-bold cursor-pointer"
            >
              <ShoppingCart size={20} className="text-gold" />
              <span>{isEs ? "Carrito" : "Cart"}</span>
            </Link>
            
            <Link 
              href={`/${lang}/auth`} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-center text-[10px] uppercase tracking-[0.2em] font-bold text-black bg-gold hover:bg-white transition-colors px-4 py-3 w-full font-black tracking-[0.25em] cursor-pointer"
            >
              {isEs ? "LOG IN / ACCESO" : "LOG IN / ACCESS"}
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};