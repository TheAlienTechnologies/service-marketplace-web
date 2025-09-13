'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';
import { mockServiceCategories } from '@/lib/mock-data';

export function OnboardingInterestsForm() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, hideAuth, setAuthStep } = useAuthStore();

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleFinish = async () => {
    setIsLoading(true);
    // Mock API call to complete onboarding
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user with completed onboarding
    setUser({
      id: '1',
      email: 'joel.sm13@gmail.com',
      firstName: 'Joel',
      lastName: 'Smith',
      role: 'USER',
      hasCompletedOnboarding: true,
      profileCompleteness: 100,
    });
    
    hideAuth();
    setIsLoading(false);
  };

  const handlePrevious = () => {
    setAuthStep('onboarding-profile');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[30px] font-bold leading-[38px] text-gray-900 dark:text-white font-inter tracking-[0%] mb-2">
          Let's finish setting up your account
        </h1>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            What services are you interested in?
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Pick a few so we can recommend the best providers for you.
          </p>
        </div>
      </div>

      {/* Service Categories */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          {mockServiceCategories.slice(0, 11).map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => toggleCategory(category.id)}
              className={`
                inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all
                ${selectedCategories.includes(category.id)
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }
              `}
            >
              {selectedCategories.includes(category.id) ? (
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              )}
              {category.name}
            </button>
          ))}
          
          {/* Other Option */}
          <button
            type="button"
            onClick={() => toggleCategory('other')}
            className={`
              inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all
              ${selectedCategories.includes('other')
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }
            `}
          >
            {selectedCategories.includes('other') ? (
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            )}
            Other...
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={handlePrevious}
          className="text-gray-600 hover:text-gray-700"
        >
          ← Previous
        </Button>
        
        <Button
          onClick={handleFinish}
          disabled={selectedCategories.length === 0 || isLoading}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-6"
        >
          {isLoading ? 'Finishing...' : 'Finish →'}
        </Button>
      </div>
    </div>
  );
}
