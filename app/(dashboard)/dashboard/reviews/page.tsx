"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Box, ThumbsUp, ThumbsDown, ArrowDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Review = {
  id: string;
  user: {
    name: string;
    image: string;
  };
  rating: number;
  date: string;
  content: string;
  likes: number;
  dislikes: number;
};

const reviews: Review[] = [
  {
    id: "1",
    user: {
      name: "Ama Boateng",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    rating: 5.0,
    date: "Aug 12, 2025",
    content:
      "“Amazing work! The designs exceeded my expectations, and communication was smooth throughout the project. Highly recommended!”",
    likes: 125,
    dislikes: 2,
  },
  {
    id: "2",
    user: {
      name: "Nana Yaw",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    rating: 4.8,
    date: "Sep 5, 2025",
    content:
      "“The project was delivered on time and the quality was top-notch. A few minor adjustments were needed, but overall a great experience!”",
    likes: 98,
    dislikes: 1,
  },
  {
    id: "3",
    user: {
      name: "Abena Owusu",
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    rating: 4.5,
    date: "Jul 20, 2025",
    content:
      "“Solid performance and good understanding of my needs. Would definitely work together again.”",
    likes: 75,
    dislikes: 3,
  },
  {
    id: "4",
    user: {
      name: "Jamal Khan",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    rating: 4.9,
    date: "Oct 10, 2025",
    content:
      "“Fantastic collaboration! The final product is exactly what we envisioned. Very professional.”",
    likes: 110,
    dislikes: 0,
  },
  {
    id: "5",
    user: {
      name: "Kojo Mensah",
      image:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    rating: 4.7,
    date: "Nov 15, 2025",
    content:
      "“Great attention to detail and creativity. The team was responsive and open to feedback.”",
    likes: 90,
    dislikes: 1,
  },
  {
    id: "6",
    user: {
      name: "Rajiv Mehta",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    rating: 5.0,
    date: "Dec 1, 2025",
    content:
      "“Absolutely thrilled with the output! Beyond what I hoped for. Will hire again for future projects.”",
    likes: 130,
    dislikes: 0,
  },
];

const ratingBreakdown = [
  { stars: 5.0, count: 2823 },
  { stars: 4.0, count: 38 },
  { stars: 3.0, count: 4 },
  { stars: 2.0, count: 0 },
  { stars: 1.0, count: 0 },
];

export default function ReviewsPage() {
  return (
    <div className="max-w-[1000px] space-y-10 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
        <p className="text-gray-500 mt-1">
          Your ratings and feedback help you grow and earn trust.
        </p>
      </div>

      {/* Ratings Summary */}
      <div className="flex flex-col gap-8">
        {/* Top Stats Group */}
        <div className="flex items-center gap-6 pt-2">
          {/* Rating Circle */}
          <div className="w-20 h-20 rounded-full border-[3px] border-amber-400 flex items-center justify-center text-3xl font-bold text-gray-900 shrink-0">
            4.5
          </div>

          {/* Stars & Count */}
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-amber-400 text-amber-400"
                />
              ))}
              <Star className="w-5 h-5 fill-amber-100 text-amber-100" />
            </div>
            <p className="text-sm text-gray-500">from 1,25k reviews</p>
          </div>

          {/* Divider */}
          <div className="h-12 w-px bg-gray-200 mx-2 hidden sm:block"></div>

          {/* Orders Completed */}
          <div className="hidden sm:flex items-center gap-2.5 font-medium text-gray-900 text-lg">
            <Box className="w-6 h-6 text-gray-900" />
            <span>Orders Completed: 120</span>
          </div>
        </div>

        {/* Bottom Progress Bars */}
        <div className="w-full max-w-2xl space-y-4">
          {ratingBreakdown.map((item) => (
            <div key={item.stars} className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 shrink-0 w-12">
                <span className="font-medium text-gray-900">
                  {item.stars.toFixed(1)}
                </span>
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>

              <div className="flex-1 h-2 bg-gray-50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#15803d] rounded-full transition-all duration-500"
                  style={{ width: `${(item.count / 2865) * 100}%` }}
                />
              </div>
              <span className="w-10 text-right text-gray-500 shrink-0">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-gray-900">Reviews</h2>
            <p className="text-sm text-gray-500">
              See what clients are saying about you.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Filter</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-[100px] h-9 bg-white text-sm">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Sort by</span>
              <Select defaultValue="recent">
                <SelectTrigger className="w-[130px] h-9 bg-white text-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="highest">Highest Rated</SelectItem>
                  <SelectItem value="lowest">Lowest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {reviews.map((review) => (
            <div key={review.id} className="flex gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0">
                <Image
                  src={review.user.image}
                  alt={review.user.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-semibold text-gray-900">
                      {review.user.name}
                    </h3>
                    <div className="flex items-center gap-0.5 text-xs font-medium text-gray-500">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {review.rating.toFixed(1)}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>

                <p className="text-sm text-gray-800 leading-relaxed max-w-2xl">
                  {review.content}
                </p>

                <div className="flex items-center gap-4 text-xs font-medium text-gray-500 pt-1">
                  <button className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                    <ThumbsUp className="w-3.5 h-3.5" /> {review.likes}
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                    <ThumbsDown className="w-3.5 h-3.5 scale-x-[-1]" />{" "}
                    {review.dislikes}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="flex items-center gap-2 text-sm font-medium text-[#15803d] hover:text-[#14532d] transition-colors mt-4">
          Show more <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
