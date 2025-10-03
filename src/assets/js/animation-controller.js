//
//    Master Animation Controller
//    Only hero parallax animation remains - all other animations removed
//

document.addEventListener('DOMContentLoaded', function() {
  console.log('=== Animation Controller Initialized ===');
  
  // Initialize animations
  initHeroAnimation();
  initScrollAnimations();
  
  console.log('=== Animation Systems Initialized ===');
});

// Enhanced scroll animations
function initScrollAnimations() {
  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all elements immediately
    const elements = document.querySelectorAll('[class*="animate-"]');
    elements.forEach(element => {
      element.classList.add('animate');
    });
    return;
  }
  
  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        
        // Handle staggered animations
        if (entry.target.classList.contains('animate-stagger')) {
          const children = entry.target.querySelectorAll('.animate-child');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('animate');
            }, index * 100);
          });
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Observe all elements with animation classes
  const animationSelectors = [
    '.animate-on-scroll',
    '.animate-fade-up', 
    '.animate-slide-left',
    '.animate-slide-right',
    '.animate-scale',
    '.animate-stagger'
  ];
  
  animationSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      observer.observe(element);
    });
  });
}

// Import and initialize hero animation
function initHeroAnimation() {
  console.log('Hero content animation initialized');
  
  const heroSection = document.querySelector('#hero-2042.hero-bg-image');
  const heroContent = heroSection?.querySelector('.cs-container');
  
  if (!heroSection || !heroContent) {
    console.warn('Hero section or content not found for animation');
    return;
  }
  
  // Performance optimization - throttle scroll events
  let ticking = false;
  
  function updateHeroContent() {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Only animate when hero section is in view
    const heroRect = heroSection.getBoundingClientRect();
    if (heroRect.bottom >= 0 && heroRect.top <= windowHeight) {
      // Calculate how much the content should move up
      // Move content up by 30% of scroll distance for subtle effect
      const moveUp = scrolled * 0.3;
      
      // Apply the transform using CSS custom property to avoid conflicts
      heroContent.style.setProperty('--hero-parallax', `-${moveUp}px`);
      
      // Optional: Add slight fade effect as content moves up
      const fadeRate = Math.min(scrolled / (windowHeight * 0.5), 1);
      const opacity = Math.max(1 - (fadeRate * 0.3), 0.7); // Fade from 1 to 0.7
      heroContent.style.setProperty('--hero-opacity', opacity);
    }
    
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateHeroContent);
      ticking = true;
    }
  }
  
  // Listen for scroll events
  window.addEventListener('scroll', requestTick, { passive: true });
  
  // Handle window resize
  window.addEventListener('resize', function() {
    updateHeroContent();
  });
  
  // Initial call
  updateHeroContent();
  
  // Disable animation on mobile for better performance
  const isMobile = window.innerWidth <= 768 || 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    console.log('Hero content animation disabled on mobile for performance');
    heroContent.style.setProperty('--hero-parallax', '0px');
    heroContent.style.setProperty('--hero-opacity', '1');
    return;
  }
  
  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    console.log('Hero content animation disabled due to reduced motion preference');
    heroContent.style.setProperty('--hero-parallax', '0px');
    heroContent.style.setProperty('--hero-opacity', '1');
    return;
  }
}

// All sexy effects and button animations removed

// Animation debug removed
