"use client";

interface WorkSpecialTextProps {
  text: string;
}

export const WorkSpecialText = ({ text }: WorkSpecialTextProps) => {
  return (
    <section className="py-24 bg-surface-background">
      <div className="max-w-[95vw] mx-auto px-6">
        {/* Main Title - Centered */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-content-primary">
            Project Summary
          </h2>
        </div>

        <hr className="border-border-primary mb-16" />

        {/* Special Text - Centered with same styling as description */}
        <div className="text-center">
          <p className="text-2xl md:text-4xl font-semibold text-content-secondary leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}; 