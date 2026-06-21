"use client";

import { useScrollDirection } from "@/hooks/useScrollDirection";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ShoppingCart } from "lucide-react";

interface NavLink {
  // Captura el idioma dinámico actual (por defecto 'es' para evitar fallos de SSR)
  const lang = (params?.lang as string) || "es";
  const isEs = lang === "es";
              </span>
            </div>
          </Link>
  );
};