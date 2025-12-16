"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  const isKronju = archiveItem.id === "kronju";

  const DriveVideoPlayer = ({ url, alt, className }: { url: string; alt: string; className?: string }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    
    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handlePlay();
      }
    };
    
    if (isPlaying) {
      return (
        <iframe
          src={getDriveEmbedUrl(url)}
          className={className || 'w-full h-full'}
          allowFullScreen
          title={alt}
        />
      );
    }
    
    return (
      <button 
        type="button"
        className={`relative group cursor-pointer border-0 p-0 bg-transparent w-full h-full ${className || ''}`}
        onClick={handlePlay}
        onKeyDown={handleKeyDown}
        aria-label={`Play video: ${alt}`}
      >
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
      </button>
    );
  };

  const renderMediaItem = (url: string, alt: string, isVideo: boolean = false) => {
    // Special handling for MIS Final Exam - full width layout with thumbnail and click to play
    if (isMisFinalExam && isGoogleDriveLink(url)) {
      return (
        <div className="w-full rounded-lg overflow-hidden">
          <DriveVideoPlayer url={url} alt={alt} className="w-full h-[640px]" />
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
          <DriveVideoPlayer url={url} alt={alt} className="w-full h-full" />
        </div>
      );
    }

    if (isGoogleDriveLink(url)) {
      return (
        <DriveVideoPlayer url={url} alt={alt} className="w-full h-full" />
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
        {archiveItem.creativeProjects.map((project, projectIndex) => {
          const mediaItems = project.videos || project.images || [];
          const isVideo = !!project.videos;
          const projectKey = `${archiveItem.id}-project-${projectIndex}-${mediaItems[0]?.slice(0, 20) || 'empty'}`;
          
          return (
            <div key={projectKey} className="mb-16">

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
              ) : isKronju && mediaItems.length >= 5 ? (
                // Special layout for Kronju: 3 grids
                // Grid 1: Foto 1-2 (2 kolom, row 1)
                // Grid 2: Foto 5 (full width di kanan, span 2 rows)
                // Grid 3: Foto 3-4 (2 kolom, row 2)
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Grid 1: Foto 1 (row 1, col 1) */}
                  <div className="w-full relative group">
                    {renderMediaItem(mediaItems[0], `${archiveItem.client} - ${isVideo ? 'Video' : 'Image'} 1`, isVideo)}
                  </div>
                  {/* Grid 2: Foto 2 (row 1, col 2) */}
                  <div className="w-full relative group">
                    {renderMediaItem(mediaItems[1], `${archiveItem.client} - ${isVideo ? 'Video' : 'Image'} 2`, isVideo)}
                  </div>
                  {/* Grid 3: Foto 5 (row 1-2, col 3, span 2 rows) */}
                  <div className="w-full relative group row-span-2">
                    {renderMediaItem(mediaItems[4], `${archiveItem.client} - ${isVideo ? 'Video' : 'Image'} 5`, isVideo)}
                  </div>
                  {/* Grid 4: Foto 3 (row 2, col 1) */}
                  <div className="w-full relative group">
                    {renderMediaItem(mediaItems[2], `${archiveItem.client} - ${isVideo ? 'Video' : 'Image'} 3`, isVideo)}
                  </div>
                  {/* Grid 5: Foto 4 (row 2, col 2) */}
                  <div className="w-full relative group">
                    {renderMediaItem(mediaItems[3], `${archiveItem.client} - ${isVideo ? 'Video' : 'Image'} 4`, isVideo)}
                  </div>
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
