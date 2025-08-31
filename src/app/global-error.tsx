"use client";

import { useEffect } from "react";
import { PillButton } from "@/components/ui/pill-button";

interface GlobalErrorProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-surface-background flex items-center justify-center px-6">
          <div className="text-center max-w-2xl">
            {/* Critical Error Icon */}
            <div className="mb-8">
              <div className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-bold leading-none text-error tracking-tight">
                ⚠
              </div>
            </div>
            
            {/* Main Message */}
            <h1 className="text-3xl md:text-4xl font-semibold text-content-primary mb-6">
              Critical Error
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-content-secondary mb-8 max-w-md mx-auto">
              A critical error occurred in the application. Please refresh the page or contact support if the problem persists.
            </p>
            
            {/* Error Details (Development only) */}
            {process.env.NODE_ENV === "development" && (
              <div className="mb-8 p-4 bg-error-50 border border-error-200 rounded-lg text-left">
                <h3 className="font-semibold text-error-800 mb-2">Error Details:</h3>
                <p className="text-sm text-error-700 font-mono break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-error-600 mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <PillButton
                variant="dark-to-light"
                className="px-8 py-3"
                onClick={reset}
              >
                Try Again
              </PillButton>
              
              <PillButton
                variant="light-to-dark"
                className="px-8 py-3"
                onClick={() => window.location.href = "/"}
              >
                Go Home
              </PillButton>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
