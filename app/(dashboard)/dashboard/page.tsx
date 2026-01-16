"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  Briefcase,
  ShoppingBag,
  CreditCard,
  ChevronDown,
  ArrowRight,
  Info,
  Star,
  MoreVertical,
  ArrowUp,
  CheckCircle2,
  Award,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import Image from "next/image";

// --- Admin Mock Data ---

const revenueData = [
  { name: "Jan", revenue: 600, commission: 380, payout: 100 },
  { name: "Feb", revenue: 620, commission: 390, payout: 120 },
  { name: "Mar", revenue: 630, commission: 400, payout: 130 },
  { name: "Apr", revenue: 650, commission: 410, payout: 150 },
  { name: "May", revenue: 700, commission: 430, payout: 200 },
  { name: "Jun", revenue: 720, commission: 440, payout: 250 },
  { name: "Jul", revenue: 680, commission: 420, payout: 180 },
  { name: "Aug", revenue: 750, commission: 460, payout: 300 },
  { name: "Sep", revenue: 780, commission: 480, payout: 350 },
  { name: "Oct", revenue: 760, commission: 470, payout: 320 },
  { name: "Nov", revenue: 800, commission: 500, payout: 380 },
  { name: "Dec", revenue: 850, commission: 520, payout: 420 },
];

const orderStatusData = [
  { name: "Completed", value: 70, color: "#4ade80" }, // green-400
  { name: "Pending", value: 30, color: "#facc15" }, // yellow-400
  { name: "In-progress", value: 35, color: "#3b82f6" }, // blue-500
  { name: "Declined", value: 10, color: "#f87171" }, // red-400
  { name: "Expired", value: 5, color: "#9ca3af" }, // gray-400
];

const topCategories = [
  { name: "Plumbing", amount: "200.0Bkgs", icon: "⚙️" },
  { name: "Interior Decor", amount: "150.0Bkgs", icon: "🎨" },
  { name: "Hairstyling", amount: "90.0Bkgs", icon: "✂️" },
  { name: "Masonry", amount: "70.0Bkgs", icon: "🧱" },
  { name: "Web Development", amount: "25.0Bkgs", icon: "💻" },
];

const stats = [
  {
    label: "Total User",
    value: "2000",
    trend: "+12%",
    trendLabel: "vs last month",
    icon: Users,
    color: "text-orange-600",
    barColor: "bg-orange-600",
  },
  {
    label: "Active Providers",
    value: "1000",
    trend: "+12%",
    trendLabel: "vs last month",
    icon: Briefcase,
    color: "text-purple-600",
    barColor: "bg-purple-600",
  },
  {
    label: "Active Orders",
    value: "200",
    trend: "+12%",
    trendLabel: "from last month",
    icon: ShoppingBag,
    color: "text-blue-600",
    barColor: "bg-blue-600",
  },
  {
    label: "Revenue",
    value: "GHS 100,500",
    trend: "+12%",
    trendLabel: "vs last month",
    icon: CreditCard,
    color: "text-green-600",
    barColor: "bg-green-600",
  },
];

// --- Provider Mock Data ---

const providerStats = [
  {
    label: "Earnings",
    value: "GHS 2,350",
    trend: "+12%",
    trendLabel: "vs last month",
    icon: CreditCard, // Wallet icon would be better but CreditCard works
    color: "text-green-600",
    barColor: "bg-green-600",
  },
  {
    label: "Active Orders",
    value: "5",
    trend: "+12%",
    trendLabel: "from last month",
    icon: Briefcase, // Or Box
    color: "text-blue-600",
    barColor: "bg-blue-600",
  },
  {
    label: "Completed Orders",
    value: "45",
    trend: "+12%",
    trendLabel: "vs last month",
    icon: CheckCircle2,
    color: "text-purple-600",
    barColor: "bg-purple-600",
  },
  {
    label: "Average Rating",
    value: "4.7 / 5",
    trend: "+12%",
    trendLabel: "from last month",
    icon: Star,
    color: "text-orange-500",
    barColor: "bg-orange-500",
  },
];

const earningsOverviewData = [
  { name: "Jan", current: 450, previous: 800 },
  { name: "Feb", current: 550, previous: 1000 },
  { name: "Mar", current: 300, previous: 600 },
  { name: "Apr", current: 480, previous: 850 },
  { name: "May", current: 300, previous: 600 },
  { name: "Jun", current: 520, previous: 950 },
  { name: "Jul", current: 450, previous: 800 },
  { name: "Aug", current: 480, previous: 850 },
  { name: "Sep", current: 450, previous: 800 },
  { name: "Oct", current: 500, previous: 900 },
  { name: "Nov", current: 550, previous: 1000 },
  { name: "Dec", current: 400, previous: 750 },
];

const providerOrderStatusData = [
  { name: "Awaiting", value: 5, color: "#facc15" },
  { name: "In-progress", value: 8, color: "#3b82f6" },
  { name: "Declined", value: 2, color: "#f87171" },
  { name: "Completed", value: 45, color: "#4ade80" },
];

const recentOrderRequests = [
  {
    id: "#5764892",
    user: {
      name: "Robert sam",
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    plan: "Basic",
    category: "Architecture & Interior Design",
    date: "August 29, 2025",
  },
  {
    id: "#5782031",
    user: {
      name: "Emily Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    plan: "Premium",
    category: "Graphic Design",
    date: "September 15, 2025",
  },
];

const serviceLeaderboard = [
  {
    rank: 1,
    provider: {
      name: "Robert sam",
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    service: "Architect & Interior...",
    points: "50.pts",
  },
  {
    rank: 2,
    provider: {
      name: "Robert sam",
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    service: "Architect & Interior...",
    points: "50.pts",
  },
  {
    rank: 3,
    provider: {
      name: "Robert sam",
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    service: "Architect & Interior...",
    points: "50.pts",
  },
  {
    rank: 18,
    provider: {
      name: "You",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    service: "Plumbing",
    points: "7.pts",
  },
];

function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Monitor platform performance and take quick actions.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative"
          >
            <div
              className={`absolute top-0 left-0 w-full h-1 ${stat.barColor}`}
            />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className={cn("w-5 h-5", stat.color)} />
                <span className="font-medium text-gray-900">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">
                <span className="text-green-600 font-medium">{stat.trend}</span>{" "}
                {stat.trendLabel}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart (Left - 2/3) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-900">
                Revenue Overview
              </h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Year <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>2025</DropdownMenuItem>
                  <DropdownMenuItem>2024</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-green-600 font-medium">+12%</span>
                <span className="text-gray-500"> vs Last Month | </span>
                <span className="text-gray-500">
                  Best Month: June (GHS 30,200)
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  <span className="text-gray-600">Total revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                  <span className="text-gray-600">Commissions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  <span className="text-gray-600">Payouts</span>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#fff" }}
                  cursor={{ stroke: "#e5e7eb", strokeWidth: 1 }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#60a5fa" // blue-400
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="commission"
                  stroke="#fb923c" // orange-400
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="payout"
                  stroke="#4ade80" // green-400
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column - Widgets */}
        <div className="space-y-6">
          {/* Order Status Summary */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Order status summary
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Track order completion and identify service delivery rate.
            </p>

            <div className="flex items-center">
              <div className="relative w-[180px] h-[180px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={90}
                      paddingAngle={0}
                      dataKey="value"
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${entry.name}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-2xl font-bold text-gray-900">200</div>
                </div>
                {/* Custom Tooltip Overlay Style */}
                <div className="absolute top-0 right-0 bg-gray-900 text-white text-xs px-3 py-1 rounded-full transform translate-x-4 -translate-y-2 hidden group-hover:block">
                  Completed orders-35%
                </div>
              </div>

              {/* Legend */}
              <div className="flex-1 pl-6 space-y-3">
                {orderStatusData.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></span>
                      <span className="text-gray-600">{item.name}</span>
                    </div>
                    <span className="font-medium text-gray-900">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <button className="flex items-center text-green-700 font-medium text-sm hover:underline">
                View Detail Report <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>

          {/* Top Categories */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-gray-900">
                  Top Categories
                </h3>
                <Info className="w-4 h-4 text-gray-400" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Month <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>August</DropdownMenuItem>
                  <DropdownMenuItem>September</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-4">
              {topCategories.map((cat, index) => (
                <div
                  key={cat.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-900 w-4">
                      {index + 1}.
                    </span>
                    <div className="w-6 h-6 flex items-center justify-center bg-gray-50 rounded-full text-xs">
                      <span className="text-gray-600">{cat.icon}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {cat.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {cat.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProviderDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Manage your services, track earnings, and grow your business.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {providerStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative"
          >
            <div
              className={`absolute top-0 left-0 w-full h-1 ${stat.barColor}`}
            />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className={cn("w-5 h-5", stat.color)} />
                <span className="font-medium text-gray-900">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">
                <span className="text-green-600 font-medium">{stat.trend}</span>{" "}
                {stat.trendLabel}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts & Orders (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Earnings Overview Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-900">
                  Earnings overview
                </h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Year <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>2025</DropdownMenuItem>
                    <DropdownMenuItem>2024</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-green-600 font-medium">+12%</span>
                  <span className="text-gray-500"> vs Last Month | </span>
                  <span className="text-gray-500">
                    Best Month: June (GHS 3,200)
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-800"></span>
                    <span className="text-gray-600">Current</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-100"></span>
                    <span className="text-gray-600">Previous</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={earningsOverviewData} barGap={0}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    label={{
                      value: "Earnings(GHS)",
                      angle: -90,
                      position: "insideLeft",
                      style: { fill: "#9ca3af", fontSize: 12 },
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    itemStyle={{ color: "#fff" }}
                    cursor={{ fill: "transparent" }}
                  />
                  <Bar
                    dataKey="current"
                    fill="#3f6212" // deep green
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                  />
                  <Bar
                    dataKey="previous"
                    fill="#dcfce7" // light green
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Order Requests */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">
                Recent Order Requests
              </h3>
              <button className="text-sm text-green-600 font-medium hover:underline">
                View more
              </button>
            </div>

            <div className="space-y-6">
              {recentOrderRequests.map((order) => (
                <div
                  key={order.id}
                  className="flex items-start justify-between pb-6 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden relative bg-gray-100 shrink-0">
                      <Image
                        src={order.user.avatar}
                        alt={order.user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">
                          {order.user.name}
                        </span>
                        <span className="text-sm text-gray-300">|</span>
                        <span className="text-sm text-gray-500">
                          Plan: {order.plan}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-bold text-gray-900">
                          Order ID: {order.id}
                        </span>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">{order.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-2">
                      {order.date}
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Widgets (1/3) */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Order summary</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Month <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>August</DropdownMenuItem>
                  <DropdownMenuItem>September</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mb-4">
              <div className="text-3xl font-bold text-gray-900">60</div>
              <div className="text-sm text-green-600 font-medium">
                +12%{" "}
                <span className="text-gray-500 font-normal">vs Last Month</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">Total orders</div>
            </div>

            <div className="w-full h-[60px] flex rounded-md overflow-hidden mb-4">
              {providerOrderStatusData.map((item, index) => (
                <div
                  key={item.name}
                  style={{
                    width: `${(item.value / 60) * 100}%`,
                    backgroundColor: item.color,
                  }}
                  className="h-full"
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {providerOrderStatusData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 text-sm"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className="text-gray-600">{item.name}</span>
                  <span className="font-bold text-gray-900 ml-auto">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Service Leaderboard */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-gray-900">
                  Service Leaderboard
                </h3>
                <Info className="w-4 h-4 text-gray-400" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Month <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>August</DropdownMenuItem>
                  <DropdownMenuItem>September</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-4">
              {serviceLeaderboard.map((item) => (
                <div
                  key={item.rank}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-8">
                      <span className="text-sm font-medium text-gray-900">
                        {item.rank}.
                      </span>
                      {item.rank === 1 && (
                        <Award className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      )}
                      {item.rank === 2 && (
                        <Award className="w-3 h-3 text-gray-400 fill-gray-400" />
                      )}
                      {item.rank === 3 && (
                        <Award className="w-3 h-3 text-amber-600 fill-amber-600" />
                      )}
                    </div>
                    <div className="w-8 h-8 rounded-full overflow-hidden relative bg-gray-100 shrink-0">
                      <Image
                        src={item.provider.avatar}
                        alt={item.provider.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">
                        {item.provider.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.service}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
                    <ArrowUp className="w-3 h-3 text-green-600" />
                    {item.points}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <button className="flex items-center text-green-700 font-medium text-sm hover:underline">
                View details <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuthStore();

  if (user?.role === "ADMIN") {
    return <AdminDashboard />;
  }

  return <ProviderDashboard />;
}
