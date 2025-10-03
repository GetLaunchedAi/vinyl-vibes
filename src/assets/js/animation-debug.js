//
//    Animation Debug Script
//    Helps diagnose animation issues on mobile devices
//

document.addEventListener('DOMContentLoaded', function() {
  console.log('=== Animation Debug Script ===');
  
  // Check browser support
  const supports = {
    intersectionObserver: 'IntersectionObserver' in window,
    requestAnimationFrame: 'requestAnimationFrame' in window,
    cssTransforms: CSS.supports('transform', 'translateX(10px)'),
    cssTransitions: CSS.supports('transition', 'all 0.3s ease'),
    cssAnimations: CSS.supports('animation', 'fadeIn 1s ease')
  };
  
  console.log('Browser Support:', supports);
  
  // Check if animations are working
  const animatedElements = document.querySelectorAll('[data-animate]');
  console.log(`Found ${animatedElements.length} animated elements`);
  
  // Check body classes
  console.log('Body classes:', document.body.className);
  
  // Check if JavaScript is enabled
  const jsEnabled = document.body.classList.contains('js-enabled');
  const noJs = document.body.classList.contains('no-js');
  console.log('JavaScript status:', { jsEnabled, noJs });
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  console.log('Prefers reduced motion:', prefersReducedMotion);
  
  // Check device type
  const isMobile = window.innerWidth <= 768 || 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  console.log('Device type:', { isMobile, width: window.innerWidth, userAgent: navigator.userAgent });
  
  // Monitor animation events
  let animationCount = 0;
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const target = mutation.target;
        if (target.hasAttribute('data-animate') && target.classList.contains('animate')) {
          animationCount++;
          console.log(`Animation triggered: ${target.getAttribute('data-animate')} (${animationCount} total)`);
        }
      }
    });
  });
  
  // Observe all animated elements
  animatedElements.forEach(element => {
    observer.observe(element, { attributes: true, attributeFilter: ['class'] });
  });
  
  // Report after 3 seconds
  setTimeout(() => {
    console.log(`Total animations triggered: ${animationCount}`);
    console.log('=== End Animation Debug ===');
  }, 3000);
  
  // Export debug info to window for manual inspection
  window.animationDebug = {
    supports,
    animatedElements: animatedElements.length,
    jsEnabled,
    noJs,
    prefersReducedMotion,
    isMobile,
    animationCount: () => animationCount
  };
});
