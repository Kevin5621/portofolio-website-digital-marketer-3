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

  const isMisFinalExam = archiveItem.id === "mis-final-exam";
  const isOmbUmn = archiveItem.id === "omb-umn-2024";

  const renderMediaItem = (url: string, alt: string, isVideo: boolean = false) => {
    // Special handling for MIS Final Exam - full width layout with direct embed
    if (isMisFinalExam && isGoogleDriveLink(url)) {
      return (
        <div className="w-full rounded-lg overflow-hidden">
          <iframe
            src={getDriveEmbedUrl(url)}
            className="w-full h-[640px]"
            allow="autoplay"
            allowFullScreen
            title={alt}
          />
        </div>
      );
    }

    // Special handling for OMB UMN - videos with TikTok portrait dimensions
    if (isOmbUmn && isGoogleDriveLink(url) && isVideo) {
      return (
        <div 
          className="w-full rounded-lg overflow-hidden" 
          style={{ aspectRatio: '9/16' }}
        >
          <iframe
            src={getDriveEmbedUrl(url)}
            className="w-full h-full"
            allow="autoplay"
            allowFullScreen
            title={alt}
          />
        </div>
      );
    }

    if (isGoogleDriveLink(url)) {
      return (
        <div className="relative">
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
        {archiveItem.creativeProjects.map((project) => {
          const mediaItems = project.videos || project.images || [];
          const isVideo = !!project.videos;
          const projectKey = project.title || `${archiveItem.id}-project-${mediaItems[0]?.slice(0, 20)}`;
          
          return (
            <div key={projectKey} className="mb-16">
              {/* Project Title */}
              {project.title && (
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
              )}

              {/* Simple Grid Layout */}
              {isMisFinalExam ? (
                // Full width layout for MIS Final Exam
                <div className="w-full">
                  {mediaItems.map((item) => {
                    const itemId = extractDriveFileId(item) || item;
                    return (
                      <div key={`${archiveItem.id}-${itemId}`} className="w-full mb-6">
                        {renderMediaItem(item, `${archiveItem.client} - ${isVideo ? 'Video' : 'Image'}`, isVideo)}
                      </div>
                    );
                  })}
                </div>
              ) : mediaItems.length === 1 ? (
                // Center layout for single image/video
                <div className="flex justify-center">
                  {mediaItems.map((item) => {
                    const itemId = extractDriveFileId(item) || item;
                    return (
                      <div key={`${archiveItem.id}-${itemId}`} className="w-full max-w-md relative group">
                        {renderMediaItem(item, `${archiveItem.client} - ${isVideo ? 'Video' : 'Image'}`, isVideo)}
                      </div>
                    );
                  })}
                </div>
              ) : (
                // Grid layout for other archives (including OMB UMN with 3 columns)
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mediaItems.map((item) => {
                    const itemId = extractDriveFileId(item) || item;
                    return (
                      <div key={`${archiveItem.id}-${itemId}`} className="w-full relative group">
                        {renderMediaItem(item, `${archiveItem.client} - ${isVideo ? 'Video' : 'Image'}`, isVideo)}
                      </div>
                    );
                  })}
                </div>
              )}

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
          );
        })}
      </div>
    </div>
  );
}
