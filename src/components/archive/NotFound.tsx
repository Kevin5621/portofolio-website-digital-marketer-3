"use client";

import Link from "next/link";

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
        <Link 
          href="/archive"
          className="inline-flex items-center justify-center px-8 py-3 bg-content-primary text-surface-background font-medium rounded-full hover:bg-content-secondary transition-colors duration-200"
        >
          Back to Archive
        </Link>
      </div>
    </div>
  );
}
