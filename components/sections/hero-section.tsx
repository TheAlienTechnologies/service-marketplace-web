"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { Check } from "lucide-react";

export function HeroSection() {
  const { startUserFlow } = useAuthStore();

  return (
    <section
      className="bg-marketplace-600">
      <div
        className="relative bg-contain bg-contain bg-no-repeat max-w-7xl mx-auto"
        style={{
          backgroundImage: "url(/assets/site-images/home_background.png)",
        }}
      >
        {/* Content */}
        <div className="relative z-10  mx-auto px-6 py-[75px]">
          <div>
            {/* Main Heading */}
            <h1 className="lg:text-[48px] font-bold text-white mb-[32px] leading-tight max-w-[700px]">
              Find & hire trusted service providers with{" "}
              <span className="text-brand-400 relative">Pavodah</span>
            </h1>

            {/* Bullet Points */}
            <div className="flex flex-row gap-[16px] mb-[32px]">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <Check className="w-[20px] h-[20px] text-black" />
                </div>
                <span className="text-white text-lg font-medium">
                  Get matched with experts near you.
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <Check className="w-[20px] h-[20px] text-black" />
                </div>
                <span className="text-white text-lg font-medium">
                  Get the job done. Get peace of mind.
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={startUserFlow}
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
