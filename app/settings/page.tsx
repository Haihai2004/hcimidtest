"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  SettingsIcon,
  Bell,
  Shield,
  Palette,
  Globe,
  Volume2,
  Monitor,
  Download,
  Trash2,
  Key,
  Eye,
  Moon,
  Sun,
} from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // General Settings
    language: "en",
    timezone: "America/Los_Angeles",
    theme: "system",

    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    weeklyDigest: true,

    // Privacy & Security
    profileVisibility: "public",
    dataCollection: true,
    locationTracking: false,
    biometricAuth: true,
    twoFactorAuth: false,

    // Display & Performance
    quality: "auto",
    frameRate: 60,
    motionReduction: false,
    highContrast: false,
    fontSize: 16,

    // Audio
    masterVolume: 80,
    effectsVolume: 70,
    musicVolume: 60,
    voiceVolume: 90,

    // Network & Storage
    autoDownload: true,
    wifiOnly: false,
    storageLimit: 10, // GB
    cacheSize: 2, // GB
  })

  const updateSetting = (key: string, value: any) => {
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
              <SettingsIcon className="h-6 w-6 text-gray-600" />
              <span className="text-xl font-bold">Settings</span>
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
          <h1 className="text-2xl font-bold mb-2">Settings</h1>
          <p className="text-gray-600">Customize your XRConnect experience and preferences.</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="display">Display</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="storage">Storage</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <span>Language & Region</span>
                  </CardTitle>
                  <CardDescription>Set your language and regional preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={settings.language} onValueChange={(value) => updateSetting("language", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="ja">日本語</SelectItem>
                        <SelectItem value="zh">中文</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={settings.timezone} onValueChange={(value) => updateSetting("timezone", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                        <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Japan Standard Time (JST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="h-5 w-5" />
                    <span>Appearance</span>
                  </CardTitle>
                  <CardDescription>Customize the look and feel of XRConnect</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: "light", label: "Light", icon: Sun },
                        { value: "dark", label: "Dark", icon: Moon },
                        { value: "system", label: "System", icon: Monitor },
                      ].map(({ value, label, icon: Icon }) => (
                        <Button
                          key={value}
                          variant={settings.theme === value ? "default" : "outline"}
                          className="h-auto p-3 flex flex-col space-y-2"
                          onClick={() => updateSetting("theme", value)}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="text-xs">{label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
                <CardDescription>Control how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive important updates via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-gray-500">Get real-time notifications in your browser</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => updateSetting("pushNotifications", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing-emails">Marketing Emails</Label>
                    <p className="text-sm text-gray-500">Receive promotional content and special offers</p>
                  </div>
                  <Switch
                    id="marketing-emails"
                    checked={settings.marketingEmails}
                    onCheckedChange={(checked) => updateSetting("marketingEmails", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="weekly-digest">Weekly Digest</Label>
                    <p className="text-sm text-gray-500">Get a summary of your XR activity each week</p>
                  </div>
                  <Switch
                    id="weekly-digest"
                    checked={settings.weeklyDigest}
                    onCheckedChange={(checked) => updateSetting("weeklyDigest", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy & Security */}
          <TabsContent value="privacy">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Privacy Settings</span>
                  </CardTitle>
                  <CardDescription>Control your data privacy and visibility</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="profile-visibility">Profile Visibility</Label>
                    <Select
                      value={settings.profileVisibility}
                      onValueChange={(value) => updateSetting("profileVisibility", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="friends">Friends Only</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-collection">Usage Data Collection</Label>
                      <p className="text-sm text-gray-500">Help improve XRConnect by sharing anonymous usage data</p>
                    </div>
                    <Switch
                      id="data-collection"
                      checked={settings.dataCollection}
                      onCheckedChange={(checked) => updateSetting("dataCollection", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="location-tracking">Location Tracking</Label>
                      <p className="text-sm text-gray-500">Allow location-based features and recommendations</p>
                    </div>
                    <Switch
                      id="location-tracking"
                      checked={settings.locationTracking}
                      onCheckedChange={(checked) => updateSetting("locationTracking", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Key className="h-5 w-5" />
                    <span>Security</span>
                  </CardTitle>
                  <CardDescription>Manage your account security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="biometric-auth">Biometric Authentication</Label>
                      <p className="text-sm text-gray-500">Use fingerprint or face recognition to sign in</p>
                    </div>
                    <Switch
                      id="biometric-auth"
                      checked={settings.biometricAuth}
                      onCheckedChange={(checked) => updateSetting("biometricAuth", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor-auth">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="two-factor-auth"
                        checked={settings.twoFactorAuth}
                        onCheckedChange={(checked) => updateSetting("twoFactorAuth", checked)}
                      />
                      {!settings.twoFactorAuth && (
                        <Button variant="outline" size="sm">
                          Setup
                        </Button>
                      )}
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full">
                      Download My Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Display & Performance */}
          <TabsContent value="display">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Monitor className="h-5 w-5" />
                  <span>Display & Performance</span>
                </CardTitle>
                <CardDescription>Optimize visual settings for your device and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="quality">Graphics Quality</Label>
                  <Select value={settings.quality} onValueChange={(value) => updateSetting("quality", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (Better Performance)</SelectItem>
                      <SelectItem value="medium">Medium (Balanced)</SelectItem>
                      <SelectItem value="high">High (Better Quality)</SelectItem>
                      <SelectItem value="auto">Auto (Recommended)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="frame-rate">Target Frame Rate: {settings.frameRate} FPS</Label>
                  <Slider
                    id="frame-rate"
                    min={30}
                    max={120}
                    step={30}
                    value={[settings.frameRate]}
                    onValueChange={(value) => updateSetting("frameRate", value[0])}
                    className="w-full"
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="font-size">Font Size: {settings.fontSize}px</Label>
                  <Slider
                    id="font-size"
                    min={12}
                    max={24}
                    step={2}
                    value={[settings.fontSize]}
                    onValueChange={(value) => updateSetting("fontSize", value[0])}
                    className="w-full"
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="motion-reduction">Reduce Motion</Label>
                    <p className="text-sm text-gray-500">Minimize animations and transitions</p>
                  </div>
                  <Switch
                    id="motion-reduction"
                    checked={settings.motionReduction}
                    onCheckedChange={(checked) => updateSetting("motionReduction", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="high-contrast">High Contrast</Label>
                    <p className="text-sm text-gray-500">Increase contrast for better visibility</p>
                  </div>
                  <Switch
                    id="high-contrast"
                    checked={settings.highContrast}
                    onCheckedChange={(checked) => updateSetting("highContrast", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audio Settings */}
          <TabsContent value="audio">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Volume2 className="h-5 w-5" />
                  <span>Audio Settings</span>
                </CardTitle>
                <CardDescription>Adjust volume levels and audio preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="master-volume">Master Volume: {settings.masterVolume}%</Label>
                  <Slider
                    id="master-volume"
                    min={0}
                    max={100}
                    step={5}
                    value={[settings.masterVolume]}
                    onValueChange={(value) => updateSetting("masterVolume", value[0])}
                    className="w-full"
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="effects-volume">Sound Effects: {settings.effectsVolume}%</Label>
                  <Slider
                    id="effects-volume"
                    min={0}
                    max={100}
                    step={5}
                    value={[settings.effectsVolume]}
                    onValueChange={(value) => updateSetting("effectsVolume", value[0])}
                    className="w-full"
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="music-volume">Background Music: {settings.musicVolume}%</Label>
                  <Slider
                    id="music-volume"
                    min={0}
                    max={100}
                    step={5}
                    value={[settings.musicVolume]}
                    onValueChange={(value) => updateSetting("musicVolume", value[0])}
                    className="w-full"
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="voice-volume">Voice & Narration: {settings.voiceVolume}%</Label>
                  <Slider
                    id="voice-volume"
                    min={0}
                    max={100}
                    step={5}
                    value={[settings.voiceVolume]}
                    onValueChange={(value) => updateSetting("voiceVolume", value[0])}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Storage & Network */}
          <TabsContent value="storage">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Download className="h-5 w-5" />
                    <span>Download Settings</span>
                  </CardTitle>
                  <CardDescription>Manage how content is downloaded and stored</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-download">Auto-Download Updates</Label>
                      <p className="text-sm text-gray-500">Automatically download content updates</p>
                    </div>
                    <Switch
                      id="auto-download"
                      checked={settings.autoDownload}
                      onCheckedChange={(checked) => updateSetting("autoDownload", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="wifi-only">Wi-Fi Only Downloads</Label>
                      <p className="text-sm text-gray-500">Only download content when connected to Wi-Fi</p>
                    </div>
                    <Switch
                      id="wifi-only"
                      checked={settings.wifiOnly}
                      onCheckedChange={(checked) => updateSetting("wifiOnly", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="storage-limit">Storage Limit: {settings.storageLimit} GB</Label>
                    <Slider
                      id="storage-limit"
                      min={1}
                      max={50}
                      step={1}
                      value={[settings.storageLimit]}
                      onValueChange={(value) => updateSetting("storageLimit", value[0])}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Storage Management</CardTitle>
                  <CardDescription>View and manage your local storage usage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Downloaded Content</span>
                    <span className="text-sm font-medium">2.4 GB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cache</span>
                    <span className="text-sm font-medium">512 MB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">User Data</span>
                    <span className="text-sm font-medium">128 MB</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-medium">
                    <span>Total Used</span>
                    <span>3.0 GB</span>
                  </div>
                  <div className="flex space-x-2 pt-4">
                    <Button variant="outline" className="flex-1">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear Cache
                    </Button>
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href="/offline">
                        <Eye className="h-4 w-4 mr-2" />
                        Manage Downloads
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-end pt-6">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600">Save All Settings</Button>
        </div>
      </div>
    </div>
  )
}
