"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CheckoutHeader } from "@/components/sections/checkout/checkout-header";
import { ChevronDown, Lock } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  // TODO: Get providerName, serviceId, and order data from URL params or state
  // For now using placeholder values
  const providerName = "Robert sam";
  const serviceId = undefined;

  // Mock order data - should come from checkout modal or URL params
  const [orderData] = useState({
    planName: "Basic plan",
    planPrice: 250,
    addOnsTotal: 150,
    couponCode: "AVAD50",
    couponDiscount: 50,
    orderId: "5764892",
  });

  const [couponCode, setCouponCode] = useState(orderData.couponCode);
  const [isCouponApplied, setIsCouponApplied] = useState(true);

  const subtotal = orderData.planPrice + orderData.addOnsTotal;
  const total = subtotal - (isCouponApplied ? orderData.couponDiscount : 0);

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      setIsCouponApplied(true);
      // TODO: Validate coupon with backend
    }
  };

  const handleContinueToPaystack = () => {
    // TODO: Integrate with Paystack
    console.log("Redirecting to Paystack...");
  };

  const handleCancelOrder = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <CheckoutHeader providerName={providerName} serviceId={serviceId} />

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Section - Payment Information */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Complete Your Payment
            </h1>

            {/* Powered by Paystack */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Powered by:
              </p>
              <div className="flex items-center">
                <Image
                  src="/assets/icons/paystack.svg"
                  alt="Paystack"
                  width={400}
                  height={106}
                />
              </div>
            </div>

            {/* Info Message */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="w-5 h-5 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                You will be redirected to Paystack's secure checkout to complete
                your payment.
              </p>
            </div>
          </div>

          {/* Right Section - Order Summary Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-6">
            {/* Coupon Section */}
            <div className="space-y-3">
              <button className="flex items-center gap-2 text-brand-900 dark:text-brand-500 hover:text-brand-700 dark:hover:text-brand-400 transition-colors text-sm font-medium">
                <span>Have a coupon?</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-900 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 text-sm"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-6 py-2.5 bg-brand-900 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors text-sm"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Order summary
                </h2>
                <span className="text-xs text-gray-500 dark:text-gray-400 block mt-1">
                  Order ID: #{orderData.orderId}
                </span>
              </div>

              <div className="space-y-3">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Subtotal({orderData.planName})
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    GHS {orderData.planPrice.toFixed(2)}
                  </span>
                </div>

                {/* Add-ons */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Add-ons
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    GHS {orderData.addOnsTotal.toFixed(2)}
                  </span>
                </div>

                {/* Coupon Discount */}
                {isCouponApplied && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Coupon discount
                    </span>
                    <span className="text-sm font-medium text-red-600 dark:text-red-400">
                      -GHS {orderData.couponDiscount.toFixed(2)}
                    </span>
                  </div>
                )}

                {/* Total */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </span>
                  <span className="text-base font-bold text-gray-900 dark:text-white">
                    GHS {total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleContinueToPaystack}
                className="w-full px-6 py-3.5 bg-brand-900 hover:bg-brand-700 text-white rounded-lg font-semibold transition-colors"
              >
                Continue to Paystack
              </button>
              <button
                onClick={handleCancelOrder}
                className="w-full px-6 py-3.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel order
              </button>
            </div>

            {/* Security Message */}
            <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Lock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Secured by Paystack
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
