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
  const isRumahBahasa = projectId === "rumah-bahasa-asing";
  const isBinjasiimen = projectId === "binjasiimen-samapta";
  const isAerospace = projectId === "aerospace";
  const isPpmHimma = projectId === "ppm-himma-2025";

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

  if (isRumahBahasa && projects) {
    // Separate projects by layer
    const leftVideo = projects.find(p => p.title === "LAYER_1_LEFT_VIDEO");
    const centerTopImage = projects.find(p => p.title === "LAYER_1_CENTER_TOP_IMAGE");
    const centerBottomImage = projects.find(p => p.title === "LAYER_1_CENTER_BOTTOM_IMAGE");
    const rightVideo = projects.find(p => p.title === "LAYER_1_RIGHT_VIDEO");
    const layer2Images = projects.filter(p => p.title === "LAYER_2_IMAGE");

    return (
      <section className="py-24 bg-surface-background">
        <div className="max-w-full mx-auto px-6">
          <hr className="border-border-primary mb-16" />
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-content-primary mb-16 text-center">
            My Creative Projects
          </h2>
          
          {/* Layer 1: Grid cols 3 - Video kiri, 2 image tengah, video kanan */}
          <div className="grid grid-cols-3 gap-4 w-full mb-16">
            {/* Kolom kiri: Video */}
            {leftVideo && (
              <div className="col-span-1">
                <div className="aspect-[9/16] rounded-lg overflow-hidden">
                  <video
                    src={leftVideo.image}
                    className="w-full h-full object-cover"
                    controls
                    muted
                  />
                </div>
              </div>
            )}
            
            {/* Kolom tengah: 2 image kecil (foto7 atas, foto9 bawah) */}
            <div className="col-span-1 flex flex-col gap-4 items-center">
              {centerTopImage && (
                <div className="flex-1 rounded-lg overflow-hidden">
                  <Image
                    src={centerTopImage.image}
                    alt="Center top image"
                    width={350}
                    height={350}
                    className="w-fit h-full"
                  />
                </div>
              )}
              {centerBottomImage && (
                <div className="flex-1 rounded-lg overflow-hidden">
                  <Image
                    src={centerBottomImage.image}
                    alt="Center bottom image"
                    width={350}
                    height={350}
                    className="w-fit h-full"
                  />
                </div>
              )}
            </div>
            
            {/* Kolom kanan: Video */}
            {rightVideo && (
              <div className="col-span-1">
                <div className="aspect-[9/16] rounded-lg overflow-hidden">
                  <video
                    src={rightVideo.image}
                    className="w-full h-full object-cover"
                    controls
                    muted
                  />
                </div>
              </div>
            )}
          </div>

          {/* Layer 2: Grid cols 2 - Images */}
          {layer2Images.length > 0 && (
            <div className="grid grid-cols-2 gap-4 w-full">
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
        </div>
      </section>
    );
  }

  if (isBinjasiimen && projects) {
    // Separate projects by position
    const leftVideo = projects.find(p => p.title === "LAYER_1_LEFT_VIDEO");
    const grid2Top = projects.find(p => p.title === "LAYER_1_GRID2_TOP");
    const grid2Bottom = projects.find(p => p.title === "LAYER_1_GRID2_BOTTOM");
    const grid3Top = projects.find(p => p.title === "LAYER_1_GRID3_TOP");
    const grid3Bottom = projects.find(p => p.title === "LAYER_1_GRID3_BOTTOM");
    const rightImage = projects.find(p => p.title === "LAYER_1_RIGHT_IMAGE");

    return (
      <section className="py-24 bg-surface-background">
        <div className="max-w-full mx-auto px-6">
          <hr className="border-border-primary mb-16" />
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-content-primary mb-16 text-center">
            My Creative Projects
          </h2>
          
          {/* Layer 1: Grid cols 4 - Video kiri, foto6&8 di grid 2, foto7&9 di grid 3, image kanan */}
          <div className="grid grid-cols-4 gap-4 w-full">
            {/* Grid 1: Video kiri */}
            {leftVideo && (
              <div className="col-span-1">
                <div className="aspect-[9/16] rounded-lg overflow-hidden">
                  <video
                    src={leftVideo.image}
                    className="w-full h-full object-cover"
                    controls
                    muted
                  />
                </div>
              </div>
            )}
            
            {/* Grid 2: foto6 (atas) dan foto8 (bawah) - vertikal */}
            <div className="col-span-1 flex flex-col gap-4">
              {grid2Top && (
                <div className="flex-1 rounded-lg overflow-hidden">
                  <Image
                    src={grid2Top.image}
                    alt="Grid 2 top image"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {grid2Bottom && (
                <div className="flex-1 rounded-lg overflow-hidden">
                  <Image
                    src={grid2Bottom.image}
                    alt="Grid 2 bottom image"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
            
            {/* Grid 3: foto7 (atas) dan foto9 (bawah) - vertikal */}
            <div className="col-span-1 flex flex-col gap-4">
              {grid3Top && (
                <div className="flex-1 rounded-lg overflow-hidden">
                  <Image
                    src={grid3Top.image}
                    alt="Grid 3 top image"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {grid3Bottom && (
                <div className="flex-1 rounded-lg overflow-hidden">
                  <Image
                    src={grid3Bottom.image}
                    alt="Grid 3 bottom image"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
            
            {/* Grid 4: Image kanan */}
            {rightImage && (
              <div className="col-span-1">
                <div className="aspect-[9/16] rounded-lg overflow-hidden">
                  <Image
                    src={rightImage.image}
                    alt="Right image"
                    width={400}
                    height={711}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
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
    const layer2Video1 = projects.find(p => p.title === "LAYER_2_VIDEO_1");
    const layer2Video2 = projects.find(p => p.title === "LAYER_2_VIDEO_2");

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

          {/* Grid cols 3: video sekarang, Interview, Finishing v2 */}
          <div className="grid grid-cols-3 gap-4">
            {/* Cols 1: Video sekarang (Export Vertical (4).webm) */}
            {lastVideo.map((project) => (
              <div key={project.image} className="col-span-1">
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
            
            {/* Cols 2: Interview - Pak Oscar Darmawan */}
            {layer2Video1 && (
              <div className="col-span-1">
                <div className="aspect-[9/16] rounded-lg overflow-hidden">
                  <video
                    src={layer2Video1.image}
                    className="w-full h-full object-cover"
                    controls
                    muted
                  />
                </div>
              </div>
            )}
            
            {/* Cols 3: Finishing v2 */}
            {layer2Video2 && (
              <div className="col-span-1">
                <div className="aspect-[9/16] rounded-lg overflow-hidden">
                  <video
                    src={layer2Video2.image}
                    className="w-full h-full object-cover"
                    controls
                    muted
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (isAerospace && projects) {
    // Separate projects by position
    const leftVideo = projects.find(p => p.title === "LAYER_1_LEFT_VIDEO");
    const centerTop = projects.find(p => p.title === "LAYER_1_CENTER_TOP");
    const centerBottom = projects.find(p => p.title === "LAYER_1_CENTER_BOTTOM");
    const rightImage = projects.find(p => p.title === "LAYER_1_RIGHT_IMAGE");

    return (
      <section className="py-24 bg-surface-background">
        <div className="max-w-full mx-auto px-6">
          <hr className="border-border-primary mb-16" />
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-content-primary mb-16 text-center">
            My Creative Projects
          </h2>
          
          {/* Layer 1: Grid cols 3 - Video kiri, 2 foto tengah (vertikal), image kanan */}
          <div className="grid grid-cols-3 gap-4 w-full">
            {/* Grid 1: Video kiri */}
            {leftVideo && (
              <div className="col-span-1">
                <div className="aspect-[9/16] rounded-lg overflow-hidden">
                  <video
                    src={leftVideo.image}
                    className="w-full h-full object-cover"
                    controls
                    muted
                  />
                </div>
              </div>
            )}
            
            {/* Grid 2: 2 foto vertikal (1.webp di atas, 2.webp di bawah) */}
            <div className="col-span-1 flex flex-col gap-4">
              {centerTop && (
                <div className="flex-1 rounded-lg overflow-hidden">
                  <Image
                    src={centerTop.image}
                    alt="Center top image"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {centerBottom && (
                <div className="flex-1 rounded-lg overflow-hidden">
                  <Image
                    src={centerBottom.image}
                    alt="Center bottom image"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
            
            {/* Grid 3: Image kanan */}
            {rightImage && (
              <div className="col-span-1">
                <div className="aspect-[9/16] rounded-lg overflow-hidden">
                  <Image
                    src={rightImage.image}
                    alt="Right image"
                    width={400}
                    height={711}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (isPpmHimma && projects) {
    // Separate projects by position
    const col1Top = projects.find(p => p.title === "LAYER_1_COL1_TOP");
    const col1Middle = projects.find(p => p.title === "LAYER_1_COL1_MIDDLE");
    const col1Bottom = projects.find(p => p.title === "LAYER_1_COL1_BOTTOM");
    const col2Top = projects.find(p => p.title === "LAYER_1_COL2_TOP");
    const col2Bottom = projects.find(p => p.title === "LAYER_1_COL2_BOTTOM");

    return (
      <section className="py-24 bg-surface-background">
        <div className="max-w-full mx-auto px-6">
          <hr className="border-border-primary mb-16" />
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-content-primary mb-16 text-center">
            My Creative Projects
          </h2>
          
          {/* Layer 1: Grid cols 3 - Cols 1: 2,3,4 (vertikal, lebih lebar), Cols 2: Export Vertical, Export 11 (vertikal, lebih kecil) */}
          <div className="grid grid-cols-3 gap-4 w-full">
            {/* Cols 1: 2, 3, 4 (vertikal, lebih lebar - col-span-2) */}
            <div className="col-span-2 flex flex-col gap-4">
              {col1Top && (
                <div className="flex-1 rounded-lg overflow-hidden">
                  <Image
                    src={col1Top.image}
                    alt="Col 1 top image"
                    width={400}
                    height={400}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              {col1Middle && (
                <div className="flex-1 rounded-lg overflow-hidden">
                  <Image
                    src={col1Middle.image}
                    alt="Col 1 middle image"
                    width={400}
                    height={400}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              {col1Bottom && (
                <div className="flex-1 rounded-lg overflow-hidden">
                  <Image
                    src={col1Bottom.image}
                    alt="Col 1 bottom image"
                    width={400}
                    height={400}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>
            
            {/* Cols 2: Export Vertical, Export 11 (vertikal, lebih kecil - col-span-1) */}
            <div className="col-span-1 flex flex-col gap-4">
              {col2Top && (
                <div className="flex-1 rounded-lg overflow-hidden">
                  <Image
                    src={col2Top.image}
                    alt="Col 2 top image"
                    width={400}
                    height={400}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              {col2Bottom && (
                <div className="flex-1 rounded-lg overflow-hidden">
                  <Image
                    src={col2Bottom.image}
                    alt="Col 2 bottom image"
                    width={400}
                    height={400}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>
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
