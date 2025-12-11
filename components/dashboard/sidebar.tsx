"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Box,
  ShoppingBag,
  Scale,
  Settings,
  HelpCircle,
  LogOut,
  PanelLeftClose,
  MessageSquare,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { Logo } from "@/components/layout/logo";

const adminSidebarItems = [
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

const providerSidebarItems = [
  {
    title: "MAIN",
    items: [
      {
        icon: LayoutDashboard,
        label: "Dashboard",
        href: "/dashboard",
      },
      {
        icon: Box,
        label: "My services",
        href: "/dashboard/services",
      },
      {
        icon: ShoppingBag,
        label: "Orders",
        href: "/dashboard/orders",
      },
      {
        icon: MessageSquare,
        label: "Messages",
        href: "/dashboard/messages",
      },
      {
        icon: Star,
        label: "Reviews",
        href: "/dashboard/reviews",
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarItems =
    user?.role === "ADMIN" ? adminSidebarItems : providerSidebarItems;
  const userRoleLabel = user?.role === "ADMIN" ? "Admin" : "Provider";

  return (
    <aside
      className={cn(
        "bg-white border-r border-gray-200 h-screen flex flex-col sticky top-0 transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div
        className={cn(
          "h-16 flex items-center border-b border-gray-100",
          isCollapsed ? "justify-center" : "justify-between px-6"
        )}
      >
        {!isCollapsed && <Logo withLink={true} />}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-500 hover:text-gray-700"
        >
          {isCollapsed ? (
            <Logo withLink={false} showText={false} />
          ) : (
            <PanelLeftClose className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-6 space-y-8">
        {sidebarItems.map((group) => (
          <div key={group.title}>
            {!isCollapsed && (
              <h3 className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 transition-opacity duration-200">
                {group.title}
              </h3>
            )}
            <div className={cn("space-y-1", isCollapsed ? "px-2" : "px-4")}>
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-lg text-sm font-medium transition-colors",
                      isCollapsed
                        ? "justify-center px-2 py-3"
                        : "space-x-3 px-4 py-3",
                      isActive
                        ? "bg-green-50 text-green-600 border-l-4 border-green-700 rounded-none"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg"
                    )}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <item.icon
                      className={cn(
                        "w-5 h-5 shrink-0",
                        isActive ? "text-green-600" : "text-gray-500"
                      )}
                    />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        <div>
          {!isCollapsed && (
            <h3 className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              ACCOUNT SETTINGS
            </h3>
          )}
          <div className={cn("space-y-1", isCollapsed ? "px-2" : "px-4")}>
            {accountItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-lg text-sm font-medium transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  isCollapsed
                    ? "justify-center px-2 py-3"
                    : "space-x-3 px-4 py-3"
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 shrink-0 text-gray-500" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            ))}
            <button
              onClick={signOut}
              className={cn(
                "w-full flex items-center rounded-lg text-sm font-medium transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                isCollapsed ? "justify-center px-2 py-3" : "space-x-3 px-4 py-3"
              )}
              title={isCollapsed ? "Logout" : undefined}
            >
              <LogOut className="w-5 h-5 shrink-0 text-gray-500" />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* User Profile Snippet at bottom */}
      <div
        className={cn(
          "border-t border-gray-200",
          isCollapsed ? "p-4 flex justify-center" : "p-4"
        )}
      >
        <div
          className={cn(
            "flex items-center",
            isCollapsed ? "justify-center" : "space-x-3"
          )}
        >
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
            {/* Placeholder for avatar */}
            <img
              src={user?.avatar || ""}
              alt={user?.firstName || "User"}
              className="w-full h-full object-cover"
            />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500 truncate">{userRoleLabel}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
