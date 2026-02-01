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
            <h1 className="text-[4rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-bold leading-none text-content-primary tracking-tight">
              Archive
            </h1>
          </div>

          {/* Archive Table */}
          <div className="max-w-full overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 md:gap-8 py-6 border-b border-border-primary text-sm font-medium text-content-secondary uppercase tracking-wider">
              <div className="col-span-8 md:col-span-3 text-left">CLIENT</div>
              <div className="hidden md:block col-span-3 text-left">LOCATION</div>
              <div className="hidden md:block col-span-4 text-left">ROLE</div>
              <div className="col-span-4 md:col-span-2 text-right">YEAR</div>
            </div>

            {/* Table Body */}
            <div className="space-y-0">
              {archiveData.map((item) => (
                <Link
                  key={item.id}
                  href={`/archive/${item.id}`}
                  className="grid grid-cols-12 gap-4 md:gap-8 py-6 md:py-8 border-b border-border-secondary hover:bg-surface-secondary transition-colors duration-200 group cursor-pointer w-full"
                >
                  <div className="col-span-8 md:col-span-3 text-left">
                    <h3 className="text-lg md:text-xl font-semibold text-content-primary group-hover:text-interactive-primary transition-colors duration-200 truncate">
                      {item.client}
                    </h3>
                    {/* Mobile only details */}
                    <div className="md:hidden mt-1 space-y-0.5">
                      <p className="text-sm text-content-secondary truncate">{item.role}</p>
                      <p className="text-xs text-content-secondary/70 truncate">{item.location}</p>
                    </div>
                  </div>
                  <div className="hidden md:block col-span-3 text-left">
                    <p className="text-lg text-content-secondary">{item.location}</p>
                  </div>
                  <div className="hidden md:block col-span-4 text-left">
                    <p className="text-lg text-content-secondary">{item.role}</p>
                  </div>
                  <div className="col-span-4 md:col-span-2 text-right">
                    <p className="text-base md:text-lg font-medium text-content-secondary">{item.year}</p>
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
