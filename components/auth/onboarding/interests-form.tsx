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
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Let's finish setting up your account
        </h1>
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            What services are you interested in?
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Pick a few so we can recommend the best providers for you.
          </p>
        </div>
      </div>

      {/* Service Categories */}
      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-2 gap-3">
          {mockServiceCategories.slice(0, 12).map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => toggleCategory(category.id)}
              className={`
                p-3 rounded-lg border text-left transition-all
                ${selectedCategories.includes(category.id)
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
                {selectedCategories.includes(category.id) && (
                  <div className="ml-auto">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Other Option */}
        <button
          type="button"
          onClick={() => toggleCategory('other')}
          className={`
            w-full p-3 rounded-lg border text-left transition-all
            ${selectedCategories.includes('other')
              ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }
          `}
        >
          <div className="flex items-center space-x-3">
            <span className="text-lg">➕</span>
            <span className="text-sm font-medium">Other...</span>
            {selectedCategories.includes('other') && (
              <div className="ml-auto">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        </button>
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
