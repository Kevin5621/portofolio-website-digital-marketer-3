"use client";

import { useState } from "react";

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
    <div className="min-h-screen bg-surface-background">
      <div className="container mx-auto px-6 py-16">
        {/* Work Title */}
        <div className="mb-16">
          <h1 className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-bold leading-none text-content-primary tracking-tight">
            Work
          </h1>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-full border transition-all duration-300 text-sm font-medium ${
                activeFilter === category
                  ? "bg-content-primary text-content-inverse border-content-primary"
                  : "bg-transparent text-content-primary border-border-primary hover:border-content-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Work Table */}
        <div className="space-y-0">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 py-4 border-b border-border-primary text-sm font-medium text-content-secondary uppercase tracking-wider">
            <div className="col-span-3">CLIENT</div>
            <div className="col-span-3">LOCATION</div>
            <div className="col-span-4">ROLE</div>
            <div className="col-span-2">YEAR</div>
          </div>

          {/* Table Body */}
          {filteredWork.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-4 py-6 border-b border-border-secondary hover:bg-surface-secondary transition-colors duration-200 group cursor-pointer"
            >
              <div className="col-span-3">
                <h3 className="text-lg font-medium text-content-primary group-hover:text-interactive-primary transition-colors duration-200">
                  {item.client}
                </h3>
              </div>
              <div className="col-span-3">
                <p className="text-content-secondary">{item.location}</p>
              </div>
              <div className="col-span-4">
                <p className="text-content-secondary">{item.role}</p>
              </div>
              <div className="col-span-2">
                <p className="text-content-secondary">{item.year}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Archive Button */}
        <div className="flex justify-center mt-16">
          <button className="px-8 py-4 bg-content-primary text-content-inverse rounded-full font-medium hover:bg-interactive-hover transition-colors duration-200">
            Archive
          </button>
        </div>
      </div>
    </div>
  );
}
