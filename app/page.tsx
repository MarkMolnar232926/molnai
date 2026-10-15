import { Hero } from "@/components/home/Hero";
import { AudienceSelector } from "@/components/home/AudienceSelector";
import { CategoryBento } from "@/components/home/CategoryBento";
import { BrandStory } from "@/components/home/BrandStory";
import { ProProgram } from "@/components/home/ProProgram";
import { EducationBlog } from "@/components/home/EducationBlog";
import { Reviews } from "@/components/home/Reviews";
import { Newsletter } from "@/components/home/Newsletter";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { FinderSection } from "@/components/home/FinderSection";
import { ResistanceGuide } from "@/components/home/ResistanceGuide";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { ChallengeTeaser } from "@/components/home/ChallengeTeaser";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandMarquee />
      <AudienceSelector />
      <FinderSection />
      <ResistanceGuide />
      <CategoryBento />
      <ProductCarousel />
      <BrandStory />
      <ProProgram />
      <EducationBlog />
      <ChallengeTeaser />
      <Reviews />
      <Newsletter />
    </>
  );
}
