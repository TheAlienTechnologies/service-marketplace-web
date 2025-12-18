"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Plus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Service = {
  id: string;
  image: string;
  name: string;
  category: string;
  price: number;
  status: "Active" | "Draft" | "Archived";
  orders: number;
};

const services: Service[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    name: "Architecture & Interior Designer",
    category: "Design",
    price: 250.0,
    status: "Active",
    orders: 45,
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    name: "Modern Home Decor Consultation",
    category: "Home Decor",
    price: 150.0,
    status: "Active",
    orders: 12,
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    name: "3D Rendering & Visualization",
    category: "Design",
    price: 500.0,
    status: "Draft",
    orders: 0,
  },
];

const columnHelper = createColumnHelper<Service>();

const columns = [
  columnHelper.accessor("name", {
    header: "Service Name",
    cell: (info) => (
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 relative shrink-0">
          <Image
            src={info.row.original.image}
            alt={info.getValue()}
            fill
            className="object-cover"
          />
        </div>
        <span className="font-medium text-gray-900">{info.getValue()}</span>
      </div>
    ),
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),
  columnHelper.accessor("price", {
    header: "Starting Price",
    cell: (info) => (
      <span className="text-gray-600">GHS {info.getValue().toFixed(2)}</span>
    ),
  }),
  columnHelper.accessor("orders", {
    header: "Total Orders",
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      const styles =
        status === "Active"
          ? "bg-green-50 text-green-700 border-green-200"
          : status === "Draft"
          ? "bg-gray-100 text-gray-700 border-gray-200"
          : "bg-red-50 text-red-700 border-red-200";
      return (
        <span
          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles}`}
        >
          {status}
        </span>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: () => (
      <div className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit Service</DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  }),
];

export default function MyServicesPage() {
  const table = useReactTable({
    data: services,
    columns: columns as ColumnDef<unknown, any>[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My services</h1>
          <p className="text-gray-500 mt-1">
            Manage your services, track performance, and update offerings.
          </p>
        </div>
        <Link href="/dashboard/services/new">
          <Button className="bg-[#15803d] hover:bg-[#14532d] text-white gap-2">
            <Plus className="w-4 h-4" />
            Add new service
          </Button>
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input placeholder="Search services..." className="pl-10 bg-white" />
        </div>
        <Button variant="outline" className="gap-2 text-gray-600">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase border-b border-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-6 py-4 font-medium">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <span className="text-sm text-gray-500">
            Showing 1 to 3 of 3 results
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
