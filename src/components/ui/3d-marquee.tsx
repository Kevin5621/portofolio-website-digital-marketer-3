"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMemo, useCallback, useState, useEffect } from "react";

export const ThreeDMarquee = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  // State untuk tracking loading video
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());
  const [visibleVideos, setVisibleVideos] = useState<Set<string>>(new Set());

  // OPTIMASI: Menggunakan useMemo untuk menghindari re-computation yang tidak perlu
  const { chunks } = useMemo(() => {
    // Menghapus duplikasi dari array video menggunakan Set
    const uniqueImages = [...new Set(images)];
    
    // Distribusi video ke 5 lane tanpa duplikasi
    const totalLanes = 5;
    const chunks = Array.from({ length: totalLanes }, () => [] as string[]);
    
    // Distribusi video secara berurutan ke setiap lane
    uniqueImages.forEach((image, index) => {
      const laneIndex = index % totalLanes;
      chunks[laneIndex].push(image);
    });
    
    // Tambahkan placeholder untuk mengisi space kosong
    const maxLength = Math.max(...chunks.map(chunk => chunk.length));
    chunks.forEach((chunk, index) => {
      const neededPlaceholders = maxLength - chunk.length;
      for (let i = 0; i < neededPlaceholders; i++) {
        chunks[index].push('placeholder');
      }
    });
    
    return { chunks };
  }, [images]);

  // OPTIMASI: Menggunakan useCallback untuk fungsi yang tidak perlu re-create
  const getUniqueKey = useCallback((colIndex: number, imageIndex: number, image: string) => {
    const videoName = image.split('/').pop()?.split('.')[0] || 'placeholder';
    return `${colIndex}-${imageIndex}-${videoName}`;
  }, []);

  // Handler untuk video loaded
  const handleVideoLoaded = useCallback((src: string) => {
    setLoadedVideos(prev => new Set([...prev, src]));
  }, []);

  // OPTIMASI: Intersection Observer untuk lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const videoSrc = entry.target.getAttribute('data-video-src');
            if (videoSrc && videoSrc !== 'placeholder') {
              setVisibleVideos(prev => new Set([...prev, videoSrc]));
            }
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before video comes into view
        threshold: 0.1
      }
    );

    // Observe all video containers
    const videoContainers = document.querySelectorAll('[data-video-src]');
    videoContainers.forEach(container => observer.observe(container));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "w-full h-screen overflow-hidden",
        className,
      )}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative">
          <div
            style={{
              transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
              transformStyle: "preserve-3d",
            }}
            className="grid grid-cols-5 gap-6 transform-3d"
          >
            {chunks.map((subarray, colIndex) => (
              <motion.div
                animate={{ 
                  y: colIndex % 2 === 0 ? 100 : -100 
                }}
                transition={{
                  duration: 20 + (colIndex * 5),
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                }}
                key={`lane-${colIndex}-${subarray.length}`}
                className="flex flex-col items-start gap-6"
                style={{
                  // Efek bata: lane genap start di posisi 1, ganjil start di posisi 3
                  marginTop: colIndex % 2 === 0 ? '0px' : '250px',
                }}
              >
                <GridLineVertical className="-left-3" offset="80px" />
                {subarray.map((image, imageIndex) => {
                  const uniqueKey = getUniqueKey(colIndex, imageIndex, image);
                  const isLoaded = loadedVideos.has(image);
                  const isVisible = visibleVideos.has(image);
                  const isPlaceholder = image === 'placeholder';
                  
                  return (
                    <div 
                      className="relative" 
                      key={uniqueKey}
                      data-video-src={isPlaceholder ? undefined : image}
                    >
                      <GridLineHorizontal className="-top-3" offset="30px" />
                      {isPlaceholder ? (
                        <PlaceholderCard />
                      ) : (
                        <>
                          {!isLoaded && (
                            <div className="absolute inset-0 bg-gray-800 rounded-lg flex items-center justify-center">
                              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          )}
                          {isVisible && (
                            <OptimizedVideo
                              src={image}
                              onLoadedData={() => handleVideoLoaded(image)}
                            />
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen placeholder untuk space kosong
const PlaceholderCard = () => {
  // Array konten placeholder yang berbeda
  const placeholderContents = [
    {
      icon: "🎬",
      title: "Video Coming Soon",
      subtitle: "New content in progress"
    },
    {
      icon: "✨",
      title: "Creative Process",
      subtitle: "Working on something amazing"
    },
    {
      icon: "🚀",
      title: "Next Project",
      subtitle: "Stay tuned for updates"
    },
    {
      icon: "💡",
      title: "Innovation",
      subtitle: "Breaking new ground"
    },
    {
      icon: "🌟",
      title: "Excellence",
      subtitle: "Quality takes time"
    }
  ];

  // Pilih konten secara random
  const randomContent = placeholderContents[Math.floor(Math.random() * placeholderContents.length)];

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="aspect-[9/16] rounded-lg bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 ring ring-gray-950/10 hover:shadow-xl hover:ring-2 hover:ring-white/20 flex items-center justify-center relative overflow-hidden"
      style={{
        width: 220,
        height: 391,
        // Force hardware acceleration
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
      </div>

      {/* Content */}
      <div className="text-center text-gray-300 relative z-10">
        <div className="text-4xl mb-3 opacity-80">
          {randomContent.icon}
        </div>
        <h3 className="text-sm font-semibold mb-1 text-white">
          {randomContent.title}
        </h3>
        <p className="text-xs opacity-75 text-gray-400">
          {randomContent.subtitle}
        </p>
      </div>

      {/* Animated border */}
      <div className="absolute inset-0 rounded-lg border border-gray-600/30 animate-pulse"></div>
    </motion.div>
  );
};

// OPTIMASI: Komponen video dengan loading state dan compression
const OptimizedVideo = ({ 
  src, 
  onLoadedData 
}: { 
  src: string; 
  onLoadedData: () => void;
}) => {
  return (
    <motion.video
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      src={src}
      className="aspect-[9/16] rounded-lg object-cover ring ring-gray-950/10 hover:shadow-xl hover:ring-2 hover:ring-white/20"
      width={220}
      height={391}
      // OPTIMASI: Preload metadata saja untuk kecepatan
      preload="metadata"
      // OPTIMASI: Video settings untuk performa
      autoPlay
      muted
      loop
      playsInline
      // OPTIMASI: Compression settings
      style={{
        // Force hardware acceleration
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
      onLoadedData={onLoadedData}
      onError={() => {
        console.warn(`Failed to load video: ${src}`);
        onLoadedData(); // Remove loading state even on error
      }}
    />
  );
};

// OPTIMASI: Memoized grid line components
const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px",
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px",
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};
