"use client";

import { useState } from "react";
import { MaskButton } from "@/components/ui/mask-button";
import { ContactSection } from "@/components/sections/ContactSection";

interface WorkItem {
  id: string;
  client: string;
  location: string;
  role: string;
  year: string;
  category: string;
}

const workData: WorkItem[] = [
  {
    id: "1",
    client: "Ortist Spesialist",
    location: "Semarang, Indonesia",
    role: "Social Media Marketing Manager",
    year: "2023",
    category: "Social Media Marketing Manager"
  },
  {
    id: "2",
    client: "Rumah Bahasa Asing",
    location: "Semarang, Indonesia", 
    role: "Social Media Marketing Manager",
    year: "2023",
    category: "Social Media Marketing Manager"
  },
  {
    id: "3",
    client: "Binjasilmen Samapta",
    location: "Banjarregara, Indonesia",
    role: "Content Creator",
    year: "2023-2024",
    category: "Content Creator"
  },
  {
    id: "4",
    client: "Aerospace",
    location: "Alam Sutera, Indonesia",
    role: "Graphic Designer",
    year: "2024",
    category: "Graphic Design"
  },
  {
    id: "5",
    client: "GENZUMMIT™",
    location: "Gading Serpong, Indonesia",
    role: "Content Creator",
    year: "2025",
    category: "Content Creator"
  },
  {
    id: "6",
    client: "PPM HIMMA 2025",
    location: "Gading Serpong, Indonesia",
    role: "Content Creator",
    year: "2025",
    category: "Content Creator"
  },
  {
    id: "7",
    client: "A5X Studio",
    location: "Gading Serpong, Indonesia",
    role: "Video Editing Agency",
    year: "2023-Now",
    category: "Content Creator"
  }
];

const categories = [
  "All",
  "Social Media Marketing Manager", 
  "Content Creator",
  "Graphic Design"
];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("All");

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
              <MaskButton
                key={category}
                onClick={() => setActiveFilter(category)}
                size="sm"
                variant={activeFilter === category ? "dark" : "light"}
                className="text-sm font-medium whitespace-nowrap"
              >
                {category}
              </MaskButton>
            ))}
          </div>

          {/* Work Table */}
          <div className="max-w-full overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-8 py-6 border-b border-border-primary text-sm font-medium text-content-secondary uppercase tracking-wider">
              <div className="text-left">CLIENT</div>
              <div className="text-left">LOCATION</div>
              <div className="text-left">ROLE</div>
              <div className="text-right">YEAR</div>
            </div>

            {/* Table Body */}
            <div className="space-y-0">
              {filteredWork.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-4 gap-8 py-8 border-b border-border-secondary hover:bg-surface-secondary transition-colors duration-200 group cursor-pointer"
                >
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-content-primary group-hover:text-interactive-primary transition-colors duration-200">
                      {item.client}
                    </h3>
                  </div>
                  <div className="text-left">
                    <p className="text-lg text-content-secondary">{item.location}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-lg text-content-secondary">{item.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-content-secondary">{item.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Archive Button - Centered */}
          <div className="flex justify-center mt-20">
            <MaskButton 
              size="md" 
              variant="dark"
              onClick={() => console.log('Archive clicked')}
            >
              Archive
            </MaskButton>
          </div>
        </div>
      </div>
      
      {/* Contact Section */}
      <ContactSection />
    </>
  );
}
