// Authentication functionality
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm")

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }
})

// Mock XRConnect object for email validation and storage
const XRConnect = {
  validateEmail: (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },
  saveToStorage: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  },
}

function handleLogin(e) {
  e.preventDefault()

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const enable2FA = document.querySelector("#2fa").checked

  // Basic validation
  if (!email || !password) {
    showError("Please fill in all required fields.")
    return
  }

  if (!XRConnect.validateEmail(email)) {
    showError("Please enter a valid email address.")
    return
  }

  // Simulate login process
  showLoading(true)

  setTimeout(() => {
    showLoading(false)

    // Save user session
    XRConnect.saveToStorage("user", {
      email: email,
      name: "John Doe",
      loginTime: new Date().toISOString(),
      twoFactorEnabled: enable2FA,
    })

    // Redirect to dashboard
    window.location.href = "dashboard.html"
  }, 1500)
}

function showError(message) {
  // Remove existing error messages
  const existingError = document.querySelector(".error-banner")
  if (existingError) {
    existingError.remove()
  }

  // Create error banner
  const errorBanner = document.createElement("div")
  errorBanner.className = "error-banner"
  errorBanner.innerHTML = `
        <div style="background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            <svg style="width: 1rem; height: 1rem; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" x2="9" y1="9" y2="15"/>
                <line x1="9" x2="15" y1="9" y2="15"/>
            </svg>
            <span>${message}</span>
        </div>
    `

  const form = document.querySelector(".auth-form")
  form.insertBefore(errorBanner, form.firstChild)

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (errorBanner.parentNode) {
      errorBanner.remove()
    }
  }, 5000)
}

function showLoading(show) {
  const submitBtn = document.querySelector('button[type="submit"]')

  if (show) {
    submitBtn.disabled = true
    submitBtn.innerHTML = `
            <svg style="width: 1rem; height: 1rem; animation: spin 1s linear infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
            Signing In...
        `
  } else {
    submitBtn.disabled = false
    submitBtn.innerHTML = "Sign In"
  }
}

// Add CSS for loading animation
const style = document.createElement("style")
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`
document.head.appendChild(style)
