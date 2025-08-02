"use client";

import { useParams, notFound } from "next/navigation";
import { useEffect } from "react";
import { getWorkDetail, getNextProject } from "@/data/work-details";
import { useInstantScrollToTop } from "@/hooks/useLenis";
import { WorkDetailHero } from "@/components/work/WorkDetailHero";
import { WorkJobDescription } from "@/components/work/WorkJobDescription";
import { WorkAchievements } from "@/components/work/WorkAchievements";
import { WorkContentStrategies } from "@/components/work/WorkContentStrategies";
import { WorkCreativeProjects } from "@/components/work/WorkCreativeProjects";
import { WorkNextProject } from "@/components/work/WorkNextProject";
import { WorkSpecialText } from "@/components/work/WorkSpecialText";

export default function WorkDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const workDetail = getWorkDetail(id);
  const nextProject = getNextProject(id);
  const instantScrollToTop = useInstantScrollToTop();
  
  // Scroll to top when the component mounts or when the ID changes
  useEffect(() => {
    // Use the specialized hook
    instantScrollToTop();
    
    // Additional aggressive methods as backup
    const aggressiveScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      document.body.scrollIntoView({ behavior: 'instant', block: 'start' });
    };
    
    // Execute multiple times with very short intervals
    aggressiveScroll();
    setTimeout(aggressiveScroll, 1);
    setTimeout(aggressiveScroll, 5);
    setTimeout(aggressiveScroll, 10);
    setTimeout(aggressiveScroll, 25);
    setTimeout(aggressiveScroll, 50);
    setTimeout(aggressiveScroll, 100);
    setTimeout(aggressiveScroll, 200);
    setTimeout(aggressiveScroll, 300);
    
    // Keep trying every 50ms for the first second
    const intervalId = setInterval(aggressiveScroll, 50);
    const clearIntervalId = setTimeout(() => clearInterval(intervalId), 1000);
    
    return () => {
      clearInterval(intervalId);
      clearTimeout(clearIntervalId);
    };
  }, [id, instantScrollToTop]);
  
  if (!workDetail) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-surface-background">
      <WorkDetailHero workDetail={workDetail} />
      <WorkJobDescription workDetail={workDetail} />
      {workDetail.achievements && <WorkAchievements achievements={workDetail.achievements} />}
      
      {/* Special handling for Aerospace project */}
      {workDetail.specialText ? (
        <WorkSpecialText text={workDetail.specialText} />
      ) : workDetail.contentStrategies && workDetail.bestContent ? (
        <WorkContentStrategies 
          strategies={workDetail.contentStrategies} 
          bestContent={workDetail.bestContent} 
        />
      ) : null}
      
      <WorkCreativeProjects projects={workDetail.creativeProjects} />
      {nextProject && <WorkNextProject nextProject={nextProject} />}
    </main>
  );
}
