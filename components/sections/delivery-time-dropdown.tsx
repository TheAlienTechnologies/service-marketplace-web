"use client";

import { useState, useRef, useEffect } from "react";

interface DeliveryOption {
  id: string;
  label: string;
}

interface DeliveryTimeDropdownProps {
  selectedDeliveryTime: string;
  onApply: (deliveryTime: string) => void;
  trigger: React.ReactNode;
}

const deliveryOptions: DeliveryOption[] = [
  { id: "24-hours", label: "24 hours" },
  { id: "1-3-days", label: "1-3 Days" },
  { id: "4-7-days", label: "4-7 Days" },
  { id: "flexible", label: "Flexible timeline" },
];

export function DeliveryTimeDropdown({
  selectedDeliveryTime,
  onApply,
  trigger,
}: DeliveryTimeDropdownProps) {
  const [open, setOpen] = useState(false);
  const [tempSelected, setTempSelected] =
    useState<string>(selectedDeliveryTime);
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
      setTempSelected(selectedDeliveryTime);
    }
    setOpen(!open);
  };

  const selectDeliveryTime = (deliveryId: string) => {
    setTempSelected(deliveryId);
  };

  const clearAll = () => {
    setTempSelected("");
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
          {/* Delivery Options */}
          <div className="px-4 py-3">
            <div className="space-y-2">
              {deliveryOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center space-x-2.5 cursor-pointer group"
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="delivery-time"
                      checked={tempSelected === option.id}
                      onChange={() => selectDeliveryTime(option.id)}
                      className="appearance-none w-5 h-5 border-[2.5px] border-gray-300 rounded-full checked:border-brand-900 focus:ring-2 focus:ring-brand-900 focus:ring-offset-0 cursor-pointer transition-colors"
                    />
                    {tempSelected === option.id && (
                      <div className="absolute w-2.5 h-2.5 bg-brand-900 rounded-full pointer-events-none" />
                    )}
                  </div>
                  <span className="text-sm text-gray-900">{option.label}</span>
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
