import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archive Detail | Adhara Eka Sakti Portfolio",
  description: "Detailed view of creative projects and work from the archive collection.",
};

export default function ArchiveDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
