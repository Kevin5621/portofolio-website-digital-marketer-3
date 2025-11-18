"use client";

interface WorkObjectivesProps {
  objectives: string[];
}

export const WorkObjectives = ({ objectives }: WorkObjectivesProps) => {
  return (
    <section className="py-24 px-6 bg-surface-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 mb-16 items-start">
          {/* Title */}
          <div>
            <h2 className="text-8xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary leading-tight">
              Job Description
            </h2>
          </div>
          
          {/* Objectives List */}
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-content-primary mb-8">
              Objectives
            </h3>
            {objectives.length > 1 ? (
              <ul className="space-y-6">
                {objectives.map((objective) => (
                  <li key={objective.slice(0, 50)} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-2 h-2 bg-brand-500 rounded-full mt-3"></span>
                    <p className="text-lg flex items-start gap-3 text-3xl md:text-xl lg:text-2xl xl:text-3xl font-medium text-content-primary leading-[0.95]">
                      {objective}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg flex items-start gap-3 text-3xl md:text-xl lg:text-2xl xl:text-3xl font-medium text-content-primary leading-[0.95]">
                {objectives[0]}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
