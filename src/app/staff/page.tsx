"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { RestaurantLayout } from "@/components/restaurant-layout";
import {
  Plus,
  Search,
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
  Clock,
} from "lucide-react";
import { staffMembers } from "@/constants/staffMembers";

export default function StaffPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRole, setFilterRole] = useState("all");

  const filteredStaff = staffMembers.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.restaurant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      staff.status
        .toLowerCase()
        .replace(" ", "")
        .includes(filterStatus.toLowerCase());
    const matchesRole =
      filterRole === "all" ||
      staff.role.toLowerCase().includes(filterRole.toLowerCase());
    return matchesSearch && matchesStatus && matchesRole;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return { background: "#1C2B1C", color: "#04C40A" };
      case "on break":
        return { background: "#2B1C1C", color: "#F59E0B" };
      case "off duty":
        return { background: "#2B1C1C", color: "#EF4444" };
      default:
        return { background: "#1C1C2B", color: "#6B7280" };
    }
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "head chef":
      case "sous chef":
        return "bg-purple-500/20 text-purple-300";
      case "manager":
        return "bg-blue-500/20 text-blue-300";
      case "waiter":
      case "server":
        return "bg-green-500/20 text-green-300";
      case "hostess":
        return "bg-pink-500/20 text-pink-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  return (
    <RestaurantLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Staff Management</h1>
            <p className="text-gray-400 mt-1">
              Manage your restaurant staff across all locations
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
            <Plus className="mr-2 h-4 w-4" />
            Add Staff Member
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search staff by name, email, role, or restaurant..."
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
              variant={filterStatus === "active" ? "secondary" : "outline"}
              onClick={() => setFilterStatus("active")}
              className="rounded-xl border-white/20 text-white hover:bg-white/10"
            >
              Active
            </Button>
            <Button
              variant={filterStatus === "onbreak" ? "secondary" : "outline"}
              onClick={() => setFilterStatus("onbreak")}
              className="rounded-xl border-white/20 text-white hover:bg-white/10"
            >
              On Break
            </Button>
            <Button
              variant={filterRole === "all" ? "secondary" : "outline"}
              onClick={() =>
                setFilterRole(filterRole === "all" ? "chef" : "all")
              }
              className="rounded-xl border-white/20 text-white hover:bg-white/10"
            >
              {filterRole === "all" ? "All Roles" : "Chefs Only"}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {filteredStaff.map((staff) => (
            <Card
              key={staff.id}
              className="bg-black/20 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300 hover:scale-[1.02] group"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16 ring-2 ring-white/10 group-hover:ring-blue-500/30 transition-all duration-200">
                      <AvatarImage
                        src={staff.avatar || "/placeholder.svg"}
                        alt={staff.name}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-lg">
                        {staff.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors">
                        {staff.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          className={`border-0 ${getRoleColor(staff.role)}`}
                        >
                          {staff.role}
                        </Badge>
                        <Badge
                          className="border-0 font-medium"
                          style={getStatusColor(staff.status)}
                        >
                          {staff.status}
                        </Badge>
                      </div>
                    </div>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-blue-400" />
                    <span className="text-gray-300 truncate">
                      {staff.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300">{staff.phone}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Restaurant</span>
                    <span className="text-sm font-medium text-white">
                      {staff.restaurant}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Shift</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3 text-orange-400" />
                      <span className="text-sm font-medium text-white">
                        {staff.shift}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-purple-400" />
                    <span className="text-sm text-gray-400">
                      Joined {new Date(staff.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Performance</div>
                    <div className="text-lg font-bold text-white">
                      {staff.performance}%
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Performance Score</span>
                    <span className="text-white font-medium">
                      {staff.performance}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${
                        staff.performance >= 95
                          ? "bg-green-500"
                          : staff.performance >= 90
                          ? "bg-blue-500"
                          : staff.performance >= 80
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${staff.performance}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-white/20 text-white hover:bg-white/10 rounded-lg bg-transparent"
                  >
                    View Profile
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-white/20 text-white hover:bg-white/10 rounded-lg bg-transparent"
                  >
                    Edit Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStaff.length === 0 && (
          <Card className="bg-black/20 border border-white/10 backdrop-blur-xl">
            <CardContent className="text-center py-12">
              <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No staff members found
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
