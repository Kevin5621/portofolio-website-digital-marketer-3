"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMemo, useCallback, useState } from "react";

export const ThreeDMarquee = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  // OPTIMASI: State untuk tracking loading
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

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
    
    return { chunks };
  }, [images]);

  // OPTIMASI: Menggunakan useCallback untuk fungsi yang tidak perlu re-create
  const getUniqueKey = useCallback((colIndex: number, imageIndex: number, image: string) => {
    const videoName = image.split('/').pop()?.split('.')[0] || 'unknown';
    return `${colIndex}-${imageIndex}-${videoName}`;
  }, []);

  // OPTIMASI: Handler untuk loading state
  const handleVideoLoad = useCallback((key: string) => {
    setLoadingStates(prev => ({ ...prev, [key]: false }));
  }, []);

  const handleVideoLoadStart = useCallback((key: string) => {
    setLoadingStates(prev => ({ ...prev, [key]: true }));
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
                  y: colIndex % 2 === 0 ? 30 : -30 
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
                  const isLoading = loadingStates[uniqueKey] ?? true;
                  
                  return (
                    <div className="relative" key={uniqueKey}>
                      <GridLineHorizontal className="-top-3" offset="30px" />
                      {isLoading && (
                        <div className="absolute inset-0 bg-gray-800 rounded-lg flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                      <OptimizedVideo
                        src={image}
                        onLoadStart={() => handleVideoLoadStart(uniqueKey)}
                        onLoadedData={() => handleVideoLoad(uniqueKey)}
                      />
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

// OPTIMASI: Komponen video terpisah dengan lazy loading dan error handling
const OptimizedVideo = ({ 
  src, 
  onLoadStart, 
  onLoadedData 
}: { 
  src: string; 
  onLoadStart: () => void;
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
      // OPTIMASI: Preload metadata untuk performa yang lebih baik
      preload="metadata"
      autoPlay
      muted
      loop
      playsInline
      // OPTIMASI: Error handling
      onError={(e) => {
        console.warn(`Failed to load video: ${src}`, e);
        onLoadedData(); // Remove loading state even on error
      }}
      // OPTIMASI: Loading state handlers
      onLoadStart={onLoadStart}
      onLoadedData={onLoadedData}
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
