"use client";

import { WorkDetail } from "@/data/work-details";

interface WorkJobDescriptionProps {
  workDetail: WorkDetail;
}

export const WorkJobDescription = ({ workDetail }: WorkJobDescriptionProps) => {
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
          
          {/* Job Description Bullet Points */}
          <div>
            <ul className="space-y-4">
              {workDetail.objectives.map((objective, index) => (
                <li key={index} className="text-content-secondary leading-relaxed">
                  • {objective}
                </li>
              ))}
            </ul>
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
            <p className="text-content-secondary leading-relaxed">
              Drive awareness and engagement among the youth market (ages 16-25) for {workDetail.client}&apos;s specialized orthodontic services, positioning the clinic as the go-to choice for straightening misaligned teeth.
            </p>
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
            <p className="text-content-secondary leading-relaxed">
              {workDetail.challenges[0]}
            </p>
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
            <ul className="space-y-4">
              {workDetail.solutions.map((solution, index) => (
                <li key={index} className="text-content-secondary leading-relaxed">
                  • {solution}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
