import { 
  ortistSpecialistData,
  rumahBahasaAsingData, 
  binjasimmenSamaptaData,
  aerospaceData,
  genzummitData,
  ppmHimmaData,
  a5xStudioData
} from "./projects";

export interface WorkDetail {
  id: string;
  client: string;
  location: string;
  role: string;
  year: string;
  category: string;
  description: string;
  objectives: string[];
  challenges: string[];
  solutions: string[];
  achievements: {
    title: string;
    subtitle: string;
    metrics: {
      platform: string;
      contentCreated: string;
      metrics: {
        label: string;
        value: string;
        percentage: string;
      }[];
    }[];
  };
  contentStrategies: {
    title: string;
    description: string;
    images: string[];
  }[];
  bestContent: {
    title: string;
    description: string;
    videos: {
      image: string;
      stats: {
        views: string;
        engagement: string;
        reach: string;
        comments: string;
        saves: string;
      };
    }[];
  };
  creativeProjects: {
    title: string;
    description: string;
    image: string;
  }[];
  nextProject?: {
    id: string;
    title: string;
  };
}

// Modular project data collection
export const workDetailsData: Record<string, WorkDetail> = {
  "ortist-specialist": ortistSpecialistData,
  "rumah-bahasa-asing": rumahBahasaAsingData,
  "binjasilmen-samapta": binjasimmenSamaptaData,
  "aerospace": aerospaceData,
  "genzummit": genzummitData,
  "ppm-himma-2025": ppmHimmaData,
  "a5x-studio": a5xStudioData,
};

export const getWorkDetail = (id: string): WorkDetail | null => {
  return workDetailsData[id] || null;
};

export const getAllWorkIds = (): string[] => {
  return Object.keys(workDetailsData);
};

export const getNextProject = (currentId: string): { id: string; title: string } | null => {
  const workIds = getAllWorkIds();
  const currentIndex = workIds.indexOf(currentId);
  
  if (currentIndex === -1) return null;
  
  // Get next project, or loop back to first if at the end
  const nextIndex = (currentIndex + 1) % workIds.length;
  const nextId = workIds[nextIndex];
  const nextWork = workDetailsData[nextId];
  
  return nextWork ? { id: nextId, title: nextWork.client } : null;
};
