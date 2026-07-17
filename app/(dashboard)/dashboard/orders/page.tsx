"use client";

import Link from "next/link";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Download,
  ArrowDown,
  Mail,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useAuthStore } from "@/store/auth-store";

// --- Admin Types ---

type Transaction = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  amount: number;
  type: "Payment" | "Payout" | "Refund" | "Commission";
  status: "Success" | "Failed" | "Pending";
  method: string;
  date: string;
};

type CashoutRequest = {
  id: string;
  provider: {
    name: string;
    avatar: string;
  };
  amount: number;
  method: string;
  status: "Completed" | "Pending" | "Failed";
  date: string;
};

type Order = {
  id: string;
  client: string;
  provider: {
    name: string;
    avatar: string;
  };
  service: string;
  amount: number;
  paymentStatus: "Paid" | "Unpaid" | "Refunded" | "Failed";
  orderStatus: "Completed" | "In progress" | "Awaiting" | "Declined";
};

// --- Admin Mock Data ---

const transactions: Transaction[] = [
  {
    id: "ADM-00456",
    user: {
      name: "Olivia Rhye",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    amount: 1000.0,
    type: "Payment",
    status: "Success",
    method: "Paystack",
    date: "15 Mar, 2025",
  },
  {
    id: "CLI-00789",
    user: {
      name: "Olivia Rhye",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    amount: 1500.0,
    type: "Payout",
    status: "Success",
    method: "Paystack",
    date: "10 Aug, 2025",
  },
  {
    id: "FRL-01011",
    user: {
      name: "Olivia Rhye",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    amount: 200.0,
    type: "Refund",
    status: "Success",
    method: "Paystack",
    date: "25 Oct, 2025",
  },
  {
    id: "FRL-01234",
    user: {
      name: "Olivia Rhye",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    amount: 2500.0,
    type: "Commission",
    status: "Failed",
    method: "Paystack",
    date: "30 Nov, 2025",
  },
  {
    id: "FRL-01567",
    user: {
      name: "Olivia Rhye",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    amount: 3000.0,
    type: "Commission",
    status: "Pending",
    method: "Paystack",
    date: "5 Apr, 2025",
  },
  {
    id: "CLI-01890",
    user: {
      name: "Olivia Rhye",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    amount: 350.0,
    type: "Payout",
    status: "Success",
    method: "Paystack",
    date: "12 Feb, 2025",
  },
  {
    id: "ADM-02123",
    user: {
      name: "Olivia Rhye",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    amount: 400.0,
    type: "Payout",
    status: "Success",
    method: "Paystack",
    date: "22 Jun, 2025",
  },
];

const cashoutRequests: CashoutRequest[] = [
  {
    id: "CSH-001",
    provider: {
      name: "Olivia Rhye",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    amount: 1000.0,
    method: "Paystack",
    status: "Completed",
    date: "15 Mar, 2025",
  },
  {
    id: "CSH-002",
    provider: {
      name: "Olivia Rhye",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    amount: 1500.0,
    method: "Paystack",
    status: "Completed",
    date: "10 Aug, 2025",
  },
  {
    id: "CSH-003",
    provider: {
      name: "Olivia Rhye",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    amount: 200.0,
    method: "Paystack",
    status: "Completed",
    date: "25 Oct, 2025",
  },
  {
    id: "CSH-004",
    provider: {
      name: "Olivia Rhye",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    amount: 2500.0,
    method: "Paystack",
    status: "Completed",
    date: "30 Nov, 2025",
  },
  {
    id: "CSH-005",
    provider: {
      name: "Olivia Rhye",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    amount: 3000.0,
    method: "Paystack",
    status: "Pending",
    date: "5 Apr, 2025",
  },
  {
    id: "CSH-006",
    provider: {
      name: "Olivia Rhye",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    amount: 350.0,
    method: "Paystack",
    status: "Completed",
    date: "12 Feb, 2025",
  },
  {
    id: "CSH-007",
    provider: {
      name: "Olivia Rhye",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    amount: 400.0,
    method: "Paystack",
    status: "Failed",
    date: "22 Jun, 2025",
  },
];

const orders: Order[] = [
  {
    id: "ADM-00456",
    client: "Olivia Rhye",
    provider: {
      name: "Olivia Rhye",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    service: "Legal Consulting",
    amount: 1000.0,
    paymentStatus: "Paid",
    orderStatus: "Completed",
  },
  {
    id: "CLI-00789",
    client: "Phoenix Baker",
    provider: {
      name: "Olivia Rhye",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    service: "Plumbing Services",
    amount: 1500.0,
    paymentStatus: "Unpaid",
    orderStatus: "In progress",
  },
  {
    id: "FRL-01011",
    client: "Lana Steiner",
    provider: {
      name: "Olivia Rhye",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    service: "Graphic Design",
    amount: 200.0,
    paymentStatus: "Unpaid",
    orderStatus: "Awaiting",
  },
  {
    id: "FRL-01234",
    client: "Demi Wilkinson",
    provider: {
      name: "Olivia Rhye",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    service: "Home Renovation",
    amount: 2500.0,
    paymentStatus: "Paid",
    orderStatus: "Completed",
  },
  {
    id: "FRL-01567",
    client: "Candice Wu",
    provider: {
      name: "Olivia Rhye",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    service: "Writing Services",
    amount: 3000.0,
    paymentStatus: "Refunded",
    orderStatus: "Declined",
  },
  {
    id: "CLI-01890",
    client: "Natali Craig",
    provider: {
      name: "Olivia Rhye",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    service: "Digital Marketing",
    amount: 350.0,
    paymentStatus: "Paid",
    orderStatus: "Completed",
  },
  {
    id: "ADM-02123",
    client: "Drew Cano",
    provider: {
      name: "Olivia Rhye",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    service: "Tutoring Services",
    amount: 400.0,
    paymentStatus: "Failed",
    orderStatus: "Declined",
  },
];

// --- Admin Column Helpers & Defs ---

const transactionColumnHelper = createColumnHelper<Transaction>();
const cashoutRequestColumnHelper = createColumnHelper<CashoutRequest>();
const orderColumnHelper = createColumnHelper<Order>();

const transactionColumns = [
  transactionColumnHelper.accessor("id", {
    header: "Transaction ID",
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),
  transactionColumnHelper.accessor("user", {
    header: "User",
    cell: (info) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 relative">
          <Image
            src={info.row.original.user.avatar}
            alt={info.row.original.user.name}
            fill
            className="object-cover"
          />
        </div>
        <span className="font-medium text-gray-900">
          {info.row.original.user.name}
        </span>
      </div>
    ),
  }),
  transactionColumnHelper.accessor("amount", {
    header: "Amount(GHS)",
    cell: (info) => (
      <span className="text-gray-600">{info.getValue().toFixed(2)}</span>
    ),
  }),
  transactionColumnHelper.accessor("type", {
    header: "Payment Type",
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),
  transactionColumnHelper.accessor("status", {
    header: "Payment Status",
    cell: (info) => {
      const status = info.getValue();
      let badgeStyles = "bg-gray-50 text-gray-700 border-gray-200";
      let dotStyles = "bg-gray-500";

      if (status === "Success") {
        badgeStyles = "bg-green-50 text-green-700 border-green-200";
        dotStyles = "bg-green-500";
      } else if (status === "Pending") {
        badgeStyles = "bg-orange-50 text-orange-700 border-orange-200";
        dotStyles = "bg-orange-500";
      } else if (status === "Failed") {
        badgeStyles = "bg-red-50 text-red-700 border-red-200";
        dotStyles = "bg-red-500";
      }

      return (
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeStyles}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotStyles}`}
          ></span>
          {status}
        </div>
      );
    },
  }),
  transactionColumnHelper.accessor("method", {
    header: "Payment Method",
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),
  transactionColumnHelper.accessor("date", {
    header: "Date",
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),
  transactionColumnHelper.display({
    id: "actions",
    header: "Action",
    cell: () => (
      <div className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Download Receipt</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    meta: { align: "right" },
  }),
];

const cashoutRequestColumns = [
  cashoutRequestColumnHelper.accessor("provider", {
    header: "Provider",
    cell: (info) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 relative">
          <Image
            src={info.row.original.provider.avatar}
            alt={info.row.original.provider.name}
            fill
            className="object-cover"
          />
        </div>
        <span className="font-medium text-gray-900">
          {info.row.original.provider.name}
        </span>
      </div>
    ),
  }),
  cashoutRequestColumnHelper.accessor("amount", {
    header: "Requested Amount(GHS)",
    cell: (info) => (
      <span className="text-gray-600">{info.getValue().toFixed(2)}</span>
    ),
  }),
  cashoutRequestColumnHelper.accessor("method", {
    header: "Payment Method",
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),
  cashoutRequestColumnHelper.accessor("status", {
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting()}
        >
          Payment Status
          <ArrowDown className="w-4 h-4 text-gray-500" />
        </div>
      );
    },
    cell: (info) => {
      const status = info.getValue();
      let badgeStyles = "bg-gray-50 text-gray-700 border-gray-200";
      let dotStyles = "bg-gray-500";

      if (status === "Completed") {
        badgeStyles = "bg-green-50 text-green-700 border-green-200";
        dotStyles = "bg-green-500";
      } else if (status === "Pending") {
        badgeStyles = "bg-orange-50 text-orange-700 border-orange-200";
        dotStyles = "bg-orange-500";
      } else if (status === "Failed") {
        badgeStyles = "bg-red-50 text-red-700 border-red-200";
        dotStyles = "bg-red-500";
      }

      return (
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeStyles}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotStyles}`}
          ></span>
          {status}
        </div>
      );
    },
  }),
  cashoutRequestColumnHelper.accessor("date", {
    header: "Date Requested",
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),
  cashoutRequestColumnHelper.display({
    id: "actions",
    header: "Action",
    cell: () => (
      <div className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Approve Request</DropdownMenuItem>
            <DropdownMenuItem>Reject Request</DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    meta: { align: "right" },
  }),
];

const orderColumns = [
  orderColumnHelper.accessor("id", {
    header: "Order ID",
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),
  orderColumnHelper.accessor("client", {
    header: "Client",
    cell: (info) => (
      <span className="font-medium text-gray-900">{info.getValue()}</span>
    ),
  }),
  orderColumnHelper.accessor("provider", {
    header: "Provider",
    cell: (info) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 relative">
          <Image
            src={info.row.original.provider.avatar}
            alt={info.row.original.provider.name}
            fill
            className="object-cover"
          />
        </div>
        <span className="font-medium text-gray-900">
          {info.row.original.provider.name}
        </span>
      </div>
    ),
  }),
  orderColumnHelper.accessor("service", {
    header: "Service",
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),
  orderColumnHelper.accessor("amount", {
    header: "Amount(GHS)",
    cell: (info) => (
      <span className="text-gray-600">{info.getValue().toFixed(2)}</span>
    ),
  }),
  orderColumnHelper.accessor("paymentStatus", {
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting()}
        >
          Payment Status
          <ArrowDown className="w-4 h-4 text-gray-500" />
        </div>
      );
    },
    cell: (info) => {
      const status = info.getValue();
      let badgeStyles = "bg-gray-50 text-gray-700 border-gray-200";
      let dotStyles = "bg-gray-500";

      if (status === "Paid") {
        badgeStyles = "bg-green-50 text-green-700 border-green-200";
        dotStyles = "bg-green-500";
      } else if (status === "Unpaid") {
        badgeStyles = "bg-orange-50 text-orange-700 border-orange-200";
        dotStyles = "bg-orange-500";
      } else if (status === "Refunded") {
        badgeStyles = "bg-blue-50 text-blue-700 border-blue-200";
        dotStyles = "bg-blue-500";
      } else if (status === "Failed") {
        badgeStyles = "bg-red-50 text-red-700 border-red-200";
        dotStyles = "bg-red-500";
      }

      return (
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeStyles}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotStyles}`}
          ></span>
          {status}
        </div>
      );
    },
  }),
  orderColumnHelper.accessor("orderStatus", {
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting()}
        >
          Order Status
          <ArrowDown className="w-4 h-4 text-gray-500" />
        </div>
      );
    },
    cell: (info) => {
      const status = info.getValue();
      let badgeStyles = "bg-gray-50 text-gray-700 border-gray-200";
      let dotStyles = "bg-gray-500";

      if (status === "Completed") {
        badgeStyles = "bg-green-50 text-green-700 border-green-200";
        dotStyles = "bg-green-500";
      } else if (status === "In progress") {
        badgeStyles = "bg-blue-50 text-blue-700 border-blue-200";
        dotStyles = "bg-blue-500";
      } else if (status === "Awaiting") {
        badgeStyles = "bg-orange-50 text-orange-700 border-orange-200";
        dotStyles = "bg-orange-500";
      } else if (status === "Declined") {
        badgeStyles = "bg-red-50 text-red-700 border-red-200";
        dotStyles = "bg-red-500";
      }

      return (
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeStyles}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotStyles}`}
          ></span>
          {status}
        </div>
      );
    },
  }),
  orderColumnHelper.display({
    id: "actions",
    header: "Action",
    cell: () => (
      <div className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Track Order</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    meta: { align: "right" },
  }),
];

// --- Provider Types & Mock Data ---

type ProviderOrder = {
  id: string;
  client: {
    name: string;
    avatar: string;
  };
  date: string;
  category: string;
  status: "Awaiting" | "In-progress" | "Completed" | "Declined";
  progress: number; // 1 to 4
};

const providerOrders: ProviderOrder[] = [
  {
    id: "5764892",
    client: {
      name: "Joel Smith",
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "August 29, 2025",
    category: "Architecture & Interior Design",
    status: "Awaiting",
    progress: 1, // 1=Awaiting
  },
  {
    id: "5764893",
    client: {
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "August 29, 2025",
    category: "Architecture & Interior Design",
    status: "In-progress",
    progress: 2,
  },
  {
    id: "5764894",
    client: {
      name: "Michael Brown",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "August 29, 2025",
    category: "Architecture & Interior Design",
    status: "In-progress",
    progress: 2,
  },
  {
    id: "5764895",
    client: {
      name: "Emily Davis",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "August 29, 2025",
    category: "Architecture & Interior Design",
    status: "In-progress",
    progress: 2,
  },
  {
    id: "5764896",
    client: {
      name: "Robert Sam",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "August 29, 2025",
    category: "Architecture & Interior Design",
    status: "Completed",
    progress: 3,
  },
  {
    id: "5764899",
    client: {
      name: "David Wilson",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "August 28, 2025",
    category: "Architecture & Interior Design",
    status: "Declined",
    progress: 0,
  },
];

const progressSteps = ["Order placed", "Awaiting", "In-progress", "Completed"];

// --- Admin Orders Component ---

function AdminOrders() {
  const tabs = ["Orders", "Transactions", "Cashout Request"];
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [activeTab, setActiveTab] = useState("Orders");

  const currentData = useMemo(() => {
    if (activeTab === "Cashout Request") {
      return cashoutRequests;
    }
    if (activeTab === "Transactions") {
      return transactions;
    }
    if (activeTab === "Orders") {
      return orders;
    }
    return orders;
  }, [activeTab]);

  const currentColumns = useMemo(() => {
    if (activeTab === "Cashout Request") {
      return cashoutRequestColumns;
    }
    if (activeTab === "Transactions") {
      return transactionColumns;
    }
    if (activeTab === "Orders") {
      return orderColumns;
    }
    return orderColumns;
  }, [activeTab]);

  const getSearchPlaceholder = () => {
    if (activeTab === "Cashout Request") return "search by provider...";
    if (activeTab === "Orders")
      return "search by order ID, customer or provider...";
    return "search by transaction ID, user...";
  };

  const table = useReactTable({
    data: currentData,
    columns: currentColumns as ColumnDef<unknown, any>[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Orders & Transactions
          </h1>
          <p className="text-gray-500 mt-1">
            Monitor orders, track payments, and manage service transactions.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-2 bg-gray-100/50 w-fit p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setGlobalFilter("");
              }}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                activeTab === tab
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder={getSearchPlaceholder()}
            className="pl-10 bg-white"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="text-gray-700 border-gray-200 bg-white hover:bg-gray-50 gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button
            variant="outline"
            className="text-green-700 border-green-100 bg-green-50 hover:bg-green-100 gap-2"
          >
            <Download className="w-4 h-4" />
            Export data
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase border-b border-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={cn(
                      "px-6 py-4 font-medium",
                      (header.column.columnDef.meta as any)?.align === "right"
                        ? "text-right"
                        : ""
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{
                      cursor: header.column.getCanSort()
                        ? "pointer"
                        : "default",
                    }}
                  >
                    <div
                      className={cn(
                        "flex items-center gap-1",
                        (header.column.columnDef.meta as any)?.align === "right"
                          ? "justify-end"
                          : ""
                      )}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={currentColumns.length}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 text-gray-600"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <div className="flex items-center gap-1">
            <Button
              variant="secondary"
              size="sm"
              className="h-8 w-8 p-0 bg-green-50 text-green-700 border-0 font-medium"
            >
              1
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-gray-600"
            >
              2
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-gray-600"
            >
              3
            </Button>
            <span className="text-gray-400 px-2">...</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-gray-600"
            >
              8
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-gray-600"
            >
              9
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-gray-600"
            >
              10
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 text-gray-600"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// --- Provider Orders Component ---

function ProviderOrders() {
  const searchParams = useSearchParams();
  const tabs = ["Awaiting", "In-progress", "Completed", "Declined"];
  
  const initialTab = searchParams.get("tab");
  const defaultTab = tabs.includes(initialTab || "") ? initialTab! : "Awaiting";

  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && tabs.includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const filteredOrders = providerOrders.filter(
    (order) => order.status === activeTab
  );

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Awaiting":
        return { dot: "bg-amber-500", badge: "bg-amber-50 text-amber-700" };
      case "In-progress":
        return { dot: "bg-blue-500", badge: "bg-blue-50 text-blue-700" };
      case "Completed":
        return { dot: "bg-green-500", badge: "bg-green-50 text-green-700" };
      case "Declined":
        return { dot: "bg-red-500", badge: "bg-red-50 text-red-700" };
      default:
        return { dot: "bg-gray-500", badge: "bg-gray-50 text-gray-700" };
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-500 mt-1">
          Stay on top of your orders to deliver great results.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-1.5 text-sm font-bold rounded-full transition-all",
              activeTab === tab
                ? "bg-green-50 text-green-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-100">
        {filteredOrders.map((order) => {
          const statusStyles = getStatusStyles(order.status);
          return (
            <div key={order.id} className="p-6 space-y-6">
              {/* Row 1: User Info & Date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 relative">
                    <Image
                      src={order.client.avatar}
                      alt={order.client.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-bold text-gray-900">
                    {order.client.name}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{order.date}</span>
              </div>

              {/* Row 2: Details & Actions */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left: Details */}
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="font-bold text-gray-900">
                    Order ID: #{order.id}
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500">{order.category}</span>
                  <div className="flex items-center gap-1.5 ml-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${statusStyles.dot}`}
                    ></span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded-full text-xs ${statusStyles.badge}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                  {order.status === "Awaiting" && (
                    <Button className="bg-[#15803d] hover:bg-[#14532d] text-white font-medium min-w-[120px] rounded-lg">
                      Accept Order
                    </Button>
                  )}
                  {order.status === "In-progress" && (
                    <Button className="bg-[#15803d] hover:bg-[#14532d] text-white font-medium min-w-[150px] rounded-lg">
                      Mark as completed
                    </Button>
                  )}
                  {order.status === "Completed" && (
                    <Link href={`/orders/${order.id}/review`}>
                      <Button className="bg-[#15803d] hover:bg-[#14532d] text-white font-medium min-w-[150px] rounded-lg">
                        Leave a review
                      </Button>
                    </Link>
                  )}

                  {(order.status === "Awaiting" ||
                    order.status === "In-progress") && (
                    <Button
                      variant="ghost"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 font-medium"
                    >
                      Decline Order
                    </Button>
                  )}

                  {order.status === "Completed" && (
                    <Button
                      variant="ghost"
                      className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 font-medium"
                    >
                      Raise dispute
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    className="text-gray-700 border-gray-200 hover:bg-gray-50 gap-2 font-medium rounded-lg"
                  >
                    <Mail className="w-4 h-4" />
                    Message Client
                  </Button>
                </div>
              </div>

              {/* Row 3: Order Details Link */}
              <div>
                <Link
                  href={`/dashboard/orders/${order.id}`}
                  className="flex items-center text-green-600 text-sm font-medium hover:underline gap-1"
                >
                  Order details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Row 4: Progress Bar */}
              {order.status === "Declined" ? (
                <div className="max-w-md pt-2">
                  <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 px-3 py-2 rounded-lg w-fit border border-red-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    This order was declined
                  </div>
                </div>
              ) : (
                <div className="max-w-md pt-2">
                  <div className="relative h-1.5 bg-gray-100 rounded-full mb-2">
                    <div
                      className="absolute h-full bg-green-500 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          (order.progress / (progressSteps.length - 1)) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    {progressSteps.map((step, index) => (
                      <span
                        key={step}
                        className={cn(
                          index <= order.progress ? "text-green-600" : ""
                        )}
                      >
                        {step}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {filteredOrders.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            No orders found in this category.
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const { user } = useAuthStore();

  if (user?.role === "ADMIN") {
    return <AdminOrders />;
  }

  return (
    <Suspense fallback={null}>
      <ProviderOrders />
    </Suspense>
  );
}
