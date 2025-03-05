import type { Metadata } from "next";
import Navbar from "./(main)/components/Navbar";

import "./globals.css";
import PageWrapper from "./(main)/components/PageWrapper";

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
        <PageWrapper>
          {children}
        </PageWrapper>
      </body>
    </html>
  );
}
