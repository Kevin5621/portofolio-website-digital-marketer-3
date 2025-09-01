"use client";

import Image from "next/image";

interface WorkCreativeProjectsProps {
  projects?: {
    title: string;
    description: string;
    image: string;
  }[];
  projectId?: string;
}

export const WorkCreativeProjects = ({ projects, projectId }: WorkCreativeProjectsProps) => {
  if (!projects || projects.length === 0) {
    return null;
  }

  const isVideo = (url: string) => {
    return url.includes('.webm') || url.includes('.mp4') || url.includes('.mov');
  };

  const isGenzummit = projectId === "genzummit";

  if (isGenzummit) {
    const firstThreeVideos = projects.slice(0, 3);
    const lastVideo = projects.slice(3, 4);

    return (
      <section className="py-24 bg-surface-background">
        <div className="max-w-[95vw] mx-auto px-6">
          <hr className="border-border-primary mb-16" />
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-content-primary mb-16 text-center">
            My Creative Projects
          </h2>
          
          {/* First 3 videos */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {firstThreeVideos.map((project) => (
              <div key={project.image} className="group">
                <div className="aspect-[9/16] rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <video
                    src={project.image}
                    className="w-full h-full object-cover"
                    controls
                    muted
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Divider text */}
          <div className="text-center py-8 mb-8">
            <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-content-primary">
              I am also working on re-editing the footage to enhance it and explore a new style of short-form video editing.
            </span>
          </div>

          {/* Last video */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {lastVideo.map((project) => (
              <div key={project.image} className="group">
                <div className="aspect-[9/16] rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <video
                    src={project.image}
                    className="w-full h-full object-cover"
                    controls
                    muted
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
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
                {isVideo(project.image) ? (
                  <video
                    src={project.image}
                    className="w-full h-full object-contain"
                    controls
                    muted
                  />
                ) : (
                  <Image
                    src={project.image}
                    alt={`Creative project ${index + 1}`}
                    width={300}
                    height={300}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
