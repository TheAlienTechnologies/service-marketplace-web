"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
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
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// --- Types ---

type QuoteRequest = {
  id: string;
  client: {
    name: string;
    avatar: string;
  };
  projectTitle: string;
  status: "New Request" | "Pending" | "Accepted" | "Declined" | "Expired";
  budget: number;
};

// --- Mock Data ---

const quoteRequests: QuoteRequest[] = [
  {
    id: "1",
    client: {
      name: "Olivia Rhye",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    projectTitle: "Interior Design",
    status: "New Request",
    budget: 2500,
  },
  {
    id: "2",
    client: {
      name: "Phoenix Baker",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    projectTitle: "Logo Design",
    status: "New Request",
    budget: 1000,
  },
  {
    id: "3",
    client: {
      name: "Lana Steiner",
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    projectTitle: "Web App UI",
    status: "Declined",
    budget: 1500,
  },
  {
    id: "4",
    client: {
      name: "Demi Wilkinson",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    projectTitle: "Backend Developer",
    status: "Accepted",
    budget: 2000,
  },
  {
    id: "5",
    client: {
      name: "Candice Wu",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    projectTitle: "Fullstack Developer",
    status: "Pending",
    budget: 25000,
  },
  {
    id: "6",
    client: {
      name: "Natali Craig",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    projectTitle: "UX Design",
    status: "Expired",
    budget: 8000,
  },
  {
    id: "7",
    client: {
      name: "Drew Cano",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    projectTitle: "UX Copywrite",
    status: "Accepted",
    budget: 5000,
  },
];

// --- Column Definitions ---

const columnHelper = createColumnHelper<QuoteRequest>();

const columns = [
  columnHelper.accessor("client", {
    header: "Name",
    cell: (info) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 relative">
          <Image
            src={info.getValue().avatar}
            alt={info.getValue().name}
            fill
            className="object-cover"
          />
        </div>
        <span className="font-medium text-gray-900">
          {info.getValue().name}
        </span>
      </div>
    ),
  }),
  columnHelper.accessor("projectTitle", {
    header: "Project title",
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting()}
        >
          Status
          <ArrowDown className="w-4 h-4 text-gray-500" />
        </div>
      );
    },
    cell: (info) => {
      const status = info.getValue();
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
          <span
            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotStyles}`}
          ></span>
          {status}
        </div>
      );
    },
  }),
  columnHelper.accessor("budget", {
    header: "Budget(GHS)",
    cell: (info) => (
      <span className="text-gray-600">
        {info.getValue().toLocaleString()}
      </span>
    ),
  }),
  columnHelper.display({
    id: "action",
    header: "Action",
    cell: (info) => (
      <Link
        href={`/dashboard/quotes/${info.row.original.id}`}
        className="flex items-center gap-1 text-sm font-medium text-green-700 hover:text-green-800 transition-colors justify-end"
      >
        View details
        <ArrowRight className="w-4 h-4" />
      </Link>
    ),
    meta: { align: "right" },
  }),
];

export default function QuoteRequestsPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [activeTab, setActiveTab] = useState("All request");

  const tabs = [
    "All request",
    "New Request",
    "Pending",
    "Accepted",
    "Declined",
    "Expired",
  ];

  const filteredData = useMemo(() => {
    if (activeTab === "All request") return quoteRequests;
    return quoteRequests.filter((req) => req.status === activeTab);
  }, [activeTab]);

  const table = useReactTable({
    data: filteredData,
    columns: columns as ColumnDef<unknown, any>[],
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
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quote Request</h1>
          <p className="text-gray-500 mt-1">
            View, manage, and respond to client quote requests.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-full transition-all",
                activeTab === tab
                  ? "bg-green-50 text-green-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search by client or service..."
          className="pl-10 bg-white"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
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
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No requests found.
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

