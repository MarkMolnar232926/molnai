import { Hero } from "@/components/home/Hero";
import { AudienceSelector } from "@/components/home/AudienceSelector";
import { ResistanceGuide } from "@/components/home/ResistanceGuide";
import { CategoryBento } from "@/components/home/CategoryBento";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { BrandStory } from "@/components/home/BrandStory";
import { ProProgram } from "@/components/home/ProProgram";
import { EducationBlog } from "@/components/home/EducationBlog";
import { Reviews } from "@/components/home/Reviews";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AudienceSelector />
      <ResistanceGuide />
      <CategoryBento />
      <ProductCarousel />
      <BrandStory />
      <ProProgram />
      <EducationBlog />
      <Reviews />
      <Newsletter />
    </>
  );
}
