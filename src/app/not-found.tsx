"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PillButton } from "@/components/ui/pill-button";

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-surface-background flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* 404 Number */}
        <h1 className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold leading-none text-content-primary tracking-tight mb-8">
          404
        </h1>
        
        {/* Main Message */}
        <h2 className="text-3xl md:text-4xl font-semibold text-content-primary mb-6">
          Page Not Found
        </h2>
        
        {/* Description */}
        <p className="text-lg md:text-xl text-content-secondary mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved to another location.
        </p>
        
        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <PillButton 
            variant="dark-to-light"
            className="px-8 py-3"
            href="/"
          >
            Go Home
          </PillButton>
          
          <PillButton 
            variant="light-to-dark"
            className="px-8 py-3"
            href="/work"
          >
            View Work
          </PillButton>
          
          <PillButton 
            variant="light-to-dark"
            className="px-8 py-3"
            href="/about"
          >
            About Me
          </PillButton>
        </div>
        
        {/* Auto Redirect Notice */}
        <div className="text-sm text-content-tertiary">
          Redirecting to home page in{" "}
          <span className="font-semibold text-content-primary">{countdown}</span>{" "}
          seconds
        </div>
      </div>
    </div>
  );
}
