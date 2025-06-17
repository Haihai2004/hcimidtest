"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, ArrowRight, Lightbulb, Target, Zap } from "lucide-react"

interface DemoTutorialProps {
  isOpen: boolean
  onClose: () => void
  currentFeature: string
}

const tutorialContent = {
  "device-selection": {
    title: "Device-Agnostic Experience",
    description: "XRConnect automatically adapts to any device",
    tips: [
      "Content quality adjusts based on device capabilities",
      "Interface optimizes for screen size and input method",
      "Same experience across mobile, desktop, and VR headsets",
    ],
  },
  "content-library": {
    title: "Smart Content Discovery",
    description: "AI-powered recommendations based on your preferences",
    tips: [
      "Personalized suggestions improve over time",
      "Filter by device compatibility automatically",
      "Preview experiences before launching",
    ],
  },
  "privacy-controls": {
    title: "Privacy-First Design",
    description: "Complete transparency and control over your data",
    tips: [
      "Granular settings for each type of data collection",
      "Real-time privacy dashboard shows data usage",
      "GDPR and CCPA compliant by design",
    ],
  },
  "offline-mode": {
    title: "Hybrid Offline Capabilities",
    description: "Seamless experience regardless of connection",
    tips: [
      "Intelligent content caching for offline access",
      "Progressive loading adapts to bandwidth",
      "Automatic sync when connection is restored",
    ],
  },
}

export default function DemoTutorial({ isOpen, onClose, currentFeature }: DemoTutorialProps) {
  const content = tutorialContent[currentFeature as keyof typeof tutorialContent]

  if (!isOpen || !content) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="mb-2">
              <Lightbulb className="h-3 w-3 mr-1" />
              Tutorial
            </Badge>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-purple-600" />
            <span>{content.title}</span>
          </CardTitle>
          <CardDescription>{content.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {content.tips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Zap className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">{tip}</p>
              </div>
            ))}
          </div>
          <Button onClick={onClose} className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
            Got it! <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
