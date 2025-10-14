"use client";

import { InspirationCard, InspirationCardData } from "./inspiration-card";

interface GetInspiredSectionProps {
  inspirations: InspirationCardData[];
}

export function GetInspiredSection({ inspirations }: GetInspiredSectionProps) {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Get Inspired
          </h2>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[280px]">
          {inspirations.map((inspiration) => (
            <InspirationCard
              key={inspiration.id}
              inspiration={inspiration}
              onClick={() =>
                console.log("Inspiration clicked:", inspiration.id)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
