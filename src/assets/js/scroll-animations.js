//
//    Scroll Animation System
//

// Animation classes and their corresponding CSS classes
const animationTypes = {
  'fade-in': 'animate-fade-in',
  'slide-up': 'animate-slide-up',
  'slide-left': 'animate-slide-left',
  'slide-right': 'animate-slide-right',
  'scale-in': 'animate-scale-in'
};

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add class to body to indicate JavaScript is working
  document.body.classList.add('js-enabled');
  document.body.classList.remove('no-js');
  
  console.log('Scroll animations initialized');
  
  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver not supported, falling back to immediate animation');
    // Fallback: immediately animate all elements
    const allAnimatedElements = document.querySelectorAll('[data-animate]');
    allAnimatedElements.forEach(element => {
      element.classList.add('animate');
    });
    return;
  }
  
  // Create intersection observer for scroll animations
  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Start animation 50px before element comes into view
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animation class when element comes into view
        entry.target.classList.add('animate');
        
        // For staggered animations (children elements)
        const children = entry.target.querySelectorAll('.animate-child');
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('animate');
          }, index * 100); // 100ms delay between each child
        });
        
        // Stop observing this element after animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animation classes
  Object.keys(animationTypes).forEach(animationType => {
    const elements = document.querySelectorAll(`[data-animate="${animationType}"]`);
    elements.forEach(element => {
      observer.observe(element);
    });
  });

  // Handle elements with custom animation delays
  const delayedElements = document.querySelectorAll('[data-animate-delay]');
  delayedElements.forEach(element => {
    observer.observe(element);
  });

  // Fallback: Show all animated elements after 2 seconds if they haven't been animated
  setTimeout(() => {
    const unanimatedElements = document.querySelectorAll('[data-animate]:not(.animate)');
    if (unanimatedElements.length > 0) {
      console.warn(`Fallback triggered: ${unanimatedElements.length} elements not animated`);
      unanimatedElements.forEach(element => {
        element.classList.add('animate');
      });
    }
  }, 2000);
  
  // Additional fallback for mobile devices - reduce animation complexity
  const isMobile = window.innerWidth <= 768 || 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    console.log('Mobile device detected - optimizing animations');
    // Reduce animation delays on mobile for better performance
    const mobileElements = document.querySelectorAll('[data-animate-delay]');
    mobileElements.forEach(element => {
      const currentDelay = element.style.getPropertyValue('--animation-delay');
      if (currentDelay) {
        // Reduce delay by half on mobile
        const newDelay = parseFloat(currentDelay) * 0.5;
        element.style.setProperty('--animation-delay', `${newDelay}s`);
      }
    });
  }
});

// Utility function to add animation classes to elements
function addScrollAnimation(element, animationType, delay = 0) {
  if (element && animationTypes[animationType]) {
    element.setAttribute('data-animate', animationType);
    if (delay > 0) {
      element.setAttribute('data-animate-delay', delay);
    }
  }
}

// Add scroll animations to common elements on page load
document.addEventListener('DOMContentLoaded', function() {
  // Add animations to sections
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    if (!section.hasAttribute('data-animate')) {
      section.setAttribute('data-animate', 'fade-in');
    }
  });

  // Add animations to service cards
  const serviceCards = document.querySelectorAll('.cs-item');
  serviceCards.forEach((card, index) => {
    card.setAttribute('data-animate', 'slide-up');
    card.style.setProperty('--animation-delay', `${index * 0.1}s`);
  });

  // Add animations to headings
  const headings = document.querySelectorAll('h1, h2, h3');
  headings.forEach((heading, index) => {
    if (!heading.closest('[data-animate]')) {
      heading.setAttribute('data-animate', 'slide-up');
    }
  });

  // Add animations to images
  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    if (!img.closest('[data-animate]')) {
      img.setAttribute('data-animate', 'scale-in');
    }
  });
});
