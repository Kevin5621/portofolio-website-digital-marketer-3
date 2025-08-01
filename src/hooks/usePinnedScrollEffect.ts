"use client";

import { useRef, useEffect } from 'react';

export const usePinnedScrollEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Implementasi pinned scroll effect bisa ditambahkan di sini
      // Untuk saat ini hanya placeholder
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Panggil sekali untuk inisialisasi

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { containerRef };
};
