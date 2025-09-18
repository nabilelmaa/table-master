"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RestaurantLayout } from "@/components/restaurant-layout";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import {
  DollarSign,
  Activity,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  ChefHat,
  UtensilsCrossed,
  Star,
} from "lucide-react";

import { revenueData, pieData, recentStaff } from "@/constants/dashboard";

export default function DashboardPage() {
  return (
    <RestaurantLayout>
      <div className="space-y-6 sm:space-y-8 animate-in fade-in-50 duration-500">
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Revenue",
              value: "$187,420",
              change: "+15.2%",
              icon: DollarSign,
              gradient: "from-emerald-500/20 to-green-500/20",
              border: "border-emerald-500/30",
              iconBg: "bg-emerald-500",
              positive: true,
            },
            {
              title: "Active Restaurants",
              value: "12",
              change: "+2 new",
              icon: UtensilsCrossed,
              gradient: "from-blue-500/20 to-cyan-500/20",
              border: "border-blue-500/30",
              iconBg: "bg-blue-500",
              positive: true,
            },
            {
              title: "Daily Orders",
              value: "847",
              change: "+12.1%",
              icon: ShoppingCart,
              gradient: "from-purple-500/20 to-pink-500/20",
              border: "border-purple-500/30",
              iconBg: "bg-purple-500",
              positive: true,
            },
            {
              title: "Avg Rating",
              value: "4.8",
              change: "+0.2",
              icon: Star,
              gradient: "from-orange-500/20 to-red-500/20",
              border: "border-orange-500/30",
              iconBg: "bg-orange-500",
              positive: true,
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className={`bg-gradient-to-br ${stat.gradient} border ${stat.border} backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 group`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  {stat.title}
                </CardTitle>
                <div
                  className={`h-8 w-8 sm:h-10 sm:w-10 rounded-xl ${stat.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div
                  className={`flex items-center text-xs sm:text-sm ${
                    stat.positive ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {stat.positive ? (
                    <ArrowUpRight className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                  )}
                  {stat.change} from last month
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 xl:grid-cols-2">
          <Card className="bg-black/20 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-lg sm:text-xl text-white">
                    Revenue Overview
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Monthly revenue across all restaurants
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500 animate-pulse"></div>
                  <span className="text-sm text-gray-400">Live data</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                    opacity={0.3}
                  />
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      color: "#f9fafb",
                      backdropFilter: "blur(10px)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl text-white">
                Order Types
              </CardTitle>
              <CardDescription className="text-gray-400">
                Distribution of order types across restaurants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      color: "#f9fafb",
                      backdropFilter: "blur(10px)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6">
                {pieData.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full shadow-lg"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm text-gray-300 font-medium">
                      {entry.name}
                    </span>
                    <span className="text-sm text-gray-400">
                      ({entry.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 xl:grid-cols-2">
          <Card className="bg-black/20 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg sm:text-xl text-white flex items-center">
                  <ChefHat className="mr-2 h-5 w-5 text-blue-400" />
                  Restaurant Staff
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Current staff status and activity
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10 rounded-xl bg-transparent w-full sm:w-auto"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Staff
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentStaff.map((staff, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-white/10 group-hover:ring-blue-500/30 transition-all duration-200">
                        <AvatarImage
                          src={staff.avatar || "/placeholder.svg"}
                          alt={staff.name}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-sm">
                          {staff.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-white text-sm sm:text-base">
                          {staff.name}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-400">
                          {staff.role}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={`rounded-lg px-2 sm:px-3 py-1 border-0 text-xs ${
                        staff.status === "Active"
                          ? "text-white"
                          : staff.status === "On Break"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                      style={
                        staff.status === "Active"
                          ? { background: "#1C2B1C", color: "#04C40A" }
                          : {}
                      }
                    >
                      {staff.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl text-white flex items-center">
                <Activity className="mr-2 h-5 w-5 text-green-400" />
                Restaurant Performance
              </CardTitle>
              <CardDescription className="text-gray-400">
                Real-time operational metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  label: "Kitchen Efficiency",
                  value: 92,
                  color: "bg-blue-500",
                  bgColor: "bg-blue-500/20",
                },
                {
                  label: "Order Accuracy",
                  value: 98,
                  color: "bg-green-500",
                  bgColor: "bg-green-500/20",
                },
                {
                  label: "Table Turnover",
                  value: 75,
                  color: "bg-orange-500",
                  bgColor: "bg-orange-500/20",
                },
                {
                  label: "Customer Satisfaction",
                  value: 96,
                  color: "bg-purple-500",
                  bgColor: "bg-purple-500/20",
                },
              ].map((metric, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-medium text-sm sm:text-base">
                      {metric.label}
                    </span>
                    <span className="text-white font-bold text-sm sm:text-base">
                      {metric.value}%
                    </span>
                  </div>
                  <div
                    className={`h-2 sm:h-3 rounded-full ${metric.bgColor} overflow-hidden`}
                  >
                    <div
                      className={`h-full ${metric.color} rounded-full transition-all duration-1000 ease-out shadow-lg`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </RestaurantLayout>
  );
}
