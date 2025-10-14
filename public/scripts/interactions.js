(() => {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initInteractions);
    } else {
      initInteractions();
    }
  
    function initInteractions() {
      // Coffee cup interactions
      const coffeeVisual = document.querySelector('.coffee-visual-enhanced');
      if (coffeeVisual) {
        initCoffeeInteractions(coffeeVisual);
      }
  
      // Scroll indicator click
      const scrollIndicator = document.querySelector('.scroll-indicator');
      if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
          const firstSection = document.querySelector('.enhanced-section');
          if (firstSection) {
            firstSection.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
  
      // Add text reveal effects
      initTextRevealEffects();
    }
  
    function initCoffeeInteractions(coffeeVisual) {
      let particleAnimation;
  
      coffeeVisual.addEventListener('mouseenter', () => {
        startParticleRelease();
      });
  
      coffeeVisual.addEventListener('mouseleave', () => {
        stopParticleRelease();
      });
  
      function startParticleRelease() {
        const particles = coffeeVisual.querySelectorAll('.micro-particle');
        particles.forEach((particle, index) => {
          setTimeout(() => {
            particle.style.opacity = '1';
            particle.style.animation = 'particleFloat 2s ease-in-out infinite';
          }, index * 100);
        });
  
        // Create additional floating particles
        createFloatingParticles();
      }
  
      function stopParticleRelease() {
        const particles = coffeeVisual.querySelectorAll('.micro-particle');
        particles.forEach(particle => {
          particle.style.opacity = '0';
          particle.style.animation = '';
        });
      }
  
      function createFloatingParticles() {
        const rect = coffeeVisual.getBoundingClientRect();
        const particleCount = 8;
  
        for (let i = 0; i < particleCount; i++) {
          setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = (rect.left + rect.width * 0.5) + 'px';
            particle.style.top = (rect.top + rect.height * 0.6) + 'px';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = 'radial-gradient(circle, #00bcd4, transparent)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            particle.style.opacity = '0.8';
  
            // Random direction
            const angle = Math.random() * Math.PI * 2;
            const velocity = 2;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity - 1; // Slight upward bias
  
            document.body.appendChild(particle);
  
            // Animate particle
            let x = 0, y = 0;
            let opacity = 0.8;
            
            function animateParticle() {
              x += vx;
              y += vy;
              opacity -= 0.02;
  
              particle.style.transform = `translate(${x}px, ${y}px)`;
              particle.style.opacity = Math.max(0, opacity);
  
              if (opacity > 0) {
                requestAnimationFrame(animateParticle);
              } else {
                particle.remove();
              }
            }
  
            animateParticle();
          }, i * 150);
        }
      }
    }
  
    function initTextRevealEffects() {
      // Add shimmer effect to specific text elements
      const shimmerElements = document.querySelectorAll('.shimmer');
      
      shimmerElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          element.style.backgroundImage = 'linear-gradient(90deg, transparent 0%, rgba(0, 188, 212, 0.4) 50%, transparent 100%)';
          element.style.backgroundSize = '200% 100%';
          element.style.animation = 'shimmer 1.5s ease-in-out';
        });
  
        element.addEventListener('animationend', () => {
          element.style.animation = '';
        });
      });
  
      // Add elastic bounce to specific elements
      const bounceElements = document.querySelectorAll('.elastic-bounce');
      
      bounceElements.forEach(element => {
        element.addEventListener('click', () => {
          element.style.animation = 'elasticBounce 0.8s ease-out';
          
          setTimeout(() => {
            element.style.animation = '';
          }, 800);
        });
      });
    }
  })();
  