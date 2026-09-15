import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { Marquee } from "@/components/Marquee";
import { StorySection } from "@/components/StorySection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { GallerySection } from "@/components/GallerySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <Marquee />
      <StorySection />
      <FeaturesSection />
      <GallerySection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}