"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Shield, Eye, Database, Share2, Bell, Lock, CheckCircle, AlertTriangle, Info } from "lucide-react"

export default function PrivacyPage() {
  const [settings, setSettings] = useState({
    analytics: true,
    personalization: true,
    marketing: false,
    sharing: false,
    notifications: true,
    locationTracking: false,
    biometricData: false,
    thirdPartyIntegration: true,
  })

  const updateSetting = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
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
              <Shield className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold">Privacy Center</span>
            </div>
          </div>

          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="p-6 max-w-4xl mx-auto">
        {/* Privacy Overview */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Your Privacy Dashboard</h1>
          <p className="text-gray-600 mb-6">
            XRConnect is committed to protecting your privacy. Control what data we collect and how it's used.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4 flex items-center space-x-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-semibold text-green-800">Privacy-First Design</p>
                  <p className="text-sm text-green-700">Minimal data collection</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4 flex items-center space-x-3">
                <Lock className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-semibold text-blue-800">Encrypted Storage</p>
                  <p className="text-sm text-blue-700">End-to-end encryption</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-purple-200 bg-purple-50">
              <CardContent className="p-4 flex items-center space-x-3">
                <Eye className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="font-semibold text-purple-800">Full Transparency</p>
                  <p className="text-sm text-purple-700">You control your data</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Data Collection Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Data Collection Preferences</span>
            </CardTitle>
            <CardDescription>Choose what data XRConnect can collect to improve your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium">Usage Analytics</h4>
                <p className="text-sm text-gray-600">Help us improve XRConnect by sharing anonymous usage data</p>
              </div>
              <Switch checked={settings.analytics} onCheckedChange={(checked) => updateSetting("analytics", checked)} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium">Personalization Data</h4>
                <p className="text-sm text-gray-600">Allow us to customize your experience based on your preferences</p>
              </div>
              <Switch
                checked={settings.personalization}
                onCheckedChange={(checked) => updateSetting("personalization", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium">Location Tracking</h4>
                <p className="text-sm text-gray-600">Enable location-based features and content recommendations</p>
                <Badge variant="secondary" className="mt-1">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Sensitive Data
                </Badge>
              </div>
              <Switch
                checked={settings.locationTracking}
                onCheckedChange={(checked) => updateSetting("locationTracking", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium">Biometric Data</h4>
                <p className="text-sm text-gray-600">Eye tracking and gesture data for enhanced XR interactions</p>
                <Badge variant="secondary" className="mt-1">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Sensitive Data
                </Badge>
              </div>
              <Switch
                checked={settings.biometricData}
                onCheckedChange={(checked) => updateSetting("biometricData", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Communication Preferences */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Communication Preferences</span>
            </CardTitle>
            <CardDescription>Control how and when we communicate with you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium">Product Updates</h4>
                <p className="text-sm text-gray-600">Receive notifications about new features and improvements</p>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => updateSetting("notifications", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium">Marketing Communications</h4>
                <p className="text-sm text-gray-600">Promotional emails and special offers</p>
              </div>
              <Switch checked={settings.marketing} onCheckedChange={(checked) => updateSetting("marketing", checked)} />
            </div>
          </CardContent>
        </Card>

        {/* Data Sharing */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Share2 className="h-5 w-5" />
              <span>Data Sharing & Third Parties</span>
            </CardTitle>
            <CardDescription>Manage how your data is shared with external services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium">Third-Party Integrations</h4>
                <p className="text-sm text-gray-600">Allow XRConnect to work with external apps and services</p>
              </div>
              <Switch
                checked={settings.thirdPartyIntegration}
                onCheckedChange={(checked) => updateSetting("thirdPartyIntegration", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium">Data Sharing for Research</h4>
                <p className="text-sm text-gray-600">Contribute anonymized data to XR research initiatives</p>
              </div>
              <Switch checked={settings.sharing} onCheckedChange={(checked) => updateSetting("sharing", checked)} />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Actions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Privacy Actions</CardTitle>
            <CardDescription>Take control of your data with these privacy tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2">
                <div className="flex items-center space-x-2">
                  <Database className="h-4 w-4" />
                  <span className="font-medium">Download My Data</span>
                </div>
                <p className="text-sm text-gray-600 text-left">Get a copy of all data associated with your account</p>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span className="font-medium">View Data Usage</span>
                </div>
                <p className="text-sm text-gray-600 text-left">See how your data has been used in the last 30 days</p>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2">
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4" />
                  <span className="font-medium">Delete Account</span>
                </div>
                <p className="text-sm text-gray-600 text-left">
                  Permanently delete your account and all associated data
                </p>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2">
                <div className="flex items-center space-x-2">
                  <Info className="h-4 w-4" />
                  <span className="font-medium">Privacy Policy</span>
                </div>
                <p className="text-sm text-gray-600 text-left">Read our complete privacy policy and terms of service</p>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* GDPR/CCPA Compliance */}
        <Card>
          <CardHeader>
            <CardTitle>Your Rights</CardTitle>
            <CardDescription>XRConnect complies with GDPR, CCPA, and other privacy regulations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Right to Access</h4>
                <p className="text-sm text-gray-600">You can request access to your personal data at any time</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Right to Rectification</h4>
                <p className="text-sm text-gray-600">You can request correction of inaccurate personal data</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Right to Erasure</h4>
                <p className="text-sm text-gray-600">You can request deletion of your personal data</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Right to Portability</h4>
                <p className="text-sm text-gray-600">You can request your data in a portable format</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800">Need Help?</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Contact our privacy team at privacy@xrconnect.com for any questions about your data rights.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
