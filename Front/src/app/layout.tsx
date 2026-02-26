import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer"; // Importación vital

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: 'swap',
});



        
        {/* Estructura de contenido */}
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow relative w-full overflow-x-hidden">
            {children}
          </main>
          
          {/* El Footer ahora cierra cada página del ecosistema Emerald DT */}
          <Footer />
        </div>
      </body>
    </html>
  );
}