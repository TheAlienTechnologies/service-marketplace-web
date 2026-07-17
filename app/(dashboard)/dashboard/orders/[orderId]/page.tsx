"use client";

import { ChevronRight, Mail, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

// --- Mock Data ---

const orderDetail = {
  id: "5764892",
  client: {
    name: "Joel Smith",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  date: "August 29, 2025",
  category: "Architecture & Interior Design",
  status: "Awaiting",
  subtotal: "GHS 250.00",
  addonsPrice: "GHS 150.00",
  discount: "-GHS 50.00",
  total: "GHS 350.00",
  addons: [
    {
      title: "Site Visit & Consultation",
      description: "On-location inspection before design begins",
    },
  ],
  progress: 1, // Awaiting
};

const progressSteps = ["Order placed", "Awaiting", "In-progress", "Completed"];

// --- Components ---

function ProviderOrderDetails() {
  return (
    <div className="space-y-8">
      {/* Header & Breadcrumbs */}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-500 mt-1">
            Stay on top of your orders to deliver great results.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {["Awaiting", "In-progress", "Completed", "Declined"].map((tab) => (
            <Link
              key={tab}
              href={`/dashboard/orders?tab=${tab}`}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                tab === orderDetail.status
                  ? "bg-green-50 text-green-700"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              {tab}
            </Link>
          ))}
        </div>

        {/* Breadcrumb nav */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link
            href="/dashboard/orders"
            className="hover:text-gray-900 transition-colors"
          >
            My orders
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            href="/dashboard/orders"
            className="text-green-600 font-medium hover:underline"
          >
            Awaiting
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-400">Order ID: #{orderDetail.id}</span>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="space-y-8">
        {/* Order Header Info */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-4 flex-1">
            <div className="flex items-center justify-between max-w-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 relative shrink-0">
                  <Image
                    src={orderDetail.client.avatar}
                    alt={orderDetail.client.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-lg font-bold text-gray-900">
                  {orderDetail.client.name}
                </span>
              </div>
              {/* Date aligned with user info on mobile, or right on desktop? 
                  Design shows date on far right of this row */}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="font-bold text-gray-900 text-base">
                Order ID: #{orderDetail.id}
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">{orderDetail.category}</span>
              <div className="flex items-center gap-1.5 ml-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full text-xs">
                  {orderDetail.status}
                </span>
              </div>
            </div>
          </div>

          {/* Top Right: Date & Actions */}
          <div className="flex flex-col items-end gap-4">
            <span className="text-sm text-gray-500">{orderDetail.date}</span>
            <div className="flex items-center gap-3 mt-2">
              <Button className="bg-[#15803d] hover:bg-[#14532d] text-white font-medium min-w-[120px] rounded-lg">
                Accept Order
              </Button>
              <Button
                variant="ghost"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 font-medium"
              >
                Decline Order
              </Button>
              <Button
                variant="outline"
                className="text-gray-700 border-gray-200 hover:bg-gray-50 gap-2 font-medium rounded-lg"
              >
                <Mail className="w-4 h-4" />
                Message Client
              </Button>
            </div>
          </div>
        </div>

        {/* Split View: Summary & Add-ons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Order Summary */}
          <div className="bg-gray-50 rounded-xl p-8 space-y-6">
            <div className="flex items-baseline gap-2">
              <h3 className="text-lg font-bold text-gray-900">Order summary</h3>
              <span className="text-sm text-gray-400">
                Order ID: #{orderDetail.id}
              </span>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal(Basic plan)</span>
                <span className="font-bold text-gray-900">
                  {orderDetail.subtotal}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Add-ons</span>
                <span className="font-bold text-gray-900">
                  {orderDetail.addonsPrice}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Coupon discount</span>
                <span className="font-bold text-gray-900">
                  {orderDetail.discount}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-center">
                <span className="text-gray-600 font-medium">Total</span>
                <span className="text-xl font-bold text-gray-900">
                  {orderDetail.total}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="pt-6">
              <div className="relative h-1.5 bg-gray-200 rounded-full mb-2">
                <div
                  className="absolute h-full bg-green-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      (orderDetail.progress / (progressSteps.length - 1)) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                {progressSteps.map((step, index) => (
                  <span
                    key={step}
                    className={cn(
                      index <= orderDetail.progress
                        ? "text-gray-900 font-medium"
                        : "" // Wait, previous design was green text? Image shows gray text except maybe active? Image in prompt shows gray text. Previous page had green text.
                      // Looking at image: "Order placed" is gray. "Awaiting" is gray. Actually looks like gray text.
                      // But usually completed steps are highlighted.
                      // I'll stick to grayish for labels as per image appearance (hard to tell if dark gray or black).
                      // The previous page code used green text. I'll use green for consistency or gray if image dictates.
                      // Image shows "Awaiting" text below bar is slightly darker/active?
                      // I'll use gray-400 for inactive, gray-900 for active/past.
                    )}
                  >
                    {step}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Add-ons Selected */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">
              Add-ons selected
            </h3>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6">
              {orderDetail.addons.map((addon) => (
                <div key={addon.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0 text-green-700">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">
                      {addon.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                      {addon.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderDetailsPage({}: {
  params: Promise<{ orderId: string }>;
}) {
  const { user } = useAuthStore();

  if (user?.role === "ADMIN") {
    return (
      <div className="p-8">Admin View Not Implemented for Detail Page</div>
    );
  }

  return <ProviderOrderDetails />;
}
