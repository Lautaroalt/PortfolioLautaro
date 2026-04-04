import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lautaro Altamirano | Backend Developer",
  description:
    "Portfolio de Lautaro Altamirano, enfocado en backend, automatización, SQL e integración de sistemas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
