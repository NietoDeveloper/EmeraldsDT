ader
              />
            </motion.div>
ve overflow-hidden rounded-full border border-white/5">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ 
                    duration: 4, 
                    ease: [0.65, 0, 0.35, 1] 
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400 to-emerald-600 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                />
              </div>
              
              <motion.p 
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="mt-6 text-[9px] text-emerald-300/30 font-mono tracking-[0.4em] uppercase"
              >
                {pathname === '/' ? 'Establishing Secure Link' : `Syncing ${pathname}`}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}