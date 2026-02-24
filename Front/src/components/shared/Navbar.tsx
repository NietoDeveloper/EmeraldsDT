"use client";

import { useScrollDirection } from "@/hooks/useScrollDirection";
import Link from "next/link";
import { useState, useEffect } from "react";


  useEffect(() => {


  

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out px-6 md:px-12 ${
        scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
      } ${
        isAtTop 
          ? "bg-transparent py-8" 
          : "bg-black/80 backdrop-blur-xl py-4 border-b border-emerald/20"
      }`}
    >
      <div className="max-w-[1600px] mx-auto flex justify-between items-center">
        
   
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative w-7 h-7">
             <div className="absolute inset-0 bg-emerald rounded-sm group-hover:bg-gold transition-colors duration-700 shadow-[0_0_20px_rgba(4,120,87,0.5)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]" />
          </div>
          <span className="font-bold tracking-[0.4em] uppercase text-lg md:text-xl transition-all duration-500 group-hover:tracking-[0.45em]">
            Emerald <span className="text-white/40 group-hover:text-gold transition-colors italic font-light">DT</span>
          </span>
        </Link>

        </div>

        <div className="flex items-center gap-6">
         
          <button className="lg:hidden flex flex-col gap-1.5 items-end group">
            <div className="w-8 h-[1px] bg-white group-hover:bg-gold transition-colors" />
            <div className="w-5 h-[1px] bg-white group-hover:bg-emerald transition-colors" />
          </button>
        </div>

      </div>
    </nav>
  );
};