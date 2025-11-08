"use client";

import { useState, useRef, useEffect } from "react";

interface RatingOption {
  id: string;
  label: string;
  value: number;
}

interface RatingDropdownProps {
  selectedRatings: string[];
  onApply: (ratings: string[]) => void;
  trigger: React.ReactNode;
}

const ratingOptions: RatingOption[] = [
  { id: "top-rated", label: "Top rated(4.5+)", value: 4.5 },
  { id: "reliable", label: "Reliable(4.0+)", value: 4.0 },
  { id: "good-service", label: "Good service(3.5+)", value: 3.5 },
  { id: "all", label: "All", value: 0 },
];

export function RatingDropdown({
  selectedRatings,
  onApply,
  trigger,
}: RatingDropdownProps) {
  const [open, setOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState<string[]>(selectedRatings);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [open]);

  const toggleDropdown = () => {
    if (!open) {
      setTempSelected([...selectedRatings]);
    }
    setOpen(!open);
  };

  const toggleRating = (ratingId: string) => {
    setTempSelected((prev) =>
      prev.includes(ratingId)
        ? prev.filter((id) => id !== ratingId)
        : [...prev, ratingId]
    );
  };

  const clearAll = () => {
    setTempSelected([]);
  };

  const handleApply = () => {
    onApply(tempSelected);
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger */}
      <div onClick={toggleDropdown}>{trigger}</div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {/* Rating Options */}
          <div className="px-4 py-3">
            <div className="space-y-2">
              {ratingOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center space-x-2.5 cursor-pointer group"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={tempSelected.includes(option.id)}
                      onChange={() => toggleRating(option.id)}
                      className="appearance-none w-4 h-4 border-2 border-gray-300 rounded checked:bg-brand-900 checked:border-brand-900 focus:ring-2 focus:ring-brand-900 focus:ring-offset-0 cursor-pointer"
                    />
                    {tempSelected.includes(option.id) && (
                      <svg
                        className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 text-white pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={4}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-gray-900 flex items-center gap-1">
                    {option.label}
                    {option.id !== "all" && (
                      <span className="text-yellow-500">⭐</span>
                    )}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={clearAll}
              className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              clear all
            </button>
            <button
              onClick={handleApply}
              className="px-5 py-1.5 bg-brand-900 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors text-sm"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
