"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Download,
  Play,
  Trash2,
  Pause,
  RotateCcw,
  HardDrive,
  Wifi,
  WifiOff,
  CheckCircle,
  Clock,
  AlertCircle,
  Smartphone,
  Monitor,
  Headphones,
} from "lucide-react"

const downloadedContent = [
  {
    id: 1,
    title: "Virtual Museum Tour",
    category: "Education",
    size: "245 MB",
    downloadDate: "2024-01-15",
    lastAccessed: "2 hours ago",
    devices: ["VR", "AR"],
    status: "ready",
    thumbnail: "/placeholder.svg?height=120&width=160",
  },
  {
    id: 2,
    title: "3D Product Showcase",
    category: "Business",
    size: "156 MB",
    downloadDate: "2024-01-14",
    lastAccessed: "1 day ago",
    devices: ["AR", "Web"],
    status: "ready",
    thumbnail: "/placeholder.svg?height=120&width=160",
  },
  {
    id: 3,
    title: "Interactive Learning Lab",
    category: "Education",
    size: "389 MB",
    downloadDate: "2024-01-12",
    lastAccessed: "3 days ago",
    devices: ["VR", "Web"],
    status: "ready",
    thumbnail: "/placeholder.svg?height=120&width=160",
  },
  {
    id: 4,
    title: "Team Collaboration Space",
    category: "Productivity",
    size: "198 MB",
    downloadDate: "2024-01-10",
    lastAccessed: "1 week ago",
    devices: ["VR", "Web"],
    status: "needs_update",
    thumbnail: "/placeholder.svg?height=120&width=160",
  },
]

const inProgressDownloads = [
  {
    id: 5,
    title: "Architectural Walkthrough",
    category: "Architecture",
    totalSize: "512 MB",
    downloadedSize: "387 MB",
    progress: 75,
    speed: "2.3 MB/s",
    timeRemaining: "54 seconds",
    status: "downloading",
  },
  {
    id: 6,
    title: "Virtual Workspace",
    category: "Productivity",
    totalSize: "298 MB",
    downloadedSize: "89 MB",
    progress: 30,
    speed: "1.8 MB/s",
    timeRemaining: "2 minutes",
    status: "paused",
  },
  {
    id: 7,
    title: "Space Exploration VR",
    category: "Entertainment",
    totalSize: "1.2 GB",
    downloadedSize: "0 MB",
    progress: 0,
    speed: "0 MB/s",
    timeRemaining: "Queued",
    status: "queued",
  },
]

export default function OfflinePage() {
  const [isOfflineMode, setIsOfflineMode] = useState(false)
  const [downloads, setDownloads] = useState(inProgressDownloads)

  const totalDownloadedSize = downloadedContent.reduce((total, content) => {
    return total + Number.parseFloat(content.size.replace(" MB", ""))
  }, 0)

  const pauseDownload = (id: number) => {
    setDownloads(downloads.map((d) => (d.id === id ? { ...d, status: "paused" } : d)))
  }

  const resumeDownload = (id: number) => {
    setDownloads(downloads.map((d) => (d.id === id ? { ...d, status: "downloading" } : d)))
  }

  const cancelDownload = (id: number) => {
    setDownloads(downloads.filter((d) => d.id !== id))
  }

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case "vr":
        return <Headphones className="h-3 w-3" />
      case "ar":
        return <Smartphone className="h-3 w-3" />
      case "web":
        return <Monitor className="h-3 w-3" />
      default:
        return <Monitor className="h-3 w-3" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-700">
            <CheckCircle className="h-3 w-3 mr-1" />
            Ready
          </Badge>
        )
      case "needs_update":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-700">
            <AlertCircle className="h-3 w-3 mr-1" />
            Update Available
          </Badge>
        )
      case "downloading":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-700">
            <Download className="h-3 w-3 mr-1" />
            Downloading
          </Badge>
        )
      case "paused":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-700">
            <Pause className="h-3 w-3 mr-1" />
            Paused
          </Badge>
        )
      case "queued":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-700">
            <Clock className="h-3 w-3 mr-1" />
            Queued
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <HardDrive className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">Offline Content</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOfflineMode(!isOfflineMode)}
              className={isOfflineMode ? "border-orange-500 text-orange-600" : "border-green-500 text-green-600"}
            >
              {isOfflineMode ? (
                <>
                  <WifiOff className="h-4 w-4 mr-2" />
                  Offline Mode
                </>
              ) : (
                <>
                  <Wifi className="h-4 w-4 mr-2" />
                  Online
                </>
              )}
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Offline Content Management</h1>
          <p className="text-gray-600">
            Manage your downloaded XR experiences and monitor ongoing downloads for offline access.
          </p>
        </div>

        {/* Storage Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Downloaded Content</p>
                  <p className="text-2xl font-bold">{downloadedContent.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Storage Used</p>
                  <p className="text-2xl font-bold">{(totalDownloadedSize / 1024).toFixed(1)} GB</p>
                </div>
                <HardDrive className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Downloads</p>
                  <p className="text-2xl font-bold">{downloads.filter((d) => d.status === "downloading").length}</p>
                </div>
                <Download className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="downloaded" className="space-y-6">
          <TabsList>
            <TabsTrigger value="downloaded">Downloaded Content</TabsTrigger>
            <TabsTrigger value="downloads">Downloads in Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="downloaded" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Offline Library</h2>
              <Button variant="outline" asChild>
                <Link href="/content-library">
                  <Download className="h-4 w-4 mr-2" />
                  Browse More Content
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {downloadedContent.map((content) => (
                <Card key={content.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <Play className="h-8 w-8 text-gray-600" />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-base">{content.title}</CardTitle>
                        <CardDescription className="text-sm mt-1">{content.category}</CardDescription>
                      </div>
                      {getStatusBadge(content.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Size: {content.size}</span>
                        <span>Last used: {content.lastAccessed}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {content.devices.map((device, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <span className="mr-1">{getDeviceIcon(device)}</span>
                            {device}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600">
                          <Play className="h-4 w-4 mr-1" />
                          Launch
                        </Button>
                        {content.status === "needs_update" && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="downloads" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Downloads in Progress</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Pause className="h-4 w-4 mr-2" />
                  Pause All
                </Button>
                <Button variant="outline" size="sm">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Resume All
                </Button>
              </div>
            </div>

            {downloads.length > 0 ? (
              <div className="space-y-4">
                {downloads.map((download) => (
                  <Card key={download.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                          <Download className="h-8 w-8 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{download.title}</h3>
                            {getStatusBadge(download.status)}
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <span>{download.category}</span>
                              <span>
                                {download.downloadedSize} / {download.totalSize}
                              </span>
                            </div>
                            <Progress value={download.progress} className="h-2" />
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{download.progress}% complete</span>
                              <span>
                                {download.status === "downloading" ? (
                                  <>
                                    {download.speed} • {download.timeRemaining} remaining
                                  </>
                                ) : download.status === "paused" ? (
                                  "Download paused"
                                ) : (
                                  download.timeRemaining
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {download.status === "downloading" ? (
                            <Button size="sm" variant="outline" onClick={() => pauseDownload(download.id)}>
                              <Pause className="h-4 w-4" />
                            </Button>
                          ) : download.status === "paused" ? (
                            <Button size="sm" variant="outline" onClick={() => resumeDownload(download.id)}>
                              <Play className="h-4 w-4" />
                            </Button>
                          ) : null}
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600"
                            onClick={() => cancelDownload(download.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="font-semibold mb-2">No Active Downloads</h3>
                  <p className="text-gray-600 mb-4">
                    Browse the content library to download XR experiences for offline use.
                  </p>
                  <Button asChild>
                    <Link href="/content-library">Browse Content Library</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
