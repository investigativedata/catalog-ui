import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./vars.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Investigraph Data Catalog",
  description: "Find the data for your investigations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
