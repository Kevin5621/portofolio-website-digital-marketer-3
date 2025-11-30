export interface ArchiveItem {
  id: string;
  client: string;
  location: string;
  role: string;
  year: string;
  category: string;
  description: string;
  creativeProjects: {
    images?: string[];
    videos?: string[];
  }[];
}

export const archiveData: ArchiveItem[] = [
  {
    id: "omb-umn-2024",
    client: "OMB UMN 2024",
    location: "Gading Serpong, Indonesia",
    role: "Content Creator",
    year: "2024",
    category: "Content Creator",
    description: "Content creation for OMB UMN 2024, focusing on engaging visual storytelling and event documentation.",
    creativeProjects: [
      {
        videos: [
          "https://drive.google.com/file/d/1FFGYDzixyZL6jKgeaYo5t4XC2l92TR2V/view?usp=drive_link",
          "https://drive.google.com/file/d/1APDzigvsmuNz1YrZsqCQyle93KzBx5KD/view?usp=drive_link",
          "https://drive.google.com/file/d/1xuRFlahYcXglE-03BPJIlyUYjLhmpRgM/view?usp=drive_link"
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
        images: [
          "https://drive.google.com/file/d/1W_tU6yRXmszsBAg2JJCReEHboExnlPgM/view?usp=sharing"
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
        images: [
          "/archive/toyota-runners-club/Export 12.webp"
        ]
      }
    ]
  },
  {
    id: "opak-sehot",
    client: "Opak Sehot",
    location: "Banjarnegara, Indonesia",
    role: "Graphic Designer",
    year: "2024",
    category: "Graphic Design", 
    description: "Traditional snack brand visual identity and packaging design, blending modern design aesthetics with cultural heritage elements.",
    creativeProjects: [
      {
        images: [
          "/archive/opak-sehot/Export 11.webp"
        ]
      }
    ]
  },
  {
    id: "kronju",
    client: "Kronju",
    location: "Semarang, Indonesia",
    role: "Graphic Designer",
    year: "2024",
    category: "Graphic Design",
    description: "Creative visual identity and marketing materials design for Kronju snack brand focusing on bold, engaging visual communication that resonates with the target audience.",
    creativeProjects: [
      {
        images: [
          "/archive/kronju/1.webp",
          "/archive/kronju/2.webp", 
          "/archive/kronju/3.webp",
          "/archive/kronju/4.webp",
          "/archive/kronju/5.webp"
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
