"use client";

import { useState } from "react";
import { Search, ChevronDown, Filter, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HorizontalSeparator } from "../layout/horizontal-separator";
import { SkillDropdown } from "./skill-dropdown";
import { PriceRangeDropdown } from "./price-range-dropdown";
import { RatingDropdown } from "./rating-dropdown";
import { DeliveryTimeDropdown } from "./delivery-time-dropdown";

interface CategoryFiltersProps {
  categoryName: string;
  resultCount: number;
}

export function CategoryFilters({
  categoryName,
  resultCount,
}: CategoryFiltersProps) {
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 50000,
  });
  const [ratingIds, setRatingIds] = useState<string[]>([]);
  const [deliveryTime, setDeliveryTime] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("Best match");

  // Skill mapping for display
  const skillLabels: Record<string, string> = {
    plumbing: "Plumbing",
    carpentry: "Carpentry",
    "painting-decorating": "Painting & decorating",
    packaging: "Packaging",
    electrical: "Electrical",
    hvac: "HVAC",
    hairdressing: "Hairdressing",
    "makeup-services": "Makeup services",
    skincare: "Skincare",
    massage: "Massage therapy",
    "nail-care": "Nail care",
    "logo-design": "Logo Design",
    "brand-identity": "Brand Identity",
    illustration: "Illustration",
    "ui-ux": "UI/UX Design",
  };

  const MAX_VISIBLE_FILTERS = 1;
  const visibleSkills = selectedSkillIds.slice(0, MAX_VISIBLE_FILTERS);
  const hiddenSkillCount = selectedSkillIds.length - MAX_VISIBLE_FILTERS;

  const removeSkill = (skillId: string) => {
    setSelectedSkillIds(selectedSkillIds.filter((id) => id !== skillId));
  };

  const clearAllFilters = () => {
    setSelectedSkillIds([]);
    setPriceRange({ min: 0, max: 50000 });
    setRatingIds([]);
    setDeliveryTime("");
  };

  const handleSkillsApply = (skills: string[]) => {
    setSelectedSkillIds(skills);
  };

  const handlePriceRangeApply = (range: { min: number; max: number }) => {
    setPriceRange(range);
  };

  const getPriceRangeDisplay = () => {
    if (priceRange.min === 0 && priceRange.max === 50000) {
      return "Price range";
    }
    return `$${priceRange.min.toLocaleString()}-$${priceRange.max.toLocaleString()}`;
  };

  const handleRatingApply = (ratings: string[]) => {
    setRatingIds(ratings);
  };

  const getRatingDisplay = () => {
    if (ratingIds.length === 0) return "Rating";
    if (ratingIds.length === 1) {
      const ratingLabels: Record<string, string> = {
        "top-rated": "Top rated(4.5+)",
        reliable: "Reliable(4.0+)",
        "good-service": "Good service(3.5+)",
        all: "All",
      };
      return ratingLabels[ratingIds[0]] || "Rating";
    }
    return `${ratingIds.length} selected`;
  };

  const handleDeliveryTimeApply = (deliveryTimeId: string) => {
    setDeliveryTime(deliveryTimeId);
  };

  const getDeliveryTimeDisplay = () => {
    const deliveryLabels: Record<string, string> = {
      "24-hours": "24 hours",
      "1-3-days": "1-3 Days",
      "4-7-days": "4-7 Days",
      flexible: "Flexible timeline",
    };
    return deliveryLabels[deliveryTime] || "Delivery time";
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Bar with Integrated Button */}
      <div className="relative max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="What service are you looking for"
          className="w-full pl-12 pr-28 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <button className="absolute right-0 top-0 bottom-0 px-6 bg-brand-900 hover:bg-brand-700 text-white font-medium rounded-r-lg transition-colors">
          Search
        </button>
      </div>

      {/* Results Header with Sort */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-gray-700 font-medium">
            Showing search results for
          </span>
          <span className="font-bold text-gray-900">'{categoryName}'</span>
          <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-sm rounded-md font-medium">
            {resultCount}
          </span>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-gray-700 font-medium">Sort by:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors bg-white">
                <span className="font-medium text-gray-900">{sortBy}</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setSortBy("Best match")}>
                <span>Best match</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("Most popular")}>
                <span>Most popular</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("Highest rated")}>
                <span>Highest rated</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("Lowest price")}>
                <span>Lowest price</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("Highest price")}>
                <span>Highest price</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Horizontal Line Separator */}
      <HorizontalSeparator />

      {/* Filters Row */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Filters Label with Selected Skills */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <Filter className="w-5 h-5" />
            <span>Filters:</span>
          </div>

          {/* First Selected Skill Chip */}
          {visibleSkills.map((skillId) => (
            <div
              key={skillId}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              <span>{skillLabels[skillId] || skillId}</span>
              <button
                onClick={() => removeSkill(skillId)}
                className="hover:bg-gray-200 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {/* Hidden Skill Count Dropdown */}
          {hiddenSkillCount > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                  +{hiddenSkillCount}
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {selectedSkillIds.slice(MAX_VISIBLE_FILTERS).map((skillId) => (
                  <DropdownMenuItem
                    key={skillId}
                    onClick={() => removeSkill(skillId)}
                    className="flex items-center justify-between"
                  >
                    <span>{skillLabels[skillId] || skillId}</span>
                    <X className="w-4 h-4 text-gray-500" />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Add More Skills - New Dialog */}
        <SkillDropdown
          selectedSkills={selectedSkillIds}
          onApply={handleSkillsApply}
          trigger={
            <button className="flex items-center gap-3 px-5 py-2.5 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors bg-white min-w-[160px] justify-between">
              <span className="text-gray-700 text-sm">
                {selectedSkillIds.length > 0 ? "Add more skills" : "Skill"}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>
          }
        />

        {/* Price Range Filter */}
        <PriceRangeDropdown
          selectedRange={priceRange}
          onApply={handlePriceRangeApply}
          trigger={
            <button className="flex items-center gap-3 px-5 py-2.5 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors bg-white min-w-[180px] justify-between">
              <span className="text-gray-700 text-sm">
                {getPriceRangeDisplay()}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>
          }
        />

        {/* Rating Filter */}
        <RatingDropdown
          selectedRatings={ratingIds}
          onApply={handleRatingApply}
          trigger={
            <button className="flex items-center gap-3 px-5 py-2.5 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors bg-white min-w-[160px] justify-between">
              <span className="text-gray-700 text-sm">
                {getRatingDisplay()}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>
          }
        />

        {/* Delivery Time Filter */}
        <DeliveryTimeDropdown
          selectedDeliveryTime={deliveryTime}
          onApply={handleDeliveryTimeApply}
          trigger={
            <button className="flex items-center gap-3 px-5 py-2.5 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors bg-white min-w-[180px] justify-between">
              <span className="text-gray-700 text-sm">
                {getDeliveryTimeDisplay()}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>
          }
        />

        {/* Clear All Link */}
        {(selectedSkillIds.length > 0 ||
          priceRange.min !== 0 ||
          priceRange.max !== 50000 ||
          ratingIds.length > 0 ||
          deliveryTime) && (
          <button
            onClick={clearAllFilters}
            className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors ml-auto"
          >
            clear all
          </button>
        )}
      </div>
    </div>
  );
}
