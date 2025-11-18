"use client";

interface WorkChallengesProps {
  challenges: string[];
  solutions: string[];
}

export const WorkChallenges = ({ challenges, solutions }: WorkChallengesProps) => {
  return (
    <section className="py-24 px-6 bg-surface-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 mb-16">
          {/* Challenges */}
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-content-primary mb-8">
              Challenges
            </h3>
            {challenges.length > 1 ? (
              <ul className="space-y-6">
                {challenges.map((challenge) => (
                  <li key={challenge.slice(0, 50)} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-2 h-2 bg-error-500 rounded-full mt-3"></span>
                    <p className="text-lg flex items-start gap-3 text-3xl md:text-xl lg:text-2xl xl:text-3xl font-medium text-content-primary leading-[0.95]">
                      {challenge}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg flex items-start gap-3 text-3xl md:text-xl lg:text-2xl xl:text-3xl font-medium text-content-primary leading-[0.95]">
                {challenges[0]}
              </p>
            )}
          </div>
          
          {/* Solutions */}
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-content-primary mb-8">
              My Execution & Solutions
            </h3>
            {solutions.length > 1 ? (
              <ul className="space-y-6">
                {solutions.map((solution) => (
                  <li key={solution.slice(0, 50)} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-2 h-2 bg-success-500 rounded-full mt-3"></span>
                    <p className="text-lg flex items-start gap-3 text-3xl md:text-xl lg:text-2xl xl:text-3xl font-medium text-content-primary leading-[0.95]">
                      {solution}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg flex items-start gap-3 text-3xl md:text-xl lg:text-2xl xl:text-3xl font-medium text-content-primary leading-[0.95]">
                {solutions[0]}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
