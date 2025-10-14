(() => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImageMouseEffects);
  } else {
    initImageMouseEffects();
  }

  function initImageMouseEffects() {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;

    cursor.innerHTML = '<div class="cursor-main"></div>';
    const cursorMain = cursor.querySelector('.cursor-main');

    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function updateCursor() {
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
      requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Enhanced image interactions
    const images = document.querySelectorAll('[data-cursor="image"]');
    
    images.forEach(img => {
      // Hover effects
      img.addEventListener('mouseenter', () => {
        document.body.setAttribute('data-cursor', 'image');
        createImageHoverEffect(img);
      });
      
      img.addEventListener('mouseleave', () => {
        document.body.removeAttribute('data-cursor');
        removeImageHoverEffect(img);
      });
      
      // Mouse move effects over image
      img.addEventListener('mousemove', (e) => {
        createTrailOnImage(e, img);
      });
      
      // Click effects
      img.addEventListener('click', (e) => {
        e.preventDefault();
        createImageClickEffect(e, img);
      });
    });

    // Other cursor states
    const personalElements = document.querySelectorAll('[data-cursor="personal"]');
    const scientificElements = document.querySelectorAll('[data-cursor="scientific"]');
    
    personalElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        document.body.setAttribute('data-cursor', 'personal');
      });
      
      element.addEventListener('mouseleave', () => {
        document.body.removeAttribute('data-cursor');
      });
    });

    scientificElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        document.body.setAttribute('data-cursor', 'scientific');
      });
      
      element.addEventListener('mouseleave', () => {
        document.body.removeAttribute('data-cursor');
      });
    });

    // Enhanced click effects
    document.addEventListener('click', (e) => {
      if (!e.target.hasAttribute('data-cursor')) {
        createMinimalRipple(e.clientX, e.clientY);
      }
    });

    function createImageHoverEffect(img) {
      img.style.filter = 'grayscale(0) contrast(1.3) saturate(1.2) brightness(1.1)';
      img.style.transform = 'scale(1.02)';
      
      // Create floating particles around image
      const rect = img.getBoundingClientRect();
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const particle = document.createElement('div');
          particle.style.cssText = `
            position: fixed;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            width: 3px;
            height: 3px;
            background: var(--accent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            opacity: 0.6;
            animation: floatAway 2s ease-out forwards;
          `;
          
          document.body.appendChild(particle);
          setTimeout(() => particle.remove(), 2000);
        }, i * 200);
      }
    }

    function removeImageHoverEffect(img) {
      img.style.filter = 'grayscale(0.3) contrast(1.1)';
      img.style.transform = 'scale(1)';
    }

    function createTrailOnImage(e, img) {
      if (Math.random() > 0.7) {
        const trail = document.createElement('div');
        trail.style.cssText = `
          position: fixed;
          left: ${e.clientX}px;
          top: ${e.clientY}px;
          width: 2px;
          height: 2px;
          background: var(--accent);
          border-radius: 50%;
          pointer-events: none;
          z-index: 999;
          opacity: 0.8;
          animation: trailFade 1s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 1000);
      }
    }

    function createImageClickEffect(e, img) {
      const rect = img.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Create burst effect
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        const angle = (i / 12) * Math.PI * 2;
        const velocity = 4 + Math.random() * 2;
        
        particle.style.cssText = `
          position: fixed;
          left: ${centerX}px;
          top: ${centerY}px;
          width: ${3 + Math.random() * 3}px;
          height: ${3 + Math.random() * 3}px;
          background: var(--accent);
          border-radius: 50%;
          pointer-events: none;
          z-index: 1000;
        `;
        
        document.body.appendChild(particle);
        
        particle.animate([
          { 
            transform: 'translate(-50%, -50%)',
            opacity: 1 
          },
          { 
            transform: `translate(-50%, -50%) translate(${Math.cos(angle) * 80}px, ${Math.sin(angle) * 80}px)`,
            opacity: 0 
          }
        ], {
          duration: 1200,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).addEventListener('finish', () => particle.remove());
      }
      
      // Flash effect on image
      img.style.filter = 'brightness(1.5) contrast(1.5)';
      setTimeout(() => {
        img.style.filter = 'grayscale(0.3) contrast(1.1)';
      }, 150);
    }

    function createMinimalRipple(x, y) {
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 1px;
        height: 1px;
        background: var(--accent);
        pointer-events: none;
        z-index: 10000;
        transform: translate(-50%, -50%);
      `;
      
      document.body.appendChild(ripple);
      
      ripple.animate([
        { width: '1px', height: '1px', opacity: '1' },
        { width: '60px', height: '1px', opacity: '0' }
      ], {
        duration: 800,
        easing: 'ease-out'
      }).addEventListener('finish', () => {
        ripple.remove();
      });
    }
  }

  // Add CSS animations via JavaScript
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatAway {
      0% { transform: translateY(0px); opacity: 0.6; }
      100% { transform: translateY(-30px); opacity: 0; }
    }
    
    @keyframes trailFade {
      0% { opacity: 0.8; transform: scale(1); }
      100% { opacity: 0; transform: scale(0); }
    }
    
    @keyframes float-particle {
      0% { opacity: 0; transform: translateY(0px); }
      10% { opacity: 0.8; }
      90% { opacity: 0.8; }
      100% { opacity: 0; transform: translateY(-50px) translateX(20px); }
    }
  `;
  document.head.appendChild(style);
})();
