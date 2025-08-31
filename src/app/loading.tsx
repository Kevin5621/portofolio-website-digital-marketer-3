export default function Loading() {
  return (
    <div className="min-h-screen bg-surface-background flex items-center justify-center">
      <div className="text-center">
        {/* Loading Spinner */}
        <div className="mb-8">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 border-4 border-content-tertiary rounded-full opacity-20"></div>
            <div className="absolute inset-0 border-4 border-content-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="text-lg text-content-secondary">
          Loading<span className="animate-pulse">...</span>
        </div>
      </div>
    </div>
  );
}
