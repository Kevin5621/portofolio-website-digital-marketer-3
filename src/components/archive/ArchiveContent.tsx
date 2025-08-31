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

  // Function to render images dynamically based on count
  const renderImages = (images: string[], projectTitle: string) => {
    if (images.length === 0) return null;

    // For single image
    if (images.length === 1) {
      return (
        <div>
          <Image
            src={images[0]}
            alt={`${projectTitle} - Featured Image`}
            width={1200}
            height={675}
            className="w-full h-auto"
            priority
          />
        </div>
      );
    }

    // For 2 images
    if (images.length === 2) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((image, index) => (
            <div key={index}>
              <Image
                src={image}
                alt={`${projectTitle} - Image ${index + 1}`}
                width={600}
                height={600}
                className="w-full h-auto"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      );
    }

    // For 3 images
    if (images.length === 3) {
      return (
        <div className="grid gap-6">
          <div>
            <Image
              src={images[0]}
              alt={`${projectTitle} - Featured Image`}
              width={1200}
              height={675}
              className="w-full h-auto"
              priority
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.slice(1, 3).map((image, index) => (
              <div key={index + 1}>
                <Image
                  src={image}
                  alt={`${projectTitle} - Image ${index + 2}`}
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    // For 4 images
    if (images.length === 4) {
      return (
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.slice(0, 2).map((image, index) => (
              <div key={index}>
                <Image
                  src={image}
                  alt={`${projectTitle} - Image ${index + 1}`}
                  width={600}
                  height={600}
                  className="w-full h-auto"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.slice(2, 4).map((image, index) => (
              <div key={index + 2}>
                <Image
                  src={image}
                  alt={`${projectTitle} - Image ${index + 3}`}
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    // For 5+ images
    return (
      <div className="grid gap-6">
        {/* First Row - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.slice(0, 2).map((image, index) => (
            <div key={index}>
              <Image
                src={image}
                alt={`${projectTitle} - Image ${index + 1}`}
                width={600}
                height={600}
                className="w-full h-auto"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Second Row - Large image if available */}
        {images[2] && (
          <div>
            <Image
              src={images[2]}
              alt={`${projectTitle} - Featured Image`}
              width={1200}
              height={675}
              className="w-full h-auto"
              priority
            />
          </div>
        )}

        {/* Third Row - 2 columns for remaining images */}
        {images.length > 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.slice(3, 5).map((image, index) => (
              <div key={index + 3}>
                <Image
                  src={image}
                  alt={`${projectTitle} - Image ${index + 4}`}
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        )}

        {/* Fourth Row - Single image if there's a 6th image */}
        {images[5] && (
          <div>
            <Image
              src={images[5]}
              alt={`${projectTitle} - Final Image`}
              width={1000}
              height={750}
              className="w-full h-auto"
            />
          </div>
        )}
      </div>
    );
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

            {/* Dynamic Image Grid */}
            {renderImages(project.images, project.title)}

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
