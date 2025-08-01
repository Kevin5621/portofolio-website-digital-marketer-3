"use client";

import { WorkDetail } from "@/data/work-details";

interface WorkDetailHeroProps {
  workDetail: WorkDetail;
}

export const WorkDetailHero = ({ workDetail }: WorkDetailHeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-surface-background px-6 py-24">
      <div className="max-w-4xl mx-auto text-center">
        {/* Client Name - Large Title */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-content-primary leading-none mb-8">
          {workDetail.client}
        </h1>
        
        {/* Role & Details */}
        <div className="space-y-4 mb-12">
          <p className="text-xl md:text-2xl text-content-secondary">
            {workDetail.role}
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-lg text-content-tertiary">
            <span>{workDetail.location}</span>
            <span className="hidden md:block">•</span>
            <span>{workDetail.year}</span>
            <span className="hidden md:block">•</span>
            <span>{workDetail.category}</span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-lg md:text-xl text-content-secondary leading-relaxed max-w-3xl mx-auto">
          {workDetail.description}
        </p>
      </div>
    </section>
  );
};
