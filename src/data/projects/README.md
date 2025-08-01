# Work Projects Data Structure

Struktur data modular untuk project portfolio yang memudahkan penambahan project baru.

## Struktur Folder

```
src/data/
├── work-details.ts           # File utama dan interface
├── projects/
│   ├── index.ts             # Export semua project
│   ├── _template.ts         # Template untuk project baru
│   ├── ortist-specialist.ts # Data project Ortist Specialist
│   ├── rumah-bahasa-asing.ts # Data project Rumah Bahasa Asing
│   ├── binjasilmen-samapta.ts # Data project Binjasilmen Samapta
│   └── aerospace.ts         # Data project Aerospace
```

## Cara Menambahkan Project Baru

### 1. Buat File Data Project Baru

Salin template dari `_template.ts` dan buat file baru di folder `projects/`:

```bash
cp src/data/projects/_template.ts src/data/projects/nama-project-baru.ts
```

### 2. Edit Data Project

Buka file baru dan sesuaikan semua data:

```typescript
import { WorkDetail } from "../work-details";

export const namaProjectBaruData: WorkDetail = {
  id: "5", // ID unik untuk project
  client: "Nama Client",
  location: "Kota, Negara",
  role: "Role Anda",
  year: "2024",
  category: "Kategori Project",
  description: "Deskripsi lengkap project...",
  // ... isi data lainnya
};
```

### 3. Tambahkan ke Index

Edit `src/data/projects/index.ts` untuk export project baru:

```typescript
// Export all project data
export { ortistSpecialistData } from "./ortist-specialist";
export { rumahBahasaAsingData } from "./rumah-bahasa-asing";
export { binjasimmenSamaptaData } from "./binjasilmen-samapta";
export { aerospaceData } from "./aerospace";
export { namaProjectBaruData } from "./nama-project-baru"; // Tambahkan ini
```

### 4. Tambahkan ke Work Details

Edit `src/data/work-details.ts` untuk include project baru:

```typescript
import { 
  ortistSpecialistData,
  rumahBahasaAsingData, 
  binjasimmenSamaptaData,
  aerospaceData,
  namaProjectBaruData // Tambahkan import
} from "./projects";

export const workDetailsData: Record<string, WorkDetail> = {
  "1": ortistSpecialistData,
  "2": rumahBahasaAsingData,
  "3": binjasimmenSamaptaData,
  "4": aerospaceData,
  "5": namaProjectBaruData, // Tambahkan di sini
};
```

### 5. Update Work Page (Opsional)

Jika perlu, tambahkan data project ke `src/app/work/page.tsx` untuk ditampilkan di halaman work list.

## Panduan Data Project

### ID Project
- Gunakan ID unik (string)
- Urut secara sekuensial: "1", "2", "3", dst.

### Category
Pastikan category sesuai dengan filter di work page:
- "Social Media Marketing Manager"
- "Content Creator" 
- "Graphic Design"

### Images
- Gunakan path relatif dari folder public
- Format: "/public/folder/image.jpg"
- Sediakan 3 gambar untuk content strategies
- 1 gambar untuk best content
- 1 gambar per creative project

### Next Project
- Tambahkan `nextProject` untuk mengarahkan ke project selanjutnya
- Hapus `nextProject` untuk project terakhir

## Struktur Data Lengkap

Setiap project harus memiliki:
- **Basic Info**: id, client, location, role, year, category, description
- **Objectives**: 3-5 tujuan project
- **Challenges**: 3-5 tantangan yang dihadapi
- **Solutions**: 3-5 solusi yang diterapkan
- **Achievements**: Metrics dengan before/after data
- **Content Strategies**: 2-3 strategi konten dengan gambar
- **Best Content**: Konten terbaik dengan statistik
- **Creative Projects**: 2-3 project kreatif
- **Next Project**: Link ke project berikutnya (opsional)

## Tips
- Gunakan data yang akurat dan terverifikasi
- Pastikan gambar tersedia sebelum menambahkan path
- Konsisten dengan format penulisan dan struktur
- Test halaman detail project setelah menambahkan data baru
