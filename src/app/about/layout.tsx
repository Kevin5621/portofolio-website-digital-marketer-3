"use client";

import { Poppins } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { useEffect } from "react";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // Override global CSS that might interfere with sticky positioning
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    
    // Store original styles
    const originalHtmlOverflow = htmlElement.style.overflow;
    const originalHtmlOverflowX = htmlElement.style.overflowX;
    const originalHtmlScrollBehavior = htmlElement.style.scrollBehavior;
    const originalBodyOverflow = bodyElement.style.overflow;
    const originalBodyOverflowX = bodyElement.style.overflowX;
    
    // Apply styles for sticky behavior
    // Keep overflow visible for vertical scrolling but prevent horizontal scroll
    htmlElement.style.overflow = 'visible';
    htmlElement.style.overflowX = 'hidden';
    htmlElement.style.scrollBehavior = 'auto';
    bodyElement.style.overflow = 'visible';
    bodyElement.style.overflowX = 'hidden';
    
    // Cleanup function to restore original styles
    return () => {
      htmlElement.style.overflow = originalHtmlOverflow;
      htmlElement.style.overflowX = originalHtmlOverflowX;
      htmlElement.style.scrollBehavior = originalHtmlScrollBehavior;
      bodyElement.style.overflow = originalBodyOverflow;
      bodyElement.style.overflowX = originalBodyOverflowX;
    };
  }, []);

  return (
    <div className={`${poppins.variable} antialiased font-poppins`} style={{ overflow: 'visible', overflowX: 'hidden', width: '100%', maxWidth: '100vw' }}>
      <Header />
      <main style={{ overflow: 'visible', overflowX: 'hidden', width: '100%', maxWidth: '100vw' }}>{children}</main>
    </div>
  );
}
