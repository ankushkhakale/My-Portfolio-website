// Skill Charts Animation
function initSkillCharts() {
  // Get all SVG circle elements with the class 'skill-circle-progress'
  const skillCircles = document.querySelectorAll(".skill-circle-progress")

  // Create an Intersection Observer to animate circles when they come into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Get the circle element
          const circle = entry.target

          // Get the skill value from the text element (sibling of the circle)
          const textElement = circle.nextElementSibling
          const skillValue = Number.parseInt(textElement.textContent)

          // Calculate the circumference of the circle
          const radius = circle.getAttribute("r")
          const circumference = 2 * Math.PI * radius

          // Set the stroke-dasharray to animate from 0 to the skill value
          circle.style.strokeDasharray = `${(circumference * skillValue) / 100} ${(circumference * (100 - skillValue)) / 100}`

          // Unobserve the element after animation
          observer.unobserve(circle)
        }
      })
    },
    { threshold: 0.1 },
  )

  // Observe all skill circles
  skillCircles.forEach((circle) => {
    // Reset the stroke-dasharray to 0 initially
    const radius = circle.getAttribute("r")
    const circumference = 2 * Math.PI * radius
    circle.style.strokeDasharray = `0 ${circumference}`

    // Observe the circle
    observer.observe(circle)
  })
}

// Initialize skill charts when the page loads
document.addEventListener("DOMContentLoaded", () => {
  initSkillCharts()
})

// Reinitialize skill charts when tab is changed
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"))

    // Add active class to clicked button
    btn.classList.add("active")

    // Get the tab id from the button's data attribute
    const tabId = btn.getAttribute("data-tab")

    // Hide all tab contents
    document.querySelectorAll(".skill-chart-content").forEach((content) => {
      content.style.display = "none"
    })

    // Show the selected tab content
    document.getElementById(`${tabId}-content`).style.display = "block"

    // Reinitialize skill charts for the new tab
    setTimeout(initSkillCharts, 100)
  })
})

// Also reinitialize skill charts when scrolling into view
window.addEventListener("scroll", () => {
  initSkillCharts()
})

