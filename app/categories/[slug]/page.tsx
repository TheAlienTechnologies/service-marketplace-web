"use client";

import { useState } from "react";
import { CategoryHeader } from "@/components/layout/category-header";
import { Footer } from "@/components/layout/footer";
import { AuthModal } from "@/components/auth/auth-modal";
import { CategoryFilters } from "@/components/sections/category-filters";
import { CategoryResultsGrid } from "@/components/sections/category-results-grid";
import { Pagination } from "@/components/ui/pagination";
import { mockCategoryResults } from "@/lib/mock-category-results";

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
      <CategoryHeader />

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Section */}
        <CategoryFilters categoryName={categoryName} resultCount={totalItems} />

        {/* Results Grid */}
        <div className="mt-8">
          <CategoryResultsGrid services={currentServices} />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>

      <Footer />
      <AuthModal />
    </div>
  );
}
