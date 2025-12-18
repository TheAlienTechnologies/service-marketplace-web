"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
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
  Plus,
  MoreVertical,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Star,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";

// --- Types ---

type Category = {
  id: number;
  name: string;
  subCategories: number;
  activeListings: number;
  isFeatured: boolean;
  displayOrder?: string;
  createdAt: string;
};

type Service = {
  id: number;
  title: string;
  category: string;
  provider: {
    name: string;
    avatar: string;
  };
  orders: number;
  status: "Active" | "Suspended" | "Pending";
  rating: number;
  joinedAt: string;
};

// --- Mock Data ---

const categories: Category[] = [
  {
    id: 1,
    name: "Architecture",
    subCategories: 5,
    activeListings: 125,
    isFeatured: true,
    createdAt: "15 Mar, 2025",
  },
  {
    id: 2,
    name: "Beauty & Grooming",
    subCategories: 10,
    activeListings: 45,
    isFeatured: false,
    createdAt: "10 Aug, 2025",
  },
  {
    id: 3,
    name: "IT & Tech",
    subCategories: 9,
    activeListings: 23,
    isFeatured: true,
    createdAt: "25 Oct, 2025",
  },
  {
    id: 4,
    name: "Finance & Accounting",
    subCategories: 3,
    activeListings: 206,
    isFeatured: true,
    createdAt: "30 Nov, 2025",
  },
  {
    id: 5,
    name: "Marketing & Advertising",
    subCategories: 4,
    activeListings: 190,
    isFeatured: true,
    createdAt: "5 Apr, 2025",
  },
  {
    id: 6,
    name: "Travel & Leisure",
    subCategories: 2,
    activeListings: 25,
    isFeatured: false,
    createdAt: "12 Feb, 2025",
  },
];

const featuredItems: Category[] = [
  {
    id: 1,
    name: "Architecture",
    subCategories: 5,
    activeListings: 125,
    displayOrder: "#1",
    isFeatured: true,
    createdAt: "15 Mar, 2025",
  },
  {
    id: 2,
    name: "Beauty & Grooming",
    subCategories: 10,
    activeListings: 45,
    displayOrder: "#2",
    isFeatured: true,
    createdAt: "10 Aug, 2025",
  },
  {
    id: 3,
    name: "IT & Tech",
    subCategories: 9,
    activeListings: 23,
    displayOrder: "#3",
    isFeatured: true,
    createdAt: "25 Oct, 2025",
  },
  {
    id: 4,
    name: "Finance & Accounting",
    subCategories: 3,
    activeListings: 206,
    displayOrder: "#4",
    isFeatured: true,
    createdAt: "30 Nov, 2025",
  },
  {
    id: 5,
    name: "Marketing & Advertising",
    subCategories: 4,
    activeListings: 190,
    displayOrder: "#5",
    isFeatured: true,
    createdAt: "5 Apr, 2025",
  },
];

const services: Service[] = [
  {
    id: 1,
    title: "Plumbing Installation & Repai...",
    category: "Plumbing",
    provider: {
      name: "Olivia Rhye",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    orders: 7,
    status: "Active",
    rating: 4.8,
    joinedAt: "15 Mar, 2025",
  },
  {
    id: 2,
    title: "Electrical Wiring & Home Safe...",
    category: "Electrical Services",
    provider: {
      name: "Phoenix Baker",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    orders: 1,
    status: "Active",
    rating: 4.8,
    joinedAt: "10 Aug, 2025",
  },
  {
    id: 3,
    title: "Professional Logo Design & Brand...",
    category: "Graphic Design",
    provider: {
      name: "Lana Steiner",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    orders: 5,
    status: "Suspended",
    rating: 4.8,
    joinedAt: "25 Oct, 2025",
  },
  {
    id: 4,
    title: "Website Design & Landing Page D...",
    category: "Web Development",
    provider: {
      name: "Demi Wilkinson",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    orders: 2,
    status: "Active",
    rating: 4.8,
    joinedAt: "30 Nov, 2025",
  },
  {
    id: 5,
    title: "Home Cleaning & Deep Sanitizati...",
    category: "Cleaning Services",
    provider: {
      name: "Candice Wu",
      avatar:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    orders: 6,
    status: "Pending",
    rating: 4.8,
    joinedAt: "5 Apr, 2025",
  },
  {
    id: 6,
    title: "Furniture Assembly & Carpentry...",
    category: "Carpentry",
    provider: {
      name: "Natali Craig",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    orders: 4,
    status: "Suspended",
    rating: 4.8,
    joinedAt: "12 Feb, 2025",
  },
  {
    id: 7,
    title: "Landscape Design & Garden Layo...",
    category: "Landscaping",
    provider: {
      name: "Drew Cano",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    orders: 8,
    status: "Suspended",
    rating: 4.8,
    joinedAt: "22 Jun, 2025",
  },
];

// --- Column Helpers ---

const categoryColumnHelper = createColumnHelper<Category>();
const serviceColumnHelper = createColumnHelper<Service>();

// --- Column Definitions ---

const categoryColumns = [
  categoryColumnHelper.accessor("name", {
    header: "Category",
    cell: (info) => (
      <span className="font-medium text-gray-900">{info.getValue()}</span>
    ),
  }),
  categoryColumnHelper.accessor("subCategories", {
    header: "Sub-categories",
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),
  categoryColumnHelper.accessor("activeListings", {
    header: "Active listings",
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),
  categoryColumnHelper.accessor("isFeatured", {
    header: "Featured",
    cell: (info) => {
      const isFeatured = info.getValue();
      return (
        <div className="flex items-center">
          {isFeatured ? (
            <div className="flex items-center justify-center w-5 h-5 bg-green-700 rounded text-white">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          ) : (
            <span className="text-gray-400 font-medium text-lg ml-1">—</span>
          )}
        </div>
      );
    },
  }),
  categoryColumnHelper.accessor("createdAt", {
    header: "Date of created",
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),
  categoryColumnHelper.display({
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
            <DropdownMenuItem>Edit Category</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              Delete Category
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    meta: { align: "right" },
  }),
];

const featuredColumns = [
  categoryColumnHelper.accessor("name", {
    header: "Category",
    cell: (info) => (
      <span className="font-medium text-gray-900">{info.getValue()}</span>
    ),
  }),
  categoryColumnHelper.accessor("subCategories", {
    header: "Sub-categories",
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),
  categoryColumnHelper.accessor("activeListings", {
    header: "Active listings",
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),
  categoryColumnHelper.accessor("displayOrder", {
    header: "Display",
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),
  categoryColumnHelper.accessor("createdAt", {
    header: "Date of created",
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),
  categoryColumnHelper.display({
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
            <DropdownMenuItem>Remove from Featured</DropdownMenuItem>
            <DropdownMenuItem>Edit Order</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    meta: { align: "right" },
  }),
];

const serviceColumns = [
  serviceColumnHelper.accessor("title", {
    header: "Service Title",
    cell: (info) => (
      <span className="font-medium text-gray-900">{info.getValue()}</span>
    ),
    size: 250,
  }),
  serviceColumnHelper.accessor("category", {
    header: "Category",
    cell: (info) => (
      <span className="font-medium text-gray-900">{info.getValue()}</span>
    ),
  }),
  serviceColumnHelper.accessor("provider", {
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
  serviceColumnHelper.accessor("orders", {
    header: "Orders",
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),
  serviceColumnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      let badgeStyles = "bg-gray-50 text-gray-700";
      let dotStyles = "bg-gray-500";

      if (status === "Active") {
        badgeStyles = "bg-green-50 text-green-700";
        dotStyles = "bg-green-500";
      } else if (status === "Pending") {
        badgeStyles = "bg-orange-50 text-orange-700";
        dotStyles = "bg-orange-500";
      }

      return (
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeStyles}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotStyles}`}
          ></span>
          {status}
        </div>
      );
    },
  }),
  serviceColumnHelper.accessor("rating", {
    header: "Rating",
    cell: (info) => (
      <div className="flex items-center gap-1 text-gray-600">
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        <span>{info.getValue()}</span>
      </div>
    ),
  }),
  serviceColumnHelper.accessor("joinedAt", {
    header: "Date of Joining",
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),
];

// --- Main Component ---

const tabs = ["All Services", "Categories", "Featured"];

export default function CategoriesPage() {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [activeTab, setActiveTab] = useState("Categories");
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  // --- Table Configuration ---

  const currentData = useMemo(() => {
    switch (activeTab) {
      case "All Services":
        return services;
      case "Featured":
        return featuredItems;
      case "Categories":
      default:
        return categories;
    }
  }, [activeTab]);

  const currentColumns = useMemo(() => {
    switch (activeTab) {
      case "All Services":
        return serviceColumns;
      case "Featured":
        return featuredColumns;
      case "Categories":
      default:
        return categoryColumns;
    }
  }, [activeTab]);

  const table = useReactTable({
    data: currentData,
    columns: currentColumns as ColumnDef<Category | Service, any>[],
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

  const getAddButtonText = () => {
    if (activeTab === "All Services") return "Add Service";
    if (activeTab === "Featured") return "Add featured Item";
    return "Add new category";
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Service & Category Management
          </h1>
          <p className="text-gray-500 mt-1">
            Organize and oversee all marketplace services and categories.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-2 bg-gray-100/50 w-fit p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setGlobalFilter(""); // Reset filter on tab change
                setSorting([]); // Reset sorting on tab change
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
            placeholder={
              activeTab === "All Services"
                ? "Search by service title..."
                : "Search by category name..."
            }
            className="pl-10 bg-white"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          {activeTab === "All Services" && (
            <Button
              variant="outline"
              className="text-green-700 border-green-100 bg-green-50 hover:bg-green-100 gap-2"
            >
              <Download className="w-4 h-4" />
              Export data
            </Button>
          )}
          <Button
            className="bg-green-700 hover:bg-green-800 text-white gap-2"
            onClick={() => {
              if (activeTab === "Categories") {
                setIsAddCategoryOpen(true);
              } else if (activeTab === "All Services") {
                router.push("/dashboard/services/new");
              }
            }}
          >
            <Plus className="w-4 h-4" />
            {getAddButtonText()}
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

      <Sheet open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <SheetContent className="sm:max-w-[500px] p-0">
          <SheetHeader className="px-6 py-6 border-b border-gray-100">
            <SheetTitle className="text-xl font-semibold">
              Add New Category
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {/* Category Name */}
            <div className="space-y-2">
              <label
                htmlFor="category-name"
                className="text-sm font-medium text-gray-700"
              >
                Category name
              </label>
              <Input
                id="category-name"
                placeholder="e.g. electronics"
                className="bg-white"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Enter a description..."
                className="flex min-h-[120px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Parent Category */}
            <div className="space-y-2">
              <label
                htmlFor="parent-category"
                className="text-sm font-medium text-gray-700"
              >
                Parent category(Optional)
              </label>
              <div className="relative">
                <select
                  id="parent-category"
                  className="flex h-10 w-full appearance-none rounded-lg border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="" disabled selected>
                    Select an option
                  </option>
                  <option value="1">Architecture</option>
                  <option value="2">Beauty & Grooming</option>
                </select>
                <ChevronRight className="absolute right-3 top-3 h-4 w-4 rotate-90 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center gap-3">
              <label
                htmlFor="featured-toggle"
                className="text-sm font-medium text-gray-900"
              >
                Featured
              </label>
              <button
                id="featured-toggle"
                type="button"
                role="switch"
                aria-checked={isFeatured}
                onClick={() => setIsFeatured(!isFeatured)}
                className={cn(
                  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2",
                  isFeatured ? "bg-green-600" : "bg-gray-200"
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                    isFeatured ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </div>
          </div>

          <SheetFooter className="px-6 py-6 border-t border-gray-100 sm:justify-between w-full bg-white mt-auto">
            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                onClick={() => setIsAddCategoryOpen(false)}
                className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 h-11"
              >
                Cancel
              </Button>
              <Button className="flex-1 bg-green-800 hover:bg-green-900 text-white h-11">
                Save
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
