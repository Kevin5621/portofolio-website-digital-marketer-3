import { 
  ortistSpecialistData,
  rumahBahasaAsingData, 
  binjasimmenSamaptaData,
  aerospaceData
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
    stats: {
      views: string;
      engagement: string;
      reach: string;
    };
    image: string;
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
  "1": ortistSpecialistData,
  "2": rumahBahasaAsingData,
  "3": binjasimmenSamaptaData,
  "4": aerospaceData,
  // Add new projects here as they are created:
  // "5": newProjectData,
  // "6": anotherProjectData,
};

export const getWorkDetail = (id: string): WorkDetail | null => {
  return workDetailsData[id] || null;
};

export const getAllWorkIds = (): string[] => {
  return Object.keys(workDetailsData);
};
