import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Smartphone, Monitor, Headphones, Shield, Users, Wifi, WifiOff } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">XR</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              XRConnect
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-600 hover:text-gray-900">
              Features
            </Link>
            <Link href="#demo" className="text-gray-600 hover:text-gray-900">
              Demo
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Login
            </Link>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200">
            Next-Generation WebXR Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Connect Any Device to
            <br />
            Immersive XR Experiences
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            XRConnect delivers seamless WebXR experiences across all devices with centralized management, privacy-first
            controls, and intelligent offline capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Link href="/demo">
                Try Live Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/onboarding">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Five Key Features */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Five Innovative Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Revolutionary capabilities that set XRConnect apart from traditional XR platforms
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Device-agnostic */}
            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Smartphone className="h-6 w-6 text-purple-600" />
                  </div>
                  <Badge variant="secondary">Core Feature</Badge>
                </div>
                <CardTitle>Device-Agnostic WebXR</CardTitle>
                <CardDescription>
                  Seamless XR experiences across mobile, desktop, and VR headsets without platform restrictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Monitor className="h-4 w-4" />
                  <Smartphone className="h-4 w-4" />
                  <Headphones className="h-4 w-4" />
                  <span>Universal Compatibility</span>
                </div>
              </CardContent>
            </Card>

            {/* Feature 2: Centralized Management */}
            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <Badge variant="secondary">Management</Badge>
                </div>
                <CardTitle>Centralized Content & Device Management</CardTitle>
                <CardDescription>
                  Unified dashboard for managing XR content, user devices, and deployment across your organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-500">Enterprise-grade control panel</div>
              </CardContent>
            </Card>

            {/* Feature 3: Privacy-First */}
            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <Badge variant="secondary">Security</Badge>
                </div>
                <CardTitle>Privacy-First Controls</CardTitle>
                <CardDescription>
                  Granular privacy settings with transparent data collection and user-controlled permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-500">GDPR & CCPA Compliant</div>
              </CardContent>
            </Card>

            {/* Feature 4: Guided Onboarding */}
            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <ArrowRight className="h-6 w-6 text-orange-600" />
                  </div>
                  <Badge variant="secondary">UX</Badge>
                </div>
                <CardTitle>Guided Onboarding & Help</CardTitle>
                <CardDescription>
                  Interactive tutorials and contextual assistance that adapts to user experience level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-500">Smart contextual guidance</div>
              </CardContent>
            </Card>

            {/* Feature 5: Hybrid Mode */}
            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow lg:col-span-2">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Wifi className="h-6 w-6 text-indigo-600" />
                  </div>
                  <Badge variant="secondary">Innovation</Badge>
                </div>
                <CardTitle>Hybrid Offline/Low-Bandwidth Mode</CardTitle>
                <CardDescription>
                  Intelligent content caching and progressive loading for uninterrupted XR experiences in any network
                  condition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Wifi className="h-4 w-4" />
                    <span>Online Mode</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <WifiOff className="h-4 w-4" />
                    <span>Offline Mode</span>
                  </div>
                  <span>Seamless Transition</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your XR Experience?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of developers and organizations already using XRConnect to deliver next-generation immersive
            experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/onboarding">
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600"
              asChild
            >
              <Link href="/demo">View Live Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">XR</span>
                </div>
                <span className="text-xl font-bold">XRConnect</span>
              </div>
              <p className="text-gray-400">The future of WebXR experiences, available today.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/features" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/demo" className="hover:text-white">
                    Demo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/docs" className="hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 XRConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
