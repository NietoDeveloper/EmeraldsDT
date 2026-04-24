import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./style.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Emerald DT | Control Center",
    template: "%s | Emerald DT",
  },
  description: "High-performance industrial monitoring dashboard for Colombian Emeralds. Nieto Laboratory Ecosystem.",
  icons: {
    icon: "/favicon.ico", // Asegúrate de tener un favicon oscuro
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="es" 
      className={`${geistSans.variable} ${geistMono.variable} selection:bg-[#D4AF37]/30 selection:text-[#D4AF37]`}
    >
      <body
        className="
          antialiased 
          font-sans 
          bg-[#000000] 
          text-white
          overflow-hidden 
          h-screen 
          w-screen
          fixed
          inset-0
          m-0
          p-0
        "
      >
        {/* Dashboard Root: 
            1. h-screen w-screen garantiza el llenado total.
            2. El gradiente radial superior derecho simula una fuente de luz técnica muy tenue.
            3. El grid de fondo opcional (opacidad 0.02) le da ese look de ingeniería.
        */}
        <div 
          id="dashboard-root" 
          className="
            relative 
            h-full 
            w-full 
            overflow-hidden 
            flex 
            flex-col 
            bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.03),_transparent_40%)]
          "
        >
          {/* Capa de textura de ruido o grid técnico (opcional) */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.01] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          
          {children}
        </div>
      </body>
    </html>
  );
}