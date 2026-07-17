"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Download,
  Mail,
  Phone,
  ArrowLeft,
  ChevronDown,
  Paperclip,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// --- Mock Data ---

const disputeDetail = {
  id: "ADM-00456",
  orderId: "5764892",
  orderCategory: "Architecture & Interior Design",
  orderStatus: "Open",
  dateSubmitted: "August 29, 2025",
  client: {
    name: "Olivia Rhye",
    role: "Client",
    email: "sarah.j@example.com",
    phone: "+23359 987 6543",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  freelancer: {
    name: "Michael Chen",
    role: "Freelancer",
    email: "michael.c@example.com",
    phone: "+23359 987 6543",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  issueType: "Late Delivery",
  description:
    "The freelancer missed the agreed delivery deadline by 5 days. I have an urgent client presentation and this delay has caused significant issues. I requested updates multiple times but received minimal communication.",
  status: "Open",
  evidence: {
    client: [
      {
        id: "1",
        name: "chat-screenshot.png",
        date: "September 12, 2025 10:30 AM",
        preview:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      },
    ],
    freelancer: [],
    admin: [],
  },
  timeline: [
    {
      id: 1,
      title: "Dispute opened by Sarah Johnson",
      date: "August 29, 2025 10:30 AM",
      role: "Client",
      description: "",
    },
    {
      id: 2,
      title: "Client submitted evidence",
      date: "August 30, 2025 10:30 AM",
      role: "Client",
      description: "",
    },
    {
      id: 3,
      title: "Freelancer responded with evidence",
      date: "August 30, 2025 10:30 AM",
      role: "Client", // Note: The design shows "Client" tag here? Or maybe typo in design. Usually Freelancer events have Freelancer tag. I'll stick to design screenshot "Client" if unsure, but logically it should be Freelancer. Screenshot shows "Client" badge for Freelancer response. I'll keep it as "Client" to match pixel perfect request, but might correct it if user complains. Actually looking closely at screenshot: "Freelancer responded with evidence" has "Client" badge underneath. This is likely a mistake in the design mockup. I will use "Client" to match the screenshot "pixel perfect" instruction, but add a comment.
      description: "",
    },
    {
      id: 4,
      title: 'Status changed to "Review"',
      date: "August 30, 2025 10:30 AM",
      role: "Admin",
      description: "",
    },
  ],
};

export default function DisputeDetailsPage({}: {
  params: Promise<{ disputeId: string }>;
}) {
  const [activeTab, setActiveTab] = useState("client");

  return (
    <div className="space-y-8 max-w-[1200px]">
      {/* Header & Breadcrumbs */}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Disputes</h1>
          <p className="text-gray-500 mt-1">
            Review and resolve conflicts between customers and freelancers.
          </p>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link
            href="/dashboard/disputes"
            className="hover:text-gray-900 transition-colors"
          >
            Disputes
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">
            {disputeDetail.id}
          </span>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Left Column: Main Content */}
        <div className="flex-1 space-y-8">
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              #{disputeDetail.id}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Change status
              </span>
              <Select defaultValue={disputeDetail.status}>
                <SelectTrigger className="w-[120px] bg-white border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Review">Review</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Order Info */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <span className="font-bold text-gray-900">
              Order ID: #{disputeDetail.orderId}
            </span>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-900 font-medium">
                {disputeDetail.orderCategory}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></span>
                {disputeDetail.orderStatus}
              </span>
            </div>
            <span className="ml-auto text-gray-500">
              {disputeDetail.dateSubmitted}
            </span>
          </div>

          {/* Parties Involved */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900">Parties Involved</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Client Card */}
              <div className="bg-white p-0 rounded-none border-0">
                <div className="flex items-start gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={disputeDetail.client.avatar}
                      alt={disputeDetail.client.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">
                        {disputeDetail.client.name}
                      </span>
                      <span className="bg-gray-100 text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded-full">
                        {disputeDetail.client.role}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Mail className="w-3 h-3" />
                        {disputeDetail.client.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Phone className="w-3 h-3" />
                        {disputeDetail.client.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Freelancer Card */}
              <div className="bg-white p-0 rounded-none border-0">
                <div className="flex items-start gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={disputeDetail.freelancer.avatar}
                      alt={disputeDetail.freelancer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">
                        {disputeDetail.freelancer.name}
                      </span>
                      <span className="bg-gray-100 text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded-full">
                        {disputeDetail.freelancer.role}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Mail className="w-3 h-3" />
                        {disputeDetail.freelancer.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Phone className="w-3 h-3" />
                        {disputeDetail.freelancer.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href={`/dashboard/orders/${disputeDetail.orderId}`}
              className="inline-flex items-center text-sm text-[#15803d] font-medium hover:underline mt-2"
            >
              View order summary <span className="ml-1">→</span>
            </Link>
          </div>

          {/* Issue Summary */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Issue summary</h3>
            <div className="space-y-4">
              <div>
                <span className="block text-sm text-gray-500 mb-1">
                  Issue Type
                </span>
                <span className="text-base text-gray-900 font-medium">
                  {disputeDetail.issueType}
                </span>
              </div>
              <div>
                <span className="block text-sm text-gray-500 mb-1">
                  Description
                </span>
                <p className="text-base text-gray-900 leading-relaxed">
                  {disputeDetail.description}
                </p>
              </div>
            </div>
          </div>

          {/* Evidence Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Evidence</h3>
            <Tabs
              defaultValue="client"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="bg-gray-100/50 p-1 h-auto rounded-lg inline-flex justify-start w-fit mb-4">
                <TabsTrigger
                  value="client"
                  className="rounded-md px-4 py-1.5 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-500 hover:text-gray-700"
                >
                  Client evidence
                </TabsTrigger>
                <TabsTrigger
                  value="freelancer"
                  className="rounded-md px-4 py-1.5 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-500 hover:text-gray-700"
                >
                  Freelancer evidence
                </TabsTrigger>
                <TabsTrigger
                  value="admin"
                  className="rounded-md px-4 py-1.5 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-500 hover:text-gray-700"
                >
                  Admin notes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="client" className="space-y-4 mt-0">
                {disputeDetail.evidence.client.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-xl p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                          <Paperclip className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">{item.date}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="w-4 h-4 text-gray-500" />
                      </Button>
                    </div>
                    {item.preview && (
                      <div className="relative aspect-[2/1] w-full rounded-lg overflow-hidden bg-gray-50">
                        <Image
                          src={item.preview}
                          alt="Evidence preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="freelancer" className="mt-0">
                <div className="text-sm text-gray-500 italic py-4">
                  No evidence submitted yet.
                </div>
              </TabsContent>
              <TabsContent value="admin" className="mt-0">
                <div className="text-sm text-gray-500 italic py-4">
                  No notes added yet.
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="w-full xl:w-[380px] space-y-8">
          {/* Admin Resolution Actions */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900">
              Admin Resolution Actions
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700">
                  Choose resolution
                </label>
                <Select>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="refund">Refund Client</SelectItem>
                    <SelectItem value="release">Release Payment</SelectItem>
                    <SelectItem value="split">Split Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700">
                  Message
                </label>
                <Textarea
                  placeholder="Add a message for the parties involved..."
                  className="min-h-[120px] bg-white resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button className="w-full bg-[#15803d] hover:bg-[#14532d] text-white">
                  Resolve Dispute
                </Button>
                <Button variant="outline" className="w-full border-gray-200">
                  Request more Info
                </Button>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="border border-gray-200 rounded-xl p-6 bg-white">
            <h3 className="text-sm font-bold text-gray-900 mb-6">
              Activity Timeline
            </h3>
            <div className="relative space-y-8 pl-2">
              {/* Vertical Line */}
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gray-200" />

              {disputeDetail.timeline.map((event, index) => (
                <div key={event.id} className="relative pl-6">
                  {/* Dot */}
                  <div className="absolute left-0 top-1.5 w-[22px] h-[22px] bg-white flex items-center justify-center">
                    <div
                      className={cn(
                        "w-2.5 h-2.5 rounded-full",
                        index === 0 ? "bg-[#15803d]" : "bg-[#15803d]" // All green dots in mockup
                      )}
                    />
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900 leading-none">
                      {event.title}
                    </p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                    {event.role && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-medium bg-gray-100 text-gray-600 mt-1">
                        {event.role}
                      </span>
                    )}
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

