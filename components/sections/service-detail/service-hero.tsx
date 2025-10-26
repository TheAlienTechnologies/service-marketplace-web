"use client";

import Image from "next/image";

interface ServiceHeroProps {
  imageUrl: string;
  alt?: string;
}

export function ServiceHero({
  imageUrl,
  alt = "Service preview",
}: ServiceHeroProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
      <div className="relative aspect-video">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
