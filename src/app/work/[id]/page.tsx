"use client";

import { useParams, notFound } from "next/navigation";
import { getWorkDetail } from "@/data/work-details";
import { WorkDetailHero } from "@/components/work/WorkDetailHero";
import { WorkObjectives } from "@/components/work/WorkObjectives";
import { WorkChallenges } from "@/components/work/WorkChallenges";
import { WorkAchievements } from "@/components/work/WorkAchievements";
import { WorkContentStrategies } from "@/components/work/WorkContentStrategies";
import { WorkBestContent } from "@/components/work/WorkBestContent";
import { WorkCreativeProjects } from "@/components/work/WorkCreativeProjects";
import { WorkNextProject } from "@/components/work/WorkNextProject";
import { ContactSection } from "@/components/sections/ContactSection";

export default function WorkDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const workDetail = getWorkDetail(id);
  
  if (!workDetail) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-surface-background">
      <WorkDetailHero workDetail={workDetail} />
      <WorkObjectives objectives={workDetail.objectives} />
      <WorkChallenges challenges={workDetail.challenges} solutions={workDetail.solutions} />
      <WorkAchievements achievements={workDetail.achievements} />
      <WorkContentStrategies strategies={workDetail.contentStrategies} />
      <WorkBestContent bestContent={workDetail.bestContent} />
      <WorkCreativeProjects projects={workDetail.creativeProjects} />
      {workDetail.nextProject && <WorkNextProject nextProject={workDetail.nextProject} />}
      <ContactSection />
    </main>
  );
}
