"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RestaurantLayout } from "@/components/restaurant-layout";
import {
  Search,
  Filter,
  Clock,
  DollarSign,
  MapPin,
  User,
  ChefHat,
  Truck,
} from "lucide-react";
import { orders } from "@/constants/orders";

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesStatus =
      filterStatus === "all" ||
      order.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesType =
      filterType === "all" ||
      order.type
        .toLowerCase()
        .replace("-", "")
        .includes(filterType.toLowerCase());
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return { background: "#1C2B1C", color: "#04C40A" };
      case "preparing":
        return { background: "#2B1C1C", color: "#F59E0B" };
      case "ready":
        return { background: "#1C2B1C", color: "#10B981" };
      case "delivered":
        return { background: "#1C1C2B", color: "#3B82F6" };
      case "cancelled":
        return { background: "#2B1C1C", color: "#EF4444" };
      default:
        return { background: "#1C1C2B", color: "#6B7280" };
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "dine-in":
        return <User className="h-4 w-4" />;
      case "pickup":
        return <ChefHat className="h-4 w-4" />;
      case "delivery":
        return <Truck className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "dine-in":
        return "bg-blue-500/20 text-blue-300";
      case "pickup":
        return "bg-green-500/20 text-green-300";
      case "delivery":
        return "bg-purple-500/20 text-purple-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  return (
    <RestaurantLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Order Management</h1>
            <p className="text-gray-400 mt-1">
              Track and manage orders across all restaurants
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 rounded-xl bg-transparent"
            >
              <Filter className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search orders by ID, customer, restaurant, or items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-white/20 rounded-xl"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filterStatus === "all" ? "secondary" : "outline"}
              onClick={() => setFilterStatus("all")}
              className="rounded-xl border-white/20 text-white hover:bg-white/10"
            >
              All Status
            </Button>
            <Button
              variant={filterStatus === "preparing" ? "secondary" : "outline"}
              onClick={() => setFilterStatus("preparing")}
              className="rounded-xl border-white/20 text-white hover:bg-white/10"
            >
              Preparing
            </Button>
            <Button
              variant={filterStatus === "ready" ? "secondary" : "outline"}
              onClick={() => setFilterStatus("ready")}
              className="rounded-xl border-white/20 text-white hover:bg-white/10"
            >
              Ready
            </Button>
            <Button
              variant={filterType === "all" ? "secondary" : "outline"}
              onClick={() =>
                setFilterType(filterType === "all" ? "delivery" : "all")
              }
              className="rounded-xl border-white/20 text-white hover:bg-white/10"
            >
              {filterType === "all" ? "All Types" : "Delivery Only"}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card
              key={order.id}
              className="bg-black/20 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300 hover:scale-[1.01] group"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {order.id}
                        </h3>
                        <Badge
                          className="border-0 font-medium"
                          style={getStatusColor(order.status)}
                        >
                          {order.status}
                        </Badge>
                        <Badge
                          className={`border-0 ${getTypeColor(
                            order.type
                          )} flex items-center gap-1`}
                        >
                          {getTypeIcon(order.type)}
                          {order.type}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">
                          ${order.total}
                        </div>
                        <div className="text-sm text-gray-400">
                          {order.time}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-blue-400" />
                          <span className="text-white font-medium">
                            {order.customer}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-green-400" />
                          <span className="text-gray-300">
                            {order.restaurant}
                          </span>
                        </div>
                        {order.table && (
                          <div className="flex items-center space-x-2">
                            <ChefHat className="h-4 w-4 text-purple-400" />
                            <span className="text-gray-300">{order.table}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-orange-400" />
                          <span className="text-gray-300">
                            {order.estimatedTime}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-emerald-400" />
                          <span className="text-gray-300">
                            Total: ${order.total}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-white/5">
                      <h4 className="text-sm font-medium text-gray-400 mb-2">
                        Order Items:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {order.items.map((item, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="border-white/20 text-gray-300 bg-white/5"
                          >
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 lg:w-32">
                    {order.status === "Confirmed" && (
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                      >
                        Start Prep
                      </Button>
                    )}
                    {order.status === "Preparing" && (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
                      >
                        Mark Ready
                      </Button>
                    )}
                    {order.status === "Ready" && order.type === "Delivery" && (
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                      >
                        Dispatch
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10 rounded-lg bg-transparent"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <Card className="bg-black/20 border border-white/10 backdrop-blur-xl">
            <CardContent className="text-center py-12">
              <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No orders found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search or filter criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </RestaurantLayout>
  );
}
