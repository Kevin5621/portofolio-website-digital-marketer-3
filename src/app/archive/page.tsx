"use client";

import { ContactSection } from "@/components/sections/ContactSection";

interface ArchiveItem {
  id: string;
  client: string;
  location: string;
  role: string;
  year: string;
  category: string;
}

const archiveData: ArchiveItem[] = [
  {
    id: "1",
    client: "Kronju",
    location: "Semarang, Indonesia",
    role: "Graphic Designer",
    year: "2023",
    category: "Graphic Design"
  },
  {
    id: "2",
    client: "Shinji Film",
    location: "Alam Sutera, Indonesia",
    role: "Storyboard Artist",
    year: "2023",
    category: "Content Creator"
  },
  {
    id: "3",
    client: "Toyota Runners Club",
    location: "Karawang, Indonesia",
    role: "Graphic Designer",
    year: "2023",
    category: "Graphic Design"
  },
  {
    id: "4",
    client: "Opak Sehot",
    location: "Banjarregara, Indonesia",
    role: "Graphic Designer",
    year: "2024",
    category: "Graphic Design"
  },
  {
    id: "5",
    client: "MIS Final Exam",
    location: "Gading Serpong, Indonesia",
    role: "Content Creator",
    year: "2025",
    category: "Content Creator"
  }
];

export default function ArchivePage() {
  return (
    <>
      <div className="min-h-screen bg-surface-background pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Archive Title - Centered */}
          <div className="text-center mb-12">
            <h1 className="text-[8rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-bold leading-none text-content-primary tracking-tight">
              Archive
            </h1>
          </div>

          {/* Archive Table */}
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
              {archiveData.map((item) => (
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
        </div>
      </div>
      
      {/* Contact Section */}
      <ContactSection />
    </>
  );
}
