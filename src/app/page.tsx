import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { SelectedWorks } from '@/components/sections/SelectedWorks'
import { ContactSection } from '@/components/sections/ContactSection'
import { TextSlideUpDemo } from '@/components/sections/TextSlideUpDemo'

export default function Home() {
  return (
    <div className="min-h-screen hero-page">
      <HeroSection />
      <TextSlideUpDemo />
      <AboutSection />
      <SelectedWorks />
      <ContactSection />
    </div>
  )
}
