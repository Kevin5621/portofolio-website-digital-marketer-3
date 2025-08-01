"use client";

interface WorkChallengesProps {
  challenges: string[];
  solutions: string[];
}

export const WorkChallenges = ({ challenges, solutions }: WorkChallengesProps) => {
  return (
    <section className="py-24 px-6 bg-surface-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Challenges */}
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-content-primary mb-8">
              Challenges
            </h3>
            <ul className="space-y-6">
              {challenges.map((challenge) => (
                <li key={challenge.slice(0, 50)} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-2 h-2 bg-error-500 rounded-full mt-3"></span>
                  <p className="text-lg text-content-secondary leading-relaxed">
                    {challenge}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Solutions */}
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-content-primary mb-8">
              My Execution & Solutions
            </h3>
            <ul className="space-y-6">
              {solutions.map((solution) => (
                <li key={solution.slice(0, 50)} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-2 h-2 bg-success-500 rounded-full mt-3"></span>
                  <p className="text-lg text-content-secondary leading-relaxed">
                    {solution}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
