'use client';

import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';

export function Header() {
  const { isAuthenticated, user, showAuth, signOut } = useAuthStore();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
            </div>
            <span className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
              AVADgh
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
              Services
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
              About Us
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
              How it Works
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
              Become a Provider
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
              Help
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Welcome, {user?.firstName || user?.email}
                </span>
                <Button
                  onClick={signOut}
                  variant="outline"
                  size="sm"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button
                  onClick={() => showAuth('signin')}
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => showAuth('signup')}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
