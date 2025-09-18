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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RestaurantLayout } from "@/components/restaurant-layout";
import {
  Settings,
  Bell,
  Shield,
  CreditCard,
  Users,
  Globe,
  Smartphone,
  Mail,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <RestaurantLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-1">
            Manage your account and application preferences
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="bg-black/20 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-400" />
                Account Settings
              </CardTitle>
              <CardDescription className="text-gray-400">
                Manage your personal account information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">
                  Full Name
                </Label>
                <Input
                  id="name"
                  defaultValue="NABIL EL."
                  className="bg-white/5 border-white/10 text-white focus:border-white/20 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="nabil@restaurant.com"
                  className="bg-white/5 border-white/10 text-white focus:border-white/20 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-300">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  defaultValue="+212 611223344"
                  className="bg-white/5 border-white/10 text-white focus:border-white/20 rounded-xl"
                />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                Update Account
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center">
                <Bell className="mr-2 h-5 w-5 text-green-400" />
                Notification Preferences
              </CardTitle>
              <CardDescription className="text-gray-400">
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Email Notifications</Label>
                  <p className="text-sm text-gray-400">
                    Receive updates via email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Push Notifications</Label>
                  <p className="text-sm text-gray-400">
                    Browser push notifications
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Order Alerts</Label>
                  <p className="text-sm text-gray-400">
                    New order notifications
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Review Alerts</Label>
                  <p className="text-sm text-gray-400">
                    New review notifications
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center">
                <Shield className="mr-2 h-5 w-5 text-purple-400" />
                Security & Privacy
              </CardTitle>
              <CardDescription className="text-gray-400">
                Manage your security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">
                    Two-Factor Authentication
                  </Label>
                  <p className="text-sm text-gray-400">
                    Add extra security to your account
                  </p>
                </div>
                <Badge className="bg-green-500/20 text-green-300 border-0">
                  Enabled
                </Badge>
              </div>
              <Button
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10 rounded-xl bg-transparent"
              >
                Change Password
              </Button>
              <Button
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10 rounded-xl bg-transparent"
              >
                Download Data
              </Button>
              <Button
                variant="outline"
                className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-xl bg-transparent"
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center">
                <Settings className="mr-2 h-5 w-5 text-orange-400" />
                Application Settings
              </CardTitle>
              <CardDescription className="text-gray-400">
                Customize your dashboard experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Dark Mode</Label>
                  <p className="text-sm text-gray-400">Use dark theme</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Auto-refresh Data</Label>
                  <p className="text-sm text-gray-400">
                    Automatically update dashboard
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Default Currency</Label>
                <Input
                  defaultValue="USD"
                  className="bg-white/5 border-white/10 text-white focus:border-white/20 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Time Zone</Label>
                <Input
                  defaultValue="America/New_York"
                  className="bg-white/5 border-white/10 text-white focus:border-white/20 rounded-xl"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-black/20 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center">
              <Globe className="mr-2 h-5 w-5 text-cyan-400" />
              Integrations & API
            </CardTitle>
            <CardDescription className="text-gray-400">
              Manage third-party integrations and API access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Payment Gateway",
                  status: "Connected",
                  icon: CreditCard,
                  color: "text-green-400",
                },
                {
                  name: "Email Service",
                  status: "Connected",
                  icon: Mail,
                  color: "text-green-400",
                },
                {
                  name: "SMS Service",
                  status: "Disconnected",
                  icon: Smartphone,
                  color: "text-red-400",
                },
              ].map((integration, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-2">
                    <integration.icon
                      className={`h-5 w-5 ${integration.color}`}
                    />
                    <Badge
                      className={`border-0 text-xs ${
                        integration.status === "Connected"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {integration.status}
                    </Badge>
                  </div>
                  <h3 className="font-medium text-white mb-1">
                    {integration.name}
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-white/20 text-white hover:bg-white/10 rounded-lg text-xs bg-transparent"
                  >
                    {integration.status === "Connected"
                      ? "Configure"
                      : "Connect"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </RestaurantLayout>
  );
}
