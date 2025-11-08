import Image from "next/image";

export interface InspirationCardData {
  id: string;
  image: string;
  title?: string;
  category?: string;
  author?: string;
  span?: "tall" | "wide" | "normal";
}

interface InspirationCardProps {
  inspiration: InspirationCardData;
  onClick?: () => void;
}

export function InspirationCard({
  inspiration,
  onClick,
}: InspirationCardProps) {
  const heightClass = inspiration.span === "tall" ? "row-span-2" : "";

  return (
    <div
      className={`relative rounded-2xl overflow-hidden cursor-pointer group ${heightClass}`}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative w-full h-full min-h-[280px]">
        <Image
          src={inspiration.image}
          alt={inspiration.title || "Inspiration"}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Gradient Overlay - Shows on hover */}
        {(inspiration.title || inspiration.category || inspiration.author) && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}

        {/* Text Content - Shows on hover */}
        {(inspiration.title || inspiration.category || inspiration.author) && (
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            {inspiration.category && (
              <p className="text-xs font-semibold mb-1 uppercase tracking-wide">
                {inspiration.category}
              </p>
            )}
            {inspiration.title && (
              <h3 className="text-base font-semibold mb-2">
                {inspiration.title}
              </h3>
            )}
            {inspiration.author && (
              <p className="text-sm opacity-90">By: {inspiration.author}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
