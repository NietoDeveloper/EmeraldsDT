import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./style.css";

// Optimización de fuentes con display swap para evitar Cumulative Layout Shift (CLS)
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
  description: "High-performance industrial monitoring dashboard for Colombian Emeralds.",
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
      className={`${geistSans.variable} ${geistMono.variable} selection:bg-[#FFD700]/30 selection:text-black`}
    >
      <body
        className="
          antialiased 
          font-sans 
          bg-[#DCDCDC] 
          text-black
          overflow-hidden 
          h-screen 
          w-screen
          fixed
          m-0
          p-0
        "
      >
        {/* Contenedor principal: Mantiene el control total del viewport */}
        <div 
          id="dashboard-root" 
          className="relative h-full w-full overflow-hidden flex flex-col"
        >
          {children}
        </div>
      </body>
    </html>
  );
}