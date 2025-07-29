import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { HeaderProvider } from "@/components/layout/HeaderContext";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { ZoomCompensationProvider } from "@/components/layout/ZoomCompensationProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premium Portfolio - Creative Developer",
  description: "Crafting exceptional digital experiences through innovative design, cutting-edge technology, and meticulous attention to detail.",
  keywords: ["portfolio", "developer", "designer", "web development", "creative"],
  authors: [{ name: "Creative Developer" }],
  openGraph: {
    title: "Premium Portfolio - Creative Developer",
    description: "Crafting exceptional digital experiences through innovative design, cutting-edge technology, and meticulous attention to detail.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Portfolio - Creative Developer",
    description: "Crafting exceptional digital experiences through innovative design, cutting-edge technology, and meticulous attention to detail.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-surface-background font-sans`}
      >
        <ZoomCompensationProvider 
          defaultEnabled={true}
          smoothTransition={true}
        >
          <SmoothScrollProvider>
            <HeaderProvider>
              <Header />
              <main>{children}</main>
            </HeaderProvider>
          </SmoothScrollProvider>
        </ZoomCompensationProvider>
      </body>
    </html>
  );
}
