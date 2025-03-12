// DOM Elements
const header = document.getElementById("header")
const mobileMenuBtn = document.getElementById("mobile-menu-btn")
const mobileMenu = document.getElementById("mobile-menu")
const themeToggle = document.getElementById("theme-toggle")
const backToTop = document.getElementById("back-to-top")
const navLinks = document.querySelectorAll(".nav-link")
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
const sections = document.querySelectorAll("section")
const filterBtns = document.querySelectorAll(".filter-btn")
const projectCards = document.querySelectorAll(".project-card")
const contactForm = document.getElementById("contact-form")
const skillBars = document.querySelectorAll(".skill-percentage")
const currentYearSpan = document.getElementById("current-year")

// Initialize the page
function init() {
  // Set current year in footer
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear()
  }

  // Check if user has a theme preference in localStorage
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme")
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
    }
  }

  // Activate skill bars animation when they come into view
  animateSkillBars()

  // Add fadeIn animation to section elements
  addFadeInAnimation()

  // Initialize skill charts
  setTimeout(() => {
    animateSkillBars()
    animateModernBars()
    animateSkillCircles()
  }, 500)
}

// Mobile menu toggle
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenuBtn.classList.toggle("active")
    mobileMenu.classList.toggle("active")

    // Animate the hamburger menu
    const spans = mobileMenuBtn.querySelectorAll("span")
    if (mobileMenuBtn.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
      spans[1].style.opacity = "0"
      spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)"
    } else {
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    }
  })
}

// Close mobile menu when a link is clicked
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (mobileMenu) {
      mobileMenu.classList.remove("active")
    }
    if (mobileMenuBtn) {
      mobileMenuBtn.classList.remove("active")

      // Reset hamburger menu
      const spans = mobileMenuBtn.querySelectorAll("span")
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    }
  })
})

// Theme toggle
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme")

    if (document.body.classList.contains("dark-theme")) {
      localStorage.setItem("theme", "dark")
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
    } else {
      localStorage.setItem("theme", "light")
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
    }
  })
}

// Sticky header and back to top button
window.addEventListener("scroll", () => {
  // Sticky header
  if (header) {
    if (window.scrollY > 50) {
      header.style.boxShadow = "var(--shadow-md)"
      header.style.height = "60px"
    } else {
      header.style.boxShadow = "var(--shadow-sm)"
      header.style.height = "var(--header-height)"
    }
  }

  // Back to top button
  if (backToTop) {
    if (window.scrollY > 500) {
      backToTop.classList.add("active")
    } else {
      backToTop.classList.remove("active")
    }
  }

  // Active nav link based on scroll position
  updateActiveNavLink()

  // Animate skill bars when they come into view
  animateSkillBars()

  // Add fadeIn animation to section elements
  addFadeInAnimation()

  // Animate modern skill bars and circles
  animateModernBars()
  animateSkillCircles()
})

// Update active nav link based on scroll position
function updateActiveNavLink() {
  const scrollPosition = window.scrollY

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionBottom = sectionTop + section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      // Desktop nav
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        } else {
          link.classList.remove("active")
        }
      })

      // Mobile nav
      mobileNavLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        } else {
          link.classList.remove("active")
        }
      })
    }
  })
}

// Project filters
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Toggle active class
    filterBtns.forEach((b) => b.classList.remove("active"))
    btn.classList.add("active")

    // Filter projects
    const filter = btn.getAttribute("data-filter")

    projectCards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category").includes(filter)) {
        card.style.display = "block"
      } else {
        card.style.display = "none"
      }
    })
  })
})

// Animate skill bars when they come into view
function animateSkillBars() {
  // Original skill bars animation
  skillBars.forEach((bar) => {
    const rect = bar.getBoundingClientRect()
    const inView = rect.top <= window.innerHeight && rect.bottom >= 0

    if (inView) {
      const width = bar.style.width
      // Reset width first to enable animation
      bar.style.width = "0"

      // Trigger animation with a small delay
      setTimeout(() => {
        bar.style.width = width
      }, 300)
    }
  })
}

// Animate modern bars
function animateModernBars() {
  const modernBars = document.querySelectorAll(".modern-bar")
  modernBars.forEach((bar) => {
    const rect = bar.getBoundingClientRect()
    const inView = rect.top <= window.innerHeight && rect.bottom >= 0

    if (inView && bar.style.width === "") {
      const value = bar.getAttribute("data-value")

      // Reset width first to enable animation
      bar.style.width = "0%"

      // Trigger animation with a small delay
      setTimeout(() => {
        bar.style.width = `${value}%`
      }, 300)
    }
  })
}

// Animate skill circles
function animateSkillCircles() {
  const skillCircles = document.querySelectorAll(".skill-circle-progress")
  skillCircles.forEach((circle) => {
    const rect = circle.getBoundingClientRect()
    const inView = rect.top <= window.innerHeight && rect.bottom >= 0

    if (inView) {
      // Get the skill value from the text element
      const textElement = circle.nextElementSibling
      const skillValue = Number.parseInt(textElement.textContent)

      // Calculate the circumference of the circle
      const radius = Number.parseInt(circle.getAttribute("r"))
      const circumference = 2 * Math.PI * radius

      // Reset the stroke-dasharray to 0 initially
      if (circle.style.strokeDasharray === "" || circle.style.strokeDasharray === "0 339.12") {
        // Trigger animation with a small delay
        setTimeout(() => {
          // Set the stroke-dasharray based on the skill value
          circle.style.strokeDasharray = `${(circumference * skillValue) / 100} ${(circumference * (100 - skillValue)) / 100}`
        }, 300)
      }
    }
  })
}

// Add event listeners to the tab buttons
document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn")
  if (tabButtons.length > 0) {
    tabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        tabButtons.forEach((btn) => btn.classList.remove("active"))

        // Add active class to clicked button
        this.classList.add("active")

        // Get the tab id
        const tabId = this.getAttribute("data-tab")

        // Hide all content
        document.querySelectorAll(".skill-chart-content").forEach((content) => {
          content.style.display = "none"
        })

        // Show selected content
        const selectedContent = document.getElementById(`${tabId}-content`)
        if (selectedContent) {
          selectedContent.style.display = "block"

          // Reinitialize animations
          setTimeout(() => {
            animateModernBars()
            animateSkillCircles()
          }, 100)
        }
      })
    })
  }
})

// Add fadeIn animation to section elements
function addFadeInAnimation() {
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect()
    const inView = rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0

    if (inView && !section.classList.contains("fade-in")) {
      section.classList.add("fade-in")
    }
  })
}

// Form validation
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form inputs
    const nameInput = document.getElementById("name")
    const emailInput = document.getElementById("email")
    const subjectInput = document.getElementById("subject")
    const messageInput = document.getElementById("message")

    // Reset error messages
    const nameError = document.getElementById("name-error")
    const emailError = document.getElementById("email-error")
    const subjectError = document.getElementById("subject-error")
    const messageError = document.getElementById("message-error")

    if (nameError) nameError.textContent = ""
    if (emailError) emailError.textContent = ""
    if (subjectError) subjectError.textContent = ""
    if (messageError) messageError.textContent = ""

    // Validate inputs
    let isValid = true

    if (nameInput && nameInput.value.trim() === "") {
      if (nameError) nameError.textContent = "Name is required"
      isValid = false
    }

    if (emailInput) {
      if (emailInput.value.trim() === "") {
        if (emailError) emailError.textContent = "Email is required"
        isValid = false
      } else if (!isValidEmail(emailInput.value)) {
        if (emailError) emailError.textContent = "Please enter a valid email"
        isValid = false
      }
    }

    if (subjectInput && subjectInput.value.trim() === "") {
      if (subjectError) subjectError.textContent = "Subject is required"
      isValid = false
    }

    if (messageInput && messageInput.value.trim() === "") {
      if (messageError) messageError.textContent = "Message is required"
      isValid = false
    }

    // If form is valid, simulate form submission
    if (isValid) {
      const submitBtn = document.querySelector(".btn-submit")
      if (submitBtn) {
        submitBtn.textContent = "Sending..."
        submitBtn.disabled = true
      }

      // Simulate API call with setTimeout
      setTimeout(() => {
        // Clear form
        if (nameInput) nameInput.value = ""
        if (emailInput) emailInput.value = ""
        if (subjectInput) subjectInput.value = ""
        if (messageInput) messageInput.value = ""

        // Show success message
        const formContainer = document.querySelector(".contact-form-container")
        if (formContainer) {
          const successMessage = document.createElement("div")
          successMessage.classList.add("form-success")
          successMessage.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
              <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
              <h3>Thank you!</h3>
              <p>Your message has been sent successfully. I'll get back to you soon!</p>
            </div>
          `

          // Replace form with success message
          formContainer.innerHTML = ""
          formContainer.appendChild(successMessage)
        }
      }, 2000)
    }
  })
}

// Email validation helper function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Adjust for header height
        behavior: "smooth",
      })
    }
  })
})

// Initialize the page
document.addEventListener("DOMContentLoaded", init)

