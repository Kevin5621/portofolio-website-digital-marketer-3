import { WorkDetail } from "../work-details";

export const aerospaceData: WorkDetail = {
  id: "aerospace",
  client: "Aerospace",
  location: "Alam Sutera, Indonesia",
  role: "Graphic Designer",
  year: "2024",
  category: "Graphic Design",
  description: "Aerospace is an educational technology company focused on STEM learning and space exploration education. As their Graphic Designer, I created visual materials to make complex aerospace concepts accessible and engaging for students.",
  objectives: [
    "Design educational materials for aerospace learning",
    "Create engaging visual content for STEM education",
    "Develop brand identity for educational programs",
    "Design user interfaces for learning applications",
    "Make complex concepts visually accessible"
  ],
  challenges: [
    "Simplifying complex aerospace concepts for young learners",
    "Creating engaging content for technical subjects",
    "Maintaining scientific accuracy in visual representations",
    "Designing for diverse learning styles and abilities",
    "Balancing educational value with visual appeal"
  ],
  solutions: [
    "Developed visual frameworks for complex concept explanation",
    "Created interactive design elements for digital learning",
    "Implemented consistent design language across materials",
    "Used storytelling through design to engage learners",
    "Collaborated with educators to ensure content effectiveness"
  ],
  achievements: {
    title: "Achievements & Result Summary",
    subtitle: "All achievements are compared to the performance of the previous period prior to my involvement. (May - Agustus 2023)",
    metrics: [
      {
        platform: "Educational Materials",
        contentCreated: "Created 120+ content, which resulted in",
        metrics: [
          { label: "Student Engagement", value: "+ 300%", percentage: "300%" },
          { label: "Learning Retention", value: "+ 250%", percentage: "250%" },
          { label: "Module Completion", value: "+ 400%", percentage: "400%" },
          { label: "Student Satisfaction", value: "+ 44%", percentage: "44%" },
          { label: "Teacher Adoption", value: "+ 180%", percentage: "180%" }
        ]
      },
      {
        platform: "Digital Platforms",
        contentCreated: "Created 120+ content, which resulted in",
        metrics: [
          { label: "App Downloads", value: "+ 15,000", percentage: "500%" },
          { label: "Active Users", value: "+ 8,500", percentage: "300%" },
          { label: "Content Views", value: "+ 500,000", percentage: "800%" },
          { label: "User Engagement", value: "+ 350%", percentage: "350%" },
          { label: "Positive Feedback", value: "+ 95%", percentage: "95%" }
        ]
      }
    ]
  },
  contentStrategies: [
    {
      title: "Interactive Learning Modules",
      description: "Designed interactive educational modules that break down complex aerospace concepts into digestible visual components.",
      images: ["/work/aerospace/strategy-1.png", "/work/aerospace/strategy-2.png", "/work/aerospace/strategy-3.png"]
    },
    {
      title: "STEM Visualization Series",
      description: "Created a comprehensive visual series explaining space exploration, rocket science, and aerospace engineering principles.",
      images: ["/work/aerospace/strategy-4.png", "/work/aerospace/strategy-5.png", "/work/aerospace/strategy-6.png"]
    }
  ],
  bestContent: {
    title: "Best Educational Content",
    description: "An interactive infographic explaining rocket propulsion principles became the most popular learning resource among students.",
    videos: [
      {
        image: "/work/aerospace/best-content.png",
        stats: {
          views: "28.7K",
          engagement: "15.2K",
          reach: "8.5K",
          comments: "2.1K",
          saves: "5.3K"
        }
      }
    ]
  },
  creativeProjects: [
    {
      title: "Space Exploration Learning App",
      description: "Designed the complete user interface for a mobile application teaching space exploration concepts to middle school students.",
      image: "/work/aerospace/learning-app.png"
    },
    {
      title: "Aerospace Career Guide",
      description: "Created a comprehensive visual guide showcasing various career paths in the aerospace industry for students.",
      image: "/work/aerospace/career-guide.png"
    }
  ]
};
