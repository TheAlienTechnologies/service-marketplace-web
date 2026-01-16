"use client";

import { HomeHeader } from "@/components/layout/home-header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ServiceCarousel } from "@/components/sections/carousels/service-carousel";
import { CategoryCarousel } from "@/components/sections/carousels/category-carousel";
import { MomentsSection } from "@/components/sections/home/moments-section";
import { HowItWorksSection } from "@/components/sections/home/how-it-works-section";
import { GetInspiredSection } from "@/components/sections/home/get-inspired-section";
import { AppDownloadSection } from "@/components/sections/home/app-download-section";
import { useAuthStore } from "@/store/auth-store";
import { mockBestsellers, mockMostViewed } from "@/lib/mock-bestsellers";
import { mockInspirations } from "@/lib/mock-inspirations";
import { useCategories } from "@/store/categories-store";
import { CategoryCardData } from "@/components/sections/cards/category-card";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { showAuth } = useAuthStore();
  const router = useRouter();
  const { featuredCategories, topLevelCategories, isLoading } = useCategories();

  // Transform API categories to CategoryCardData format
  const categoryCardData: CategoryCardData[] = useMemo(() => {
    // Use featured categories if available, otherwise use top-level
    const categoriesToShow =
      featuredCategories.length > 0 ? featuredCategories : topLevelCategories;

    return categoriesToShow.map((cat) => ({
      id: cat.id,
      name: cat.name,
      image: cat.imageUrl || "/assets/temp/products/p1.jpg", // Fallback image
    }));
  }, [featuredCategories, topLevelCategories]);

  const handleCategoryClick = (category: CategoryCardData) => {
    router.push(`/categories/${category.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <HomeHeader />

      {/* Hero Section */}
      <HeroSection />

      {/* Bestsellers Section */}
      <ServiceCarousel
        services={mockBestsellers}
        title="Bestsellers"
        showAllLink={{
          text: "See all best sellers",
          onClick: () => console.log("View all bestsellers"),
        }}
        onServiceClick={(service) =>
          console.log("Service clicked:", service.id)
        }
      />

      {/* Moments Captured Section */}
      <MomentsSection />

      {/* Most Viewed Section */}
      <ServiceCarousel
        services={mockMostViewed}
        title="Most Viewed"
        showAllLink={{
          text: "See all most viewed",
          onClick: () => console.log("View all most viewed"),
        }}
        onServiceClick={(service) =>
          console.log("Service clicked:", service.id)
        }
      />

      {/* How it Works Section */}
      <HowItWorksSection />

      {/* Popular Service Categories Carousel */}
      {!isLoading && categoryCardData.length > 0 && (
        <CategoryCarousel
          categories={categoryCardData}
          title="Popular Service"
          onCategoryClick={handleCategoryClick}
        />
      )}

      {/* Get Inspired Section */}
      <GetInspiredSection inspirations={mockInspirations} />

      {/* App Download Section */}
      <AppDownloadSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
