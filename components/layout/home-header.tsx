"use client";

import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/auth-store";
import { Logo } from "./logo";

export function HomeHeader() {
  const {
    isAuthenticated,
    user,
    showAuth,
    signOut,
    startUserFlow,
    startProviderFlow,
  } = useAuthStore();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Left Group: Logo Only */}
          <Logo />

          {/* Right Group - Navigation + Auth Buttons */}
          <div className="flex items-center space-x-8">
            {/* Navigation Items */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* Search Icon */}
              <button className="text-gray-500 hover:text-gray-700">
                <Search className="w-5 h-5" />
              </button>

              {/* Categories Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-green-600 font-medium text-sm">
                    <span>Categories</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem>
                    <span>Home Services</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Digital Services</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Professional Services</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Creative Services</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Business Services</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Help & Support Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-green-600 font-medium text-sm">
                    <span>Help & Support</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem>
                    <span>Help Center</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Contact Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Community</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Trust & Safety</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Become a seller */}
              <button
                onClick={startProviderFlow}
                className="text-gray-700 hover:text-green-600 font-medium text-sm"
              >
                Become a seller
              </button>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">
                    Welcome, {user?.firstName || user?.email}
                  </span>
                  <Button onClick={signOut} variant="outline" size="sm">
                    Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    onClick={() => showAuth("signin")}
                    variant="ghost"
                    size="sm"
                    className="text-gray-700 hover:text-gray-900 font-medium text-sm px-4 py-2"
                  >
                    Sign in
                  </Button>
                  <Button
                    onClick={startUserFlow}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white font-medium text-sm px-6 py-2 rounded-lg"
                  >
                    Sign up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
