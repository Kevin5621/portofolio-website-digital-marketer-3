"use client";

import { useParams } from "next/navigation";
import { getArchiveItemById } from "@/data/archive";
import { ContactSection } from "@/components/sections/ContactSection";
import { ArchiveHeader } from "@/components/archive/ArchiveHeader";
import { ArchiveContent } from "@/components/archive/ArchiveContent";
import { NotFound } from "@/components/archive/NotFound";

export default function ArchiveDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const archiveItem = getArchiveItemById(id);

  if (!archiveItem) {
    return <NotFound />;
  }

  return (
    <>
      <div className="min-h-screen bg-surface-background">
        <ArchiveHeader 
          client={archiveItem.client}
          role={archiveItem.role}
          location={archiveItem.location}
        />
        <ArchiveContent archiveItem={archiveItem} />
      </div>
      <ContactSection />
    </>
  );
}
