//
//    Parallax Scroll Effects
//

// Initialize parallax effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Parallax effects initialized');
  
  // Initialize hero parallax
  initHeroParallax();
  
  // Initialize additional parallax effects
  initAboutParallax();
  initServicesParallax();
  
  // Add performance optimizations
  initParallaxOptimizations();
});

// Hero section parallax effect
function initHeroParallax() {
  const heroSection = document.querySelector('.hero-bg-image');
  
  if (!heroSection) {
    console.warn('Hero section not found for parallax effect');
    return;
  }
  
  // Create parallax container
  const parallaxContainer = document.createElement('div');
  parallaxContainer.className = 'parallax-container';
  
  // Create parallax background element with the hero image
  const parallaxBg = document.createElement('div');
  parallaxBg.className = 'parallax-bg';
  
  // Insert parallax elements
  parallaxContainer.appendChild(parallaxBg);
  heroSection.insertBefore(parallaxContainer, heroSection.firstChild);
  
  // Remove fallback background image since parallax is now active
  heroSection.style.backgroundImage = 'none';
  
  // Parallax scroll handler
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5; // Adjust speed here (-0.5 = slower than scroll)
    
    // Apply parallax transform
    const parallaxBg = heroSection.querySelector('.parallax-bg');
    if (parallaxBg) {
      parallaxBg.style.transform = `translateY(${rate}px)`;
    }
    
    // Add fade effect as user scrolls
    const fadeRate = Math.min(scrolled / (window.innerHeight * 0.5), 1);
    const overlay = heroSection.querySelector('.parallax-overlay');
    if (overlay) {
      overlay.style.opacity = 0.4 + (fadeRate * 0.3); // Fade from 0.4 to 0.7
    }
    
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  // Listen for scroll events
  window.addEventListener('scroll', requestTick, { passive: true });
  
  // Initial call
  updateParallax();
}

// Performance optimizations for parallax
function initParallaxOptimizations() {
  // Disable parallax on mobile devices for better performance
  const isMobile = window.innerWidth <= 768 || 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    console.log('Parallax disabled on mobile for performance');
    return;
  }
  
  // Reduce motion for users who prefer it
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    console.log('Parallax disabled due to reduced motion preference');
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    parallaxElements.forEach(element => {
      element.style.transform = 'none';
    });
    return;
  }
  
  // Throttle scroll events for better performance
  let lastScrollTime = 0;
  const scrollThrottle = 16; // ~60fps
  
  const originalAddEventListener = window.addEventListener;
  window.addEventListener = function(type, listener, options) {
    if (type === 'scroll' && typeof listener === 'function') {
      const throttledListener = function(event) {
        const now = Date.now();
        if (now - lastScrollTime >= scrollThrottle) {
          lastScrollTime = now;
          listener.call(this, event);
        }
      };
      return originalAddEventListener.call(this, type, throttledListener, options);
    }
    return originalAddEventListener.call(this, type, listener, options);
  };
}

// Global parallax handler for all parallax elements
let globalParallaxTicking = false;

function updateGlobalParallax() {
  const scrolled = window.pageYOffset;
  const windowHeight = window.innerHeight;
  
  // Handle all parallax elements
  const parallaxElements = document.querySelectorAll('.parallax-element');
  parallaxElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const speed = parseFloat(element.getAttribute('data-parallax-speed')) || -0.5;
    
    // Only animate if element is in viewport
    if (rect.bottom >= 0 && rect.top <= windowHeight) {
      const elementTop = rect.top + scrolled;
      const rate = (scrolled - elementTop + windowHeight) * speed;
      element.style.transform = `translateY(${rate}px)`;
    }
  });
  
  
  globalParallaxTicking = false;
}

function requestGlobalParallaxTick() {
  if (!globalParallaxTicking) {
    requestAnimationFrame(updateGlobalParallax);
    globalParallaxTicking = true;
  }
}

// Utility function to add parallax to any element
function addParallaxEffect(element, speed = -0.5) {
  if (!element) return;
  
  element.classList.add('parallax-element');
  element.setAttribute('data-parallax-speed', speed);
  
  // Add to global parallax handler
  window.addEventListener('scroll', requestGlobalParallaxTick, { passive: true });
  updateGlobalParallax();
}

// About Us section parallax effect
function initAboutParallax() {
  const aboutSection = document.querySelector('#sbs-1206');
  const aboutImage = aboutSection?.querySelector('.cs-picture img');
  
  if (!aboutImage) return;
  
  // Add parallax class to the image
  aboutImage.classList.add('parallax-element');
  aboutImage.setAttribute('data-parallax-speed', '-0.3');
  
  console.log('About section parallax initialized');
}

// Services section parallax effect
function initServicesParallax() {
  const serviceImages = document.querySelectorAll('#services-1329 .cs-picture img');
  
  serviceImages.forEach((img, index) => {
    // Add different parallax speeds for variety
    const speeds = [-0.2, -0.25, -0.3];
    const speed = speeds[index] || -0.25;
    
    img.classList.add('parallax-element');
    img.setAttribute('data-parallax-speed', speed);
  });
  
  console.log('Services section parallax initialized');
}


// Export functions for external use
window.ParallaxEffects = {
  initHeroParallax,
  initAboutParallax,
  initServicesParallax,
  addParallaxEffect,
  initParallaxOptimizations
};
