import { WorkDetail } from "../work-details";

export const rumahBahasaAsingData: WorkDetail = {
  id: "rumah-bahasa-asing",
  client: "Rumah Bahasa Asing",
  location: "Semarang, Indonesia",
  role: "Social Media Marketing Manager",
  year: "2023",
  category: "Social Media Marketing Manager",
  description: "Rumah Bahasa Asing (RBA) is an online Korean language learning platform adopting Seoul National University's curriculum, offering an interactive and immersive learning experience for Indonesian students.",
  objectives: [
    "Develop a TikTok and Instagram content strategy for RBA",
    "Increase brand awareness and student enrollment",
    "Create engaging educational content about Korean language",
    "Build a community of Korean language learners",
    "Position RBA as the leading Korean language institution"
  ],
  challenges: [
    "High competition in the language learning market",
    "Need to create engaging educational content", 
    "Building trust for online learning platform",
    "Reaching target audience of Korean culture enthusiasts",
    "Balancing entertainment with educational value"
  ],
  solutions: [
    "Developed content strategy focusing on Korean culture and daily phrases",
    "Created viral-worthy educational videos with trendy formats",
    "Leveraged Korean pop culture trends to increase engagement",
    "Implemented student success stories and testimonials",
    "Collaborated with Korean native speakers for authentic content"
  ],
  achievements: {
    title: "Achievements & Result Summary",
    subtitle: "All achievements are compared to the performance of the previous period prior to my involvement. (May - Agustus 2023)",
    metrics: [
      {
        platform: "Instagram",
        contentCreated: "Created 120+ content, which resulted in",
        metrics: [
          { label: "Reach", value: "+ 2,500,000", percentage: "2,583%" },
          { label: "Profile Visit", value: "+ 150,000", percentage: "1,267%" },
          { label: "Click Link", value: "+ 2,500", percentage: "436%" },
          { label: "Followers", value: "+ 30,997", percentage: "2,583%" },
          { label: "Interaction", value: "+ 500,000", percentage: "20,356%" }
        ]
      },
      {
        platform: "TikTok",
        contentCreated: "Created 120+ content, which resulted in",
        metrics: [
          { label: "Views", value: "+ 15,000,000", percentage: "13,725%" },
          { label: "Profile Visit", value: "+ 500,000", percentage: "21,319%" },
          { label: "Followers", value: "+ 372,500", percentage: "74,500%" },
          { label: "Like", value: "+ 1,500,000", percentage: "114,594%" },
          { label: "Comment", value: "+ 200,000", percentage: "73,424%" },
          { label: "Share", value: "+ 150,000", percentage: "66,987%" }
        ]
      }
    ]
  },
  contentStrategies: [
    {
      title: "Korean Daily Phrases Series",
      description: "Created engaging videos teaching practical Korean phrases for everyday situations, making language learning accessible and fun.",
      images: ["/work/rumah-bahasa-asing/strategy-1.png", "/work/rumah-bahasa-asing/strategy-2.png", "/work/rumah-bahasa-asing/strategy-3.png"]
    },
    {
      title: "Cultural Integration Content",
      description: "Developed content that combines Korean language learning with cultural insights, including K-pop references and Korean customs.",
      images: ["/work/rumah-bahasa-asing/strategy-4.png", "/work/rumah-bahasa-asing/strategy-5.png", "/work/rumah-bahasa-asing/strategy-6.png"]
    }
  ],
  bestContent: {
    title: "Best Organic Content",
    description: "Our Korean daily phrases series became incredibly popular, with this particular video about common greetings reaching massive engagement.",
    videos: [
      {
        image: "/work/rumah-bahasa-asing/best-content.png",
        stats: {
          views: "2.1M",
          engagement: "150K",
          reach: "85K",
          comments: "12K",
          saves: "45K"
        }
      }
    ]
  },
  creativeProjects: [
    {
      title: "Korean Language Learning App UI",
      description: "Designed user interface concepts for a mobile learning application to complement the online courses.",
      image: "/work/rumah-bahasa-asing/app-ui.png"
    },
    {
      title: "Student Success Campaign",
      description: "Created a campaign showcasing students who successfully learned Korean through RBA, inspiring new enrollments.",
      image: "/work/rumah-bahasa-asing/success-campaign.png"
    }
  ],
  nextProject: {
    id: "3",
    title: "Binjasilmen Samapta"
  }
};
