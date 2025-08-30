"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArchiveItem } from "@/data/archive";
import { PillButton } from "@/components/ui/pill-button";

interface ArchiveContentProps {
  readonly archiveItem: ArchiveItem;
}

export function ArchiveContent({ archiveItem }: ArchiveContentProps) {
  const router = useRouter();

  const handleArchiveClick = () => {
    router.push("/archive");
  };

  return (
    <div className="pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {archiveItem.creativeProjects.map((project, projectIndex) => (
          <div key={projectIndex} className="mb-16">
            {/* Project Title */}
            <div className="text-center mb-12">
              <h2 className="text-[3rem] md:text-[4rem] lg:text-[5rem] font-bold leading-none text-content-primary tracking-tight mb-6">
                {project.title}
              </h2>
              {project.description && (
                <p className="text-lg text-content-secondary max-w-4xl mx-auto leading-relaxed">
                  {project.description}
                </p>
              )}
            </div>

            {/* Creative Projects Grid */}
            <div className="grid gap-6">
              {/* First Row - 2 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.images.slice(0, 2).map((image, index) => (
                  <div 
                    key={index} 
                    className="aspect-square bg-surface-secondary rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-300"
                  >
                    <Image
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      priority={index < 2}
                    />
                  </div>
                ))}
              </div>

              {/* Second Row - Large image if available */}
              {project.images[2] && (
                <div className="aspect-[16/9] bg-surface-secondary rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-300">
                  <Image
                    src={project.images[2]}
                    alt={`${project.title} - Featured Image`}
                    width={1200}
                    height={675}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    priority
                  />
                </div>
              )}

              {/* Third Row - 2 columns for remaining images */}
              {project.images.length > 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.images.slice(3, 5).map((image, index) => (
                    <div 
                      key={index + 3} 
                      className="aspect-square bg-surface-secondary rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-300"
                    >
                      <Image
                        src={image}
                        alt={`${project.title} - Image ${index + 4}`}
                        width={600}
                        height={600}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Fourth Row - Single image if there's a 6th image */}
              {project.images[5] && (
                <div className="aspect-[4/3] bg-surface-secondary rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-300">
                  <Image
                    src={project.images[5]}
                    alt={`${project.title} - Final Image`}
                    width={1000}
                    height={750}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}
            </div>

            {/* Archive Button with PillButton */}
            <div className="text-center mt-12">
              <PillButton
                variant="light-to-dark"
                className="px-8 py-3 text-lg"
                onClick={handleArchiveClick}
              >
                Archive
              </PillButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
