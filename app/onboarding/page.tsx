"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, ArrowLeft, Smartphone, Monitor, Headphones, Play } from "lucide-react"
import Link from "next/link"

const onboardingSteps = [
  {
    id: 1,
    title: "Welcome to XRConnect",
    description: "Let's get you started with immersive XR experiences",
    content:
      "XRConnect makes it easy to create, manage, and deploy WebXR experiences across any device. This quick tutorial will show you the key features.",
  },
  {
    id: 2,
    title: "Choose Your Device",
    description: "Select your preferred device for XR experiences",
    content: "XRConnect works seamlessly across all devices. Choose your primary device to customize your experience.",
  },
  {
    id: 3,
    title: "Privacy Settings",
    description: "Configure your privacy preferences",
    content: "Your privacy is important. Set your data collection preferences and control what information you share.",
  },
  {
    id: 4,
    title: "Content Library",
    description: "Explore available XR experiences",
    content:
      "Browse our curated library of XR experiences, from educational content to entertainment and productivity tools.",
  },
  {
    id: 5,
    title: "You're Ready!",
    description: "Start exploring immersive experiences",
    content: "Congratulations! You're all set up. Let's dive into your first XR experience.",
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDevice, setSelectedDevice] = useState("")

  const progress = (currentStep / onboardingSteps.length) * 100

  const nextStep = () => {
    if (currentStep < onboardingSteps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentStepData = onboardingSteps.find((step) => step.id === currentStep)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">XR</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                XRConnect
              </span>
            </div>
            <Badge variant="secondary">
              Step {currentStep} of {onboardingSteps.length}
            </Badge>
          </div>
          <Progress value={progress} className="mb-4" />
          <CardTitle>{currentStepData?.title}</CardTitle>
          <CardDescription>{currentStepData?.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-600">{currentStepData?.content}</p>

          {/* Device Selection Step */}
          {currentStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card
                className={`cursor-pointer transition-all ${selectedDevice === "mobile" ? "ring-2 ring-purple-500 bg-purple-50" : "hover:shadow-md"}`}
                onClick={() => setSelectedDevice("mobile")}
              >
                <CardContent className="p-4 text-center">
                  <Smartphone className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h3 className="font-semibold">Mobile</h3>
                  <p className="text-sm text-gray-600">Smartphone & Tablet</p>
                  {selectedDevice === "mobile" && <CheckCircle className="h-5 w-5 text-purple-600 mx-auto mt-2" />}
                </CardContent>
              </Card>
              <Card
                className={`cursor-pointer transition-all ${selectedDevice === "desktop" ? "ring-2 ring-purple-500 bg-purple-50" : "hover:shadow-md"}`}
                onClick={() => setSelectedDevice("desktop")}
              >
                <CardContent className="p-4 text-center">
                  <Monitor className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h3 className="font-semibold">Desktop</h3>
                  <p className="text-sm text-gray-600">Computer & Laptop</p>
                  {selectedDevice === "desktop" && <CheckCircle className="h-5 w-5 text-purple-600 mx-auto mt-2" />}
                </CardContent>
              </Card>
              <Card
                className={`cursor-pointer transition-all ${selectedDevice === "vr" ? "ring-2 ring-purple-500 bg-purple-50" : "hover:shadow-md"}`}
                onClick={() => setSelectedDevice("vr")}
              >
                <CardContent className="p-4 text-center">
                  <Headphones className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h3 className="font-semibold">VR Headset</h3>
                  <p className="text-sm text-gray-600">Immersive VR</p>
                  {selectedDevice === "vr" && <CheckCircle className="h-5 w-5 text-purple-600 mx-auto mt-2" />}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Privacy Settings Step */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Privacy-First Approach</h4>
                <p className="text-green-700 text-sm">
                  XRConnect collects minimal data and gives you full control over your privacy settings.
                </p>
              </div>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Allow analytics to improve your experience</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Share usage data for product development</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Receive product updates and tips</span>
                </label>
              </div>
            </div>
          )}

          {/* Final Step */}
          {currentStep === 5 && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <p className="text-lg font-semibold">Welcome to the future of XR!</p>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600" asChild>
                <Link href="/dashboard">
                  <Play className="mr-2 h-4 w-4" />
                  Launch Dashboard
                </Link>
              </Button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            {currentStep < onboardingSteps.length ? (
              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-purple-600 to-blue-600"
                disabled={currentStep === 2 && !selectedDevice}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600">
                <Link href="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
