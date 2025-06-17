"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Monitor,
  Headphones,
  Eye,
  Hand,
  Zap,
  CheckCircle,
  Info,
  Volume2,
  VolumeX,
} from "lucide-react"

const demoSteps = [
  {
    id: 1,
    title: "Welcome to XRConnect Demo",
    description: "Experience the future of WebXR",
    content: "This interactive demo will show you how XRConnect works across different devices and scenarios.",
    action: "start",
    duration: 3000,
  },
  {
    id: 2,
    title: "Device Selection",
    description: "Choose your preferred device",
    content: "XRConnect automatically adapts to your device. Let's see how it works on different platforms.",
    action: "device-select",
    duration: 4000,
  },
  {
    id: 3,
    title: "Content Discovery",
    description: "Browse XR experiences",
    content: "Our AI-powered recommendation engine suggests content based on your preferences and device capabilities.",
    action: "content-browse",
    duration: 5000,
  },
  {
    id: 4,
    title: "Privacy Controls",
    description: "Your data, your choice",
    content: "Set granular privacy preferences with full transparency about data collection and usage.",
    action: "privacy-demo",
    duration: 4000,
  },
  {
    id: 5,
    title: "XR Experience Launch",
    description: "Immersive content delivery",
    content: "Watch how XRConnect seamlessly launches XR experiences with adaptive quality and offline support.",
    action: "xr-launch",
    duration: 6000,
  },
  {
    id: 6,
    title: "Offline Mode",
    description: "Works anywhere, anytime",
    content: "See how XRConnect continues to work even when your internet connection is unstable.",
    action: "offline-demo",
    duration: 4000,
  },
]

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [selectedDevice, setSelectedDevice] = useState("mobile")
  const [isOffline, setIsOffline] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [demoStarted, setDemoStarted] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && currentStep < demoSteps.length) {
      const currentStepData = demoSteps[currentStep]
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 100 / (currentStepData.duration / 100)
          if (newProgress >= 100) {
            nextStep()
            return 0
          }
          return newProgress
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentStep])

  const startDemo = () => {
    setDemoStarted(true)
    setCurrentStep(0)
    setProgress(0)
    setIsPlaying(true)
  }

  const pauseDemo = () => {
    setIsPlaying(false)
  }

  const resumeDemo = () => {
    setIsPlaying(true)
  }

  const resetDemo = () => {
    setCurrentStep(0)
    setProgress(0)
    setIsPlaying(false)
    setDemoStarted(false)
    setSelectedDevice("mobile")
    setIsOffline(false)
  }

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      setProgress(0)
    } else {
      setIsPlaying(false)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setProgress(0)
    }
  }

  const currentStepData = demoSteps[currentStep]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">XR</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                XRConnect Demo
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="flex items-center space-x-2"
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              <span className="hidden md:inline">Sound</span>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/signup">Try XRConnect</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!demoStarted ? (
          /* Demo Introduction */
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Interactive XRConnect Demo
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Experience how XRConnect revolutionizes WebXR with device-agnostic experiences, privacy-first controls,
                and seamless offline capabilities.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Interactive Walkthrough</h3>
                  <p className="text-sm text-gray-600">Step-by-step guided tour of all features</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Live Previews</h3>
                  <p className="text-sm text-gray-600">See XR experiences in action</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Hand className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Try It Yourself</h3>
                  <p className="text-sm text-gray-600">Interactive elements you can control</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Button size="lg" onClick={startDemo} className="bg-gradient-to-r from-purple-600 to-blue-600">
                <Play className="mr-2 h-5 w-5" />
                Start Interactive Demo
              </Button>
              <p className="text-sm text-gray-500">Demo duration: ~3 minutes</p>
            </div>
          </div>
        ) : (
          /* Demo Interface */
          <div className="max-w-6xl mx-auto">
            {/* Demo Controls */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary">
                      Step {currentStep + 1} of {demoSteps.length}
                    </Badge>
                    <h2 className="text-lg font-semibold">{currentStepData?.title}</h2>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={prevStep} disabled={currentStep === 0}>
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    {isPlaying ? (
                      <Button variant="ghost" size="sm" onClick={pauseDemo}>
                        <Pause className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" onClick={resumeDemo}>
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={nextStep}
                      disabled={currentStep === demoSteps.length - 1}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={resetDemo}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Progress value={progress} className="mb-2" />
                <p className="text-sm text-gray-600">{currentStepData?.description}</p>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Demo Content */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Demo Simulation</CardTitle>
                  <CardDescription>Interactive preview of XRConnect features</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Device Selection Demo */}
                  {currentStepData?.action === "device-select" && (
                    <div className="space-y-4">
                      <h4 className="font-medium">Choose Your Device:</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {["mobile", "desktop", "vr"].map((device) => (
                          <Card
                            key={device}
                            className={`cursor-pointer transition-all ${
                              selectedDevice === device ? "ring-2 ring-purple-500 bg-purple-50" : "hover:shadow-md"
                            }`}
                            onClick={() => setSelectedDevice(device)}
                          >
                            <CardContent className="p-3 text-center">
                              {device === "mobile" && <Smartphone className="h-6 w-6 mx-auto mb-1 text-purple-600" />}
                              {device === "desktop" && <Monitor className="h-6 w-6 mx-auto mb-1 text-purple-600" />}
                              {device === "vr" && <Headphones className="h-6 w-6 mx-auto mb-1 text-purple-600" />}
                              <p className="text-xs font-medium capitalize">{device}</p>
                              {selectedDevice === device && (
                                <CheckCircle className="h-4 w-4 text-purple-600 mx-auto mt-1" />
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700">
                          ✨ XRConnect automatically optimizes the experience for your {selectedDevice} device!
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Content Browse Demo */}
                  {currentStepData?.action === "content-browse" && (
                    <div className="space-y-4">
                      <h4 className="font-medium">Recommended for You:</h4>
                      <div className="space-y-3">
                        {[
                          { title: "Virtual Museum Tour", type: "Education", devices: ["VR", "AR"] },
                          { title: "3D Product Showcase", type: "Business", devices: ["AR", "Web"] },
                          { title: "Team Collaboration", type: "Productivity", devices: ["VR", "Web"] },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                              <Play className="h-5 w-5 text-purple-600" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-sm">{item.title}</h5>
                              <p className="text-xs text-gray-600">{item.type}</p>
                            </div>
                            <div className="flex space-x-1">
                              {item.devices.map((device, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {device}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Privacy Demo */}
                  {currentStepData?.action === "privacy-demo" && (
                    <div className="space-y-4">
                      <h4 className="font-medium">Privacy Controls:</h4>
                      <div className="space-y-3">
                        {[
                          { setting: "Usage Analytics", enabled: true, description: "Help improve XRConnect" },
                          { setting: "Location Tracking", enabled: false, description: "Location-based features" },
                          { setting: "Biometric Data", enabled: false, description: "Eye tracking & gestures" },
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <h5 className="font-medium text-sm">{item.setting}</h5>
                              <p className="text-xs text-gray-600">{item.description}</p>
                            </div>
                            <div
                              className={`w-10 h-6 rounded-full flex items-center transition-colors ${
                                item.enabled ? "bg-green-500" : "bg-gray-300"
                              }`}
                            >
                              <div
                                className={`w-4 h-4 bg-white rounded-full transition-transform ${
                                  item.enabled ? "translate-x-5" : "translate-x-1"
                                }`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-700">🔒 Your privacy settings are saved and encrypted!</p>
                      </div>
                    </div>
                  )}

                  {/* XR Launch Demo */}
                  {currentStepData?.action === "xr-launch" && (
                    <div className="space-y-4">
                      <h4 className="font-medium">Launching XR Experience:</h4>

                      {/* Hardware Connection Panel */}
                      <Card className="border-blue-200 bg-blue-50 mb-3">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-blue-800 text-sm">Hardware Devices</h5>
                            <Button size="sm" variant="ghost" className="h-7 px-2 text-blue-700">
                              Scan
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-2 bg-white rounded-md border border-blue-200">
                              <div className="flex items-center space-x-2">
                                <Headphones className="h-4 w-4 text-green-600" />
                                <div>
                                  <p className="text-xs font-medium">Meta Quest 3</p>
                                  <p className="text-xs text-gray-500">Connected</p>
                                </div>
                              </div>
                              <Badge variant="outline" className="bg-green-100 text-green-700 text-xs">
                                Active
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-white rounded-md border border-blue-200">
                              <div className="flex items-center space-x-2">
                                <Smartphone className="h-4 w-4 text-blue-600" />
                                <div>
                                  <p className="text-xs font-medium">iPhone 14 Pro</p>
                                  <p className="text-xs text-gray-500">Available</p>
                                </div>
                              </div>
                              <Button size="sm" variant="outline" className="h-6 text-xs">
                                Connect
                              </Button>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-white rounded-md border border-blue-200">
                              <div className="flex items-center space-x-2">
                                <Monitor className="h-4 w-4 text-gray-600" />
                                <div>
                                  <p className="text-xs font-medium">HTC Vive</p>
                                  <p className="text-xs text-gray-500">Not detected</p>
                                </div>
                              </div>
                              <Button size="sm" variant="outline" className="h-6 text-xs">
                                Setup
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 animate-pulse" />
                        <div className="text-center z-10">
                          <Zap className="h-12 w-12 text-purple-600 mx-auto mb-2 animate-bounce" />
                          <p className="font-medium text-purple-800">Virtual Museum Loading...</p>
                          <Progress value={progress} className="w-32 mx-auto mt-2" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-2 bg-blue-50 rounded text-center">
                          <p className="font-medium text-blue-800">Quality: Auto</p>
                          <p className="text-blue-600">Adapting to device</p>
                        </div>
                        <div className="p-2 bg-green-50 rounded text-center">
                          <p className="font-medium text-green-800">Streaming: Active</p>
                          <p className="text-green-600">Low latency mode</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Offline Demo */}
                  {currentStepData?.action === "offline-demo" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Network Status:</h4>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setIsOffline(!isOffline)}
                          className={
                            isOffline ? "border-orange-500 text-orange-600" : "border-green-500 text-green-600"
                          }
                        >
                          {isOffline ? "Offline" : "Online"}
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {[
                          { title: "Virtual Museum Tour", cached: true, size: "45 MB" },
                          { title: "3D Product Demo", cached: true, size: "23 MB" },
                          { title: "Team Workspace", cached: false, size: "67 MB" },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className={`flex items-center justify-between p-3 rounded-lg ${
                              item.cached ? "bg-green-50 border border-green-200" : "bg-gray-50 border border-gray-200"
                            }`}
                          >
                            <div>
                              <h5 className="font-medium text-sm">{item.title}</h5>
                              <p className="text-xs text-gray-600">{item.size}</p>
                            </div>
                            <Badge variant={item.cached ? "default" : "secondary"}>
                              {item.cached ? "Available Offline" : "Online Only"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                      {isOffline && (
                        <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <p className="text-sm text-orange-700">
                            📱 You're offline! Cached experiences are still available.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Default/Start Demo */}
                  {currentStepData?.action === "start" && (
                    <div className="text-center py-8">
                      <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                      <h4 className="font-medium mb-2">Welcome to XRConnect!</h4>
                      <p className="text-sm text-gray-600">
                        Get ready to explore the future of WebXR experiences across any device.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Information Panel */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Info className="h-5 w-5" />
                    <span>What's Happening</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">{currentStepData?.title}</h4>
                      <p className="text-sm text-blue-700">{currentStepData?.content}</p>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-medium">Key Features Demonstrated:</h5>
                      <div className="space-y-2">
                        {currentStepData?.action === "device-select" && (
                          <div className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Device-agnostic compatibility</span>
                          </div>
                        )}
                        {currentStepData?.action === "content-browse" && (
                          <div className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>AI-powered content recommendations</span>
                          </div>
                        )}
                        {currentStepData?.action === "privacy-demo" && (
                          <div className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Granular privacy controls</span>
                          </div>
                        )}
                        {currentStepData?.action === "xr-launch" && (
                          <div className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Adaptive streaming quality</span>
                          </div>
                        )}
                        {currentStepData?.action === "offline-demo" && (
                          <div className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Hybrid offline/online mode</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h5 className="font-medium text-sm mb-2">Try This:</h5>
                      <p className="text-xs text-gray-600">
                        {currentStepData?.action === "device-select" &&
                          "Click on different devices to see how XRConnect adapts the interface."}
                        {currentStepData?.action === "content-browse" &&
                          "Notice how content is filtered based on your device capabilities."}
                        {currentStepData?.action === "privacy-demo" &&
                          "Each setting shows exactly what data is collected and why."}
                        {currentStepData?.action === "xr-launch" &&
                          "Watch the quality automatically adjust based on your connection."}
                        {currentStepData?.action === "offline-demo" &&
                          "Toggle the network status to see offline capabilities in action."}
                        {currentStepData?.action === "start" && "Sit back and enjoy the guided tour!"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Demo Complete */}
            {currentStep === demoSteps.length - 1 && !isPlaying && (
              <Card className="mt-6 border-green-200 bg-green-50">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-800 mb-2">Demo Complete!</h3>
                  <p className="text-green-700 mb-6">
                    You've experienced all five innovative features of XRConnect. Ready to get started?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600" asChild>
                      <Link href="/signup">Start Free Trial</Link>
                    </Button>
                    <Button variant="outline" onClick={resetDemo}>
                      Watch Demo Again
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/onboarding">Interactive Onboarding</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
