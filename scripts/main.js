// Main JavaScript functionality
document.addEventListener("DOMContentLoaded", () => {
  // Initialize smooth scrolling for anchor links
  initSmoothScrolling()

  // Initialize mobile menu toggle
  initMobileMenu()

  // Initialize scroll effects
  initScrollEffects()
})

function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const nav = document.querySelector(".nav")

  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener("click", function () {
      nav.classList.toggle("nav-open")
      this.classList.toggle("active")
    })
  }
}

function initScrollEffects() {
  const header = document.querySelector(".header")

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  }
}

// Utility functions
function togglePassword(inputId) {
  const input = document.getElementById(inputId)
  const button = input.nextElementSibling
  const icon = button.querySelector("svg")

  if (input.type === "password") {
    input.type = "text"
    icon.innerHTML = `
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
            <line x1="1" x2="23" y1="1" y2="23"/>
        `
  } else {
    input.type = "password"
    icon.innerHTML = `
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
        `
  }
}

// Animation utilities
function fadeIn(element, duration = 300) {
  element.style.opacity = "0"
  element.style.display = "block"

  let start = null
  function animate(timestamp) {
    if (!start) start = timestamp
    const progress = timestamp - start

    element.style.opacity = Math.min(progress / duration, 1)

    if (progress < duration) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

function fadeOut(element, duration = 300) {
  let start = null
  function animate(timestamp) {
    if (!start) start = timestamp
    const progress = timestamp - start

    element.style.opacity = Math.max(1 - progress / duration, 0)

    if (progress < duration) {
      requestAnimationFrame(animate)
    } else {
      element.style.display = "none"
    }
  }

  requestAnimationFrame(animate)
}

// Form validation utilities
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function validatePassword(password) {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }
}

function calculatePasswordStrength(password) {
  const checks = validatePassword(password)
  const score = Object.values(checks).filter(Boolean).length

  if (score < 2) return { strength: "weak", score: 25 }
  if (score < 4) return { strength: "fair", score: 50 }
  if (score < 5) return { strength: "good", score: 75 }
  return { strength: "strong", score: 100 }
}

// Local storage utilities
function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error("Error saving to localStorage:", error)
    return false
  }
}

function loadFromStorage(key) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Error loading from localStorage:", error)
    return null
  }
}

function removeFromStorage(key) {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error("Error removing from localStorage:", error)
    return false
  }
}

// Export functions for use in other scripts
window.XRConnect = {
  togglePassword,
  fadeIn,
  fadeOut,
  validateEmail,
  validatePassword,
  calculatePasswordStrength,
  saveToStorage,
  loadFromStorage,
  removeFromStorage,
}
