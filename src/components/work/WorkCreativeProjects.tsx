"use client";

interface WorkCreativeProjectsProps {
  projects: {
    title: string;
    description: string;
    image: string;
  }[];
}

export const WorkCreativeProjects = ({ projects }: WorkCreativeProjectsProps) => {
  return (
    <section className="py-24 px-6 bg-surface-secondary">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-content-primary mb-16 text-center">
          My Creative Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <div key={project.title} className="group">
              {/* Project Image */}
              <div className="aspect-video bg-neutral-200 rounded-xl overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-300 flex items-center justify-center">
                  <span className="text-neutral-600 text-lg font-medium">
                    Project Image
                  </span>
                </div>
              </div>
              
              {/* Project Details */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-content-primary mb-4">
                  {project.title}
                </h3>
                <p className="text-lg text-content-secondary leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
