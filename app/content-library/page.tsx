"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Play,
  Download,
  Star,
  Clock,
  Users,
  ArrowLeft,
  Smartphone,
  Monitor,
  Headphones,
  Globe,
} from "lucide-react"

const experiences = [
  {
    id: 1,
    title: "Virtual Museum Tour",
    description: "Explore ancient artifacts in an immersive 3D environment",
    category: "Education",
    duration: "30 min",
    rating: 4.8,
    users: 1200,
    devices: ["VR", "AR", "Web"],
    thumbnail: "/placeholder.svg?height=200&width=300",
    featured: true,
  },
  {
    id: 2,
    title: "Team Collaboration Space",
    description: "Virtual meeting room with interactive whiteboards and 3D models",
    category: "Productivity",
    duration: "Unlimited",
    rating: 4.6,
    users: 850,
    devices: ["VR", "Web", "Mobile"],
    thumbnail: "/placeholder.svg?height=200&width=300",
    featured: false,
  },
  {
    id: 3,
    title: "3D Product Showcase",
    description: "Interactive product demonstrations with detailed 3D models",
    category: "Business",
    duration: "15 min",
    rating: 4.9,
    users: 2100,
    devices: ["AR", "Web", "Mobile"],
    thumbnail: "/placeholder.svg?height=200&width=300",
    featured: true,
  },
  {
    id: 4,
    title: "Interactive Learning Lab",
    description: "Hands-on science experiments in a virtual laboratory",
    category: "Education",
    duration: "45 min",
    rating: 4.7,
    users: 950,
    devices: ["VR", "Web"],
    thumbnail: "/placeholder.svg?height=200&width=300",
    featured: false,
  },
  {
    id: 5,
    title: "Virtual Workspace",
    description: "Customizable 3D office environment for remote work",
    category: "Productivity",
    duration: "Unlimited",
    rating: 4.5,
    users: 1500,
    devices: ["VR", "AR", "Web", "Mobile"],
    thumbnail: "/placeholder.svg?height=200&width=300",
    featured: false,
  },
  {
    id: 6,
    title: "Architectural Walkthrough",
    description: "Explore building designs before construction",
    category: "Architecture",
    duration: "20 min",
    rating: 4.8,
    users: 680,
    devices: ["VR", "AR", "Web"],
    thumbnail: "/placeholder.svg?height=200&width=300",
    featured: true,
  },
]

export default function ContentLibraryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDevice, setSelectedDevice] = useState("all")

  const filteredExperiences = experiences.filter((exp) => {
    const matchesSearch =
      exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || exp.category.toLowerCase() === selectedCategory
    const matchesDevice =
      selectedDevice === "all" || exp.devices.some((device) => device.toLowerCase() === selectedDevice)

    return matchesSearch && matchesCategory && matchesDevice
  })

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case "vr":
        return <Headphones className="h-3 w-3" />
      case "ar":
        return <Smartphone className="h-3 w-3" />
      case "web":
        return <Globe className="h-3 w-3" />
      case "mobile":
        return <Smartphone className="h-3 w-3" />
      default:
        return <Monitor className="h-3 w-3" />
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
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">XR</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Content Library
              </span>
            </div>
          </div>

          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="p-6">
        {/* Search and Filters */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Explore XR Experiences</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search experiences..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="productivity">Productivity</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="architecture">Architecture</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedDevice} onValueChange={setSelectedDevice}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Device" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Devices</SelectItem>
                <SelectItem value="vr">VR Headset</SelectItem>
                <SelectItem value="ar">AR/Mobile</SelectItem>
                <SelectItem value="web">Web Browser</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Experiences */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Featured Experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiences
              .filter((exp) => exp.featured)
              .map((experience) => (
                <Card key={experience.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                    <Play className="h-12 w-12 text-purple-600" />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{experience.title}</CardTitle>
                        <CardDescription className="mt-1">{experience.description}</CardDescription>
                      </div>
                      <Badge variant="secondary">{experience.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{experience.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{experience.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{experience.users}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {experience.devices.map((device, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <span className="mr-1">{getDeviceIcon(device)}</span>
                            {device}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Smartphone className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                          <Play className="h-4 w-4 mr-1" />
                          Launch
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* All Experiences */}
        <div>
          <h2 className="text-xl font-semibold mb-4">All Experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiences.map((experience) => (
              <Card key={experience.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Play className="h-8 w-8 text-gray-600" />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base">{experience.title}</CardTitle>
                      <CardDescription className="text-sm mt-1">{experience.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {experience.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3 text-xs text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{experience.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{experience.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {experience.devices.slice(0, 2).map((device, index) => (
                        <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                          {getDeviceIcon(device)}
                        </Badge>
                      ))}
                      {experience.devices.length > 2 && (
                        <span className="text-xs text-gray-500">+{experience.devices.length - 2}</span>
                      )}
                    </div>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline" className="h-7 px-2">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button size="sm" className="h-7 px-3 bg-gradient-to-r from-purple-600 to-blue-600">
                        <Play className="h-3 w-3 mr-1" />
                        Launch
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {filteredExperiences.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No experiences found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedDevice("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
