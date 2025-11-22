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
  const isGenZtrive = projectId === "gen-ztrive";
  const isIkaBinus = projectId === "ika-binus-ceo-forum";
  const isFestZ = projectId === "fest-z-2025";
  const isOrtist = projectId === "ortist-specialist";

  // Helper function to extract Google Drive file ID from URL
  const extractDriveFileId = (url: string): string | null => {
    const regex = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const match = regex.exec(url);
    return match ? match[1] : null;
  };

  // Helper function to get Google Drive thumbnail URL (9:16 aspect ratio for TikTok format)
  const getDriveThumbnail = (url: string): string => {
    const fileId = extractDriveFileId(url);
    if (fileId) {
      // Use Google Drive thumbnail API with 9:16 aspect ratio (w800-h1422)
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

  // Helper function to group videos by speaker (based on title)
  type ProjectType = NonNullable<WorkCreativeProjectsProps['projects']>[number];
  const groupVideosBySpeaker = (projectsList: ProjectType[]) => {
    if (!projectsList) return [];
    const groups: { speaker: string; videos: ProjectType[] }[] = [];
    let currentSpeaker = '';
    let currentGroup: ProjectType[] = [];

    for (const project of projectsList) {
      const speaker = project.title;
      
      if (speaker === currentSpeaker) {
        currentGroup.push(project);
      } else {
        if (currentGroup.length > 0) {
          groups.push({ speaker: currentSpeaker, videos: currentGroup });
        }
        currentSpeaker = speaker;
        currentGroup = [project];
      }
    }

    if (currentGroup.length > 0) {
      groups.push({ speaker: currentSpeaker, videos: currentGroup });
    }

    return groups;
  };

  // Helper function to render Google Drive video grid (used by both IKA BINUS and FEST Z)
  const renderDriveVideoGrid = (groups: ReturnType<typeof groupVideosBySpeaker>) => {
    return (
      <section className="py-24 bg-surface-background">
        <div className="max-w-full mx-auto px-6">
          <hr className="border-border-primary mb-16" />
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-content-primary mb-16 text-center">
            My Creative Projects
          </h2>
          
          {groups.map((group, groupIndex) => {
            const videoCount = group.videos.length;

            return (
              <div key={`${group.speaker}-${groupIndex}`} className={groupIndex > 0 ? "mt-16" : ""}>
                {/* Layout 5 grid: 1 nama + videos */}
                <div className="grid grid-cols-5 gap-4 w-full">
                  {/* Grid pertama: Nama Speaker */}
                  <div className="col-span-1 flex items-center justify-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-content-primary text-center">
                      {group.speaker}:
                    </h3>
                  </div>
                  {/* Videos */}
                  {group.videos.slice(0, 4).map((project: ProjectType, index: number) => (
                    <div key={`${project.image}-${index}`} className="col-span-1">
                      <div className="aspect-[9/16] rounded-lg overflow-hidden bg-black relative group cursor-pointer">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={getDriveThumbnail(project.image)}
                          alt={project.title || `Video ${index + 1}`}
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
                          src={getDriveEmbedUrl(project.image)}
                          className="absolute inset-0 w-full h-full opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity"
                          allow="autoplay"
                          allowFullScreen
                          title={project.title || `Video ${index + 1}`}
                        />
                      </div>
                    </div>
                  ))}
                  {/* Fill remaining columns if less than 4 videos */}
                  {videoCount < 4 && Array.from({ length: 4 - videoCount }).map((_, i) => (
                    <div key={`empty-${group.speaker}-${i}`} className="col-span-1"></div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  if (isIkaBinus && projects) {
    const groups = groupVideosBySpeaker(projects);
    return renderDriveVideoGrid(groups);
  }

  if (isFestZ && projects) {
    return (
      <section className="py-24 bg-surface-background">
        <div className="max-w-full mx-auto px-6">
          <hr className="border-border-primary mb-16" />
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-content-primary mb-16 text-center">
            My Creative Projects
          </h2>
          
          {/* Layout 4 grid: hanya video, tanpa nama */}
          <div className="grid grid-cols-4 gap-4 w-full">
            {projects.slice(0, 4).map((project, index) => (
              <div key={`${project.image}-${index}`} className="col-span-1">
                <div className="aspect-[9/16] rounded-lg overflow-hidden bg-black relative group cursor-pointer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getDriveThumbnail(project.image)}
                    alt={project.title || `Video ${index + 1}`}
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
                    src={getDriveEmbedUrl(project.image)}
                    className="absolute inset-0 w-full h-full opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity"
                    allow="autoplay"
                    allowFullScreen
                    title={project.title || `Video ${index + 1}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isOrtist && projects) {
    // Separate projects by layer
    const layer1Videos = projects.filter(p => p.title === "LAYER_1_VIDEO");
    const layer2Images = projects.filter(p => p.title === "LAYER_2_IMAGE");
    const layer3Images = projects.filter(p => p.title === "LAYER_3_IMAGE");

    return (
      <section className="py-24 bg-surface-background">
        <div className="max-w-full mx-auto px-6">
          <hr className="border-border-primary mb-16" />
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-content-primary mb-16 text-center">
            My Creative Projects
          </h2>
          
          {/* Layer 1: Grid cols 3 - Google Drive Videos */}
          {layer1Videos.length > 0 && (
            <div className="grid grid-cols-3 gap-4 w-full mb-16">
              {layer1Videos.map((project, index) => (
                <div key={`layer1-${project.image}-${index}`} className="col-span-1">
                  <div className="aspect-[9/16] rounded-lg overflow-hidden bg-black relative group cursor-pointer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getDriveThumbnail(project.image)}
                      alt={`Video ${index + 1}`}
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
                      src={getDriveEmbedUrl(project.image)}
                      className="absolute inset-0 w-full h-full opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity"
                      allow="autoplay"
                      allowFullScreen
                      title={`Video ${index + 1}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Layer 2: Grid cols 3 - Images */}
          {layer2Images.length > 0 && (
            <div className="grid grid-cols-3 gap-4 w-full mb-16">
              {layer2Images.map((project, index) => (
                <div key={`layer2-${project.image}-${index}`} className="col-span-1">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`Image ${index + 1}`}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Layer 3: Grid cols 4 - Images */}
          {layer3Images.length > 0 && (
            <div className="grid grid-cols-4 gap-4 w-full">
              {layer3Images.map((project, index) => (
                <div key={`layer3-${project.image}-${index}`} className="col-span-1">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`Image ${index + 1}`}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  if (isGenZtrive) {
    return (
      <section className="py-24 bg-surface-background">
        <div className="max-w-full mx-auto px-6">
          <hr className="border-border-primary mb-16" />
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-content-primary mb-16 text-center">
            My Creative Projects
          </h2>
          
          {/* 3 videos in centered grid - full width, 3 columns */}
          <div className="grid grid-cols-3 gap-4 w-full">
            {projects.map((project) => (
              <div key={project.image} className="w-full">
                <div className="aspect-[9/16] rounded-lg overflow-hidden">
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
              <div key={project.image}>
                <div className="aspect-[9/16] rounded-lg overflow-hidden">
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
              <div key={project.image}>
                <div className="aspect-[9/16] rounded-lg overflow-hidden">
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
            <div key={project.image}>
              <div className="aspect-square rounded-lg overflow-hidden">
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
