//
//    Sexy Design Effects
//

// Initialize sexy effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Sexy effects initialized');
  
  // Add sexy hover effects to cards
  initSexyCards();
  
  // Add gradient text animations
  initGradientText();
});


// Sexy card hover effects
function initSexyCards() {
  const cards = document.querySelectorAll('.cs-item, .cs-card');
  
  cards.forEach(card => {
    // Add subtle floating animation
    card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
      card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = '';
    });
  });
}

// Gradient text animations
function initGradientText() {
  const gradientTexts = document.querySelectorAll('.sexy-gradient, .sexy-gradient-warm, .sexy-gradient-gold');
  
  gradientTexts.forEach(text => {
    // Add subtle animation to gradient text
    text.style.animation = 'gradientShift 4s ease-in-out infinite alternate';
  });
  
  // Add CSS animation for gradient text
  if (!document.querySelector('#gradient-animation-styles')) {
    const style = document.createElement('style');
    style.id = 'gradient-animation-styles';
    style.textContent = `
      @keyframes gradientShift {
        0% { filter: hue-rotate(0deg) brightness(1); }
        50% { filter: hue-rotate(10deg) brightness(1.1); }
        100% { filter: hue-rotate(0deg) brightness(1); }
      }
      
      .sexy-gradient,
      .sexy-gradient-warm,
      .sexy-gradient-gold {
        animation: gradientShift 4s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
  }
}

// Add smooth scrolling for sexy buttons
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('sexy-button')) {
    e.preventDefault();
    
    // Add ripple effect
    const button = e.target;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
});

// Add ripple effect styles
if (!document.querySelector('#ripple-styles')) {
  const style = document.createElement('style');
  style.id = 'ripple-styles';
  style.textContent = `
    .sexy-button {
      position: relative;
      overflow: hidden;
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}
