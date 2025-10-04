'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/auth-store';
import { apiService } from '@/lib/api';
import { toast } from 'react-toastify';
import { searchMockLocations, getMockCurrentLocation, MockLocation } from '@/lib/mock-locations';

const locationSchema = z.object({
  address: z.string().min(1, 'Please enter your service area'),
});

type LocationFormData = z.infer<typeof locationSchema>;

export function ProviderCoverageForm() {
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<MockLocation[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<MockLocation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { nextProviderStep, previousProviderStep } = useAuthStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      address: 'Takoradi SSNIT',
    },
  });

  // Initialize with default location
  useEffect(() => {
    const defaultLocation = searchMockLocations('Takoradi SSNIT')[0];
    if (defaultLocation) {
      setSelectedLocation(defaultLocation);
      setSearchQuery(defaultLocation.addressName);
    }
  }, []);

  const addressValue = watch('address');

  // Handle search input changes
  useEffect(() => {
    if (addressValue && addressValue !== searchQuery) {
      setSearchQuery(addressValue);
      const results = searchMockLocations(addressValue);
      setSearchResults(results);
      setShowDropdown(results.length > 0);
    }
  }, [addressValue, searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onSubmit = async (data: LocationFormData) => {
    if (!selectedLocation) {
      toast.error('Please select a location from the suggestions');
      return;
    }

    setIsLoading(true);
    try {
      // Save service coverage area
      await apiService.updateLocation({
        placeId: selectedLocation.placeId,
        addressName: selectedLocation.addressName,
        formattedAddress: selectedLocation.formattedAddress,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        city: selectedLocation.city,
        state: selectedLocation.state,
        country: selectedLocation.country,
        postalCode: selectedLocation.postalCode,
        isPrimary: true,
      });

      toast.success('Service area saved successfully!');
      nextProviderStep();
    } catch (error) {
      console.error('Failed to save service area:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save service area';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectLocation = (location: MockLocation) => {
    setSelectedLocation(location);
    setValue('address', location.addressName);
    setSearchQuery(location.addressName);
    setShowDropdown(false);
    setUseCurrentLocation(false);
  };

  const handleUseCurrentLocation = () => {
    setUseCurrentLocation(true);
    const currentLocation = getMockCurrentLocation();
    setSelectedLocation(currentLocation);
    setValue('address', currentLocation.formattedAddress);
    setSearchQuery(currentLocation.formattedAddress);
    setShowDropdown(false);
  };

  const handlePrevious = () => {
    previousProviderStep();
  };

  return (
    <div className="p-8">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>5/7</span>
          <span>71%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div className="bg-green-600 h-2 rounded-full" style={{ width: '71%' }}></div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[30px] font-bold leading-[38px] text-gray-900 dark:text-white font-inter tracking-[0%] mb-6">
          Let's finish setting up your account
        </h1>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Coverage Area
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Select Location Preference
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Location Input */}
        <div className="relative" ref={dropdownRef}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Where are you located?
          </label>
          <div className="relative">
            <Input
              {...register('address')}
              placeholder="Takoradi SSNIT"
              className="pl-10 pr-10 h-12"
              onFocus={() => {
                if (searchResults.length > 0) {
                  setShowDropdown(true);
                }
              }}
            />
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            {selectedLocation && (
              <button
                type="button"
                onClick={() => {
                  setSelectedLocation(null);
                  setUseCurrentLocation(false);
                  setValue('address', '');
                  setSearchQuery('');
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
            {!selectedLocation && searchResults.length > 0 && (
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
              {searchResults.map((location) => (
                <button
                  key={location.placeId}
                  type="button"
                  onClick={() => handleSelectLocation(location)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 last:border-b-0 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700"
                >
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {location.addressName}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {location.formattedAddress}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {errors.address && (
            <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>
          )}
        </div>

        {/* Use Current Location */}
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          className="flex items-center text-sm text-green-600 hover:text-green-700 font-medium"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Use my current location
        </button>

        {/* Selected Location Display */}
        {selectedLocation && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  Service Area Selected
                </p>
                <p className="text-xs text-green-600 dark:text-green-300 mt-1">
                  {selectedLocation.formattedAddress}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info Text */}
        <div className="flex items-start space-x-2 text-xs text-gray-500">
          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>This helps clients find you when they're looking for services in your area. You can update this anytime in Settings.</span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8">
          <Button
            type="button"
            variant="ghost"
            onClick={handlePrevious}
            className="text-gray-600 hover:text-gray-700"
          >
            ← Previous
          </Button>
          
          <Button
            type="submit"
            disabled={isLoading || !selectedLocation}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-6"
          >
            {isLoading ? 'Saving...' : !selectedLocation ? 'Select Location' : 'Next →'}
          </Button>
        </div>
      </form>
    </div>
  );
}
