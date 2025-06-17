"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  ArrowLeft,
  Smartphone,
  Monitor,
  Headphones,
  RefreshCw,
  Trash2,
  Settings,
  Info,
  CheckCircle,
  AlertTriangle,
  Bluetooth,
  Wifi,
  Zap,
  Battery,
  Eye,
} from "lucide-react"

const devices = [
  {
    id: "device-1",
    name: "Meta Quest 3",
    type: "vr",
    status: "connected",
    lastUsed: "Just now",
    battery: 78,
    firmware: "v52.0",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "device-2",
    name: "iPhone 14 Pro",
    type: "mobile",
    status: "available",
    lastUsed: "2 hours ago",
    battery: 92,
    firmware: "iOS 17.4",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "device-3",
    name: "Windows PC",
    type: "desktop",
    status: "connected",
    lastUsed: "3 days ago",
    battery: null,
    firmware: "Windows 11",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "device-4",
    name: "HTC Vive",
    type: "vr",
    status: "disconnected",
    lastUsed: "2 weeks ago",
    battery: 0,
    firmware: "v3.5.2",
    image: "/placeholder.svg?height=80&width=80",
  },
]

const nearbyDevices = [
  {
    id: "nearby-1",
    name: "Pico 4",
    type: "vr",
    signal: "strong",
    compatible: true,
  },
  {
    id: "nearby-2",
    name: "Unknown Device",
    type: "other",
    signal: "weak",
    compatible: false,
  },
]

export default function DevicesPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)
  const [deviceSettings, setDeviceSettings] = useState({
    autoConnect: true,
    highPerformance: false,
    handTracking: true,
    eyeTracking: false,
  })

  const startScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
    }, 3000)
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "vr":
        return <Headphones className="h-5 w-5" />
      case "mobile":
        return <Smartphone className="h-5 w-5" />
      case "desktop":
        return <Monitor className="h-5 w-5" />
      default:
        return <Smartphone className="h-5 w-5" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-700">
            <CheckCircle className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        )
      case "available":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-700">
            Available
          </Badge>
        )
      case "disconnected":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-700">
            Disconnected
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-700">
            Unknown
          </Badge>
        )
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
              <span className="text-xl font-bold">Device Management</span>
            </div>
          </div>

          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Your XR Devices</h1>
          <p className="text-gray-600">
            Connect and manage your hardware devices for the best XR experience across platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="my-devices">
              <TabsList className="mb-4">
                <TabsTrigger value="my-devices">My Devices</TabsTrigger>
                <TabsTrigger value="add-device">Add Device</TabsTrigger>
              </TabsList>

              <TabsContent value="my-devices" className="space-y-4">
                {devices.map((device) => (
                  <Card
                    key={device.id}
                    className={`hover:shadow-md transition-shadow ${
                      selectedDevice === device.id ? "ring-2 ring-purple-500" : ""
                    }`}
                    onClick={() => setSelectedDevice(device.id === selectedDevice ? null : device.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                          {getDeviceIcon(device.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold">{device.name}</h3>
                            {getStatusBadge(device.status)}
                          </div>
                          <div className="text-sm text-gray-600 mb-2">Last used: {device.lastUsed}</div>
                          <div className="flex items-center space-x-4 text-xs">
                            {device.battery !== null && (
                              <div className="flex items-center space-x-1">
                                <Battery className="h-3 w-3" />
                                <span>{device.battery}%</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-1">
                              <Zap className="h-3 w-3" />
                              <span>{device.firmware}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {device.status === "connected" ? (
                            <Button size="sm" variant="outline">
                              Disconnect
                            </Button>
                          ) : device.status === "available" ? (
                            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                              Connect
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline">
                              Setup
                            </Button>
                          )}
                          <Button size="sm" variant="ghost">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="add-device" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Connect New Device</CardTitle>
                    <CardDescription>
                      Make sure your device is powered on and in pairing mode to be discovered.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bluetooth className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Bluetooth Devices</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={startScan}
                        disabled={isScanning}
                        className="flex items-center space-x-2"
                      >
                        {isScanning ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span>Scanning...</span>
                          </>
                        ) : (
                          <>
                            <RefreshCw className="h-4 w-4" />
                            <span>Scan</span>
                          </>
                        )}
                      </Button>
                    </div>

                    {nearbyDevices.length > 0 ? (
                      <div className="space-y-2">
                        {nearbyDevices.map((device) => (
                          <div
                            key={device.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                          >
                            <div className="flex items-center space-x-3">
                              {getDeviceIcon(device.type)}
                              <div>
                                <p className="font-medium">{device.name}</p>
                                <p className="text-xs text-gray-600">
                                  Signal: {device.signal === "strong" ? "Strong" : "Weak"}
                                </p>
                              </div>
                            </div>
                            {device.compatible ? (
                              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                                Connect
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" disabled>
                                Incompatible
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Bluetooth className="h-6 w-6 text-gray-400" />
                        </div>
                        <p className="text-gray-500">No devices found nearby</p>
                        <p className="text-sm text-gray-400 mt-1">Make sure your device is in pairing mode</p>
                      </div>
                    )}

                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Wifi className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">Network Devices</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 mb-4">
                        <Input placeholder="IP Address or Hostname" className="flex-1" />
                        <Button variant="outline">Connect</Button>
                      </div>

                      <Alert variant="default" className="bg-blue-50 text-blue-800 border-blue-200">
                        <Info className="h-4 w-4" />
                        <AlertTitle>Connection Help</AlertTitle>
                        <AlertDescription className="text-blue-700 text-sm">
                          Some devices may require manual IP configuration. Check your device's documentation for
                          details.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href="/support/device-compatibility">View Compatible Devices</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/support/connection-troubleshooting">Troubleshooting</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Alert variant="default" className="bg-purple-50 border-purple-200">
                  <AlertTriangle className="h-4 w-4 text-purple-600" />
                  <AlertTitle className="text-purple-800">No hardware? No problem!</AlertTitle>
                  <AlertDescription className="text-purple-700">
                    XRConnect works on standard devices too. You can enjoy XR experiences directly in your browser
                    without specialized hardware.
                  </AlertDescription>
                </Alert>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            {selectedDevice ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Device Settings</CardTitle>
                  <CardDescription>Configure your device for optimal XR performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-connect">Auto-Connect</Label>
                      <p className="text-xs text-gray-500">Connect automatically when in range</p>
                    </div>
                    <Switch
                      id="auto-connect"
                      checked={deviceSettings.autoConnect}
                      onCheckedChange={(checked) => setDeviceSettings({ ...deviceSettings, autoConnect: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="high-performance">High Performance Mode</Label>
                      <p className="text-xs text-gray-500">Prioritize quality over battery life</p>
                    </div>
                    <Switch
                      id="high-performance"
                      checked={deviceSettings.highPerformance}
                      onCheckedChange={(checked) => setDeviceSettings({ ...deviceSettings, highPerformance: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="hand-tracking">Hand Tracking</Label>
                      <p className="text-xs text-gray-500">Enable gesture controls</p>
                    </div>
                    <Switch
                      id="hand-tracking"
                      checked={deviceSettings.handTracking}
                      onCheckedChange={(checked) => setDeviceSettings({ ...deviceSettings, handTracking: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="eye-tracking">Eye Tracking</Label>
                      <p className="text-xs text-gray-500">Enable gaze-based interaction</p>
                    </div>
                    <Switch
                      id="eye-tracking"
                      checked={deviceSettings.eyeTracking}
                      onCheckedChange={(checked) => setDeviceSettings({ ...deviceSettings, eyeTracking: checked })}
                    />
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between">
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove Device
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600">Save Settings</Button>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Device Information</CardTitle>
                  <CardDescription>Select a device to view and edit its settings</CardDescription>
                </CardHeader>
                <CardContent className="py-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No device selected</p>
                  <p className="text-sm text-gray-400 mt-1">Click on a device to view its details</p>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/devices/compatibility-checker">
                      <Eye className="h-4 w-4 mr-2" />
                      Check Device Compatibility
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )}

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">XR Experience Optimizer</CardTitle>
                <CardDescription>Get the most out of your hardware</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200 flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800">Device-Optimized Content</p>
                    <p className="text-sm text-green-700">
                      XRConnect automatically adjusts content quality based on your connected devices.
                    </p>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600" asChild>
                  <Link href="/content-library">Browse Compatible Experiences</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
