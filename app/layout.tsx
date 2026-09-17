import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "./components/sidebar";
import Header from "./components/Header"; 
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grupo Calma - RRHH",
  description: "Sistema de gestión de recursos humanos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50">
        <div className="flex min-h-screen">
          {/* Menú Lateral Fijo */}
          <Sidebar />

          {/* Columna Derecha: Header arriba y contenido abajo */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <Header /> {/* 2. Renderizamos el Header globalmente */}
            <main className="flex-1 p-8 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}