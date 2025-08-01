import { WorkDetail } from "../work-details";

export const ppmHimmaData: WorkDetail = {
  id: "ppm-himma-2025",
  client: "PPM HIMMA 2025",
  location: "Gading Serpong, Indonesia",
  role: "Content Creator",
  year: "2025",
  category: "Content Creator",
  description: "PPM HIMMA 2025 is an educational program focusing on character building and leadership development for students through Islamic values and modern management practices.",
  objectives: [
    "Create educational content that promotes Islamic values and leadership",
    "Develop engaging materials for student recruitment and program awareness",
    "Build a strong online community around character development",
    "Showcase program benefits and success stories"
  ],
  challenges: [
    "Balancing religious content with modern appeal to diverse audiences",
    "Creating content that resonates with both students and parents",
    "Communicating complex character development concepts in simple, engaging ways"
  ],
  solutions: [
    "Developed content strategy combining Islamic teachings with practical life skills",
    "Created student testimonial videos and success story highlights",
    "Designed infographic series explaining program modules and benefits",
    "Implemented storytelling approach to make content more relatable",
    "Collaborated with program alumni for authentic content creation"
  ],
  achievements: {
    title: "Program Awareness & Engagement Growth",
    subtitle: "Building community through values-based content",
    metrics: [
      {
        platform: "Instagram",
        contentCreated: "60+ posts, 40+ stories",
        metrics: [
          { label: "Reach", value: "8K+", percentage: "180%" },
          { label: "Engagement", value: "9.2%", percentage: "160%" },
          { label: "Saves", value: "800+", percentage: "200%" }
        ]
      },
      {
        platform: "YouTube",
        contentCreated: "15+ videos",
        metrics: [
          { label: "Views", value: "12K+", percentage: "220%" },
          { label: "Watch Time", value: "85%", percentage: "140%" },
          { label: "Subscribers", value: "500+", percentage: "300%" }
        ]
      }
    ]
  },
  contentStrategies: [
    {
      title: "Character Building Series",
      description: "Educational content focusing on Islamic character development and leadership principles",
      images: ["/about/photo/1.png", "/about/photo/2.png"]
    },
    {
      title: "Student Success Stories",
      description: "Testimonials and case studies from program graduates showcasing real-world impact",
      images: ["/about/photo/3.png", "/about/photo/4.png"]
    }
  ],
  bestContent: {
    title: "Leadership Through Islamic Values",
    description: "Comprehensive video series explaining how Islamic principles apply to modern leadership",
    videos: [
      {
        image: "/about/photo/5.png",
        stats: {
          views: "8K+",
          engagement: "2.5K",
          reach: "1.8K",
          comments: "150",
          saves: "800"
        }
      }
    ]
  },
  creativeProjects: [
    {
      title: "Program Visual Identity",
      description: "Complete branding package including Islamic-inspired design elements and modern typography",
      image: "/about/photo/6.png"
    }
  ]
};
