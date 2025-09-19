"use client";

import type React from "react";

import { type SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  ShoppingCart,
  Settings,
  Search,
  LogOut,
  ChefHat,
  UtensilsCrossed,
  Star,
  Menu,
  X,
} from "lucide-react";

interface RestaurantLayoutProps {
  children: React.ReactNode;
}

export function RestaurantLayout({ children }: RestaurantLayoutProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Added mobile sidebar state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "New",
      title: "Kitchen Alert System",
      description: "Real-time alerts for order delays and kitchen issues",
      isVisible: true,
    },
    {
      id: 2,
      type: "Update",
      title: "Staff Schedule Manager",
      description: "Automated scheduling with shift optimization",
      isVisible: false,
    },
  ]);

  const dismissNotification = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isVisible: false } : notif
      )
    );
  };

  const navigationItems = [
    {
      href: "/dashboard",
      icon: Activity,
      label: "Dashboard",
      badge: null,
    },
    {
      href: "/restaurants",
      icon: UtensilsCrossed,
      label: "Restaurants",
      badge: "12",
    },
    {
      href: "/staff",
      icon: ChefHat,
      label: "Staff",
      badge: "24",
    },
    {
      href: "/orders",
      icon: ShoppingCart,
      label: "Orders",
      badge: "New",
    },
    {
      href: "/reviews",
      icon: Star,
      label: "Reviews",
      badge: null,
    },
  ];

  const toolItems = [{ href: "/settings", icon: Settings, label: "Settings" }];

  return (
    <div className="" style={{ background: "#090909" }}>
      <div className="flex">
        <Button
          variant="ghost"
          size="sm"
          className="fixed top-4 left-4 z-50 lg:hidden bg-black/50 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <aside
          className={`
            w-72 border-r border-white/10 min-h-screen flex flex-col transition-transform duration-300 z-50
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0 lg:z-auto
            fixed lg:static
          `}
          style={{ background: "#101011" }}
        >
          <div className="p-6 border-b border-white/10 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search restaurants..."
                value={searchQuery}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setSearchQuery(e.target.value)
                }
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-white/20 rounded-xl"
              />
            </div>
          </div>

          <nav className="p-6 space-y-2 flex-1 overflow-y-auto">
            <div className="mb-8">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Restaurant Management
              </h2>
            </div>

            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={`w-full justify-start h-12 rounded-xl transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-white/5 text-white shadow-lg"
                      : "hover:bg-white/5 text-gray-300 hover:text-white"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                  {item.badge && (
                    <Badge
                      className="ml-auto text-xs border-0"
                      style={{ background: "#1C2B1C", color: "#04C40A" }}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </Link>
            ))}

            <div className="pt-6 mt-6 border-t border-white/10">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Tools
              </h2>
              {toolItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Button
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className={`w-full justify-start h-12 rounded-xl transition-all duration-200 ${
                      pathname === item.href
                        ? "bg-white/5 text-white shadow-lg"
                        : "hover:bg-white/5 text-gray-300 hover:text-white"
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </nav>

          <div className="p-6 border-t border-white/10 space-y-3 flex-shrink-0">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 ring-2 ring-white/10">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="Admin"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                    NE
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-white">NABIL EL.</p>
                  <p className="text-xs text-gray-400">ADMIN</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-white/10 rounded-lg transition-all duration-200 text-gray-400 hover:text-red-400"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto lg:ml-0">
          {children}
        </main>
      </div>

      <div className="fixed bottom-4 left-4 lg:bottom-6 lg:left-6 space-y-3 z-50">
        {notifications
          .filter((n) => n.isVisible)
          .map((notification) => (
            <div
              key={notification.id}
              className="w-72 sm:w-60 p-4 rounded-xl border border-white/10 backdrop-blur-xl animate-in slide-in-from-left-5 duration-300"
              style={{ background: "#101011" }}
            >
              <div className="flex items-start justify-between mb-2">
                <Badge
                  className="text-xs border-0 font-medium"
                  style={{ background: "#1C2B1C", color: "#04C40A" }}
                >
                  {notification.type}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-white/10 rounded-md text-gray-400 hover:text-white"
                  onClick={() => dismissNotification(notification.id)}
                >
                  ×
                </Button>
              </div>
              <h3 className="text-white font-semibold mb-1">
                {notification.title}
              </h3>
              <p className="text-gray-400 text-xs mb-3">
                {notification.description}
              </p>
              <Button
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border-0 rounded-lg"
              >
                Try it out →
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}
