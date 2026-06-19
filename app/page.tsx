import { SiteHeader } from "@/components/SiteHeader";
import { AboutSection } from "@/components/home/AboutSection";
import { AudienceSection } from "@/components/home/AudienceSection";
import { ContactSection } from "@/components/home/ContactSection";
import { FeaturedCoursesSection } from "@/components/home/FeaturedCoursesSection";
import { HomeHero } from "@/components/home/HomeHero";
import { InstructorSection } from "@/components/home/InstructorSection";
import { SiteFooter } from "@/components/home/SiteFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF6EF] text-[#24302f]">
      <SiteHeader />
      <HomeHero />
      <AudienceSection />
      <FeaturedCoursesSection />
      <AboutSection />
      <InstructorSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
