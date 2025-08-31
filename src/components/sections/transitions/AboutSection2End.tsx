"use client";

import { useRef } from "react";

export function AboutSection2End() {
  const videos = [
    "/about/video/Export Vertical (4).webm",
    "/about/video/Kalimat-kalimat sehari-hari dalam bahasa Korea 2.webm", 
    "/about/video/Rumah Bahasa Asing - Lawan Kata Bahasa Korea 1.webm",
    "/about/video/Export Vertical.webm",
    "/about/video/Binjasiimen Samapta - Testimoni.webm",
    "/about/video/Export Vertical (3).webm"
  ];

  return (
    <>
      {/* Viewport 11: Here's a glimpse - Small text, black bg, white text */}
      <section id="glimpse" className="relative min-h-screen bg-surface-inverse flex items-center justify-center px-6 z-30">
        <p className="text-lg md:text-xl lg:text-2xl text-content-inverse text-center max-w-4xl" style={{fontSize: '3.5rem'}}>
          Here&apos;s a glimpse of what that looks like
        </p>
      </section>

      {/* Video content section - simple grid layout */}
      <section id="video-content" className="relative bg-surface-inverse px-6 py-16 z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((videoSrc) => (
              <VideoCard key={videoSrc} videoSrc={videoSrc} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

interface VideoCardProps {
  readonly videoSrc: string;
}

function VideoCard({ videoSrc }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = false; // Unmute when hover
      videoRef.current.volume = 0.7; // Set volume level
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Handle autoplay restrictions silently
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.muted = true; // Mute back when not hovering
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <button 
      className="aspect-[9/16] bg-neutral-800 rounded-lg overflow-hidden cursor-pointer w-full block border-0 p-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseEnter}
      aria-label="Play video on hover"
      type="button"
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover pointer-events-none"
        loop
        muted
        playsInline
        preload="metadata"
        aria-label="Video content"
      >
        <source src={videoSrc} type="video/webm" />
        <track kind="captions" srcLang="en" label="English captions" default />
        Your browser does not support the video tag.
      </video>
    </button>
  );
} 