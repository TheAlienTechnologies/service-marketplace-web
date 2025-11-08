"use client";

import { Button } from "@/components/ui/button";
import { HomeHeader } from "@/components/layout/home-header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ServiceCarousel } from "@/components/sections/carousels/service-carousel";
import { CategoryCarousel } from "@/components/sections/carousels/category-carousel";
import { MomentsSection } from "@/components/sections/home/moments-section";
import { HowItWorksSection } from "@/components/sections/home/how-it-works-section";
import { GetInspiredSection } from "@/components/sections/home/get-inspired-section";
import { AppDownloadSection } from "@/components/sections/home/app-download-section";
import { AuthModal } from "@/components/auth/auth-modal";
import { useAuthStore } from "@/store/auth-store";
import { mockServices, mockServiceCategories } from "@/lib/mock-data";
import { mockBestsellers, mockMostViewed } from "@/lib/mock-bestsellers";
import { mockPopularCategories } from "@/lib/mock-categories";
import { mockInspirations } from "@/lib/mock-inspirations";
import { Star, MapPin } from "lucide-react";

export default function Home() {
  const { showAuth } = useAuthStore();

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
      <CategoryCarousel
        categories={mockPopularCategories}
        title="Popular Service"
        onCategoryClick={(category) =>
          console.log("Category clicked:", category.id)
        }
      />

      {/* Get Inspired Section */}
      <GetInspiredSection inspirations={mockInspirations} />

      {/* App Download Section */}
      <AppDownloadSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
