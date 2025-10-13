"use client";

import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero-section";
import { ServiceCarousel } from "@/components/sections/service-carousel";
import { AuthModal } from "@/components/auth/auth-modal";
import { useAuthStore } from "@/store/auth-store";
import { mockServices, mockServiceCategories } from "@/lib/mock-data";
import { mockBestsellers, mockMostViewed } from "@/lib/mock-bestsellers";
import { Star, MapPin } from "lucide-react";

export default function Home() {
  const { showAuth } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Bestsellers Section */}
      <ServiceCarousel
        services={mockBestsellers}
        title="Bestsellers"
        showAllLink={{
          text: "See all best sellers",
          onClick: () => console.log("View all bestsellers"),
        }}
        onServiceClick={(service) =>
          console.log("Service clicked:", service.id)
        }
      />

      {/* Most Viewed Section */}
      <ServiceCarousel
        services={mockMostViewed}
        title="Most Viewed"
        showAllLink={{
          text: "See all most viewed",
          onClick: () => console.log("View all most viewed"),
        }}
        onServiceClick={(service) =>
          console.log("Service clicked:", service.id)
        }
      />

      {/* Service Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Popular Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Browse our most requested service categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {mockServiceCategories.slice(0, 12).map((category) => (
              <div
                key={category.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700"
              >
                <div className="text-3xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Top-rated services from trusted providers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockServices.map((service) => (
              <div
                key={service.id}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700"
              >
                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600"></div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    by {service.provider}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {service.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({service.reviews})
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      {service.price}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{service.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of satisfied customers and service providers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => useAuthStore.getState().startUserFlow()}
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg"
            >
              Find Services
            </Button>
            <Button
              onClick={() => useAuthStore.getState().startProviderFlow()}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 font-semibold px-8 py-3 text-lg"
            >
              Offer Services
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
                </div>
                <span className="ml-3 text-xl font-semibold">AVADgh</span>
              </div>
              <p className="text-gray-400">
                Connecting trusted service providers with customers across
                Ghana.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Customers</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Browse Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Safety
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Providers</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Become a Provider
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Provider Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AVADgh. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Authentication Modal */}
      <AuthModal />
    </div>
  );
}
