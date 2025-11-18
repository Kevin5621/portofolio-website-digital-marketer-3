"use client";

import { WorkDetail } from "@/data/work-details";

interface WorkJobDescriptionProps {
  workDetail: WorkDetail;
}

export const WorkJobDescription = ({ workDetail }: WorkJobDescriptionProps) => {
  // Function to add period only if array has more than 1 item
  const formatText = (text: string, arrayLength: number) => {
    // If array has only 1 item, remove any trailing period
    if (arrayLength === 1) {
      return text.endsWith('.') ? text.slice(0, -1) : text;
    }
    // If array has more than 1 item, ensure it ends with a period
    if (arrayLength > 1 && !text.endsWith('.')) {
      return text + '.';
    }
    return text;
  };

  return (
    <section className="bg-surface-background">
      <div className="max-w-[95vw] mx-auto px-6">
        {/* Header Description - Single instance */}
        <div className="text-center mb-16">
          <p className="text-8xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary">
            {workDetail.description}
          </p>
        </div>

        <hr className="border-border-primary mb-16" />

        {/* Job Description Section - 2 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 mb-16">
          {/* Job Description Title - Large */}
          <div>
            <h2 className="text-8xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary leading-tight">
              Job Description
            </h2>
          </div>
          
          {/* Job Description Content */}
          <div>
            {workDetail.jobDescription.length > 1 ? (
              <ul className="space-y-4">
                {workDetail.jobDescription.map((job) => (
                  <li key={job} className="flex items-start gap-3 text-3xl md:text-xl lg:text-2xl xl:text-3xl font-medium text-content-primary leading-[0.95]">
                    <span className="flex-shrink-0">•</span>
                    <span>{formatText(job, workDetail.jobDescription.length)}</span>
                  </li> 
                ))}
              </ul>
            ) : (
              <p className="flex items-start gap-3 text-3xl md:text-xl lg:text-2xl xl:text-3xl font-medium text-content-primary leading-[0.95]">
                {formatText(workDetail.jobDescription[0], workDetail.jobDescription.length)}
              </p>
            )}
          </div>
        </div>

        {/* Objectives Section - 2 Column Grid */}
        {workDetail.objectives.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 mb-16">
            {/* Objectives Title - Large */}
            <div>
              <h2 className="text-8xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary leading-tight">
                Objectives
              </h2>
            </div>
            
            {/* Objectives Content */}
            <div>
              {workDetail.objectives.length > 1 ? (
                <ul className="space-y-4">
                  {workDetail.objectives.map((objective) => (
                    <li key={objective} className="flex items-start gap-3 text-3xl md:text-xl lg:text-2xl xl:text-3xl font-medium text-content-primary leading-[0.95]">
                      <span className="flex-shrink-0">•</span>
                      <span>{formatText(objective, workDetail.objectives.length)}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="flex items-start gap-3 text-3xl md:text-xl lg:text-2xl xl:text-3xl font-medium text-content-primary leading-[0.95]">
                  {formatText(workDetail.objectives[0], workDetail.objectives.length)}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Challenges Section - 2 Column Grid */}
        {workDetail.challenges.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 mb-16">
            {/* Challenges Title - Large */}
            <div>
              <h2 className="text-8xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary leading-tight">
                Challenges
              </h2>
            </div>
            
            {/* Challenges Content */}
            <div>
              {workDetail.challenges.length > 1 ? (
                <ul className="space-y-4">
                  {workDetail.challenges.map((challenge) => (
                    <li key={challenge} className="flex items-start gap-3 text-3xl md:text-xl lg:text-2xl xl:text-3xl font-medium text-content-primary leading-[0.95]">
                      <span className="flex-shrink-0">•</span>
                      <span>{formatText(challenge, workDetail.challenges.length)}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="flex items-start gap-3 text-3xl md:text-xl lg:text-2xl xl:text-3xl font-medium text-content-primary leading-[0.95]">
                  {formatText(workDetail.challenges[0], workDetail.challenges.length)}
                </p>
              )}
            </div>
          </div>
        )}

        {/* My Execution & Solutions Section - 2 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16">
          {/* My Execution & Solutions Title - Large */}
          <div>
            <h2 className="text-8xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary leading-tight">
              My Execution & Solutions
            </h2>
          </div>
          
          {/* My Execution & Solutions Content */}
          <div>
            {workDetail.solutions.length > 1 ? (
              <ul className="space-y-4">
                {workDetail.solutions.map((solution) => (
                  <li key={solution} className="flex items-start gap-3 text-3xl md:text-xl lg:text-2xl xl:text-3xl font-medium text-content-primary leading-[0.95]">
                    <span className="flex-shrink-0">•</span>
                    <span>{formatText(solution, workDetail.solutions.length)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="flex items-start gap-3 text-3xl md:text-xl lg:text-2xl xl:text-3xl font-medium text-content-primary leading-[0.95]">
                {formatText(workDetail.solutions[0], workDetail.solutions.length)}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
