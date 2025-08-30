"use client";
import { useRef, useState } from "react";

export default function ParallaxVideoGallery() {
  const videos = [
    "/about/video/Export Vertical (4).mp4",
    "/about/video/Kalimat-kalimat sehari-hari dalam bahasa Korea 2.mp4", 
    "/about/video/Rumah Bahasa Asing - Lawan Kata Bahasa Korea 1.mp4",
    "/about/video/Export Vertical.mp4",
    "/about/video/Binjasiimen Samapta - Testimoni.mp4",
    "/about/video/Export Vertical (3).mp4"
  ];

  return (
    <div className="w-full py-16 bg-transparent">
      <div className="container mx-auto px-4">
        {/* Grid 2 kolom dengan aspect ratio TikTok */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {videos.map((videoSrc, index) => (
            <VideoCard
              key={videoSrc.split('/').pop() || `video-${index}`}
              videoSrc={videoSrc}
              isEven={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface VideoCardProps {
  readonly videoSrc: string;
  readonly isEven: boolean;
}

function VideoCard({ videoSrc, isEven }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && isVideoReady) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Silent fail untuk autoplay restrictions
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleVideoLoad = () => {
    console.log("Video loaded and ready:", videoSrc);
    setIsVideoReady(true);
  };

  const handleVideoError = () => {
    console.error("Video failed to load:", videoSrc);
    setIsVideoReady(false);
  };

  return (
    <div
      className={`
        relative w-full aspect-[9/16] max-w-sm mx-auto
        bg-neutral-800/20 rounded-lg overflow-hidden
        transition-all duration-300 ease-out cursor-pointer
        ${isEven ? 'md:mt-0' : 'md:mt-16'}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover bg-transparent"
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedMetadata={handleVideoLoad}
        onError={handleVideoError}
        onCanPlay={() => setIsVideoReady(true)}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      
      {/* Subtle overlay */}
      <div className={`
        absolute inset-0 bg-black/0 transition-all duration-300 ease-out
        ${isHovered ? 'bg-black/10' : 'bg-black/0'}
      `} />
    </div>
  );
}
