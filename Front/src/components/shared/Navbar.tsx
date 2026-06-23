"use client";

import { useScrollDirection } from "@/hooks/useScrollDirection";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ShoppingCart, X } from "lucide-react";

interface NavLink {
wn" && !isMobileMenuOpen ? "-translate-y-full" : "translate-y-0"} 
          ${isAtTop 
            ? "bg-transparent py-6 md:py-8" 
            : "bg-black/80 backdrop-blur-md py-4 border-b border-white/5"
          }`}
      >
        {/* Máximo contenedor responsive alineado de 310px a 1900px */}
        <div className="w-full max-w-[1900px] mx-auto flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-20 min-w-[310px]">
          
     
      </nav>

   
          </div>

        </div>
      </div>
    </>
  );
};