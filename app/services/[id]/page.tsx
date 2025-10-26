"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ServiceDetailHeader } from "@/components/sections/service-detail/service-detail-header";
import { ServiceHero } from "@/components/sections/service-detail/service-hero";
import { ServiceOverview } from "@/components/sections/service-detail/service-overview";
import { ServiceCatalogue } from "@/components/sections/service-detail/service-catalogue";
import { ReviewSummary } from "@/components/sections/service-detail/review-summary";
import { RecentReviews } from "@/components/sections/service-detail/recent-reviews";
import { ServiceProviderBadge } from "@/components/sections/service-detail/service-provider-badge";
import { PricingPlans } from "@/components/sections/service-detail/pricing-plans";
import { mockPopularCategories } from "@/lib/mock-categories";
import { CategoryCarousel } from "@/components/sections/carousels/category-carousel";
import { AppDownloadSection } from "@/components/sections/home/app-download-section";

export default function ServiceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const serviceId = params.id;

  const serviceData = {
    category: "Architecture & Interior Design",
    categorySlug: "architecture-interior-design",
    providerName: "Robert sam",
    heroImage: "/assets/temp/products/p1.jpg",
    overviewDescription: `Modern architectural design featuring futuristic curves and glass façades. Expert services in architectural planning, 3D modeling, and conceptual design to bring your building vision to life.

Beyond the aesthetics, I ensure that every design meets structural integrity, sustainability, and functionality standards. From initial sketches to detailed 3D models, my process is collaborative — keeping you involved at every stage to align your goals and budget.

I specialize in residential, commercial, and mixed-use developments, with a portfolio spanning modern minimalism to bold contemporary designs. Each project is unique and tailored to reflect your vision while adhering to local building codes and environmental considerations.`,
    catalogueItems: [
      {
        id: "1",
        imageUrl: "/assets/temp/products/p2.jpg",
        span: "normal" as const,
      },
      {
        id: "2",
        imageUrl: "/assets/temp/products/p3.jpg",
        span: "normal" as const,
      },
      {
        id: "3",
        imageUrl: "/assets/temp/products/p4.jpg",
        title: "Architectural Design: Art Gallery",
        span: "large" as const,
      },
      {
        id: "4",
        imageUrl: "/assets/temp/products/p1.jpg",
        span: "normal" as const,
      },
      {
        id: "5",
        imageUrl: "/assets/temp/products/p2.jpg",
        span: "normal" as const,
      },
      // Additional items (will show "+6 more")
      {
        id: "6",
        imageUrl: "/assets/temp/products/p3.jpg",
        span: "normal" as const,
      },
      {
        id: "7",
        imageUrl: "/assets/temp/products/p4.jpg",
        span: "normal" as const,
      },
      {
        id: "8",
        imageUrl: "/assets/temp/products/p1.jpg",
        span: "normal" as const,
      },
      {
        id: "9",
        imageUrl: "/assets/temp/products/p2.jpg",
        span: "normal" as const,
      },
      {
        id: "10",
        imageUrl: "/assets/temp/products/p3.jpg",
        span: "normal" as const,
      },
      {
        id: "11",
        imageUrl: "/assets/temp/products/p4.jpg",
        span: "normal" as const,
      },
    ],
    reviews: {
      averageRating: 4.5,
      totalReviews: 1250,
      ratingBreakdown: [
        { rating: 5.0, count: 2823, percentage: 90 },
        { rating: 4.0, count: 38, percentage: 3 },
        { rating: 3.0, count: 4, percentage: 0.1 },
        { rating: 2.0, count: 0, percentage: 0 },
        { rating: 1.0, count: 0, percentage: 0 },
      ],
    },
    recentReviews: [
      {
        id: "1",
        reviewerName: "Ama Boateng",
        reviewerAvatar: "/assets/temp/user/u1.jpg",
        rating: 5.0,
        date: "2025-08-12",
        reviewText:
          "Amazing work! The designs exceeded my expectations, and communication was smooth throughout the project. Highly recommended!",
        likes: 125,
        dislikes: 2,
      },
      {
        id: "2",
        reviewerName: "Nana Yaw",
        reviewerAvatar: "/assets/temp/user/u2.jpg",
        rating: 4.8,
        date: "2025-09-05",
        reviewText:
          "The project was delivered on time and the quality was top-notch. A few minor adjustments were needed, but overall a great experience!",
        likes: 98,
        dislikes: 1,
      },
      {
        id: "3",
        reviewerName: "Abena Owusu",
        reviewerAvatar: "/assets/temp/user/u3.jpg",
        rating: 4.5,
        date: "2025-07-20",
        reviewText:
          "Solid performance and good understanding of my needs. Would definitely work together again.",
        likes: 75,
        dislikes: 3,
      },
      {
        id: "4",
        reviewerName: "Jamal Khan",
        reviewerAvatar: "/assets/temp/user/u1.jpg",
        rating: 4.9,
        date: "2025-10-10",
        reviewText:
          "Fantastic collaboration! The final product is exactly what we envisioned. Very professional.",
        likes: 110,
        dislikes: 0,
      },
      {
        id: "5",
        reviewerName: "Kojo Mensah",
        reviewerAvatar: "/assets/temp/user/u2.jpg",
        rating: 4.7,
        date: "2025-11-15",
        reviewText:
          "Great attention to detail and creativity. The team was responsive and open to feedback.",
        likes: 90,
        dislikes: 1,
      },
      {
        id: "6",
        reviewerName: "Rajiv Mehta",
        reviewerAvatar: "/assets/temp/user/u3.jpg",
        rating: 5.0,
        date: "2025-12-01",
        reviewText:
          "Absolutely thrilled with the output! Beyond what I hoped for. Will hire again for future projects.",
        likes: 130,
        dislikes: 0,
      },
      {
        id: "7",
        reviewerName: "Sarah Johnson",
        reviewerAvatar: "/assets/temp/user/u1.jpg",
        rating: 4.8,
        date: "2025-11-28",
        reviewText:
          "Excellent communication and attention to detail. The final design was exactly what we needed for our project.",
        likes: 85,
        dislikes: 1,
      },
      {
        id: "8",
        reviewerName: "Michael Chen",
        reviewerAvatar: "/assets/temp/user/u2.jpg",
        rating: 5.0,
        date: "2025-11-20",
        reviewText:
          "Outstanding work! Professional, creative, and delivered ahead of schedule. Highly recommend!",
        likes: 95,
        dislikes: 0,
      },
      {
        id: "9",
        reviewerName: "Fatima Al-Zahra",
        reviewerAvatar: "/assets/temp/user/u3.jpg",
        rating: 4.6,
        date: "2025-11-10",
        reviewText:
          "Great collaboration and understanding of our vision. The project exceeded our expectations.",
        likes: 72,
        dislikes: 2,
      },
      {
        id: "10",
        reviewerName: "David Kim",
        reviewerAvatar: "/assets/temp/user/u1.jpg",
        rating: 4.9,
        date: "2025-10-25",
        reviewText:
          "Amazing attention to detail and creative solutions. Will definitely work together again!",
        likes: 88,
        dislikes: 1,
      },
    ],
    provider: {
      name: "Robert Sam",
      avatar: "/assets/temp/user/u1.jpg",
      title: "Architect & Interior Designer",
      location: "Accra-Ghana",
      rating: 5.0,
      isPro: true,
    },
    pricingPlans: [
      {
        id: "basic",
        name: "Basic plan",
        icon: "layers" as const,
        price: "GHS 250",
        features: [
          { text: "1-hour consultation (virtual or in-person)" },
          { text: "Quick recommendations / advice" },
          { text: "No revisions included" },
          { text: "Delivery within 1–2 days" },
        ],
      },
      {
        id: "business",
        name: "Business plan",
        icon: "layers-stacked" as const,
        price: "GHS 750",
        isPopular: true,
        features: [
          { text: "Full service setup" },
          { text: "Includes 2 revisions/adjustments" },
          { text: "Delivery within 5–7 days" },
          { text: "Support via chat during project" },
        ],
      },
      {
        id: "enterprise",
        name: "Enterprise plan",
        icon: "zap" as const,
        price: "GHS 1,500",
        features: [
          { text: "Complete project execution (end-to-end)" },
          { text: "Unlimited revisions within agreed scope" },
          { text: "Priority scheduling & faster delivery" },
          { text: "Dedicated support (phone + chat)" },
          { text: "Includes after-service check-in / maintenance" },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      {/* Top Section with Search and Breadcrumbs */}
      <ServiceDetailHeader
        categoryName={serviceData.category}
        categorySlug={serviceData.categorySlug}
        providerName={serviceData.providerName}
      />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Hero Image */}
            <ServiceHero
              imageUrl={serviceData.heroImage}
              alt={`${serviceData.providerName} - ${serviceData.category}`}
            />

            {/* Overview Section */}
            <ServiceOverview description={serviceData.overviewDescription} />

            {/* My Catalogue Section */}
            <ServiceCatalogue items={serviceData.catalogueItems} />

            {/* Reviews Summary Section */}
            <ReviewSummary
              averageRating={serviceData.reviews.averageRating}
              totalReviews={serviceData.reviews.totalReviews}
              ratingBreakdown={serviceData.reviews.ratingBreakdown}
            />

            {/* Recent Reviews Section */}
            <RecentReviews reviews={serviceData.recentReviews} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Provider Badge */}
            <ServiceProviderBadge
              providerName={serviceData.provider.name}
              providerAvatar={serviceData.provider.avatar}
              providerTitle={serviceData.provider.title}
              location={serviceData.provider.location}
              rating={serviceData.provider.rating}
              isPro={serviceData.provider.isPro}
              isOnline={true}
            />

            {/* Pricing Plans */}
            <PricingPlans
              plans={serviceData.pricingPlans}
              providerName={serviceData.provider.name}
              providerAvatar={serviceData.provider.avatar}
            />
          </div>
        </div>
      </div>

      <CategoryCarousel
        categories={mockPopularCategories}
        title="Popular Service"
        onCategoryClick={(category) =>
          console.log("Category clicked:", category.id)
        }
      />

      {/* App Download Section */}
      <AppDownloadSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
