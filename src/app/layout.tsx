import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { ZoomCompensationProvider } from "@/components/layout/ZoomCompensationProvider";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { IntroSlideUp } from "@/components/layout/IntroSlideUp";
import { Header } from "@/components/layout/Header";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
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
        className={`${poppins.variable} ${inter.variable} antialiased font-poppins`}
      >
        <IntroSlideUp />
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
