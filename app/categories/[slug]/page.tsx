"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CategoryFilters } from "@/components/sections/category/category-filters";
import { CategoryResultsGrid } from "@/components/sections/category/category-results-grid";
import { Pagination } from "@/components/ui/pagination";
import { mockCategoryResults } from "@/lib/mock-category-results";
import { HorizontalSeparator } from "@/components/layout/horizontal-separator";
import { mockBestsellers } from "@/lib/mock-bestsellers";
import { ServiceCarousel } from "@/components/sections/carousels/service-carousel";
import { AppDownloadSection } from "@/components/sections/home/app-download-section";
import { GetInspiredSection } from "@/components/sections/home/get-inspired-section";
import { mockInspirations } from "@/lib/mock-inspirations";

const ITEMS_PER_PAGE = 12;

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Format the category name for display
  const categoryName = params.slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  // Calculate pagination
  const totalItems = mockCategoryResults.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentServices = mockCategoryResults.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      {/* Page Content */}
      <main className="">
        {/* Filters Section */}
        <CategoryFilters categoryName={categoryName} resultCount={totalItems} />

        {/* Results Grid */}
        <div className="mt-8">
          <CategoryResultsGrid services={currentServices} />
        </div>

        <div className="mt-8">
          <HorizontalSeparator />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {/* <CategoryCarousel
        categories={mockPopularCategories}
        title="Popular Service"
        onCategoryClick={(category) =>
          console.log("Category clicked:", category.id)
        }
      /> */}

        {/* You may also like Section */}
        <ServiceCarousel
          services={mockBestsellers}
          title="You may also like"
          showAllLink={{
            text: "Show all",
            onClick: () => console.log("Show all services"),
          }}
          onServiceClick={(service) =>
            console.log("Service clicked:: You may also like:", service.id)
          }
        />

        {/* App Download Section */}
        <AppDownloadSection />

        {/* Get Inspired Section */}
        <GetInspiredSection inspirations={mockInspirations} />
      </main>

      <Footer />
    </div>
  );
}
