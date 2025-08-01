"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MaskButton } from "@/components/ui/mask-button";
import { ContactSection } from "@/components/sections/ContactSection";
import { getAllWorkItems } from "@/data/work";

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
            <div className="grid grid-cols-12 gap-8 py-6 border-b border-border-primary text-sm font-medium text-content-secondary uppercase tracking-wider">
              <div className="col-span-3 text-left">CLIENT</div>
              <div className="col-span-3 text-left">LOCATION</div>
              <div className="col-span-4 text-left">ROLE</div>
              <div className="col-span-2 text-right">YEAR</div>
            </div>

            {/* Table Body */}
            <div className="space-y-0">
              {filteredWork.map((item) => (
                <button
                  key={item.id}
                  className="grid grid-cols-12 gap-8 py-8 border-b border-border-secondary hover:bg-surface-secondary transition-colors duration-200 group cursor-pointer w-full text-left"
                  onClick={() => router.push(`/work/${item.id}`)}
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
              ))}
            </div>
          </div>

          {/* Archive Button - Centered */}
          <div className="flex justify-center mt-20">
            <MaskButton 
              size="md" 
              variant="dark"
              onClick={() => router.push('/archive')}
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
