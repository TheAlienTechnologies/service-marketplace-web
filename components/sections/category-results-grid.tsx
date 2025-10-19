"use client";

import { ServiceCard, ServiceCardData } from "./service-card";

interface CategoryResultsGridProps {
  services: ServiceCardData[];
}

export function CategoryResultsGrid({ services }: CategoryResultsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
