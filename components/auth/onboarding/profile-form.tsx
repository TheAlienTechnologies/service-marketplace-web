'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/auth-store';

const profileSchema = z.object({
  fullName: z.string().min(1, 'Please enter your full name'),
  phoneNumber: z.string().min(1, 'Please enter your phone number'),
  language: z.string().min(1, 'Please select a language'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const languages = [
  { value: 'en-GB', label: 'English-GB' },
  { value: 'en-US', label: 'English-US' },
  { value: 'tw', label: 'Twi' },
  { value: 'ga', label: 'Ga' },
];

const countryCodes = [
  { code: '+233', country: 'GH', flag: '🇬🇭' },
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
];

export function OnboardingProfileForm() {
  const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthStep } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: 'joel.sm13@gmail.com',
      language: 'en-GB',
    },
  });

  const selectedLanguage = watch('language');

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setAuthStep('onboarding-interests');
    setIsLoading(false);
  };

  const handlePrevious = () => {
    setAuthStep('onboarding-location');
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
            Basic Profile Details
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            A few details to personalize your experience and build trust.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Upload Picture */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <button
            type="button"
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            Upload picture
          </button>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full name
          </label>
          <div className="relative">
            <Input
              {...register('fullName')}
              placeholder="Enter your full name"
              className="pl-10"
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          {errors.fullName && (
            <p className="text-sm text-red-600 mt-1">{errors.fullName.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone number
          </label>
          <div className="flex">
            {/* Country Code Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="h-10 px-3 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <span className="text-sm">{selectedCountryCode.flag}</span>
                <span className="text-sm font-medium">{selectedCountryCode.code}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              
              {showCountryDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10 min-w-[120px]">
                  {countryCodes.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => {
                        setSelectedCountryCode(country);
                        setShowCountryDropdown(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2 text-sm"
                    >
                      <span>{country.flag}</span>
                      <span>{country.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Phone Input */}
            <Input
              {...register('phoneNumber')}
              placeholder="123 4567 890"
              className="rounded-l-none flex-1"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Enter a number between 0 and 9
          </p>
          {errors.phoneNumber && (
            <p className="text-sm text-red-600 mt-1">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Language
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="w-full h-10 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <span className="text-sm">
                {languages.find(lang => lang.value === selectedLanguage)?.label || 'Select language'}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            
            {showLanguageDropdown && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
                {languages.map((language) => (
                  <button
                    key={language.value}
                    type="button"
                    onClick={() => {
                      setValue('language', language.value);
                      setShowLanguageDropdown(false);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
                  >
                    {language.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          {errors.language && (
            <p className="text-sm text-red-600 mt-1">{errors.language.message}</p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
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
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-6"
          >
            {isLoading ? 'Saving...' : 'Next →'}
          </Button>
        </div>
      </form>
    </div>
  );
}
