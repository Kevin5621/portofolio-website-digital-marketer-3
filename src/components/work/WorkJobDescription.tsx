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
    <section className="py-24 bg-surface-background">
      <div className="max-w-[95vw] mx-auto px-6">
        {/* Header Description - Single instance */}
        <div className="text-center mb-16">
          <p className="text-2xl md:text-4xl font-semibold text-content-secondary leading-relaxed">
            {workDetail.description}
          </p>
        </div>

        <hr className="border-border-primary mb-16" />

        {/* Job Description Section - 2 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Job Description Title - Large */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-content-primary leading-tight">
              Job Description
            </h2>
          </div>
          
          {/* Job Description Content */}
          <div>
            {workDetail.jobDescription.length > 1 ? (
              <ul className="space-y-4">
                {workDetail.jobDescription.map((job) => (
                  <li key={job} className="text-content-secondary leading-relaxed">
                    • {formatText(job, workDetail.jobDescription.length)}
                  </li> 
                ))}
              </ul>
            ) : (
              <p className="text-content-secondary leading-relaxed">
                {formatText(workDetail.jobDescription[0], workDetail.jobDescription.length)}
              </p>
            )}
          </div>
        </div>

        {/* Objectives Section - 2 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Objectives Title - Large */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-content-primary leading-tight">
              Objectives
            </h2>
          </div>
          
          {/* Objectives Content */}
          <div>
            {workDetail.objectives.length > 1 ? (
              <ul className="space-y-4">
                {workDetail.objectives.map((objective) => (
                  <li key={objective} className="text-content-secondary leading-relaxed">
                    • {formatText(objective, workDetail.objectives.length)}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-content-secondary leading-relaxed">
                {formatText(workDetail.objectives[0], workDetail.objectives.length)}
              </p>
            )}
          </div>
        </div>

        {/* Challenges Section - 2 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Challenges Title - Large */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-content-primary leading-tight">
              Challenges
            </h2>
          </div>
          
          {/* Challenges Content */}
          <div>
            {workDetail.challenges.length > 1 ? (
              <ul className="space-y-4">
                {workDetail.challenges.map((challenge) => (
                  <li key={challenge} className="text-content-secondary leading-relaxed">
                    • {formatText(challenge, workDetail.challenges.length)}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-content-secondary leading-relaxed">
                {formatText(workDetail.challenges[0], workDetail.challenges.length)}
              </p>
            )}
          </div>
        </div>

        {/* My Execution & Solutions Section - 2 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* My Execution & Solutions Title - Large */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-content-primary leading-tight">
              My Execution & Solutions
            </h2>
          </div>
          
          {/* My Execution & Solutions Content */}
          <div>
            {workDetail.solutions.length > 1 ? (
              <ul className="space-y-4">
                {workDetail.solutions.map((solution) => (
                  <li key={solution} className="text-content-secondary leading-relaxed">
                    • {formatText(solution, workDetail.solutions.length)}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-content-secondary leading-relaxed">
                {formatText(workDetail.solutions[0], workDetail.solutions.length)}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
