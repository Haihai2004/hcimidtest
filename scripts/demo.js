// Demo functionality
let currentStep = 0
let isPlaying = false
let demoInterval = null
let soundEnabled = true

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

document.addEventListener("DOMContentLoaded", () => {
  initDemo()
})

function initDemo() {
  // Initialize sound toggle
  initSoundToggle()

  // Initialize demo state
  updateTotalSteps()
}

function initSoundToggle() {
  const soundToggle = document.getElementById("soundToggle")

  if (soundToggle) {
    soundToggle.addEventListener("click", () => {
      soundEnabled = !soundEnabled
      updateSoundToggle()
    })
  }
}

function updateSoundToggle() {
  const soundToggle = document.getElementById("soundToggle")
  const icon = soundToggle.querySelector("svg")

  if (soundEnabled) {
    icon.innerHTML = `
            <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
        `
  } else {
    icon.innerHTML = `
            <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
            <line x1="23" x2="17" y1="9" y2="15"/>
            <line x1="17" x2="23" y1="9" y2="15"/>
        `
  }
}

function updateTotalSteps() {
  const totalStepsElement = document.getElementById("totalSteps")
  if (totalStepsElement) {
    totalStepsElement.textContent = demoSteps.length
  }
}

function startDemo() {
  // Hide intro and show interface
  document.getElementById("demoIntro").classList.add("hidden")
  document.getElementById("demoInterface").classList.remove("hidden")

  // Start from first step
  currentStep = 0
  isPlaying = true

  // Update UI
  updateDemoStep()
  startDemoProgress()
}

function resetDemo() {
  // Stop any running intervals
  if (demoInterval) {
    clearInterval(demoInterval)
    demoInterval = null
  }

  // Reset state
  currentStep = 0
  isPlaying = false

  // Hide interface and show intro
  document.getElementById("demoInterface").classList.add("hidden")
  document.getElementById("demoComplete").classList.add("hidden")
  document.getElementById("demoIntro").classList.remove("hidden")

  // Reset progress
  updateProgress(0)
}

function toggleDemo() {
  isPlaying = !isPlaying

  if (isPlaying) {
    startDemoProgress()
  } else {
    if (demoInterval) {
      clearInterval(demoInterval)
      demoInterval = null
    }
  }

  updatePlayPauseButton()
}

function nextStep() {
  if (currentStep < demoSteps.length - 1) {
    currentStep++
    updateDemoStep()

    if (isPlaying) {
      startDemoProgress()
    }
  } else {
    // Demo complete
    showDemoComplete()
  }
}

function previousStep() {
  if (currentStep > 0) {
    currentStep--
    updateDemoStep()

    if (isPlaying) {
      startDemoProgress()
    }
  }
}

function updateDemoStep() {
  const step = demoSteps[currentStep]

  // Update step counter
  document.getElementById("stepCounter").textContent = currentStep + 1

  // Update title and description
  document.getElementById("demoTitle").textContent = step.title
  document.getElementById("demoDescription").textContent = step.description

  // Update navigation buttons
  document.getElementById("prevBtn").disabled = currentStep === 0
  document.getElementById("nextBtn").disabled = currentStep === demoSteps.length - 1

  // Update content
  updateSimulationContent(step)
  updateInfoContent(step)

  // Reset progress
  updateProgress(0)
}

function updateSimulationContent(step) {
  const simulationContent = document.getElementById("simulationContent")

  switch (step.action) {
    case "start":
      simulationContent.innerHTML = getStartContent()
      break
    case "device-select":
      simulationContent.innerHTML = getDeviceSelectContent()
      initDeviceSelection()
      break
    case "content-browse":
      simulationContent.innerHTML = getContentBrowseContent()
      break
    case "privacy-demo":
      simulationContent.innerHTML = getPrivacyDemoContent()
      initPrivacyToggles()
      break
    case "xr-launch":
      simulationContent.innerHTML = getXRLaunchContent()
      break
    case "offline-demo":
      simulationContent.innerHTML = getOfflineDemoContent()
      initOfflineToggle()
      break
  }
}

function updateInfoContent(step) {
  const infoContent = document.getElementById("infoContent")

  const infoData = {
    start: {
      highlight: "Welcome to XRConnect!",
      content: "Get ready to explore the future of WebXR experiences across any device.",
      features: [],
      tip: "Sit back and enjoy the guided tour!",
    },
    "device-select": {
      highlight: "Device-Agnostic Experience",
      content: "XRConnect automatically adapts to any device.",
      features: ["Device-agnostic compatibility"],
      tip: "Click on different devices to see how XRConnect adapts the interface.",
    },
    "content-browse": {
      highlight: "Smart Content Discovery",
      content: "AI-powered recommendations based on your preferences.",
      features: ["AI-powered content recommendations"],
      tip: "Notice how content is filtered based on your device capabilities.",
    },
    "privacy-demo": {
      highlight: "Privacy-First Design",
      content: "Complete transparency and control over your data.",
      features: ["Granular privacy controls"],
      tip: "Each setting shows exactly what data is collected and why.",
    },
    "xr-launch": {
      highlight: "Immersive Content Delivery",
      content: "Watch how XRConnect seamlessly launches XR experiences.",
      features: ["Adaptive streaming quality"],
      tip: "Watch the quality automatically adjust based on your connection.",
    },
    "offline-demo": {
      highlight: "Hybrid Offline Capabilities",
      content: "Seamless experience regardless of connection.",
      features: ["Hybrid offline/online mode"],
      tip: "Toggle the network status to see offline capabilities in action.",
    },
  }

  const info = infoData[step.action]

  infoContent.innerHTML = `
        <div class="info-highlight">
            <h4>${info.highlight}</h4>
            <p>${info.content}</p>
        </div>
        
        ${
          info.features.length > 0
            ? `
        <div class="info-features">
            <h5>Key Features Demonstrated:</h5>
            <div class="feature-list">
                ${info.features
                  .map(
                    (feature) => `
                    <div class="feature-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 6 9 17l-5-5"/>
                        </svg>
                        <span>${feature}</span>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        </div>
        `
            : ""
        }
        
        <div class="info-tip">
            <h5>Try This:</h5>
            <p>${info.tip}</p>
        </div>
    `
}

function getStartContent() {
  return `
        <div class="start-demo">
            <div class="demo-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="5,3 19,12 5,21"/>
                </svg>
            </div>
            <h4>Welcome to XRConnect!</h4>
            <p>Get ready to explore the future of WebXR experiences across any device.</p>
        </div>
    `
}

function getDeviceSelectContent() {
  return `
        <div class="device-selection">
            <h4>Choose Your Device:</h4>
            <div class="device-grid-demo">
                <div class="device-option-demo" data-device="mobile">
                    <svg class="device-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
                        <path d="M12 18h.01"/>
                    </svg>
                    <p class="device-title">Mobile</p>
                    <svg class="device-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 6 9 17l-5-5"/>
                    </svg>
                </div>
                <div class="device-option-demo" data-device="desktop">
                    <svg class="device-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect width="20" height="14" x="2" y="3" rx="2" ry="2"/>
                        <line x1="8" x2="16" y1="21" y2="21"/>
                        <line x1="12" x2="12" y1="17" y2="21"/>
                    </svg>
                    <p class="device-title">Desktop</p>
                    <svg class="device-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 6 9 17l-5-5"/>
                    </svg>
                </div>
                <div class="device-option-demo" data-device="vr">
                    <svg class="device-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0"/>
                        <path d="M17 12h.01"/>
                        <path d="M7 12h.01"/>
                    </svg>
                    <p class="device-title">VR</p>
                    <svg class="device-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 6 9 17l-5-5"/>
                    </svg>
                </div>
            </div>
            <div class="device-feedback">
                ✨ XRConnect automatically optimizes the experience for your <span id="selectedDevice">mobile</span> device!
            </div>
        </div>
    `
}

function getContentBrowseContent() {
  return `
        <div class="content-browse">
            <h4>Recommended for You:</h4>
            <div class="content-list">
                <div class="content-item">
                    <div class="content-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="5,3 19,12 5,21"/>
                        </svg>
                    </div>
                    <div class="content-info">
                        <h5 class="content-title">Virtual Museum Tour</h5>
                        <p class="content-meta">Education</p>
                    </div>
                    <div class="content-badges">
                        <div class="badge">VR</div>
                        <div class="badge">AR</div>
                    </div>
                </div>
                <div class="content-item">
                    <div class="content-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="5,3 19,12 5,21"/>
                        </svg>
                    </div>
                    <div class="content-info">
                        <h5 class="content-title">3D Product Showcase</h5>
                        <p class="content-meta">Business</p>
                    </div>
                    <div class="content-badges">
                        <div class="badge">AR</div>
                        <div class="badge">Web</div>
                    </div>
                </div>
                <div class="content-item">
                    <div class="content-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="5,3 19,12 5,21"/>
                        </svg>
                    </div>
                    <div class="content-info">
                        <h5 class="content-title">Team Collaboration</h5>
                        <p class="content-meta">Productivity</p>
                    </div>
                    <div class="content-badges">
                        <div class="badge">VR</div>
                        <div class="badge">Web</div>
                    </div>
                </div>
            </div>
        </div>
    `
}

function getPrivacyDemoContent() {
  return `
        <div class="privacy-demo">
            <h4>Privacy Controls:</h4>
            <div class="privacy-settings">
                <div class="privacy-setting">
                    <div class="setting-info">
                        <h5>Usage Analytics</h5>
                        <p>Help improve XRConnect</p>
                    </div>
                    <div class="setting-toggle enabled" data-setting="analytics"></div>
                </div>
                <div class="privacy-setting">
                    <div class="setting-info">
                        <h5>Location Tracking</h5>
                        <p>Location-based features</p>
                    </div>
                    <div class="setting-toggle disabled" data-setting="location"></div>
                </div>
                <div class="privacy-setting">
                    <div class="setting-info">
                        <h5>Biometric Data</h5>
                        <p>Eye tracking & gestures</p>
                    </div>
                    <div class="setting-toggle disabled" data-setting="biometric"></div>
                </div>
            </div>
            <div class="privacy-feedback">
                🔒 Your privacy settings are saved and encrypted!
            </div>
        </div>
    `
}

function getXRLaunchContent() {
  return `
        <div class="xr-launch">
            <h4>Launching XR Experience:</h4>
            
            <div class="hardware-panel">
                <div class="hardware-header">
                    <h5>Hardware Devices</h5>
                    <button class="btn btn-ghost btn-sm">Scan</button>
                </div>
                <div class="hardware-list">
                    <div class="hardware-device">
                        <div class="device-info">
                            <svg style="color: var(--green-600);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0"/>
                                <path d="M17 12h.01"/>
                                <path d="M7 12h.01"/>
                            </svg>
                            <div class="device-details">
                                <h6>Meta Quest 3</h6>
                                <p>Connected</p>
                            </div>
                        </div>
                        <div class="badge" style="background: var(--green-100); color: var(--green-700);">Active</div>
                    </div>
                    <div class="hardware-device">
                        <div class="device-info">
                            <svg style="color: var(--blue-600);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
                                <path d="M12 18h.01"/>
                            </svg>
                            <div class="device-details">
                                <h6>iPhone 14 Pro</h6>
                                <p>Available</p>
                            </div>
                        </div>
                        <button class="btn btn-outline btn-sm">Connect</button>
                    </div>
                </div>
            </div>
            
            <div class="xr-preview">
                <div class="preview-content">
                    <svg class="preview-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                    <p class="preview-text">Virtual Museum Loading...</p>
                    <div class="preview-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 75%;"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="xr-status">
                <div class="status-item quality">
                    <p class="status-label">Quality: Auto</p>
                    <p class="status-value">Adapting to device</p>
                </div>
                <div class="status-item streaming">
                    <p class="status-label">Streaming: Active</p>
                    <p class="status-value">Low latency mode</p>
                </div>
            </div>
        </div>
    `
}

function getOfflineDemoContent() {
  return `
        <div class="offline-demo">
            <div class="network-status">
                <h5>Network Status:</h5>
                <button class="network-toggle online" id="networkToggle">Online</button>
            </div>
            <div class="offline-content">
                <div class="offline-item available">
                    <div class="item-info">
                        <h5>Virtual Museum Tour</h5>
                        <p>45 MB</p>
                    </div>
                    <div class="item-status">Available Offline</div>
                </div>
                <div class="offline-item available">
                    <div class="item-info">
                        <h5>3D Product Demo</h5>
                        <p>23 MB</p>
                    </div>
                    <div class="item-status">Available Offline</div>
                </div>
                <div class="offline-item unavailable">
                    <div class="item-info">
                        <h5>Team Workspace</h5>
                        <p>67 MB</p>
                    </div>
                    <div class="item-status">Online Only</div>
                </div>
            </div>
            <div class="offline-notification hidden" id="offlineNotification">
                📱 You're offline! Cached experiences are still available.
            </div>
        </div>
    `
}

function initDeviceSelection() {
  const deviceOptions = document.querySelectorAll(".device-option-demo")

  deviceOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove previous selection
      deviceOptions.forEach((opt) => opt.classList.remove("selected"))

      // Add selection to clicked option
      this.classList.add("selected")

      // Update feedback text
      const selectedDevice = this.dataset.device
      const feedbackElement = document.getElementById("selectedDevice")
    })
  })
}

function startDemoProgress() {
  // Placeholder for startDemoProgress function
}

function updateProgress(progress) {
  // Placeholder for updateProgress function
}

function updatePlayPauseButton() {
  // Placeholder for updatePlayPauseButton function
}

function showDemoComplete() {
  // Placeholder for showDemoComplete function
}

function initPrivacyToggles() {
  // Placeholder for initPrivacyToggles function
}

function initOfflineToggle() {
  // Placeholder for initOfflineToggle function
}
