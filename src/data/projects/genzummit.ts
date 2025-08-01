import { WorkDetail } from "../work-details";

export const genzummitData: WorkDetail = {
  id: "genzummit",
  client: "GENZUMMIT™",
  location: "Gading Serpong, Indonesia",
  role: "Content Creator",
  year: "2025",
  category: "Content Creator",
  description: "GENZUMMIT™ is a youth summit event focusing on empowering Generation Z through technology, innovation, and leadership development.",
  objectives: [
    "Create engaging social media content to promote the GENZUMMIT™ event",
    "Develop visual content that resonates with Gen Z audience aged 16-25",
    "Increase event awareness and registration through strategic content marketing",
    "Build excitement and community engagement around the summit"
  ],
  challenges: [
    "Creating content that stands out in the competitive youth event market",
    "Appealing to diverse Gen Z interests and motivations",
    "Building momentum for a new event brand"
  ],
  solutions: [
    "Researched Gen Z content consumption patterns and preferences",
    "Developed trending content formats (short videos, stories, interactive posts)",
    "Created speaker highlight content and behind-the-scenes materials",
    "Implemented user-generated content campaigns",
    "Collaborated with youth influencers and speakers for content amplification"
  ],
  achievements: {
    title: "Content Performance & Event Success",
    subtitle: "Driving engagement and registrations for GENZUMMIT™",
    metrics: [
      {
        platform: "Instagram",
        contentCreated: "45+ posts, 30+ stories",
        metrics: [
          { label: "Reach", value: "15K+", percentage: "300%" },
          { label: "Engagement", value: "8.5%", percentage: "150%" },
          { label: "Story Views", value: "5K+", percentage: "200%" }
        ]
      },
      {
        platform: "TikTok", 
        contentCreated: "25+ videos",
        metrics: [
          { label: "Views", value: "50K+", percentage: "400%" },
          { label: "Engagement", value: "12%", percentage: "250%" },
          { label: "Shares", value: "1.2K+", percentage: "300%" }
        ]
      }
    ]
  },
  contentStrategies: [
    {
      title: "Speaker Spotlight Series",
      description: "Featured content highlighting keynote speakers and their expertise, building credibility and interest",
      images: ["/about/photo/1.png", "/about/photo/2.png"]
    },
    {
      title: "Gen Z Empowerment Posts",
      description: "Motivational and educational content focused on leadership, innovation, and career development",
      images: ["/about/photo/3.png", "/about/photo/4.png"]
    }
  ],
  bestContent: {
    title: "Event Teaser Campaign",
    description: "Dynamic video series showcasing what Gen Z can expect from GENZUMMIT™",
    stats: {
      views: "25K+",
      engagement: "15%",
      reach: "12K+"
    },
    image: "/about/photo/5.png"
  },
  creativeProjects: [
    {
      title: "Event Branding Materials",
      description: "Complete visual identity for GENZUMMIT™ including logos, banners, and promotional materials",
      image: "/about/photo/6.png"
    }
  ]
};
