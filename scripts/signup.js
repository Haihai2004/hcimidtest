// Sign up form functionality
document.addEventListener("DOMContentLoaded", () => {
  initSignupForm()
})

let currentStep = 1
const totalSteps = 3
const formData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  primaryDevice: "",
  interests: [],
  experienceLevel: "",
  agreeToTerms: false,
  agreeToPrivacy: false,
  allowMarketing: false,
  enableAnalytics: true,
}

// Mock XRConnect object for demonstration purposes
const XRConnect = {
  calculatePasswordStrength: (password) => {
    // Implement your password strength calculation logic here
    // This is a placeholder implementation
    let strength = "weak"
    if (password.length >= 8) {
      strength = "medium"
      if (/[A-Z]/.test(password) && /[0-9]/.test(password)) {
        strength = "strong"
      }
    }
    return { strength: strength }
  },
  validateEmail: (email) => {
    // Implement your email validation logic here
    // This is a placeholder implementation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },
  saveToStorage: (key, data) => {
    // Implement your storage logic here
    // This is a placeholder implementation
    localStorage.setItem(key, JSON.stringify(data))
  },
}

function initSignupForm() {
  // Initialize form interactions
  initDeviceSelection()
  initInterestSelection()
  initExperienceSelection()
  initPasswordStrength()
  initFormValidation()

  // Set initial step
  updateStep()
}

function initDeviceSelection() {
  const deviceOptions = document.querySelectorAll(".device-option")

  deviceOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove previous selection
      deviceOptions.forEach((opt) => opt.classList.remove("selected"))

      // Add selection to clicked option
      this.classList.add("selected")

      // Update form data
      formData.primaryDevice = this.dataset.device

      // Clear error
      clearError("deviceError")
    })
  })
}

function initInterestSelection() {
  const interestTags = document.querySelectorAll(".interest-tag")

  interestTags.forEach((tag) => {
    tag.addEventListener("click", function () {
      const interest = this.dataset.interest

      if (this.classList.contains("selected")) {
        // Remove interest
        this.classList.remove("selected")
        formData.interests = formData.interests.filter((i) => i !== interest)
      } else {
        // Add interest
        this.classList.add("selected")
        formData.interests.push(interest)
      }

      // Clear error if at least one interest is selected
      if (formData.interests.length > 0) {
        clearError("interestsError")
      }
    })
  })
}

function initExperienceSelection() {
  const experienceOptions = document.querySelectorAll(".experience-option")

  experienceOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove previous selection
      experienceOptions.forEach((opt) => opt.classList.remove("selected"))

      // Add selection to clicked option
      this.classList.add("selected")

      // Update form data
      formData.experienceLevel = this.dataset.level

      // Clear error
      clearError("experienceError")
    })
  })
}

function initPasswordStrength() {
  const passwordInput = document.getElementById("password")
  const strengthIndicator = document.getElementById("passwordStrength")
  const strengthFill = document.getElementById("strengthFill")
  const strengthText = document.getElementById("strengthText")

  passwordInput.addEventListener("input", function () {
    const password = this.value

    if (password.length > 0) {
      strengthIndicator.style.display = "block"

      const result = XRConnect.calculatePasswordStrength(password)

      strengthFill.className = `strength-fill ${result.strength}`
      strengthText.textContent = result.strength.charAt(0).toUpperCase() + result.strength.slice(1)

      // Update form data
      formData.password = password
    } else {
      strengthIndicator.style.display = "none"
    }
  })
}

function initFormValidation() {
  // Real-time validation for inputs
  const inputs = document.querySelectorAll("input[required]")

  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this)
    })

    input.addEventListener("input", function () {
      // Clear error on input
      const errorElement = document.getElementById(this.id + "Error")
      if (errorElement) {
        errorElement.textContent = ""
      }

      // Update form data
      formData[this.id] = this.value
    })
  })

  // Checkbox validation
  const checkboxes = document.querySelectorAll('input[type="checkbox"]')
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      formData[this.id] = this.checked

      // Clear error for required checkboxes
      if (this.required) {
        clearError(this.id + "Error")
      }
    })
  })
}

function validateField(field) {
  const value = field.value.trim()
  const fieldName = field.id
  let isValid = true
  let errorMessage = ""

  switch (fieldName) {
    case "firstName":
    case "lastName":
      if (!value) {
        errorMessage = `${fieldName === "firstName" ? "First" : "Last"} name is required`
        isValid = false
      }
      break

    case "email":
      if (!value) {
        errorMessage = "Email is required"
        isValid = false
      } else if (!XRConnect.validateEmail(value)) {
        errorMessage = "Please enter a valid email address"
        isValid = false
      }
      break

    case "password":
      if (!value) {
        errorMessage = "Password is required"
        isValid = false
      } else if (value.length < 8) {
        errorMessage = "Password must be at least 8 characters"
        isValid = false
      }
      break

    case "confirmPassword":
      if (!value) {
        errorMessage = "Please confirm your password"
        isValid = false
      } else if (value !== formData.password) {
        errorMessage = "Passwords do not match"
        isValid = false
      }
      break
  }

  if (!isValid) {
    showError(fieldName + "Error", errorMessage)
  } else {
    clearError(fieldName + "Error")
  }

  return isValid
}

function validateStep(step) {
  let isValid = true

  switch (step) {
    case 1:
      // Validate basic information
      const requiredFields = ["firstName", "lastName", "email", "password", "confirmPassword"]
      requiredFields.forEach((fieldId) => {
        const field = document.getElementById(fieldId)
        if (!validateField(field)) {
          isValid = false
        }
      })
      break

    case 2:
      // Validate preferences
      if (!formData.primaryDevice) {
        showError("deviceError", "Please select your primary device")
        isValid = false
      }

      if (formData.interests.length === 0) {
        showError("interestsError", "Please select at least one interest")
        isValid = false
      }

      if (!formData.experienceLevel) {
        showError("experienceError", "Please select your experience level")
        isValid = false
      }
      break

    case 3:
      // Validate terms and privacy
      if (!document.getElementById("agreeTerms").checked) {
        showError("termsError", "You must agree to the Terms of Service")
        isValid = false
      }

      if (!document.getElementById("agreePrivacy").checked) {
        showError("privacyError", "You must agree to the Privacy Policy")
        isValid = false
      }
      break
  }

  return isValid
}

function nextStep() {
  if (validateStep(currentStep)) {
    if (currentStep < totalSteps) {
      currentStep++
      updateStep()
    }
  }
}

function previousStep() {
  if (currentStep > 1) {
    currentStep--
    updateStep()
  }
}

function updateStep() {
  // Update step indicator
  document.getElementById("currentStep").textContent = currentStep

  // Update progress bar
  const progress = (currentStep / totalSteps) * 100
  document.getElementById("progressFill").style.width = progress + "%"

  // Update step content
  const stepLabels = ["Account Details", "Your Preferences", "Privacy & Terms"]
  const stepTitles = ["Create Your Account", "Personalize Your Experience", "Almost Done!"]
  const stepDescriptions = [
    "Enter your details to get started with XRConnect",
    "Help us customize XR experiences for you",
    "Review and accept our terms to complete your registration",
  ]

  document.getElementById("stepLabel").textContent = stepLabels[currentStep - 1]
  document.getElementById("stepTitle").textContent = stepTitles[currentStep - 1]
  document.getElementById("stepDescription").textContent = stepDescriptions[currentStep - 1]

  // Show/hide step content
  document.querySelectorAll(".step-content").forEach((content, index) => {
    if (index + 1 === currentStep) {
      content.classList.add("active")
    } else {
      content.classList.remove("active")
    }
  })

  // Update navigation buttons
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")
  const submitBtn = document.getElementById("submitBtn")

  prevBtn.disabled = currentStep === 1

  if (currentStep === totalSteps) {
    nextBtn.style.display = "none"
    submitBtn.style.display = "inline-flex"
  } else {
    nextBtn.style.display = "inline-flex"
    submitBtn.style.display = "none"
  }
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId)
  if (errorElement) {
    errorElement.innerHTML = `
            <svg style="width: 0.75rem; height: 0.75rem;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" x2="9" y1="9" y2="15"/>
                <line x1="9" x2="15" y1="9" y2="15"/>
            </svg>
            ${message}
        `
  }
}

function clearError(elementId) {
  const errorElement = document.getElementById(elementId)
  if (errorElement) {
    errorElement.textContent = ""
  }
}

// Form submission
document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault()

  if (validateStep(currentStep)) {
    // Show loading state
    const submitBtn = document.getElementById("submitBtn")
    submitBtn.disabled = true
    submitBtn.innerHTML = `
            <svg style="width: 1rem; height: 1rem; animation: spin 1s linear infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
            Creating Account...
        `

    // Simulate account creation
    setTimeout(() => {
      // Save user data
      XRConnect.saveToStorage("user", {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      })

      // Redirect to onboarding
      window.location.href = "onboarding.html"
    }, 2000)
  }
})

// Make functions available globally
window.nextStep = nextStep
window.previousStep = previousStep
