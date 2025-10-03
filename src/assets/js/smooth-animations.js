//
//    Smooth Scroll Animations
//    Sequential, smooth animations with mobile optimizations
//

// Initialize smooth animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add class to body to indicate JavaScript is working
  document.body.classList.add('js-enabled');
  document.body.classList.remove('no-js');
  
  console.log('Smooth animations initialized');
  
  // Reset all animations on page load
  const allAnimatedElements = document.querySelectorAll('[data-animate]');
  allAnimatedElements.forEach(element => {
    element.classList.remove('animate');
  });
  
  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver not supported, falling back to immediate animation');
    // Fallback: immediately animate all elements
    allAnimatedElements.forEach(element => {
      element.classList.add('animate');
    });
    return;
  }
  
  // Create intersection observer for smooth animations
  const observerOptions = {
    threshold: 0.25, // Trigger when 25% of element is visible
    rootMargin: '0px 0px -80px 0px' // Start animation 80px before element comes into view
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animation class when element comes into view
        entry.target.classList.add('animate');
        
        // Don't stop observing - allow animations to retrigger
      } else {
        // Remove animation class when element goes out of view for retriggering
        entry.target.classList.remove('animate');
      }
    });
  }, observerOptions);

  // Observe all elements with animation attributes
  allAnimatedElements.forEach(element => {
    observer.observe(element);
  });

  // Fallback: Show all animated elements after 3 seconds if they haven't been animated
  setTimeout(() => {
    const unanimatedElements = document.querySelectorAll('[data-animate]:not(.animate)');
    if (unanimatedElements.length > 0) {
      console.warn(`Fallback triggered: ${unanimatedElements.length} elements not animated`);
      unanimatedElements.forEach(element => {
        element.classList.add('animate');
      });
    }
  }, 3000);
  
  // Mobile device detection and optimization
  const isMobile = window.innerWidth <= 768 || 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    console.log('Mobile device detected - optimizing animations');
    // Add mobile class to body for CSS targeting
    document.body.classList.add('mobile-device');
  }
  
  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    console.log('Reduced motion preference detected - disabling animations');
    document.body.classList.add('reduced-motion');
    // Show all elements immediately
    allAnimatedElements.forEach(element => {
      element.classList.add('animate');
    });
  }
});

// Export function for external use
window.SmoothAnimations = {
  init: function() {
    console.log('Smooth animations reinitialized');
  }
};
