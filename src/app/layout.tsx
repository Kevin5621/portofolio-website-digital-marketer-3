import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ZoomCompensationProvider } from "@/components/layout/ZoomCompensationProvider";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Header } from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adhara Eka - Portfolio",
  description: "Social Media Marketing, Content Creator, Short-Form Video Editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ZoomCompensationProvider defaultEnabled={true} smoothTransition={true}>
          <SmoothScrollProvider>
            <Header />
            <main>{children}</main>
          </SmoothScrollProvider>
        </ZoomCompensationProvider>
      </body>
    </html>
  );
}
