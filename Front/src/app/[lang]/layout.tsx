import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { Navbar } from "@/components/shared/Navbar";
import Preloader from "@/components/shared/Preloader";
import { Suspense } from "react";
import PageTransitionWrapper from "@/components/shared/PageTransitionWrapper"; 

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: 'swap',
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://emeralddt.com'croll lo 

          {/* IMPORTANTE: El Footer se ha removido de aquí.
              Ahora se renderiza al final de cada page.tsx 
              para que el Snap Scroll funcione correctamente.
          */}
        </div>
      </body>
    </html>
  );
}