// Dashboard functionality
document.addEventListener("DOMContentLoaded", () => {
  initDashboard()
})

// Mock XRConnect object for demonstration purposes
const XRConnect = {
  loadFromStorage: (key) => {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (e) {
      return null
    }
  },
  saveToStorage: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  },
}

function initDashboard() {
  // Check if user is logged in
  const user = XRConnect.loadFromStorage("user")
  if (!user) {
    window.location.href = "login.html"
    return
  }

  // Initialize dashboard components
  initUserGreeting(user)
  initOfflineToggle()
  initQuickActions()
  initActivityUpdates()
}

function initUserGreeting(user) {
  const welcomeTitle = document.querySelector(".welcome-title")
  if (welcomeTitle && user.name) {
    const firstName = user.name.split(" ")[0]
    welcomeTitle.textContent = `Welcome back, ${firstName}!`
  }
}

function initOfflineToggle() {
  const statusBadge = document.querySelector(".status-badge")
  let isOffline = false

  if (statusBadge) {
    statusBadge.addEventListener("click", () => {
      window.toggleOfflineMode()
    })
  }

  window.toggleOfflineMode = () => {
    isOffline = !isOffline
    updateOfflineStatus(isOffline)
  }
}

function updateOfflineStatus(isOffline) {
  const statusBadge = document.querySelector(".status-badge")

  if (statusBadge) {
    if (isOffline) {
      statusBadge.className = "status-badge offline"
      statusBadge.innerHTML = `
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="4" x2="20" y1="12" y2="12"/>
                    <line x1="4" x2="20" y1="6" y2="6"/>
                    <line x1="4" x2="20" y1="18" y2="18"/>
                </svg>
                Offline Mode
            `
    } else {
      statusBadge.className = "status-badge online"
      statusBadge.innerHTML = `
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m2 3 20 0"/>
                    <path d="M12 3v17"/>
                    <path d="m15 9-3 3 3 3"/>
                </svg>
                Online
            `
    }
  }

  // Update quick action button
  const offlineAction = document.querySelector('.quick-action[onclick="toggleOfflineMode()"]')
  if (offlineAction) {
    const span = offlineAction.querySelector("span")
    if (span) {
      span.textContent = isOffline ? "Go Online" : "Offline Mode"
    }
  }

  // Save offline state
  XRConnect.saveToStorage("offlineMode", isOffline)
}

function initQuickActions() {
  const quickActions = document.querySelectorAll(".quick-action")

  quickActions.forEach((action) => {
    action.addEventListener("click", function (e) {
      // Add click animation
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)
    })
  })
}

function initActivityUpdates() {
  // Simulate real-time activity updates
  setInterval(updateActivityTimestamps, 60000) // Update every minute
}

function updateActivityTimestamps() {
  const activityItems = document.querySelectorAll(".activity-meta")

  activityItems.forEach((item) => {
    const text = item.textContent

    // Update relative timestamps
    if (text.includes("hours ago")) {
      const hours = Number.parseInt(text.match(/\d+/)[0])
      if (hours < 24) {
        item.textContent = text.replace(/\d+ hours ago/, `${hours + 1} hours ago`)
      }
    }
  })
}

// Search functionality
const searchInput = document.querySelector(".search-input")
if (searchInput) {
  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase()

    if (query.length > 2) {
      // Simulate search suggestions
      showSearchSuggestions(query)
    } else {
      hideSearchSuggestions()
    }
  })

  searchInput.addEventListener("blur", () => {
    // Hide suggestions after a delay to allow clicking
    setTimeout(hideSearchSuggestions, 200)
  })
}

function showSearchSuggestions(query) {
  // Remove existing suggestions
  hideSearchSuggestions()

  const suggestions = [
    "Virtual Museum Tour",
    "Team Collaboration Space",
    "3D Product Showcase",
    "Interactive Learning Lab",
    "Virtual Workspace",
    "Architectural Walkthrough",
  ].filter((item) => item.toLowerCase().includes(query))

  if (suggestions.length > 0) {
    const searchBox = document.querySelector(".search-box")
    const suggestionsList = document.createElement("div")
    suggestionsList.className = "search-suggestions"
    suggestionsList.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid var(--gray-200);
            border-top: none;
            border-radius: 0 0 var(--radius) var(--radius);
            box-shadow: var(--shadow-lg);
            z-index: 10;
            max-height: 200px;
            overflow-y: auto;
        `

    suggestions.forEach((suggestion) => {
      const item = document.createElement("div")
      item.className = "search-suggestion-item"
      item.style.cssText = `
                padding: var(--spacing-3);
                cursor: pointer;
                border-bottom: 1px solid var(--gray-100);
                transition: var(--transition);
            `
      item.textContent = suggestion

      item.addEventListener("mouseenter", function () {
        this.style.backgroundColor = "var(--gray-50)"
      })

      item.addEventListener("mouseleave", function () {
        this.style.backgroundColor = "transparent"
      })

      item.addEventListener("click", () => {
        searchInput.value = suggestion
        hideSearchSuggestions()
        // Trigger search
        performSearch(suggestion)
      })

      suggestionsList.appendChild(item)
    })

    searchBox.appendChild(suggestionsList)
  }
}

function hideSearchSuggestions() {
  const suggestions = document.querySelector(".search-suggestions")
  if (suggestions) {
    suggestions.remove()
  }
}

function performSearch(query) {
  // Simulate search functionality
  console.log("Searching for:", query)

  // In a real application, this would redirect to search results
  // For now, we'll just show a notification
  showNotification(`Searching for "${query}"...`)
}

function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div")
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--white);
        border: 1px solid var(--gray-200);
        border-radius: var(--radius-lg);
        padding: var(--spacing-4);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `

  notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: var(--spacing-2);">
            <svg style="width: 1rem; height: 1rem; color: var(--blue-600);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
            </svg>
            <span style="font-size: var(--font-size-sm);">${message}</span>
        </div>
    `

  // Add animation styles
  const style = document.createElement("style")
  style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `
  document.head.appendChild(style)

  document.body.appendChild(notification)

  // Auto-remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideIn 0.3s ease-out reverse"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove()
      }
    }, 300)
  }, 3000)
}

// Notification button functionality
const notificationBtn = document.querySelector(".notification-btn")
if (notificationBtn) {
  notificationBtn.addEventListener("click", () => {
    showNotificationPanel()
  })
}

function showNotificationPanel() {
  // Create notification panel
  const panel = document.createElement("div")
  panel.className = "notification-panel"
  panel.style.cssText = `
        position: fixed;
        top: 4rem;
        right: 1rem;
        width: 320px;
        background: var(--white);
        border: 1px solid var(--gray-200);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-xl);
        z-index: 1000;
        max-height: 400px;
        overflow-y: auto;
    `

  panel.innerHTML = `
        <div style="padding: var(--spacing-4); border-bottom: 1px solid var(--gray-200);">
            <h3 style="font-weight: 600; margin: 0;">Notifications</h3>
        </div>
        <div style="padding: var(--spacing-4);">
            <div style="text-align: center; color: var(--gray-500);">
                <svg style="width: 3rem; height: 3rem; margin-bottom: var(--spacing-2);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
                </svg>
                <p style="margin: 0; font-size: var(--font-size-sm);">No new notifications</p>
            </div>
        </div>
    `

  document.body.appendChild(panel)

  // Close panel when clicking outside
  setTimeout(() => {
    document.addEventListener("click", function closePanel(e) {
      if (!panel.contains(e.target) && !notificationBtn.contains(e.target)) {
        panel.remove()
        document.removeEventListener("click", closePanel)
      }
    })
  }, 100)
}

// Load offline state on page load
const savedOfflineState = XRConnect.loadFromStorage("offlineMode")
if (savedOfflineState) {
  updateOfflineStatus(savedOfflineState)
}
