import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

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
  title: {
    default: "Adhara Eka - Social Media Marketing Specialist & Digital Marketer",
    template: "%s | Adhara Eka",
  },
  description:
    "Portfolio of Adhara Eka, a Social Media Marketing Specialist and Digital Marketer. Top-notch strategies for growth and engagement.",
  keywords: [
    "Adhara Eka",
    "Social Media Marketing",
    "Digital Marketer",
    "Content Creator",
    "Short-Form Video Editor",
    "Portfolio",
    "Social Media Specialist",
  ],
  authors: [{ name: "Adhara Eka" }],
  creator: "Adhara Eka",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adharaeka.com",
    title: "Adhara Eka - Social Media Marketing Specialist & Digital Marketer",
    description:
      "Portfolio of Adhara Eka, a Social Media Marketing Specialist and Digital Marketer. Top-notch strategies for growth and engagement.",
    siteName: "Adhara Eka Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adhara Eka - Social Media Marketing Specialist & Digital Marketer",
    description:
      "Portfolio of Adhara Eka, a Social Media Marketing Specialist and Digital Marketer. Top-notch strategies for growth and engagement.",
    creator: "@adharaeka",
  },
  verification: {
    google: "b_ykXVllonAcopGVO8eDBkLB2Mn1I481YCov33Vzh_o",
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <SmoothScrollProvider>
            <Header />
            <main>{children}</main>
          </SmoothScrollProvider>
      </body>
    </html>
  );
}
