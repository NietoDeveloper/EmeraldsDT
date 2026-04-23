import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

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