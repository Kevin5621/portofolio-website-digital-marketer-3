"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function AboutSection2End() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftVideo = "/about/video/Finishing_1.webm";
  const centerVideos = [
    "/about/video/Finishing v2.webm",
    "/about/video/Done Final.webm"
  ];
  const rightVideo = "/about/video/Interview - Pak Oscar Darmawan.webm";

  return (
    <>
      {/* Viewport 11: Here's a glimpse - Small text, black bg, white text */}
      <section id="glimpse" className="relative min-h-screen bg-surface-inverse flex items-center justify-center px-6 z-30">
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-content-inverse text-center max-w-7xl">
          Here&apos;s a glimpse of what that looks like
        </p>
      </section>

      {/* Video content section - layout: left, center (2 videos), right */}
      <section 
        ref={sectionRef}
        id="video-content" 
        className="relative bg-surface-inverse px-6 py-16 md:py-24 z-10 min-h-[200vh] flex items-center"
      >
        <div className="container mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center">
            {/* Left video */}
            <div className="flex justify-center md:justify-end">
              <ParallaxVideoCard videoSrc={leftVideo} index={0} sectionRef={sectionRef} />
            </div>

            {/* Center: 2 videos stacked vertically */}
            <div className="flex flex-col gap-2 items-center">
              {centerVideos.map((videoSrc, idx) => (
                <ParallaxVideoCard key={videoSrc} videoSrc={videoSrc} index={1 + idx} sectionRef={sectionRef} />
              ))}
            </div>

            {/* Right video */}
            <div className="flex justify-center md:justify-start">
              <ParallaxVideoCard videoSrc={rightVideo} index={3} sectionRef={sectionRef} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

interface ParallaxVideoCardProps {
  readonly videoSrc: string;
  readonly index: number;
  readonly sectionRef: React.RefObject<HTMLElement | null>;
}

function ParallaxVideoCard({ videoSrc, index, sectionRef }: ParallaxVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Track scroll progress of the video-content section - extended range sampai section habis
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  });

  // Initial positions: video kiri dari kiri, video kanan dari kanan
  // left: -150px (dari kiri), center-top: -15px, center-bottom: 0, right: +150px (dari kanan)
  let initialX = 0;
  if (index === 0) {
    initialX = -150; // Video kiri mulai dari kiri
  } else if (index === 3) {
    initialX = 150; // Video kanan mulai dari kanan
  }
  const finalX = 0; // Semua video berakhir di posisi sekarang (0)
  
  // Different parallax offsets for each video position - reduced intensity untuk efek yang lebih halus
  const parallaxOffsets = {
    y: [0, -15, 15, 0], // left, center-top, center-bottom, right
    z: [30, 20, 20, 30]
  };

  // Transform scale: start small, grow very slowly and progressively
  // Very gradual progression dengan lebih banyak keyframes
  const scale = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.4, 0.7, 0.9, 1], 
    [0.75, 0.8, 0.85, 0.88, 0.9, 0.88]
  );
  
  // Transform translate X: video kiri dari kiri ke kanan, video kanan dari kanan ke kiri
  // Progresi sangat lambat dengan banyak keyframes
  const x = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      initialX, 
      initialX * 0.7, 
      initialX * 0.4, 
      initialX * 0.2, 
      initialX * 0.05, 
      finalX
    ]
  );
  
  // Transform translate Y with parallax offset - very gradual
  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0, parallaxOffsets.y[index] * 0.2, parallaxOffsets.y[index] * 0.5, parallaxOffsets.y[index] * 0.8, parallaxOffsets.y[index]]
  );
  
  // Transform translate Z for 3D depth - very slow progressive movement
  const z = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [
      parallaxOffsets.z[index], 
      parallaxOffsets.z[index] * 0.7, 
      parallaxOffsets.z[index] * 0.4, 
      parallaxOffsets.z[index] * 0.1, 
      -parallaxOffsets.z[index] * 0.2
    ]
  );

  // Combine transforms
  const transform = useTransform(
    [scale, x, y, z],
    ([s, xVal, yVal, zVal]) => 
      `scale(${s}) translate3d(${xVal}px, ${yVal}px, ${zVal}px)`
  );

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
    <motion.button
      style={{ transform }}
      className="aspect-[9/16] bg-neutral-800 rounded-lg overflow-hidden cursor-pointer w-full block border-0 p-0 will-change-transform"
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
    </motion.button>
  );
}
