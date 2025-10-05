'use client';

import { useState, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/auth-store';
import { apiService } from '@/lib/api';
import { toast } from 'react-toastify';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';

const libraries: ("places")[] = ["places"];

const locationSchema = z.object({
  address: z.string().min(1, 'Please enter your service area'),
});

type LocationFormData = z.infer<typeof locationSchema>;

interface PlaceResult {
  placeId: string;
  addressName: string;
  formattedAddress: string;
  latitude: number;
  longitude: number;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export function ProviderCoverageForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<PlaceResult | null>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const { nextProviderStep, previousProviderStep } = useAuthStore();
  const inputRef = useRef<HTMLInputElement>(null);

  // Load Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
  });

  // Initialize Google Places Autocomplete
  const onLoad = useCallback((autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  }, []);

  const onPlaceChanged = useCallback(() => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      
      if (!place.geometry || !place.geometry.location) {
        toast.error('Please select a valid location from the suggestions');
        return;
      }

      // Extract location details
      const addressComponents = place.address_components || [];
      let city = '';
      let state = '';
      let country = '';
      let postalCode = '';

      addressComponents.forEach((component) => {
        const types = component.types;
        if (types.includes('locality')) {
          city = component.long_name;
        } else if (types.includes('administrative_area_level_1')) {
          state = component.long_name;
        } else if (types.includes('country')) {
          country = component.long_name;
        } else if (types.includes('postal_code')) {
          postalCode = component.long_name;
        }
      });

      const locationData: PlaceResult = {
        placeId: place.place_id || '',
        addressName: place.name || '',
        formattedAddress: place.formatted_address || '',
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
        city,
        state,
        country,
        postalCode,
      };

      setSelectedLocation(locationData);
      setValue('address', place.formatted_address || '');
    }
  }, [autocomplete, setValue]);

  const onSubmit = async (_data: LocationFormData) => {
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

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Use Google Geocoding to get address from coordinates
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(
          { location: { lat: latitude, lng: longitude } },
          (results, status) => {
            setIsLoading(false);
            
            if (status === 'OK' && results && results[0]) {
              const place = results[0];
              const addressComponents = place.address_components || [];
              
              let city = '';
              let state = '';
              let country = '';
              let postalCode = '';

              addressComponents.forEach((component) => {
                const types = component.types;
                if (types.includes('locality')) {
                  city = component.long_name;
                } else if (types.includes('administrative_area_level_1')) {
                  state = component.long_name;
                } else if (types.includes('country')) {
                  country = component.long_name;
                } else if (types.includes('postal_code')) {
                  postalCode = component.long_name;
                }
              });

              const locationData: PlaceResult = {
                placeId: place.place_id || '',
                addressName: place.address_components?.[0]?.long_name || '',
                formattedAddress: place.formatted_address,
                latitude,
                longitude,
                city,
                state,
                country,
                postalCode,
              };

              setSelectedLocation(locationData);
              setValue('address', place.formatted_address);
              toast.success('Current location detected!');
            } else {
              toast.error('Unable to get your current location address');
            }
          }
        );
      },
      (error) => {
        setIsLoading(false);
        toast.error('Unable to get your current location');
        console.error('Geolocation error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  const handlePrevious = () => {
    previousProviderStep();
  };

  const handleClearLocation = () => {
    setSelectedLocation(null);
    setValue('address', '');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  // Handle loading and error states
  if (loadError) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error loading Google Maps
          </h2>
          <p className="text-gray-600 mb-4">
            Please check your internet connection and try again.
          </p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="p-8">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Loading location services...
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please wait while we initialize Google Maps.
          </p>
        </div>
      </div>
    );
  }

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
          Let&apos;s finish setting up your account
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
        {/* Location Input with Google Places Autocomplete */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Where do you provide services?
          </label>
          <div className="relative">
            {isLoaded && (
              <Autocomplete
                onLoad={onLoad}
                onPlaceChanged={onPlaceChanged}
                options={{
                  componentRestrictions: { country: ['gh', 'gb'] }, // Restrict to Ghana and UK
                  fields: ['place_id', 'name', 'formatted_address', 'geometry', 'address_components'],
                }}
              >
                <Input
                  {...register('address', {
                    setValueAs: (value) => {
                      if (inputRef.current) {
                        inputRef.current = inputRef.current;
                      }
                      return value;
                    }
                  })}
                  ref={(e) => {
                    register('address').ref(e);
                    inputRef.current = e;
                  }}
                  placeholder="Start typing your service area..."
                  className="pl-10 pr-10 h-12"
                />
              </Autocomplete>
            )}
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            {selectedLocation && (
              <button
                type="button"
                onClick={handleClearLocation}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {errors.address && (
            <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>
          )}
        </div>

        {/* Use Current Location */}
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          disabled={isLoading}
          className="flex items-center text-sm text-green-600 hover:text-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <MapPin className="w-4 h-4 mr-2" />
          )}
          {isLoading ? 'Getting your location...' : 'Use my current location'}
        </button>

        {/* Selected Location Display */}
        {selectedLocation && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  Service Area Selected
                </p>
                <p className="text-xs text-green-600 dark:text-green-300 mt-1 truncate">
                  {selectedLocation.formattedAddress}
                </p>
                {selectedLocation.city && (
                  <div className="text-xs text-green-500 dark:text-green-400 mt-1">
                    {selectedLocation.city}, {selectedLocation.state}, {selectedLocation.country}
                  </div>
                )}
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
