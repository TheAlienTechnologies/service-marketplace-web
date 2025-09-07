'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/auth-store';

const locationSchema = z.object({
  address: z.string().min(1, 'Please enter your location'),
});

type LocationFormData = z.infer<typeof locationSchema>;

export function OnboardingLocationForm() {
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthStep } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      address: 'Takoradi SSNIT',
    },
  });

  const onSubmit = async (data: LocationFormData) => {
    setIsLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setAuthStep('onboarding-profile');
    setIsLoading(false);
  };

  const handleUseCurrentLocation = () => {
    setUseCurrentLocation(true);
    // Mock getting current location
    setValue('address', 'Current Location (Takoradi, Ghana)');
  };

  const handleSkip = () => {
    setAuthStep('onboarding-profile');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Let's finish setting up your account
        </h1>
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Location set-up
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            We'll use your location to show services and providers near you.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Location Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Where are you located?
          </label>
          <div className="relative">
            <Input
              {...register('address')}
              placeholder="Enter your location"
              className="pl-10 pr-10"
            />
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            {useCurrentLocation && (
              <button
                type="button"
                onClick={() => {
                  setUseCurrentLocation(false);
                  setValue('address', '');
                }}
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
          className="flex items-center text-sm text-green-600 hover:text-green-700 font-medium"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Use my current location
        </button>

        {/* Skip Option */}
        <button
          type="button"
          onClick={handleSkip}
          className="flex items-center text-sm text-gray-600 hover:text-gray-700"
        >
          <span className="mr-2">→</span>
          Skip for now
        </button>

        {/* Info Text */}
        <div className="flex items-start space-x-2 text-xs text-gray-500">
          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>You can update this anytime in Settings.</span>
        </div>

        {/* Next Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium"
        >
          {isLoading ? 'Saving...' : 'Next →'}
        </Button>
      </form>
    </div>
  );
}
