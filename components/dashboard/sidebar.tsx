"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Box,
  ShoppingBag,
  Scale,
  Settings,
  User,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

const sidebarItems = [
  {
    title: "MAIN",
    items: [
      {
        icon: LayoutDashboard,
        label: "Dashboard",
        href: "/dashboard",
      },
      {
        icon: Users,
        label: "Users",
        href: "/dashboard/users",
      },
      {
        icon: Box,
        label: "Services & Categories",
        href: "/dashboard/categories",
      },
      {
        icon: ShoppingBag,
        label: "Orders & Transaction",
        href: "/dashboard/orders",
      },
      {
        icon: Scale,
        label: "Disputes",
        href: "/dashboard/disputes",
      },
      {
        icon: Settings,
        label: "System settings",
        href: "/dashboard/settings",
      },
    ],
  },
];

const accountItems = [
  {
    icon: Settings, // Using Settings icon for Profile & settings based on typical usage, though generic
    label: "Profile & settings",
    href: "/dashboard/profile",
  },
  {
    icon: HelpCircle,
    label: "Help & support",
    href: "/dashboard/support",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { signOut, user } = useAuthStore();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col sticky top-0">
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-green-600 p-1 rounded">
            <div className="w-4 h-4 border-2 border-white rounded-full" />
          </div>
          <span className="text-xl font-bold text-green-600">Pavodah</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-4 space-y-8">
        {sidebarItems.map((group, groupIndex) => (
          <div key={groupIndex}>
            <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-green-50 text-green-600 border-r-2 border-green-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "w-5 h-5",
                        isActive ? "text-green-600" : "text-gray-500"
                      )}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        <div>
          <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            ACCOUNT SETTINGS
          </h3>
          <div className="space-y-1">
            {accountItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className="w-5 h-5 text-gray-500" />
                <span>{item.label}</span>
              </Link>
            ))}
            <button
              onClick={signOut}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5 text-gray-500" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* User Profile Snippet at bottom */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            {/* Placeholder for avatar */}
            <img
              src={user?.avatar || ""}
              alt="Admin"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {user?.firstName} {user?.lastName || "Admin"}
            </p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
