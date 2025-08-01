import React from "react";
import Image from "next/image";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

export default function DraggableCardDemo() {
  const items = [
    {
      id: "design-15",
      title: "Aerospace",
      image: "/about/photo/foto6.png",
      className: "absolute top-[49%] left-[50%] -translate-x-1/2 -translate-y-1/2 rotate-[3deg]",
    },
    {
      id: "design-14",
      title: "Aerospace",
      image: "/about/photo/foto5.png",
      className: "absolute top-[52%] left-[45%] -translate-x-1/2 -translate-y-1/2 rotate-[-2deg]",
    },
    {
      id: "design-13",
      title: "Toyota Indonesia",
      image: "/about/photo/foto4.png",
      className: "absolute top-[48%] left-[53%] -translate-x-1/2 -translate-y-1/2 rotate-[7deg]",
    },
    {
      id: "design-12",
      title: "Benjasiimen Samapta",
      image: "/about/photo/foto3.png",
      className: "absolute top-[50%] left-[51%] -translate-x-1/2 -translate-y-1/2 rotate-[-6deg]",
    },
    {
      id: "design-11",
      title: "Benjasiimen Samapta",
      image: "/about/photo/foto2.png",
      className: "absolute top-[54%] left-[49%] -translate-x-1/2 -translate-y-1/2 rotate-[5deg]",
    },
    {
      id: "design-10",
      title: "Benjasiimen Samapta",
      image: "/about/photo/foto1.png",
      className: "absolute top-[46%] left-[54%] -translate-x-1/2 -translate-y-1/2 rotate-[-4deg]",
    },
    {
      id: "design-9",
      title: "Rumah Bahasa Asing",
      image: "/about/photo/9.png",
      className: "absolute top-[51%] left-[46%] -translate-x-1/2 -translate-y-1/2 rotate-[6deg]",
    },
    {
      id: "design-8",
      title: "Rumah Bahasa Asing",
      image: "/about/photo/8.png",
      className: "absolute top-[49%] left-[53%] -translate-x-1/2 -translate-y-1/2 rotate-[9deg]",
    },
    {
      id: "design-7",
      title: "Rumah Bahasa Asing",
      image: "/about/photo/7.png",
      className: "absolute top-[53%] left-[47%] -translate-x-1/2 -translate-y-1/2 rotate-[4deg]",
    },
    {
      id: "design-6",
      title: "Ortist Specialist",
      image: "/about/photo/6.png",
      className: "absolute top-[47%] left-[50%] -translate-x-1/2 -translate-y-1/2 rotate-[-7deg]",
    },
    {
      id: "design-5",
      title: "Ortist Specialist",
      image: "/about/photo/5.png",
      className: "absolute top-[52%] left-[55%] -translate-x-1/2 -translate-y-1/2 rotate-[2deg]",
    },
    {
      id: "design-4",
      title: "Ortist Specialist",
      image: "/about/photo/4.png",
      className: "absolute top-[48%] left-[45%] -translate-x-1/2 -translate-y-1/2 rotate-[10deg]",
    },
    {
      id: "design-3",
      title: "Aerospace",
      image: "/about/photo/3.png",
      className: "absolute top-[55%] left-[52%] -translate-x-1/2 -translate-y-1/2 rotate-[8deg]",
    },
    {
      id: "design-2",
      title: "Aerospace",
      image: "/about/photo/2.png",
      className: "absolute top-[45%] left-[48%] -translate-x-1/2 -translate-y-1/2 rotate-[-7deg]",
    },
    {
      id: "design-1",
      title: "Aerospace",
      image: "/about/photo/1.png",
      className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-5deg]",
    },
  ];  
  
  return (
    <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-visible">
      {items.map((item) => (
        <DraggableCardBody key={item.id} className={item.className}>
          <div className="relative">
            <Image
              src={item.image}
              alt={item.title}
              width={300}
              height={400}
              className="pointer-events-none relative z-10 max-w-[300px] h-auto object-contain rounded-lg"
            />
          </div>
          <h3 className="mt-3 text-center text-lg font-bold text-white max-w-[300px]">
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}
