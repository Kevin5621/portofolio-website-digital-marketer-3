export interface ArchiveItem {
  id: string;
  client: string;
  location: string;
  role: string;
  year: string;
  category: string;
  description: string;
  creativeProjects: {
    title: string;
    description: string;
    images: string[];
  }[];
}

export const archiveData: ArchiveItem[] = [
  {
    id: "kronju",
    client: "Kronju",
    location: "Semarang, Indonesia",
    role: "Graphic Designer",
    year: "2023",
    category: "Graphic Design",
    description: "Creative visual identity and marketing materials design for Kronju snack brand focusing on bold, engaging visual communication that resonates with the target audience.",
    creativeProjects: [
      {
        title: "My Creative Projects",
        description: "A collection of creative visual designs including social media content, product packaging concepts, and marketing materials that showcase the brand's personality and appeal to consumers.",
        images: [
          "/about/photo/1.png",
          "/about/photo/2.png", 
          "/about/photo/3.png",
          "/about/photo/4.png",
          "/about/photo/5.png",
          "/about/photo/6.png"
        ]
      }
    ]
  },
  {
    id: "shinji-film",
    client: "Shinji Film",
    location: "Alam Sutera, Indonesia",
    role: "Storyboard Artist",
    year: "2023", 
    category: "Content Creator",
    description: "Visual storytelling through storyboard creation for film and video production, translating scripts into compelling visual narratives.",
    creativeProjects: [
      {
        title: "Storyboard Collection",
        description: "Professional storyboard designs for various film projects, showcasing visual narrative skills and cinematic understanding.",
        images: [
          "/about/photo/1.png",
          "/about/photo/2.png",
          "/about/photo/3.png",
          "/about/photo/4.png"
        ]
      }
    ]
  },
  {
    id: "toyota-runners-club",
    client: "Toyota Runners Club",
    location: "Karawang, Indonesia",
    role: "Graphic Designer", 
    year: "2023",
    category: "Graphic Design",
    description: "Brand visual design for Toyota Runners Club events and promotional materials, creating energetic and motivational designs for the running community.",
    creativeProjects: [
      {
        title: "Event Visual Identity",
        description: "Comprehensive visual design for running events including posters, banners, social media content, and merchandise designs.",
        images: [
          "/about/photo/1.png",
          "/about/photo/2.png",
          "/about/photo/3.png",
          "/about/photo/4.png",
          "/about/photo/5.png"
        ]
      }
    ]
  },
  {
    id: "opak-sehot",
    client: "Opak Sehot",
    location: "Banjarregara, Indonesia",
    role: "Graphic Designer",
    year: "2024",
    category: "Graphic Design", 
    description: "Traditional snack brand visual identity and packaging design, blending modern design aesthetics with cultural heritage elements.",
    creativeProjects: [
      {
        title: "Brand & Packaging Design",
        description: "Complete visual identity including logo design, packaging concepts, and marketing materials for traditional Indonesian snack brand.",
        images: [
          "/about/photo/1.png",
          "/about/photo/2.png",
          "/about/photo/3.png",
          "/about/photo/4.png"
        ]
      }
    ]
  },
  {
    id: "mis-final-exam",
    client: "MIS Final Exam",
    location: "Gading Serpong, Indonesia",
    role: "Content Creator",
    year: "2025",
    category: "Content Creator",
    description: "Educational content creation for Management Information Systems final examination materials, focusing on clear visual communication and information design.",
    creativeProjects: [
      {
        title: "Educational Content Design",
        description: "Comprehensive visual materials for academic purposes including infographics, presentation designs, and educational content layouts.",
        images: [
          "/about/photo/1.png",
          "/about/photo/2.png",
          "/about/photo/3.png"
        ]
      }
    ]
  },
  {
    id: "personal-project-1",
    client: "Personal Project",
    location: "Jakarta, Indonesia",
    role: "UI/UX Designer",
    year: "2024",
    category: "Digital Design",
    description: "Personal exploration in user interface and experience design, focusing on modern digital product design principles.",
    creativeProjects: [
      {
        title: "Digital Interface Design",
        description: "Collection of personal UI/UX design projects showcasing modern design principles and user-centered approach.",
        images: [
          "/about/photo/1.png",
          "/about/photo/2.png",
          "/about/photo/3.png",
          "/about/photo/4.png"
        ]
      }
    ]
  },
  {
    id: "freelance-branding",
    client: "Various Clients",
    location: "Remote, Indonesia",
    role: "Brand Designer",
    year: "2024",
    category: "Branding",
    description: "Freelance branding projects for various small to medium businesses, creating cohesive brand identities and visual systems.",
    creativeProjects: [
      {
        title: "Brand Identity Collection",
        description: "Diverse collection of brand identity projects including logo design, brand guidelines, and marketing materials.",
        images: [
          "/about/photo/1.png",
          "/about/photo/2.png",
          "/about/photo/3.png"
        ]
      }
    ]
  }
];

export function getArchiveItemById(id: string): ArchiveItem | undefined {
  return archiveData.find(item => item.id === id);
}

export function getAllArchiveItems(): ArchiveItem[] {
  return archiveData;
}
