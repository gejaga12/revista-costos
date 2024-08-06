import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar'; // Asegúrate de importar el Navbar

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Revista Costos",
  description: "Revista Costos - Catalogo de precios de construccion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" />
      <body className={inter.className}>
        <Navbar /> {/* Incluir el Navbar aquí */}
        {children}
      </body>
    </html>
  );
}
