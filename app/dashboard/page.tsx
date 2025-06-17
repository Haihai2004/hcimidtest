"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bell,
  Search,
  Play,
  Download,
  Star,
  Users,
  BarChart3,
  Settings,
  Plus,
  Wifi,
  WifiOff,
  Shield,
  Smartphone,
  Monitor,
  Headphones,
  User,
} from "lucide-react"

export default function DashboardPage() {
  const [isOffline, setIsOffline] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">XR</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                XRConnect
              </span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search XR experiences..." className="pl-10 w-64" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Offline/Online Status */}
            <div className="flex items-center space-x-2">
              {isOffline ? (
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  <WifiOff className="h-3 w-3 mr-1" />
                  Offline Mode
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  <Wifi className="h-3 w-3 mr-1" />
                  Online
                </Badge>
              )}
            </div>

            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen p-6">
          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 px-3 py-2 bg-purple-50 text-purple-700 rounded-lg"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/content-library"
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <Play className="h-4 w-4" />
              <span>Content Library</span>
            </Link>
            <Link
              href="/devices"
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <Smartphone className="h-4 w-4" />
              <span>Device Management</span>
            </Link>
            <Link
              href="/offline"
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <Download className="h-4 w-4" />
              <span>Offline Content</span>
            </Link>
            <Link
              href="/privacy"
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <Shield className="h-4 w-4" />
              <span>Privacy Center</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <User className="h-4 w-4" />
              <span>My Profile</span>
            </Link>
            <Link
              href="/analytics"
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
            <p className="text-gray-600">Here's what's happening with your XR experiences today.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Experiences</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <Play className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Connected Devices</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                  <Monitor className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Hours This Week</p>
                    <p className="text-2xl font-bold">24.5</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Offline Content</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                  <Download className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Experiences */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Recent Experiences</CardTitle>
                <CardDescription>Your latest XR activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Play className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Virtual Museum Tour</h4>
                    <p className="text-sm text-gray-600">Completed 2 hours ago</p>
                  </div>
                  <Badge>VR</Badge>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Team Collaboration Space</h4>
                    <p className="text-sm text-gray-600">Active session</p>
                  </div>
                  <Badge variant="secondary">AR</Badge>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Star className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">3D Product Showcase</h4>
                    <p className="text-sm text-gray-600">Saved for later</p>
                  </div>
                  <Badge variant="outline">Web</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription>Personalized XR content suggestions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Headphones className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Interactive Learning Lab</h4>
                    <p className="text-sm text-gray-600">Educational • 45 min</p>
                  </div>
                  <Button size="sm">Try Now</Button>
                </div>
                <div className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Play className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Virtual Workspace</h4>
                    <p className="text-sm text-gray-600">Productivity • Multi-user</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with common tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
                  <Link href="/content-library">
                    <Plus className="h-6 w-6" />
                    <span>Browse Content</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
                  <Link href="/devices">
                    <Smartphone className="h-6 w-6" />
                    <span>Add Device</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
                  <Link href="/privacy">
                    <Shield className="h-6 w-6" />
                    <span>Privacy Settings</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2" onClick={() => setIsOffline(!isOffline)}>
                  {isOffline ? <Wifi className="h-6 w-6" /> : <WifiOff className="h-6 w-6" />}
                  <span>{isOffline ? "Go Online" : "Offline Mode"}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
