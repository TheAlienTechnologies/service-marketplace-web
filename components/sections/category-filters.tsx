"use client";

import { Search, ChevronDown, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CategoryFiltersProps {
  categoryName: string;
  resultCount: number;
}

export function CategoryFilters({
  categoryName,
  resultCount,
}: CategoryFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Search Bar - Not Full Width */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="What service are you looking for"
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
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
                <span className="font-medium text-gray-900">Best match</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <span>Best match</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Most popular</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Highest rated</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Lowest price</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Highest price</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Horizontal Line Separator */}
      <div className="border-t border-gray-200"></div>

      {/* Filters Row */}
      <div className="flex items-center gap-3">
        {/* Filters Label */}
        <div className="flex items-center gap-2 text-gray-700 font-medium">
          <Filter className="w-5 h-5" />
          <span>Filters:</span>
        </div>

        {/* Skill Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 px-5 py-2.5 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors bg-white min-w-[160px] justify-between">
              <span className="text-gray-700 text-sm">Skill</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>
              <span>Logo Design</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Brand Identity</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Illustration</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>UI/UX Design</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Packaging Design</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Price Range Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 px-5 py-2.5 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors bg-white min-w-[180px] justify-between">
              <span className="text-gray-700 text-sm">Price range</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>
              <span>Under $50</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>$50 - $100</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>$100 - $250</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>$250 - $500</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>$500+</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Rating Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 px-5 py-2.5 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors bg-white min-w-[160px] justify-between">
              <span className="text-gray-700 text-sm">Rating</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>
              <span>⭐ 5 stars</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>⭐ 4 stars & up</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>⭐ 3 stars & up</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>⭐ 2 stars & up</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>⭐ 1 star & up</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Delivery Time Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 px-5 py-2.5 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors bg-white min-w-[180px] justify-between">
              <span className="text-gray-700 text-sm">Delivery time</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>
              <span>Express (24 hours)</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Up to 3 days</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Up to 7 days</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Up to 14 days</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Anytime</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
