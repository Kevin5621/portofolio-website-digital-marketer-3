export interface WorkItem {
  id: string;
  client: string;
  location: string;
  role: string;
  year: string;
  category: string;
}

export const workData: WorkItem[] = [
  {
    id: "ortist-specialist",
    client: "Ortist Spesialist",
    location: "Semarang, Indonesia",
    role: "Social Media Marketing Manager",
    year: "2023",
    category: "Social Media Marketing Manager"
  },
  {
    id: "rumah-bahasa-asing",
    client: "Rumah Bahasa Asing",
    location: "Semarang, Indonesia", 
    role: "Social Media Marketing Manager",
    year: "2023",
    category: "Social Media Marketing Manager"
  },
  {
    id: "binjasiimen-samapta",
    client: "Binjasiimen Samapta",
    location: "Banjarregara, Indonesia",
    role: "Social Media Marketing Manager",
    year: "2023-2024",
    category: "Social Media Marketing Manager"
  },
  {
    id: "aerospace",
    client: "Aerospace",
    location: "Alam Sutera, Indonesia",
    role: "Graphic Designer",
    year: "2024",
    category: "Graphic Design"
  },
  {
    id: "genzummit",
    client: "GENZUMMIT™",
    location: "Gading Serpong, Indonesia",
    role: "Content Creator",
    year: "2025",
    category: "Content Creator"
  },
  {
    id: "ppm-himma-2025",
    client: "PPM HIMMA 2025",
    location: "Gading Serpong, Indonesia",
    role: "Content Creator",
    year: "2025",
    category: "Content Creator"
  },
  {
    id: "a5x-studio",
    client: "A5X Studio",
    location: "Gading Serpong, Indonesia",
    role: "Video Editing Agency",
    year: "2023-Now",
    category: "Content Creator"
  },
  {
    id: "gen-ztrive",
    client: "GEN-ZTRIVE™",
    location: "West Jakarta, Indonesia",
    role: "Content Creator",
    year: "2025-Now",
    category: "Content Creator"
  },
  {
    id: "ika-binus-ceo-forum",
    client: "IKA BINUS CEO FORUM",
    location: "South Jakarta, Indonesia",
    role: "Content Creator",
    year: "2025",
    category: "Content Creator"
  },
  {
    id: "fest-z-2025",
    client: "FEST Z 2025™",
    location: "South Jakarta, Indonesia",
    role: "Content Creator",
    year: "2025",
    category: "Content Creator"
  }
];

export function getWorkItemById(id: string): WorkItem | undefined {
  return workData.find(item => item.id === id);
}

export function getAllWorkItems(): WorkItem[] {
  return workData;
}
