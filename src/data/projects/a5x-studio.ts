import { WorkDetail } from "../work-details";

export const a5xStudioData: WorkDetail = {
  id: "a5x-studio",
  client: "A5X Studio",
  location: "Gading Serpong, Indonesia",
  role: "Video Editing Agency",
  year: "2023-Now",
  category: "Content Creator",
  description: "A5X Studio is a creative video editing agency specializing in high-quality video production for brands, content creators, and businesses across various industries.",
  objectives: [
    "Provide professional video editing services for diverse client needs",
    "Maintain consistent high-quality output across all projects",
    "Build long-term client relationships through reliable service delivery",
    "Expand service offerings to include motion graphics and animation"
  ],
  challenges: [
    "Managing multiple client projects with varying deadlines and requirements",
    "Staying updated with latest editing trends and software capabilities",
    "Balancing creative vision with client expectations and budget constraints"
  ],
  solutions: [
    "Implemented project management system for efficient workflow tracking",
    "Developed standardized editing processes while maintaining creative flexibility",
    "Created client consultation framework to align expectations early",
    "Invested in continuous learning and software updates",
    "Built template library for common editing styles and transitions"
  ],
  achievements: {
    title: "Agency Growth & Client Success",
    subtitle: "Delivering professional video editing services since 2023",
    metrics: [
      {
        platform: "Client Projects",
        contentCreated: "200+ videos edited",
        metrics: [
          { label: "Client Retention", value: "90%", percentage: "180%" },
          { label: "Project Completion", value: "100%", percentage: "100%" },
          { label: "Quality Rating", value: "4.8/5", percentage: "160%" }
        ]
      },
      {
        platform: "Service Expansion",
        contentCreated: "Multiple service tiers",
        metrics: [
          { label: "Service Types", value: "8+", percentage: "300%" },
          { label: "Monthly Projects", value: "25+", percentage: "400%" },
          { label: "Client Base", value: "50+", percentage: "500%" }
        ]
      }
    ]
  },
  contentStrategies: [
    {
      title: "Brand Video Production",
      description: "Professional editing for corporate videos, advertisements, and brand storytelling content",
      images: ["/about/photo/1.png", "/about/photo/2.png"]
    },
    {
      title: "Social Media Content",
      description: "Short-form video editing optimized for Instagram, TikTok, and YouTube platforms",
      images: ["/about/photo/3.png", "/about/photo/4.png"]
    }
  ],
  bestContent: {
    title: "Corporate Brand Film",
    description: "High-end brand video production showcasing company values and culture",
    videos: [
      {
        image: "/about/photo/5.png",
        stats: {
          views: "100K+",
          engagement: "18%",
          reach: "75K+",
          comments: "2K",
          saves: "5K"
        }
      }
    ]
  },
  creativeProjects: [
    {
      title: "Motion Graphics Package",
      description: "Custom motion graphics and animation templates for various client needs",
      image: "/about/photo/6.png"
    }
  ]
};
