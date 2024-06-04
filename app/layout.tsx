import type { Metadata } from "next";
import "./globals.css";
import "./vars.css";

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
      <body>{children}</body>
    </html>
  );
}
