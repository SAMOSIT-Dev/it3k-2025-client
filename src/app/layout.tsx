import type { Metadata } from "next";
import Navbar from "./(main)/components/Navbar";
import FloatingPopGoose from "./(main)/components/FloatingPopGoose";

import "./globals.css";

export const metadata: Metadata = {
  title: "IT3K",
  description: "A informative website for IT3K@SIT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* NavBar */}
        <Navbar />
        {children}
        <FloatingPopGoose />
      </body>
    </html>
  );
}
