"use client";

import { PillButton } from "@/components/ui/pill-button";

export default function ArchiveNotFound() {
  return (
    <div className="min-h-screen bg-surface-background flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* 404 Number */}
        <h1 className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-bold leading-none text-content-primary tracking-tight mb-8">
          404
        </h1>
        
        {/* Main Message */}
        <h2 className="text-3xl md:text-4xl font-semibold text-content-primary mb-6">
          Archive Item Not Found
        </h2>
        
        {/* Description */}
        <p className="text-lg md:text-xl text-content-secondary mb-8 max-w-md mx-auto">
          The archive item you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        
        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <PillButton 
            variant="dark-to-light"
            className="px-8 py-3"
            href="/archive"
          >
            Browse Archive
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
            href="/"
          >
            Go Home
          </PillButton>
        </div>
      </div>
    </div>
  );
}
