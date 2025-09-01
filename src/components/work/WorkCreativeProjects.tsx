"use client";

import Image from "next/image";

interface WorkCreativeProjectsProps {
  projects?: {
    title: string;
    description: string;
    image: string;
  }[];
}

export const WorkCreativeProjects = ({ projects }: WorkCreativeProjectsProps) => {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-surface-background">
      <div className="max-w-[95vw] mx-auto px-6">
        <hr className="border-border-primary mb-16" />
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-content-primary mb-16 text-center">
          My Creative Projects
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {projects.map((project, index) => (
            <div key={project.image} className="group">
              <div className="aspect-square rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={project.image}
                  alt={`Creative project ${index + 1}`}
                  width={300}
                  height={300}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
