'use client';

import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';

import Lenis from 'lenis';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

interface ParallaxGalleryProps {
  images: string[];
}

const ParallaxGallery = ({ images }: ParallaxGalleryProps) => {
  const gallery = useRef<HTMLDivElement>(null);

  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start'],
  });

  const { height } = dimension;

  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);

  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);

  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);

  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  // Scale transform: start from large (1.5) and progressively shrink to normal size (1)
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.5, 1.2, 1]);

  useEffect(() => {
    const lenis = new Lenis();

    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);

      rafId = requestAnimationFrame(raf);

    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });

    };

    window.addEventListener('resize', resize);

    rafId = requestAnimationFrame(raf);

    resize();

    return () => {
      window.removeEventListener('resize', resize);

      cancelAnimationFrame(rafId);

      lenis.destroy();

    };

  }, []);

  // Ensure we have at least 9 images by repeating if necessary

  const imageList = images.length >= 9 

    ? images.slice(0, 9)

    : Array.from({ length: 9 }, (_, i) => images[i % images.length]);

  return (

    <div className="relative w-full bg-surface-background text-content-primary">

      {/* Fade in gradient overlay at the top - white gradient for smooth transition */}
      <div 
        className="absolute top-0 left-0 right-0 h-[400px] z-30 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, hsl(var(--color-background)) 0%, hsl(var(--color-background) / 0.95) 20%, hsl(var(--color-background) / 0.7) 50%, hsl(var(--color-background) / 0.3) 80%, transparent 100%)',
        }}
      />

      <motion.div

        ref={gallery}

        className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden bg-surface-background p-[2vw] z-10"

        style={{ scale }}

      >

        <Column images={[imageList[0], imageList[1], imageList[2]]} y={y} />

        <Column images={[imageList[3], imageList[4], imageList[5]]} y={y2} />

        <Column images={[imageList[6], imageList[7], imageList[8]]} y={y3} />

        <Column images={[imageList[0], imageList[1], imageList[2]]} y={y4} />

      </motion.div>

    </div>

  );

};

type ColumnProps = {

  images: string[];

  y: MotionValue<number>;

};

const Column = ({ images, y }: ColumnProps) => {

  return (

    <motion.div

      className="relative -top-[45%] flex h-full w-1/4 min-w-[250px] flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%]"

      style={{ y }}

    >

      {images.map((src) => (

        <div key={src} className="relative h-full w-full overflow-hidden rounded-lg">

          <Image

            src={src}

            alt=""

            fill

            className="pointer-events-none object-cover"

            sizes="(max-width: 768px) 25vw, 25vw"

          />

        </div>

      ))}

    </motion.div>

  );

};

export default ParallaxGallery;

