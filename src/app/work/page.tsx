"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                                  className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap ${
                    activeFilter === category 
                      ? 'bg-[#f2f1ef] text-[#282828] hover:bg-[#282828] hover:text-[#f2f1ef] focus:ring-[#282828] focus:ring-offset-[#f2f1ef]' 
                      : 'bg-[#282828] text-[#f2f1ef] hover:bg-[#f2f1ef] hover:text-[#282828] focus:ring-[#f2f1ef] focus:ring-offset-[#282828]'
                  }`}
              >
                {category}
              </button>
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
            <button 
              className="px-12 py-4 text-lg font-medium rounded-full bg-[#f2f1ef] text-[#282828] hover:bg-[#282828] hover:text-[#f2f1ef] transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#282828] focus:ring-offset-2"
              onClick={() => router.push('/archive')}
            >
              Archive
            </button>
          </div>
        </div>
      </div>
      
      {/* Contact Section */}
      <ContactSection />
    </>
  );
}
