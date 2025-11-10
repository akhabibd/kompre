import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LinkUMKM - Pengajuan Pembiayaan UMKM",
  description: "Platform pengajuan pembiayaan UMKM melalui LinkUMKM dan BRI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
