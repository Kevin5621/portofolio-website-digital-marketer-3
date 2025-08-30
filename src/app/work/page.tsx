"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ContactSection } from "@/components/sections/ContactSection";
import { getAllWorkItems, WorkItem } from "@/data/work";
import { PillButton } from "@/components/ui/pill-button";
import "./work.css";

const categories = [
  "All",
  "Social Media Marketing Manager", 
  "Content Creator",
  "Graphic Design"
];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const router = useRouter();
  
  const workData = getAllWorkItems();
  
  const filteredWork = activeFilter === "All" 
    ? workData 
    : workData.filter(item => item.category === activeFilter);

  return (
    <>
      <div className="min-h-screen bg-surface-background pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Work Title - Centered */}
          <div className="text-center mb-12">
            <h1 className="text-[8rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-bold leading-none text-content-primary tracking-tight">
              Work
            </h1>
          </div>

          {/* Filter Buttons - Centered */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <PillButton
                key={category}
                onClick={() => setActiveFilter(category)}
                variant={activeFilter === category ? "light-to-dark" : "dark-to-light"}
                className="px-6 py-2 text-sm whitespace-nowrap"
              >
                {category}
              </PillButton>
            ))}
          </div>

          {/* Work Table */}
          <div className="max-w-full overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-8 py-6 border-b border-border-primary text-sm font-medium text-content-secondary uppercase tracking-wider">
              <div className="col-span-3 text-left">CLIENT</div>
              <div className="col-span-3 text-left">LOCATION</div>
              <div className="col-span-4 text-left">ROLE</div>
              <div className="col-span-2 text-right">YEAR</div>
            </div>

            {/* Table Body */}
            <div className="space-y-0">
              {filteredWork.map((item) => (
                <WorkTableRow key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Archive Button - Centered */}
          <div className="flex justify-center mt-20">
            <PillButton 
              variant="light-to-dark"
              className="px-12 py-4 text-lg"
              onClick={() => router.push('/archive')}
            >
              Archive
            </PillButton>
          </div>
        </div>
      </div>
      
      {/* Contact Section */}
      <ContactSection />
    </>
  );
}

// WorkTableRow component with Flowing Menu hover effect
const WorkTableRow = ({ item }: { item: WorkItem }) => {
  const router = useRouter();
  const rowRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);

  const animationDefaults: gsap.TweenVars = { duration: 0.6, ease: "expo" };

  const distMetric = (x: number, y: number, x2: number, y2: number): number => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const findClosestEdge = (
    mouseX: number,
    mouseY: number,
    width: number,
    height: number
  ): "top" | "bottom" => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!rowRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    const rect = rowRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    // Add active class for visibility
    marqueeRef.current.classList.add('active');

    const tl = gsap.timeline({ defaults: animationDefaults });

    tl.set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" }, 0);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!rowRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    const rect = rowRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });

    tl.to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0).to(
      marqueeInnerRef.current,
      { y: edge === "top" ? "101%" : "-101%" },
      0
    ).call(() => {
      // Remove active class after animation
      if (marqueeRef.current) {
        marqueeRef.current.classList.remove('active');
      }
    });
  };

  const handleClick = () => {
    router.push(`/work/${item.id}`);
  };

  const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (
    <React.Fragment key={idx}>
      <span>{item.client}</span>
      <div
        className="marquee__img"
        style={{ backgroundImage: `url(/work/${item.id}/logo.webp)` }}
      />
    </React.Fragment>
  ));

  return (
    <div 
      className="relative overflow-hidden group"
      ref={rowRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Original Table Row - Unchanged */}
      <button
        className="grid grid-cols-12 gap-8 py-8 border-b border-border-secondary hover:bg-surface-secondary transition-colors duration-200 group cursor-pointer w-full text-left relative z-10"
        onClick={handleClick}
      >
        <div className="col-span-3 text-left">
          <h3 className="text-xl font-semibold text-content-primary group-hover:text-interactive-primary transition-colors duration-200">
            {item.client}
          </h3>
        </div>
        <div className="col-span-3 text-left">
          <p className="text-lg text-content-secondary">{item.location}</p>
        </div>
        <div className="col-span-4 text-left">
          <p className="text-lg text-content-secondary">{item.role}</p>
        </div>
        <div className="col-span-2 text-right">
          <p className="text-lg font-medium text-content-secondary">{item.year}</p>
        </div>
      </button>

      {/* Flowing Menu Marquee Overlay */}
      <div className="marquee absolute top-0 left-0 w-full h-full pointer-events-none bg-white z-20" ref={marqueeRef}>
        <div className="marquee__inner-wrap h-full w-[200%] flex" ref={marqueeInnerRef}>
          <div className="marquee__inner flex items-center relative h-full w-[200%] will-change-transform animate-marquee" aria-hidden="true">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
};
