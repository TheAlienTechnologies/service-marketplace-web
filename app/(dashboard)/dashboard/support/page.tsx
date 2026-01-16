"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Minus,
  Mail,
  Phone,
  MapPin,
  Frown,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const FAQ_CATEGORIES = [
  "Account & Profile",
  "Services & Orders",
  "Platform & Technical Issues",
  "Payments & Earnings",
];

const FAQS = [
  {
    category: "Account & Profile",
    question: "How do I update my profile information?",
    answer:
      "Go to Profile & Settings to update your personal and professional details.",
  },
  {
    category: "Account & Profile",
    question: "What should I do if I forget my password?",
    answer:
      "Click on 'Forgot Password' at the login screen and follow the instructions to reset it.",
  },
  {
    category: "Account & Profile",
    question: "Can I have more than one profile?",
    answer:
      "No, Pavodah policy allows only one account per user to ensure trust and transparency.",
  },
  {
    category: "Account & Profile",
    question: "What documents are required for verification?",
    answer:
      "You need a valid government-issued ID and professional certificates relevant to your service.",
  },
  {
    category: "Account & Profile",
    question: "How do I change my password?",
    answer:
      "Go to Profile & Settings > Security > Change Password. Enter your old password, then your new one, and confirm it. Make sure it meets the password strength requirements.",
  },
];

export default function HelpSupportPage() {
  const [activeCategory, setActiveCategory] = useState("Account & Profile");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItem, setExpandedItem] = useState<string | null>(
    "How do I change my password?"
  );

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = faq.category === activeCategory;
    const matchesSearch = faq.question
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return searchQuery ? matchesSearch : matchesCategory;
  });

  const toggleExpand = (question: string) => {
    setExpandedItem(expandedItem === question ? null : question);
  };

  return (
    <div className="space-y-12 pb-12 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Help & support</h1>
        <p className="text-gray-500 mt-1">
          Search FAQs, contact support, or resolve issues easily.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {FAQ_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
              setSearchQuery("");
            }}
            className={cn(
              "px-4 py-2 text-sm font-bold rounded-full whitespace-nowrap transition-colors",
              activeCategory === category && !searchQuery
                ? "bg-green-50 text-green-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Type your question..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 pr-10 py-6 text-base bg-white rounded-xl border-gray-200"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* FAQs List */}
      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <div key={faq.question} className="group">
              <button
                onClick={() => toggleExpand(faq.question)}
                className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50/50 rounded-lg px-2 transition-colors"
              >
                <span className="font-medium text-gray-900">
                  {faq.question}
                </span>
                <span className="text-gray-400 group-hover:text-gray-600 border border-gray-300 rounded p-0.5">
                  {expandedItem === faq.question ? (
                    <Minus className="w-3 h-3" />
                  ) : (
                    <Plus className="w-3 h-3" />
                  )}
                </span>
              </button>
              {expandedItem === faq.question && (
                <div className="bg-gray-50/50 rounded-lg p-6 text-sm text-gray-600 leading-relaxed border border-gray-100 mb-4 mx-2">
                  {faq.answer}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Frown className="w-12 h-12 text-gray-300 mb-4" strokeWidth={1.5} />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No results found
            </h3>
            <p className="text-sm text-gray-500">
              We couldn&apos;t find any articles matching your search.
            </p>
          </div>
        )}
      </div>

      {/* Contact Section */}
      <div className="space-y-6 pt-8 border-t border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">
          Need more help? We&apos;re here.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email */}
          <div className="bg-gray-50/30 rounded-xl p-8 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-4">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Email</h3>
            <p className="text-xs text-gray-500 mb-3">
              Our friendly team is here to help.
            </p>
            <a
              href="mailto:support@pavodah.com"
              className="text-sm font-bold text-green-700 hover:underline"
            >
              Support@pavodah.com
            </a>
          </div>

          {/* Phone */}
          <div className="bg-gray-50/30 rounded-xl p-8 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-4">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
            <p className="text-xs text-gray-500 mb-3">
              Mon-Fri from 8am to 5pm.
            </p>
            <a
              href="tel:+233596754061"
              className="text-sm font-bold text-green-700 hover:underline"
            >
              +233 596 754 061
            </a>
          </div>

          {/* Office */}
          <div className="bg-gray-50/30 rounded-xl p-8 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Office</h3>
            <p className="text-xs text-gray-500 mb-3">
              Come say hello at our office HQ.
            </p>
            <span className="text-sm font-bold text-green-700">
              Sekondi-Takoradi, Ghana
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

