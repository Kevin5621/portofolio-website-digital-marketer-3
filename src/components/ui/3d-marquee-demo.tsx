"use client";
import { useRef, useState, useEffect } from "react";

export default function ParallaxVideoGallery() {
  const videos = [
    "/about/video/Export Vertical (4).webm",
    "/about/video/Kalimat-kalimat sehari-hari dalam bahasa Korea 2.webm", 
    "/about/video/Rumah Bahasa Asing - Lawan Kata Bahasa Korea 1.webm",
    "/about/video/Export Vertical.webm",
    "/about/video/Binjasiimen Samapta - Testimoni.webm",
    "/about/video/Export Vertical (3).webm"
  ];

  return (
    <div className="w-full py-32 bg-transparent">
      <div className="container mx-auto px-4">
        {/* Grid 2 kolom dengan aspect ratio TikTok dan spacing yang lebih besar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 xl:gap-32">
          {videos.map((videoSrc, index) => (
            <VideoCard
              key={videoSrc.split('/').pop() || `video-${index}`}
              videoSrc={videoSrc}
              isEven={index % 2 === 0}
            />
          ))}
        </div>
      </div>
      
      {/* Simple CSS untuk volume slider */}
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }
        
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          background: #f3f4f6;
        }
        
        input[type="range"]::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          border: none;
          transition: all 0.2s ease;
        }
        
        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.1);
          background: #f3f4f6;
        }
      `}</style>
    </div>
  );
}

interface VideoCardProps {
  readonly videoSrc: string;
  readonly isEven: boolean;
}

function VideoCard({ videoSrc, isEven }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      // Set volume dan currentTime
      videoRef.current.volume = volume;
      videoRef.current.currentTime = 0;
      
      // Coba play video langsung
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Jika gagal play, tunggu video ready lalu play lagi
          if (videoRef.current) {
            videoRef.current.addEventListener('canplay', () => {
              videoRef.current?.play().catch(() => {});
            }, { once: true });
          }
        });
      }
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
    // Set volume saat video ready
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  };

  const handleVideoError = () => {
    console.error("Video failed to load:", videoSrc);
  };

  // Parallax effect dengan kecepatan scroll yang lambat
  useEffect(() => {
    const handleScroll = () => {
      if (cardRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.05; // Kecepatan yang lebih lambat (0.05)
        
        // Different parallax effect for even/odd cards
        if (isEven) {
          cardRef.current.style.transform = `translateY(${rate * 0.8}px) scale(1.01)`;
        } else {
          cardRef.current.style.transform = `translateY(${-rate * 0.6}px) scale(0.99)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isEven]);

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  return (
    <div
      ref={cardRef}
      className={`
        relative w-full aspect-[9/16] max-w-sm mx-auto
        bg-neutral-800/20 rounded-lg overflow-hidden
        transition-all duration-700 ease-out cursor-pointer
        shadow-lg hover:shadow-xl
        ${isEven ? 'md:mt-0' : 'md:mt-24'}
        transform-gpu will-change-transform
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: 'translateY(0) scale(1)',
        transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover bg-transparent"
        loop
        playsInline
        preload="auto"
        onLoadedMetadata={handleVideoLoad}
        onError={handleVideoError}
      >
        <source src={videoSrc} type="video/webm" />
      </video>
      
      {/* Simple Modern Volume Control */}
      {isHovered && (
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-black/60 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              {/* Volume Icon */}
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              
              {/* Volume Slider */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-20 h-2 bg-white/20 rounded-full appearance-none cursor-pointer"
              />
              
              {/* Volume Text */}
              <span className="text-white text-sm font-medium min-w-[2.5rem]">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* Subtle overlay */}
      <div className={`
        absolute inset-0 bg-black/0 transition-all duration-300 ease-out
        ${isHovered ? 'bg-black/10' : 'bg-black/0'}
      `} />
    </div>
  );
}
