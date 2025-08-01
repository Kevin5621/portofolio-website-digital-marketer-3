"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

export default function ThreeDMarqueeDemo() {
  // Array video dengan multiple format support dan fallback
  const videos = [
    {
      webm: "/about/video/webm/Export Vertical (4).webm",
      mp4: "/about/video/optimized/Export Vertical (4)_optimized.mp4",
      original: "/about/video/Export Vertical (4).mp4"
    },
    {
      webm: "/about/video/webm/Kalimat-kalimat sehari-hari dalam bahasa Korea 2.webm",
      mp4: "/about/video/optimized/Kalimat-kalimat sehari-hari dalam bahasa Korea 2_optimized.mp4",
      original: "/about/video/Kalimat-kalimat sehari-hari dalam bahasa Korea 2.mp4"
    },
    {
      webm: "/about/video/webm/Rumah Bahasa Asing - Lawan Kata Bahasa Korea 1.webm",
      mp4: "/about/video/optimized/Rumah Bahasa Asing - Lawan Kata Bahasa Korea 1_optimized.mp4",
      original: "/about/video/Rumah Bahasa Asing - Lawan Kata Bahasa Korea 1.mp4"
    },
    {
      webm: "/about/video/webm/Export Vertical.webm",
      mp4: "/about/video/optimized/Export Vertical_optimized.mp4",
      original: "/about/video/Export Vertical.mp4"
    },
    {
      webm: "/about/video/webm/Binjasiimen Samapta - Testimoni.webm",
      mp4: "/about/video/optimized/Binjasiimen Samapta - Testimoni_optimized.mp4",
      original: "/about/video/Binjasiimen Samapta - Testimoni.mp4"
    },
    {
      webm: "/about/video/webm/Export Vertical (3).webm",
      mp4: "/about/video/optimized/Export Vertical (3)_optimized.mp4",
      original: "/about/video/Export Vertical (3).mp4"
    },
    {
      webm: "/about/video/webm/Kalimat-kalimat sehari-hari dalam bahasa Korea 1.webm",
      mp4: "/about/video/optimized/Kalimat-kalimat sehari-hari dalam bahasa Korea 1_optimized.mp4",
      original: "/about/video/Kalimat-kalimat sehari-hari dalam bahasa Korea 1.mp4"
    },
    {
      webm: "/about/video/webm/Rumah Bahasa Asing - Lawan Kata Bahasa Korea 2.webm",
      mp4: "/about/video/optimized/Rumah Bahasa Asing - Lawan Kata Bahasa Korea 2_optimized.mp4",
      original: "/about/video/Rumah Bahasa Asing - Lawan Kata Bahasa Korea 2.mp4"
    },
    {
      webm: "/about/video/webm/Aerospace - Edukatif.webm",
      mp4: "/about/video/optimized/Aerospace - Edukatif_optimized.mp4",
      original: "/about/video/Aerospace - Edukatif.mp4"
    },
    {
      webm: "/about/video/webm/Export Vertical (2).webm",
      mp4: "/about/video/optimized/Export Vertical (2)_optimized.mp4",
      original: "/about/video/Export Vertical (2).mp4"
    },
    {
      webm: "/about/video/webm/Video Testimoni 2.webm",
      mp4: "/about/video/optimized/Video Testimoni 2_optimized.mp4",
      original: "/about/video/Video Testimoni 2.mp4"
    }
  ];
  
  // Untuk sementara, gunakan original videos sampai optimized versions siap
  const videoUrls = videos.map(video => video.original);
  
  return (
    <div className="w-full h-full">
      <ThreeDMarquee images={videoUrls} />
    </div>
  );
}
