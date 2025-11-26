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

  // Helper function to extract Google Drive file ID from URL
  const extractDriveFileId = (url: string): string | null => {
    const regex = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const match = regex.exec(url);
    return match ? match[1] : null;
  };

  // Helper function to get Google Drive thumbnail URL
  const getDriveThumbnail = (url: string): string => {
    const fileId = extractDriveFileId(url);
    if (fileId) {
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800-h1422`;
    }
    return url;
  };

  // Helper function to convert Google Drive view link to embed/preview link
  const getDriveEmbedUrl = (url: string): string => {
    const fileId = extractDriveFileId(url);
    if (fileId) {
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return url;
  };

  const isGoogleDriveLink = (url: string) => {
    return url.includes("drive.google.com");
  };

  const renderMediaItem = (url: string, alt: string) => {
    if (isGoogleDriveLink(url)) {
      return (
        <div className="aspect-[9/16] rounded-lg overflow-hidden bg-black relative group cursor-pointer w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getDriveThumbnail(url)}
            alt={alt}
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center' }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
          <iframe
            src={getDriveEmbedUrl(url)}
            className="absolute inset-0 w-full h-full opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity"
            allow="autoplay"
            allowFullScreen
            title={alt}
          />
        </div>
      );
    }

    return (
      <div className="rounded-lg overflow-hidden w-full">
        <Image
          src={url}
          alt={alt}
          width={1200}
          height={675}
          className="w-full h-auto object-cover"
        />
      </div>
    );
  };

  return (
    <div className="pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {archiveItem.creativeProjects.map((project, projectIndex) => (
          <div key={`${project.title}-${projectIndex}`} className="mb-16">
            {/* Project Title */}
            <div className="text-center mb-12">
              <h2 className="mt-24 text-[2rem] md:text-[3rem] lg:text-[3rem] font-semibold leading-none text-content-primary tracking-tight mb-6">
                {project.title}
              </h2>
              {project.description && (
                <p className="text-lg text-content-secondary max-w-4xl mx-auto leading-relaxed">
                  {project.description}
                </p>
              )}
            </div>

            {/* Simple Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.images.map((image, index) => (
                <div key={`${image}-${index}`} className="w-full">
                  {renderMediaItem(image, `${project.title} - Image ${index + 1}`)}
                </div>
              ))}
            </div>

            {/* Archive Button with PillButton */}
            <div className="text-center mt-12">
              <PillButton
                variant="dark-to-light"
                className="px-16 py-6 text-2xl"
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
