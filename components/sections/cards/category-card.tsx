import Image from "next/image";
import { Button } from "@/components/ui/button";

export interface CategoryCardData {
  id: string;
  name: string;
  image: string;
}

interface CategoryCardProps {
  category: CategoryCardData;
  onClick?: () => void;
}

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <div
      className="relative h-[450px] md:h-[500px] rounded-2xl overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      {/* Background Image */}
      <Image
        src={category.image}
        alt={category.name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        {/* Category Name - Top */}
        <div className="flex justify-center">
          <div className="bg-white/40 dark:bg-white/70 backdrop-blur-md rounded-full px-6 py-3 inline-block shadow-sm">
            <h3 className="text-gray-900 dark:text-gray-900 text-lg md:text-xl font-semibold text-center">
              {category.name}
            </h3>
          </div>
        </div>

        {/* Explore More Button - Bottom */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            className="bg-white hover:bg-gray-100 text-gray-900 border-0 rounded-full px-8 py-6 text-base font-semibold shadow-lg"
          >
            Explore more
          </Button>
        </div>
      </div>
    </div>
  );
}
