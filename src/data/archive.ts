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
          "/archive/kronju/1.webp",
          "/archive/kronju/2.webp", 
          "/archive/kronju/3.webp",
          "/archive/kronju/4.webp",
          "/archive/kronju/5.webp"
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
          "/archive/shinji-film/1.webp",
          "/archive/shinji-film/2.webp",
          "/archive/shinji-film/3.webp",
          "/archive/shinji-film/4.webp",
          "/archive/shinji-film/5.webp",
          "/archive/shinji-film/6.webp"
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
          "/archive/toyota-runners-club/Export 12.webp"
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
          "/archive/opak-sehot/Export 11.webp"
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
          "/archive/mis-final-exam/Export Horizontal.webp"
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
