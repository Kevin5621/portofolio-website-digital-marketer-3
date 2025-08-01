import { WorkDetail } from "../work-details";

// Template for creating new project data
// Copy this structure when adding new projects

export const projectTemplate: WorkDetail = {
  id: "unique-id", // Use unique identifier for the project
  client: "Client Name",
  location: "City, Country",
  role: "Your Role",
  year: "Year",
  category: "Project Category", // Should match one of the categories in work page
  description: "Brief description of the project and your role. Explain what the client does and what you accomplished.",
  
  objectives: [
    "First objective - what you aimed to achieve",
    "Second objective - another goal",
    "Third objective - additional target",
    // Add 3-5 objectives
  ],
  
  challenges: [
    "First challenge you faced",
    "Second challenge or obstacle", 
    "Third challenge or constraint",
    // Add 3-5 challenges
  ],
  
  solutions: [
    "First solution or approach you implemented",
    "Second solution or strategy you used",
    "Third solution or method you applied",
    // Add 3-5 solutions (should match number of challenges)
  ],
  
  achievements: {
    title: "Achievements & Result Summary",
    metrics: [
      {
        platform: "Platform Name (e.g., Instagram, TikTok, Website)",
        before: "Before metric (e.g., 1,200 followers)",
        after: "After metric (e.g., 32,197 followers)", 
        growth: "Growth percentage (e.g., +2,583%)"
      },
      {
        platform: "Second Platform",
        before: "Before metric",
        after: "After metric",
        growth: "Growth percentage"
      }
      // Add 2-4 key metrics
    ]
  },
  
  contentStrategies: [
    {
      title: "Strategy Title",
      description: "Detailed description of the content strategy you implemented and why it was effective.",
      images: [
        "/path/to/strategy-image-1.jpg",
        "/path/to/strategy-image-2.jpg", 
        "/path/to/strategy-image-3.jpg"
      ]
    },
    {
      title: "Second Strategy Title",
      description: "Description of another strategy you used.",
      images: [
        "/path/to/strategy-image-4.jpg",
        "/path/to/strategy-image-5.jpg",
        "/path/to/strategy-image-6.jpg"
      ]
    }
    // Add 2-3 content strategies
  ],
  
  bestContent: {
    title: "Best Organic Content", // Or "Best Educational Content", etc.
    description: "Description of your most successful content piece and why it performed well.",
    stats: {
      views: "View count (e.g., 2.1M)",
      engagement: "Engagement rate (e.g., 12.7%)",
      reach: "Reach count (e.g., 3.2M)"
    },
    image: "/path/to/best-content-image.jpg"
  },
  
  creativeProjects: [
    {
      title: "Creative Project Title",
      description: "Description of a creative project or campaign you designed/created.",
      image: "/path/to/creative-project-image.jpg"
    },
    {
      title: "Second Creative Project",
      description: "Description of another creative work.",
      image: "/path/to/second-project-image.jpg"
    }
    // Add 2-3 creative projects
  ],
  
  nextProject: {
    id: "next-project-id", // ID of the next project to link to
    title: "Next Project Title" // Name of the next project
  }
  // Note: Remove nextProject for the last project in the sequence
};
