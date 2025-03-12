// Intersection Observer polyfill for older browsers
if (!("IntersectionObserver" in window)) {
  // Simple polyfill that triggers all animations when scrolling
  window.IntersectionObserver = function (callback) {
    this.observe = (element) => {
      const checkInView = () => {
        const rect = element.getBoundingClientRect()
        const inView = rect.top <= window.innerHeight && rect.bottom >= 0

        if (inView) {
          callback([
            {
              isIntersecting: true,
              target: element,
            },
          ])
        }
      }

      // Check on scroll and on load
      window.addEventListener("scroll", checkInView)
      window.addEventListener("resize", checkInView)
      checkInView()
    }

    this.unobserve = (element) => {
      // Do nothing for the polyfill
    }
  }
}

