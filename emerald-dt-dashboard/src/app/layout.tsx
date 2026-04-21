import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emerald DT | Admin Dashboard",
  description: "High-performance industrial monitoring",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}