"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
} from "@tanstack/react-table";
import Link from "next/link";
import {
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Download,
  ArrowDown,
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

// --- Types ---

type Dispute = {
  id: string;
  orderId: string;
  client: {
    name: string;
    avatar: string;
  };
  freelancer: {
    name: string;
    avatar: string;
  };
  priority: "Low" | "Medium" | "High";
  issueType: string;
  status: "Open" | "Awaiting" | "Review" | "Resolved" | "Closed";
  dateSubmitted: string;
};

// --- Mock Data ---

const disputes: Dispute[] = [
  {
    id: "ADM-00456",
    orderId: "ADM-00456",
    client: {
      name: "Olivia Rhye",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    freelancer: {
      name: "Phoenix Baker",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    priority: "Low",
    issueType: "Late Delivery",
    status: "Open",
    dateSubmitted: "15 Mar, 2025",
  },
  {
    id: "CLI-00789",
    orderId: "CLI-00789",
    client: {
      name: "Lana Steiner",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    freelancer: {
      name: "Demi Wilkinson",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    priority: "Medium",
    issueType: "Non-delivery",
    status: "Awaiting",
    dateSubmitted: "10 Aug, 2025",
  },
  {
    id: "FRL-01011",
    orderId: "FRL-01011",
    client: {
      name: "Candice Wu",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    freelancer: {
      name: "Natali Craig",
      avatar:
        "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    priority: "High",
    issueType: "Payment dispute",
    status: "Review",
    dateSubmitted: "25 Oct, 2025",
  },
  {
    id: "FRL-01234",
    orderId: "FRL-01234",
    client: {
      name: "Drew Cano",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    freelancer: {
      name: "Orlando Diggs",
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    priority: "Medium",
    issueType: "Miscommunication",
    status: "Open",
    dateSubmitted: "30 Nov, 2025",
  },
  {
    id: "FRL-01567",
    orderId: "FRL-01567",
    client: {
      name: "Andi Lane",
      avatar:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    freelancer: {
      name: "Kate Morrison",
      avatar:
        "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    priority: "Medium",
    issueType: "Late Delivery",
    status: "Resolved",
    dateSubmitted: "5 Apr, 2025",
  },
  {
    id: "CLI-01890",
    orderId: "CLI-01890",
    client: {
      name: "Koray Okumus",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    freelancer: {
      name: "Lana Steiner",
      avatar:
        "https://images.unsplash.com/photo-1554151228-14d9def656ec?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    priority: "Low",
    issueType: "Late Delivery",
    status: "Closed",
    dateSubmitted: "12 Feb, 2025",
  },
  {
    id: "ADM-02123",
    orderId: "ADM-02123",
    client: {
      name: "Mia Brown",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    freelancer: {
      name: "Olivia Rhye",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    priority: "Low",
    issueType: "Late Delivery",
    status: "Resolved",
    dateSubmitted: "22 Jun, 2025",
  },
];

// --- Column Helpers ---

const columnHelper = createColumnHelper<Dispute>();

// --- Column Definitions ---

const columns = [
  columnHelper.accessor("id", {
    header: "Dispute ID",
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),
  columnHelper.accessor("orderId", {
    header: "Order ID",
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),
  columnHelper.display({
    id: "parties",
    header: "Parties Involved",
    cell: (info) => (
      <div className="flex items-center gap-[-8px]">
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white relative z-20">
            <Image
              src={info.row.original.client.avatar}
              alt={info.row.original.client.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white relative z-10">
            <Image
              src={info.row.original.freelancer.avatar}
              alt={info.row.original.freelancer.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("priority", {
    header: "Priority Level",
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),
  columnHelper.accessor("issueType", {
    header: "Issue Type",
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

      if (status === "Open") {
        badgeStyles = "bg-red-50 text-red-700 border-red-200";
        dotStyles = "bg-red-500";
      } else if (status === "Awaiting") {
        badgeStyles = "bg-orange-50 text-orange-700 border-orange-200";
        dotStyles = "bg-orange-500";
      } else if (status === "Review") {
        badgeStyles = "bg-amber-50 text-amber-700 border-amber-200";
        dotStyles = "bg-amber-500";
      } else if (status === "Resolved") {
        badgeStyles = "bg-green-50 text-green-700 border-green-200";
        dotStyles = "bg-green-500";
      } else if (status === "Closed") {
        badgeStyles = "bg-gray-50 text-gray-700 border-gray-200";
        dotStyles = "bg-gray-500";
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
  columnHelper.accessor("dateSubmitted", {
    header: "Date Submitted",
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),
  columnHelper.display({
    id: "actions",
    header: "Action",
    cell: (info) => (
      <div className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/disputes/${info.row.original.id}`}>
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Resolve Dispute</DropdownMenuItem>
            <DropdownMenuItem>Contact Parties</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    meta: { align: "right" },
  }),
];

// --- Main Component ---

export default function DisputesPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: disputes,
    columns: columns,
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
          <h1 className="text-2xl font-bold text-gray-900">Disputes</h1>
          <p className="text-gray-500 mt-1">
            Review and resolve conflicts between customers and freelancers.
          </p>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="search by order ID, freelancer, client, dispute ID..."
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
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No disputes found.
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
