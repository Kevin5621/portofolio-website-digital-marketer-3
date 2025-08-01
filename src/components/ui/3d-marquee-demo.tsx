"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

export default function ThreeDMarqueeDemo() {
  const videos = [
    "/about/video/Export Vertical (1).mp4",
    "/about/video/Export Vertical (2).mp4", 
    "/about/video/Export Vertical (3).mp4",
    "/about/video/Export Vertical (4).mp4",
    "/about/video/Export Vertical (5).mp4",
    "/about/video/Export Vertical.mp4",
    "/about/video/Aerospace - Edukatif.mp4",
    "/about/video/Binjasimen Samapta - Testimoni.mp4",
    "/about/video/Kalimat-kalimat sehari-hari dalam bahasa Korea 1.mp4",
    "/about/video/Kalimat-kalimat sehari-hari dalam bahasa Korea 2.mp4",
    "/about/video/Rumah Bahasa Asing - Lawan Kata Bahasa Korea 1.mp4",
    "/about/video/Rumah Bahasa Asing - Lawan Kata Bahasa Korea 2.mp4",
    "/about/video/Video Testimoni 2.mp4"
  ];
  
  return (
    <div className="w-full h-full">
      <ThreeDMarquee images={videos} />
    </div>
  );
}
