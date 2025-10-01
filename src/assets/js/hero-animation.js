//
//    Hero Content Animation
//

// Initialize hero content animation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Hero content animation initialized');
  
  initHeroContentAnimation();
});

// Hero content animation function
function initHeroContentAnimation() {
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
      
      // Apply the transform to move content up
      heroContent.style.transform = `translateY(-${moveUp}px)`;
      
      // Optional: Add slight fade effect as content moves up
      const fadeRate = Math.min(scrolled / (windowHeight * 0.5), 1);
      const opacity = Math.max(1 - (fadeRate * 0.3), 0.7); // Fade from 1 to 0.7
      heroContent.style.opacity = opacity;
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
    heroContent.style.transform = 'none';
    heroContent.style.opacity = '1';
    return;
  }
  
  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    console.log('Hero content animation disabled due to reduced motion preference');
    heroContent.style.transform = 'none';
    heroContent.style.opacity = '1';
    return;
  }
}

// Export function for external use
window.HeroAnimation = {
  initHeroContentAnimation
};
