"use client";

import { PillButton } from "@/components/ui/pill-button";

export function NotFound() {
  return (
    <div className="min-h-screen bg-surface-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-content-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-content-primary mb-6">
          Archive Item Not Found
        </h2>
        <p className="text-lg text-content-secondary mb-8 max-w-md">
          The archive item you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <PillButton 
          variant="dark-to-light"
          className="px-8 py-3"
          href="/archive"
        >
          Back to Archive
        </PillButton>
      </div>
    </div>
  );
}
