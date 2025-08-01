"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ThreeDMarquee = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  // SOLUSI DUPLIKASI: Menghapus duplikasi dari array video menggunakan Set
  // Ini memastikan setiap video hanya muncul sekali di seluruh grid
  const uniqueImages = [...new Set(images)];
  
  // Distribusi video ke 5 lane tanpa duplikasi
  // Setiap video hanya muncul sekali di seluruh grid
  const totalLanes = 5;
  const chunks = Array.from({ length: totalLanes }, () => [] as string[]);
  
  // Distribusi video secara berurutan ke setiap lane
  // Video akan didistribusikan secara merata tanpa duplikasi
  uniqueImages.forEach((image, index) => {
    const laneIndex = index % totalLanes;
    chunks[laneIndex].push(image);
  });
  
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
                  duration: 20 + (colIndex * 5), // Setiap lane memiliki kecepatan berbeda
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                }}
                key={`lane-${colIndex}-${subarray.length}`}
                className="flex flex-col items-start gap-6"
                style={{
                  // Efek bata: lane genap start di posisi 1, ganjil start di posisi 3
                  marginTop: colIndex % 2 === 0 ? '0px' : '250px', // Lane ganjil dimulai lebih bawah
                }}
              >
                <GridLineVertical className="-left-3" offset="80px" />
                {subarray.map((image, imageIndex) => {
                  // Membuat key yang benar-benar unik
                  const videoName = image.split('/').pop()?.split('.')[0] || 'unknown';
                  const uniqueKey = `${colIndex}-${imageIndex}-${videoName}`;
                  
                  return (
                    <div className="relative" key={uniqueKey}>
                      <GridLineHorizontal className="-top-3" offset="30px" />
                      <motion.video
                        whileHover={{
                          y: -8,
                          scale: 1.03,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                        }}
                        src={image}
                        className="aspect-[9/16] rounded-lg object-cover ring ring-gray-950/10 hover:shadow-xl hover:ring-2 hover:ring-white/20"
                        width={220}
                        height={391}
                        autoPlay
                        muted
                        loop
                        playsInline
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
          "--offset": offset || "200px", //-100px if you want to keep the line inside
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
          "--offset": offset || "150px", //-100px if you want to keep the line inside
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
