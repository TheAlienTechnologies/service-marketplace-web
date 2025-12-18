"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  Upload,
  X,
  Plus,
  Trash2,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type Plan = {
  id: string;
  title: string;
  price: string;
  inclusions: string;
  isPopular: boolean;
  isExpanded: boolean;
};

type Addon = {
  id: string;
  title: string;
  description: string;
  price: string;
  isSelected: boolean;
};

export default function AddServicePage() {
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: "1",
      title: "Basic plan",
      price: "250.00",
      inclusions:
        "1-hour consultation (virtual or in-person)\nQuick recommendations / advice\nNo revisions included\nDelivery within 1-2 days",
      isPopular: false,
      isExpanded: true,
    },
  ]);

  const [addons, setAddons] = useState<Addon[]>([
    {
      id: "1",
      title: "Site Visit & Consultation",
      description: "On-location inspection before design begins",
      price: "100.00",
      isSelected: false,
    },
  ]);

  const [showAddons, setShowAddons] = useState(true);

  const togglePlanExpansion = (id: string) => {
    setPlans(
      plans.map((p) => (p.id === id ? { ...p, isExpanded: !p.isExpanded } : p))
    );
  };

  const updatePlan = (id: string, field: keyof Plan, value: any) => {
    setPlans(plans.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const addPlan = () => {
    const newId = (plans.length + 1).toString();
    setPlans([
      ...plans.map((p) => ({ ...p, isExpanded: false })), // Collapse others
      {
        id: newId,
        title: "New plan",
        price: "",
        inclusions: "",
        isPopular: false,
        isExpanded: true,
      },
    ]);
  };

  const updateAddon = (id: string, field: keyof Addon, value: any) => {
    setAddons(addons.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  const addAddon = () => {
    const newId = (addons.length + 1).toString();
    setAddons([
      ...addons,
      {
        id: newId,
        title: "",
        description: "",
        price: "",
        isSelected: false,
      },
    ]);
  };

  const removeAddon = (id: string) => {
    setAddons(addons.filter((a) => a.id !== id));
  };

  return (
    <div className="max-w-[1200px] mx-auto pb-20">
      {/* Header */}
      <div className="mb-8">
        <nav className="flex items-center text-sm text-gray-500 mb-4">
          <Link
            href="/dashboard/services"
            className="hover:text-gray-900 transition-colors"
          >
            My services
          </Link>
          <ChevronLeft className="w-4 h-4 mx-2 rotate-180" />
          <span className="text-gray-900 font-medium">Preview & Publish</span>
        </nav>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My services</h1>
            <p className="text-gray-500 mt-1">
              Define your service, highlight your work, and start getting
              booked.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Service Details */}
        <div className="lg:col-span-7 space-y-8">
          {/* Cover Image */}
          <div className="space-y-4">
            <span
              className="block text-sm font-semibold text-gray-900"
              id="cover-image-label"
            >
              Cover image
            </span>
            <button
              type="button"
              aria-labelledby="cover-image-label"
              className="relative w-full aspect-[2/1] rounded-xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 group cursor-pointer hover:bg-gray-50 transition-colors p-0 text-left"
            >
              <Image
                src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Cover"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <div className="bg-white/90 backdrop-blur rounded-lg px-4 py-2 text-sm font-medium text-gray-900 flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Change Image
                </div>
              </div>
            </button>
          </div>

          {/* General Details */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">
              General details
            </h2>

            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700"
              >
                Service title
              </label>
              <Input
                id="title"
                defaultValue="Architecture & Interior Designer"
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="category-select"
                className="text-sm font-medium text-gray-700"
              >
                Service category
              </label>
              <Select defaultValue="design">
                <SelectTrigger id="category-select" className="bg-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="design">
                    Architect & Interior Designer
                  </SelectItem>
                  <SelectItem value="home">Home Decor</SelectItem>
                  <SelectItem value="garden">Garden & Landscaping</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                This is a hint text to help user.
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="overview"
                className="text-sm font-medium text-gray-700"
              >
                Overview
              </label>
              <Textarea
                id="overview"
                className="min-h-[200px] bg-white leading-relaxed resize-none"
                defaultValue="Modern architectural design featuring futuristic curves and glass façades. Expert services in architectural planning, 3D modeling, and conceptual design to bring your building vision to life.
Beyond the aesthetics, I ensure that every design meets structural integrity, sustainability, and functionality standards. From initial sketches to detailed 3D models, my process is collaborative — keeping you involved at every stage to align with your goals and budget.
Whether it's residential housing, commercial buildings, or public spaces, I deliver innovative designs tailored to your unique requirements. My focus is on creating environments that not only look exceptional but also enhance comfort, usability, and long-term value.
Let's work together to transform your concept into a space that inspires and endures."
              />
              <div className="flex justify-end">
                <span className="text-xs text-gray-400">0/500</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Tags</span>
              <div className="flex flex-wrap gap-2">
                {["Interior design", "Design", "Architecture", "Branding"].map(
                  (tag) => (
                    <div
                      key={tag}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 group cursor-default"
                    >
                      {tag}
                      <button
                        className="hidden group-hover:block hover:text-red-600"
                        aria-label={`Remove tag ${tag}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )
                )}
                <button className="text-xs text-gray-500 hover:text-gray-900 border border-dashed border-gray-300 rounded-full px-3 py-1 flex items-center gap-1 hover:border-gray-400 transition-colors">
                  <Plus className="w-3 h-3" /> Add tag
                </button>
              </div>
            </div>
          </div>

          {/* Catalogue */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Catalogue</h2>
            <p className="text-sm text-gray-500 -mt-2">
              Upload your best work to impress clients.
            </p>

            <button
              type="button"
              className="w-full border border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
                <Upload className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-green-700">
                Click to upload{" "}
                <span className="text-gray-500 font-normal">
                  or drag and drop
                </span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                JPG, PNG, PDF (max. 5MB)
              </p>
            </button>

            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
                const randomImg = i % 4 === 0 ? 4 : i % 4;
                return (
                  <div
                    key={i}
                    className="aspect-[4/3] relative rounded-lg overflow-hidden bg-gray-100 group"
                  >
                    <Image
                      src={`/assets/temp/products/p${randomImg}.jpg`}
                      alt={`Work ${i}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-6 h-6 rounded-full bg-white/90 text-gray-600 flex items-center justify-center hover:text-red-600 shadow-sm">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Pricing Plans */}
        <div className="lg:col-span-5 space-y-8">
          {/* Pricing Plans Section */}
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Pricing plans
              </h2>
              <p className="text-sm text-gray-500">
                Break down your service into simple, clear plans that showcase
                your value.
              </p>
            </div>

            <div className="space-y-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={cn(
                    "bg-white rounded-xl border transition-all duration-200",
                    plan.isExpanded
                      ? "border-gray-200 shadow-sm"
                      : "border-transparent hover:border-gray-200"
                  )}
                >
                  {/* Header/Summary View */}
                  <button
                    type="button"
                    onClick={() => togglePlanExpansion(plan.id)}
                    className={cn(
                      "w-full flex items-center justify-between p-4 cursor-pointer outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded-xl text-left",
                      plan.isExpanded && "border-b border-gray-100"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          plan.isExpanded
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        )}
                      >
                        <BoxIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {plan.title || "Untitled Plan"}
                        </h3>
                        {!plan.isExpanded && plan.price && (
                          <p className="text-xs text-gray-500">
                            GHS {plan.price}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {plan.isPopular && !plan.isExpanded && (
                        <span className="bg-green-50 text-green-700 text-[10px] font-medium px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      )}
                      {plan.isExpanded ? (
                        <div className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center">
                          <div className="w-2.5 h-2.5 bg-green-600 rounded-full" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-gray-200" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {plan.isExpanded && (
                    <div className="p-4 space-y-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={plan.isPopular}
                            onCheckedChange={(checked) =>
                              updatePlan(plan.id, "isPopular", checked)
                            }
                            id={`popular-${plan.id}`}
                          />
                          <label
                            htmlFor={`popular-${plan.id}`}
                            className="text-sm text-gray-600 cursor-pointer"
                          >
                            Mark as popular
                          </label>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor={`plan-title-${plan.id}`}
                          className="text-sm font-medium text-gray-700"
                        >
                          Plan title
                        </label>
                        <Input
                          id={`plan-title-${plan.id}`}
                          value={plan.title}
                          onChange={(e) =>
                            updatePlan(plan.id, "title", e.target.value)
                          }
                          className="bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor={`plan-price-${plan.id}`}
                          className="text-sm font-medium text-gray-700"
                        >
                          Price
                        </label>
                        <div className="relative">
                          <div className="absolute left-0 top-0 bottom-0 px-3 bg-gray-50 border-r border-gray-200 rounded-l-md flex items-center">
                            <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
                              GHS <ChevronDown className="w-3 h-3" />
                            </span>
                          </div>
                          <Input
                            id={`plan-price-${plan.id}`}
                            value={plan.price}
                            onChange={(e) =>
                              updatePlan(plan.id, "price", e.target.value)
                            }
                            className="pl-20 bg-white"
                            type="number"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor={`plan-inclusions-${plan.id}`}
                          className="text-sm font-medium text-gray-700"
                        >
                          Plan inclusions
                        </label>
                        <Textarea
                          id={`plan-inclusions-${plan.id}`}
                          value={plan.inclusions}
                          onChange={(e) =>
                            updatePlan(plan.id, "inclusions", e.target.value)
                          }
                          className="min-h-[120px] bg-white resize-none text-sm"
                          placeholder="• Item 1&#10;• Item 2"
                        />
                        <p className="text-xs text-gray-400">
                          Press enter to create the next bullet
                        </p>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => togglePlanExpansion(plan.id)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="flex-1 bg-[#15803d] hover:bg-[#14532d] text-white"
                          onClick={() => togglePlanExpansion(plan.id)}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={addPlan}
                className="flex items-center gap-2 text-sm font-medium text-[#15803d] hover:text-[#14532d] transition-colors pl-1"
              >
                <Plus className="w-4 h-4" /> Add another plan
              </button>
            </div>
          </div>

          {/* Add-ons Section */}
          <div className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                  Add-ons{" "}
                  <span className="text-gray-400 font-normal">(Optional)</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Give clients more flexibility with optional upgrades.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Show</span>
                <Switch checked={showAddons} onCheckedChange={setShowAddons} />
              </div>
            </div>

            {showAddons && (
              <div className="space-y-4">
                {addons.map((addon) => (
                  <div
                    key={addon.id}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-4"
                  >
                    {/* Using a simplified view similar to plans - always expanded for demo per image, 
                               but ideally would be collapsible too. Image shows it expanded. */}
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 mb-2">
                      <Plus className="w-4 h-4 rotate-45" />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor={`addon-title-${addon.id}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Title
                      </label>
                      <Input
                        id={`addon-title-${addon.id}`}
                        value={addon.title}
                        onChange={(e) =>
                          updateAddon(addon.id, "title", e.target.value)
                        }
                        className="bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor={`addon-desc-${addon.id}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Short description{" "}
                        <span className="text-gray-400 font-normal">
                          (Optional)
                        </span>
                      </label>
                      <Input
                        id={`addon-desc-${addon.id}`}
                        value={addon.description}
                        onChange={(e) =>
                          updateAddon(addon.id, "description", e.target.value)
                        }
                        className="bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor={`addon-price-${addon.id}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Price
                      </label>
                      <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 px-3 bg-gray-50 border-r border-gray-200 rounded-l-md flex items-center">
                          <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
                            GHS <ChevronDown className="w-3 h-3" />
                          </span>
                        </div>
                        <Input
                          id={`addon-price-${addon.id}`}
                          value={addon.price}
                          onChange={(e) =>
                            updateAddon(addon.id, "price", e.target.value)
                          }
                          className="pl-20 bg-white"
                          type="number"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => removeAddon(addon.id)}
                      >
                        Cancel
                      </Button>
                      <Button className="flex-1 bg-[#15803d] hover:bg-[#14532d] text-white">
                        Save
                      </Button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={addAddon}
                  className="flex items-center gap-2 text-sm font-medium text-[#15803d] hover:text-[#14532d] transition-colors pl-1"
                >
                  <Plus className="w-4 h-4" /> Add another
                </button>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="pt-8 space-y-3">
            <Button
              variant="outline"
              className="w-full py-6 text-base font-medium"
            >
              Save as draft
            </Button>
            <Button className="w-full py-6 text-base font-medium bg-[#15803d] hover:bg-[#14532d] text-white">
              Preview & Publish
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple Box Icon component for the plan header
function BoxIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}
