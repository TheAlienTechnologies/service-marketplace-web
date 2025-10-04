'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';
import { apiService } from '@/lib/api';
import { toast } from 'react-toastify';
import { Category } from '@/types/auth';
import { Search, Monitor, Palette, Home, Type, TrendingUp, Zap, Camera } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Icon mapping for categories (can be extended based on category names)
const categoryIcons: { [key: string]: any } = {
  'programming': Monitor,
  'tech': Monitor,
  'design': Palette,
  'graphics': Palette,
  'home': Home,
  'decor': Home,
  'write': Type,
  'translate': Type,
  'marketing': TrendingUp,
  'digital': TrendingUp,
  'ai': Zap,
  'services': Zap,
  'photography': Camera,
  'photo': Camera,
};

// Function to get icon for a category based on its name
const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();
  for (const [key, icon] of Object.entries(categoryIcons)) {
    if (name.includes(key)) {
      return icon;
    }
  }
  return Monitor; // Default icon
};

export function ProviderSkillsForm() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { nextProviderStep, previousProviderStep } = useAuthStore();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiService.getCategories();
        console.log('Categories API response:', response);
        console.log('Categories array:', response.categories);
        setCategories(response.categories || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        toast.error('Failed to load service categories');
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Filter categories based on search query
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleNext = async () => {
    if (selectedCategories.length === 0) {
      toast.error('Please select at least one service category');
      return;
    }

    setIsLoading(true);
    try {
      // Save provider skills/services
      await apiService.updateInterests(selectedCategories, 'SERVICE');
      
      toast.success('Skills saved successfully!');
      nextProviderStep();
    } catch (error) {
      console.error('Failed to save skills:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save skills';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    previousProviderStep();
  };

  return (
    <div className="p-8">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>3/5</span>
          <span>65%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[30px] font-bold leading-[38px] text-gray-900 dark:text-white font-inter tracking-[0%] mb-6">
          Let's finish setting up your account
        </h1>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Skills & Services
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Select Categories
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search categories"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Service Categories */}
      <div className="mb-8">
        {isLoadingCategories ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-400">Loading categories...</span>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {searchQuery ? 'No categories match your search' : 'No service categories available'}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-sm text-green-600 hover:text-green-700"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCategories.map((category) => {
              const IconComponent = getCategoryIcon(category.name);
              return (
                <label
                  key={category.id}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                  />
                  <div className="flex items-center space-x-3">
                    <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-900 dark:text-white font-medium">
                      {category.name}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        )}
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
          onClick={handleNext}
          disabled={selectedCategories.length === 0 || isLoading || isLoadingCategories}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-6"
        >
          {isLoading ? 'Saving...' : isLoadingCategories ? 'Loading...' : 'Next →'}
        </Button>
      </div>
    </div>
  );
}
