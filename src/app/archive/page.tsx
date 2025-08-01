"use client";

import Link from "next/link";
import { ContactSection } from "@/components/sections/ContactSection";
import { getAllArchiveItems } from "@/data/archive";

export default function ArchivePage() {
  const archiveData = getAllArchiveItems();

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
                <Link
                  key={item.id}
                  href={`/archive/${item.id}`}
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
                </Link>
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
