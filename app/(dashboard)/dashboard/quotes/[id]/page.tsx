"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Download,
  FileText,
  Mail,
  Upload,
  Paperclip,
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
import { cn } from "@/lib/utils";

// --- Mock Data ---

const quoteDetail = {
  id: "1",
  client: {
    name: "Olivia Rhye",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  projectTitle: "Interior Design",
  budget: "GHS 2,500",
  description:
    "I'm looking for a modern and minimalist interior design for my 2-bedroom apartment located in East Legon. I want the space to feel open, bright, and functional, with soft lighting and a neutral color palette. The living area should have a cozy yet sophisticated atmosphere, while the bedrooms should reflect a calm and relaxing mood. I already have a rough floor plan and some reference photos, which I've attached below.",
  deliveryTime: "3-5 Days",
  attachments: [
    {
      name: "Floorplan.pdf",
      size: "200 KB",
      type: "pdf",
    },
  ],
  date: "October 07, 2025",
  status: "New Request", // Default for demo, will override based on param/logic if needed
};

// --- Components ---

function StatusBadge({ status }: { status: string }) {
  let badgeStyles = "bg-gray-50 text-gray-700 border-gray-200";
  let dotStyles = "bg-gray-500";

  switch (status) {
    case "New Request":
      badgeStyles = "bg-blue-50 text-blue-700 border-blue-200";
      dotStyles = "bg-blue-500";
      break;
    case "Accepted":
      badgeStyles = "bg-green-50 text-green-700 border-green-200";
      dotStyles = "bg-green-500";
      break;
    case "Pending":
      badgeStyles = "bg-orange-50 text-orange-700 border-orange-200";
      dotStyles = "bg-orange-500";
      break;
    case "Declined":
      badgeStyles = "bg-red-50 text-red-700 border-red-200";
      dotStyles = "bg-red-500";
      break;
    case "Expired":
      badgeStyles = "bg-gray-100 text-gray-700 border-gray-200";
      dotStyles = "bg-gray-500";
      break;
  }

  return (
    <div
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeStyles}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotStyles}`}></span>
      {status}
    </div>
  );
}

export default function QuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  // In a real app, fetch data based on ID.
  // For demo, we might simulate different statuses based on ID or just default.
  // Let's toggle status based on ID for demo purposes or random?
  // 1=New, 2=Accepted, 3=Declined, 4=Expired.
  let status = quoteDetail.status;
  if (id === "4" || id === "7") status = "Accepted";
  if (id === "3") status = "Declined";
  if (id === "6") status = "Expired";
  if (id === "5") status = "Pending";

  const isNewRequest = status === "New Request";
  const isAccepted = status === "Accepted";
  const isDeclined = status === "Declined";
  const isExpired = status === "Expired";

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quote Request</h1>
        <p className="text-gray-500 mt-1">
          View, manage, and respond to client quote requests.
        </p>
      </div>

      {/* Tabs / Filter Pills (Visual only here as per list page design usually) */}
      {/* Omitting tabs on detail page as per design - breadcrumbs used instead */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link
          href="/dashboard/quotes"
          className="hover:text-gray-900 transition-colors"
        >
          Quote Requests
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{quoteDetail.client.name}</span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column: Request Details */}
        <div className="xl:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 relative">
                <Image
                  src={quoteDetail.client.avatar}
                  alt={quoteDetail.client.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {quoteDetail.client.name}
                </h2>
              </div>
              <StatusBadge status={status} />
            </div>
            <span className="text-sm text-gray-500">{quoteDetail.date}</span>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">
                Project title
              </h3>
              <p className="text-gray-600">{quoteDetail.projectTitle}</p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">Budget</h3>
              <p className="text-gray-600">{quoteDetail.budget}</p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">
                Project description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {quoteDetail.description}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">
                Delivery Time
              </h3>
              <p className="text-gray-600">{quoteDetail.deliveryTime}</p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3">
                Attachments
              </h3>
              <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between bg-white max-w-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {quoteDetail.attachments[0].name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {quoteDetail.attachments[0].size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="text-green-700 text-sm font-medium hover:underline">
                    Preview
                  </button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-gray-600"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </div>
            </div>

            {/* Actions Section (Left Side) - Only if NOT New Request? 
                Image 3 (Accepted) shows buttons here. Image 2 (New) shows form on right.
            */}
            {isAccepted && (
              <div className="pt-4 flex items-center gap-3">
                <Button className="bg-[#15803d] hover:bg-[#14532d] text-white font-medium min-w-[120px] rounded-lg">
                  Accept offer
                </Button>
                <Button
                  variant="ghost"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 font-medium"
                >
                  Decline
                </Button>
                <Button
                  variant="outline"
                  className="text-gray-700 border-gray-200 hover:bg-gray-50 gap-2 font-medium rounded-lg"
                >
                  <Mail className="w-4 h-4" />
                  Message client
                </Button>
              </div>
            )}
             {/* If Pending, maybe cancel option? */}
             {status === "Pending" && (
              <div className="pt-4 flex items-center gap-3">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white font-medium min-w-[120px] rounded-lg">
                  Cancel Quote
                </Button>
                 <Button
                  variant="outline"
                  className="text-gray-700 border-gray-200 hover:bg-gray-50 gap-2 font-medium rounded-lg"
                >
                  <Mail className="w-4 h-4" />
                  Message client
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Dynamic Content */}
        <div className="xl:col-span-1">
          {isNewRequest && (
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-1">Send Your Offer</h3>
              <p className="text-xs text-gray-500 mb-6">
                Customize your proposal for this request.
              </p>

              <form className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">
                    Project title
                  </label>
                  <Input
                    placeholder='Example: "Standard Interior Package"'
                    className="bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">
                    Delivery time
                  </label>
                  <Select>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Delivery time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-3">1-3 Days</SelectItem>
                      <SelectItem value="3-5">3-5 Days</SelectItem>
                      <SelectItem value="7+">7+ Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">
                    Attach files
                  </label>
                  <div className="border border-dashed border-gray-300 rounded-lg bg-white p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
                    <Paperclip className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      Click to attach
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">
                    Budget
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 border-r border-gray-200 pr-2 h-full py-2">
                      {/* Flag placeholder */}
                      <div className="w-4 h-4 rounded-full bg-red-500 border border-gray-200 shrink-0 relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600"></div>
                         <div className="absolute bottom-0 left-0 w-full h-1/2 bg-yellow-400"></div>
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-green-600 star-shape"></div>
                      </div>
                      <span className="text-xs text-gray-600 font-medium">GHS</span>
                      <ChevronRight className="w-3 h-3 text-gray-400 rotate-90" />
                    </div>
                    <Input
                      type="number"
                      placeholder="0.00"
                      className="pl-24 bg-white"
                      defaultValue={2500.0}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">
                    Note
                  </label>
                  <Textarea
                    placeholder="Type here..."
                    className="bg-white min-h-[100px] resize-none"
                  />
                </div>

                <Button className="w-full bg-[#15803d] hover:bg-[#14532d] text-white font-medium rounded-lg mt-2">
                  Send offer
                </Button>
              </form>
            </div>
          )}

          {isDeclined && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">
                Message from client
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                Budget too high
              </div>
            </div>
          )}

          {isExpired && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-[10px] font-serif text-gray-500">i</span>
                Important note
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                No response within 7 days
              </div>
            </div>
          )}
          
          {/* Accepted State Right Panel - Image 3 shows EMPTY right panel, 
              but typically we might show the accepted offer details. 
              Leaving empty to match screenshot layout implies left column takes width or is just blank. 
              The layout handles it (Grid col span 1 is just empty). 
          */}
        </div>
      </div>
    </div>
  );
}

