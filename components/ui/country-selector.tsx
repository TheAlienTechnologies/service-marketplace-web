'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

// Limited to Ghana and UK as requested
export const countries: Country[] = [
  {
    code: 'GH',
    name: 'Ghana',
    flag: '🇬🇭',
    dialCode: '+233'
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    dialCode: '+44'
  }
];

interface CountrySelectorProps {
  selectedCountry: Country;
  onCountryChange: (country: Country) => void;
  disabled?: boolean;
}

export function CountrySelector({ selectedCountry, onCountryChange, disabled = false }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="h-12 px-4 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700 min-w-[100px] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="text-sm">{selectedCountry.flag}</span>
        <span className="text-sm font-medium">{selectedCountry.dialCode}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>
      
      {isOpen && !disabled && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-20 min-w-[200px]">
            {countries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  onCountryChange(country);
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 text-sm first:rounded-t-lg last:rounded-b-lg"
              >
                <span className="text-lg">{country.flag}</span>
                <div className="flex flex-col">
                  <span className="font-medium">{country.name}</span>
                  <span className="text-xs text-gray-500">{country.dialCode}</span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
