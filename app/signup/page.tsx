"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Shield, CheckCircle, AlertCircle } from "lucide-react"

export default function SignUpPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",

    // Step 2: Preferences
    primaryDevice: "",
    interests: [] as string[],
    experienceLevel: "",

    // Step 3: Privacy & Terms
    agreeToTerms: false,
    agreeToPrivacy: false,
    allowMarketing: false,
    enableAnalytics: true,
  })

  const [passwordStrength, setPasswordStrength] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const deviceOptions = [
    { value: "mobile", label: "Mobile/Tablet", icon: "📱" },
    { value: "desktop", label: "Desktop/Laptop", icon: "💻" },
    { value: "vr", label: "VR Headset", icon: "🥽" },
    { value: "mixed", label: "Multiple Devices", icon: "🔄" },
  ]

  const interestOptions = [
    "Virtual Reality",
    "Augmented Reality",
    "Education",
    "Gaming",
    "Productivity",
    "Art & Design",
    "Science",
    "Architecture",
    "Entertainment",
    "Social",
    "Fitness",
    "Travel",
  ]

  const experienceLevels = [
    { value: "beginner", label: "Beginner", description: "New to XR experiences" },
    { value: "intermediate", label: "Intermediate", description: "Some XR experience" },
    { value: "advanced", label: "Advanced", description: "Experienced XR user" },
    { value: "professional", label: "Professional", description: "XR developer/creator" },
  ]

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }

    // Password strength calculation
    if (field === "password") {
      calculatePasswordStrength(value)
    }
  }

  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25
    setPasswordStrength(strength)
  }

  const toggleInterest = (interest: string) => {
    const currentInterests = formData.interests
    if (currentInterests.includes(interest)) {
      updateFormData(
        "interests",
        currentInterests.filter((i) => i !== interest),
      )
    } else {
      updateFormData("interests", [...currentInterests, interest])
    }
  }

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
      if (!formData.password) newErrors.password = "Password is required"
      else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match"
    }

    if (step === 2) {
      if (!formData.primaryDevice) newErrors.primaryDevice = "Please select your primary device"
      if (formData.interests.length === 0) newErrors.interests = "Please select at least one interest"
      if (!formData.experienceLevel) newErrors.experienceLevel = "Please select your experience level"
    }

    if (step === 3) {
      if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms of service"
      if (!formData.agreeToPrivacy) newErrors.agreeToPrivacy = "You must agree to the privacy policy"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      // Here you would typically submit to your backend
      console.log("Form submitted:", formData)
      // Redirect to onboarding or dashboard
      window.location.href = "/onboarding"
    }
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return "bg-red-500"
    if (passwordStrength < 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return "Very Weak"
    if (passwordStrength < 50) return "Weak"
    if (passwordStrength < 75) return "Good"
    return "Strong"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">XR</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              XRConnect
            </span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary">
              Step {currentStep} of {totalSteps}
            </Badge>
            <div className="text-sm text-gray-500">
              {currentStep === 1 && "Account Details"}
              {currentStep === 2 && "Your Preferences"}
              {currentStep === 3 && "Privacy & Terms"}
            </div>
          </div>

          <Progress value={progress} className="mb-4" />

          <CardTitle>
            {currentStep === 1 && "Create Your Account"}
            {currentStep === 2 && "Personalize Your Experience"}
            {currentStep === 3 && "Almost Done!"}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && "Enter your details to get started with XRConnect"}
            {currentStep === 2 && "Help us customize XR experiences for you"}
            {currentStep === 3 && "Review and accept our terms to complete your registration"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={(e) => updateFormData("firstName", e.target.value)}
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)}
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => updateFormData("password", e.target.value)}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {formData.password && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>Password strength:</span>
                      <span
                        className={`font-medium ${passwordStrength >= 75 ? "text-green-600" : passwordStrength >= 50 ? "text-yellow-600" : "text-red-600"}`}
                      >
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className={`h-1 rounded-full transition-all ${getPasswordStrengthColor()}`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                  </div>
                )}
                {errors.password && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                    className={errors.confirmPassword ? "border-red-500" : ""}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Preferences */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>What's your primary device for XR experiences?</Label>
                <div className="grid grid-cols-2 gap-3">
                  {deviceOptions.map((device) => (
                    <Card
                      key={device.value}
                      className={`cursor-pointer transition-all ${
                        formData.primaryDevice === device.value
                          ? "ring-2 ring-purple-500 bg-purple-50"
                          : "hover:shadow-md"
                      }`}
                      onClick={() => updateFormData("primaryDevice", device.value)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl mb-2">{device.icon}</div>
                        <h3 className="font-medium text-sm">{device.label}</h3>
                        {formData.primaryDevice === device.value && (
                          <CheckCircle className="h-4 w-4 text-purple-600 mx-auto mt-2" />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {errors.primaryDevice && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.primaryDevice}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label>What interests you most? (Select all that apply)</Label>
                <div className="grid grid-cols-3 gap-2">
                  {interestOptions.map((interest) => (
                    <Button
                      key={interest}
                      variant={formData.interests.includes(interest) ? "default" : "outline"}
                      size="sm"
                      className="h-auto p-2 text-xs"
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </Button>
                  ))}
                </div>
                {errors.interests && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.interests}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label>What's your experience level with XR?</Label>
                <div className="space-y-2">
                  {experienceLevels.map((level) => (
                    <Card
                      key={level.value}
                      className={`cursor-pointer transition-all ${
                        formData.experienceLevel === level.value
                          ? "ring-2 ring-purple-500 bg-purple-50"
                          : "hover:shadow-md"
                      }`}
                      onClick={() => updateFormData("experienceLevel", level.value)}
                    >
                      <CardContent className="p-3 flex items-center space-x-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            formData.experienceLevel === level.value
                              ? "border-purple-500 bg-purple-500"
                              : "border-gray-300"
                          }`}
                        >
                          {formData.experienceLevel === level.value && (
                            <div className="w-full h-full rounded-full bg-white scale-50" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{level.label}</h4>
                          <p className="text-sm text-gray-600">{level.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {errors.experienceLevel && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.experienceLevel}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Privacy & Terms */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">Privacy-First Approach</h3>
                <p className="text-blue-700 text-sm">
                  XRConnect is built with privacy at its core. We collect minimal data and give you full control over
                  your information. You can change these settings anytime in your privacy dashboard.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => updateFormData("agreeToTerms", checked)}
                    className={errors.agreeToTerms ? "border-red-500" : ""}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="agreeToTerms" className="text-sm font-medium">
                      I agree to the{" "}
                      <Link href="/terms" className="text-purple-600 hover:underline">
                        Terms of Service
                      </Link>
                    </Label>
                    {errors.agreeToTerms && <p className="text-sm text-red-500">{errors.agreeToTerms}</p>}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeToPrivacy"
                    checked={formData.agreeToPrivacy}
                    onCheckedChange={(checked) => updateFormData("agreeToPrivacy", checked)}
                    className={errors.agreeToPrivacy ? "border-red-500" : ""}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="agreeToPrivacy" className="text-sm font-medium">
                      I agree to the{" "}
                      <Link href="/privacy-policy" className="text-purple-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                    {errors.agreeToPrivacy && <p className="text-sm text-red-500">{errors.agreeToPrivacy}</p>}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="allowMarketing"
                    checked={formData.allowMarketing}
                    onCheckedChange={(checked) => updateFormData("allowMarketing", checked)}
                  />
                  <Label htmlFor="allowMarketing" className="text-sm">
                    I'd like to receive marketing emails about new features and special offers (optional)
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="enableAnalytics"
                    checked={formData.enableAnalytics}
                    onCheckedChange={(checked) => updateFormData("enableAnalytics", checked)}
                  />
                  <Label htmlFor="enableAnalytics" className="text-sm">
                    Help improve XRConnect by sharing anonymous usage analytics (recommended)
                  </Label>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800">Your Data Rights</h4>
                    <p className="text-sm text-green-700 mt-1">
                      You have full control over your data. You can view, download, or delete your information at any
                      time from your privacy dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={nextStep} className="bg-gradient-to-r from-purple-600 to-blue-600">
                Next Step
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-gradient-to-r from-purple-600 to-blue-600">
                Create Account
              </Button>
            )}
          </div>

          {/* Sign In Link */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-purple-600 hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
