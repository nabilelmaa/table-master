"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RestaurantLayout } from "@/components/restaurant-layout";
import {
  Plus,
  Search,
  MoreHorizontal,
  MapPin,
  Star,
  Clock,
  Users,
} from "lucide-react";

import { restaurants } from "@/constants/restaurants";

export default function RestaurantsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      restaurant.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return { background: "#1C2B1C", color: "#04C40A" };
      case "busy":
        return { background: "#2B1C1C", color: "#F59E0B" };
      case "closed":
        return { background: "#2B1C1C", color: "#EF4444" };
      default:
        return { background: "#1C1C2B", color: "#6B7280" };
    }
  };

  return (
    <RestaurantLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Restaurant Management
            </h1>
            <p className="text-gray-400 mt-1">
              Manage and monitor all your restaurant locations
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
            <Plus className="mr-2 h-4 w-4" />
            Add Restaurant
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search restaurants, cuisine, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-white/20 rounded-xl"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "secondary" : "outline"}
              onClick={() => setFilterStatus("all")}
              className="rounded-xl border-white/20 text-white hover:bg-white/10"
            >
              All
            </Button>
            <Button
              variant={filterStatus === "active" ? "secondary" : "outline"}
              onClick={() => setFilterStatus("active")}
              className="rounded-xl border-white/20 text-white hover:bg-white/10"
            >
              Active
            </Button>
            <Button
              variant={filterStatus === "busy" ? "secondary" : "outline"}
              onClick={() => setFilterStatus("busy")}
              className="rounded-xl border-white/20 text-white hover:bg-white/10"
            >
              Busy
            </Button>
            <Button
              variant={filterStatus === "closed" ? "secondary" : "outline"}
              onClick={() => setFilterStatus("closed")}
              className="rounded-xl border-white/20 text-white hover:bg-white/10"
            >
              Closed
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRestaurants.map((restaurant) => (
            <Card
              key={restaurant.id}
              className="bg-black/20 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300 hover:scale-105 group overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={restaurant.image || "/placeholder.svg"}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge
                    className="border-0 font-medium"
                    style={getStatusColor(restaurant.status)}
                  >
                    {restaurant.status}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors">
                      {restaurant.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400 flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {restaurant.location}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-white/10 rounded-xl"
                  >
                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="border-white/20 text-gray-300"
                  >
                    {restaurant.cuisine}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-white font-medium">
                      {restaurant.rating}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="flex items-center justify-center mb-1">
                      <Clock className="h-4 w-4 text-blue-400 mr-1" />
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {restaurant.orders}
                    </p>
                    <p className="text-xs text-gray-400">Orders Today</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="h-4 w-4 text-green-400 mr-1" />
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {restaurant.revenue}
                    </p>
                    <p className="text-xs text-gray-400">Revenue Today</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-white/20 text-white hover:bg-white/10 rounded-lg bg-transparent"
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-white/20 text-white hover:bg-white/10 rounded-lg bg-transparent"
                  >
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <Card className="bg-black/20 border border-white/10 backdrop-blur-xl">
            <CardContent className="text-center py-12">
              <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No restaurants found
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
