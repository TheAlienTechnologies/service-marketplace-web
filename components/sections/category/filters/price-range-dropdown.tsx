"use client";

import { useState, useRef, useEffect } from "react";

interface PriceRangeDropdownProps {
  selectedRange: { min: number; max: number };
  onApply: (range: { min: number; max: number }) => void;
  trigger: React.ReactNode;
}

export function PriceRangeDropdown({
  selectedRange,
  onApply,
  trigger,
}: PriceRangeDropdownProps) {
  const [open, setOpen] = useState(false);
  const [tempMin, setTempMin] = useState(selectedRange.min);
  const [tempMax, setTempMax] = useState(selectedRange.max);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const MIN_PRICE = 0;
  const MAX_PRICE = 50000;

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
      setTempMin(selectedRange.min);
      setTempMax(selectedRange.max);
    }
    setOpen(!open);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    const clampedValue = Math.max(
      MIN_PRICE,
      Math.min(value, MAX_PRICE, tempMax)
    );
    setTempMin(clampedValue);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    const clampedValue = Math.max(tempMin, Math.min(value, MAX_PRICE));
    setTempMax(clampedValue);
  };

  const handleMinSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value <= tempMax) {
      setTempMin(value);
    }
  };

  const handleMaxSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= tempMin) {
      setTempMax(value);
    }
  };

  const clearAll = () => {
    setTempMin(MIN_PRICE);
    setTempMax(MAX_PRICE);
  };

  const handleApply = () => {
    onApply({ min: tempMin, max: tempMax });
    setOpen(false);
  };

  const minPercent = ((tempMin - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
  const maxPercent = ((tempMax - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger */}
      <div onClick={toggleDropdown}>{trigger}</div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 mt-2 w-[300px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-6">
          {/* Title */}
          <h3 className="text-base font-semibold text-gray-900 mb-5">
            Price range($)
          </h3>

          {/* Dual Range Slider */}
          <div className="mb-5">
            <div className="relative h-2">
              {/* Track background */}
              <div className="absolute w-full h-1 bg-gray-200 rounded-full top-1/2 -translate-y-1/2 left-0 right-0" />

              {/* Active track */}
              <div
                className="absolute h-1 bg-brand-900 rounded-full top-1/2 -translate-y-1/2"
                style={{
                  left: `${minPercent}%`,
                  width: `${maxPercent - minPercent}%`,
                }}
              />

              {/* Min slider */}
              <input
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                value={tempMin}
                onChange={handleMinSlider}
                className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-gray-300 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-sm [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-gray-300 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-sm"
              />

              {/* Max slider */}
              <input
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                value={tempMax}
                onChange={handleMaxSlider}
                className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-gray-300 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-sm [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-gray-300 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-sm"
              />
            </div>
          </div>

          {/* Min/Max Inputs */}
          <div className="flex items-end justify-between mb-5">
            <div>
              <label className="block text-xs text-gray-600 mb-1.5">
                Minimum
              </label>
              <input
                type="number"
                value={tempMin}
                onChange={handleMinChange}
                min={MIN_PRICE}
                max={MAX_PRICE}
                className="w-24 px-3 py-2 border border-gray-300 rounded-full text-center focus:outline-none focus:ring-2 focus:ring-brand-900 focus:border-transparent text-sm overflow-hidden"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1.5">
                Maximum
              </label>
              <input
                type="number"
                value={tempMax}
                onChange={handleMaxChange}
                min={MIN_PRICE}
                max={MAX_PRICE}
                className="w-24 px-3 py-2 border border-gray-300 rounded-full text-center focus:outline-none focus:ring-2 focus:ring-brand-900 focus:border-transparent text-sm overflow-hidden"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-1">
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
