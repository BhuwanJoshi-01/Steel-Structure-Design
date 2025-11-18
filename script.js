/**
 * TheSteelDesigner.eu - Enhanced JavaScript
 * Professional-grade interactivity with advanced animations and effects
 */

// Prevent any scroll restoration on page load
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
  // Ensure page starts at top
  window.scrollTo(0, 0);

  initializeYear();
  initializeMobileMenu();
  initializePortfolioScroll();
  initializeLightbox();
  initializeSmoothScroll();
  initializeScrollAnimations();
  initializeParallaxEffects();
  initializeFormValidation();
  initializeHeroTagAnimations();
  initializeMagneticButtons();
  initializeLoadingAnimations();
  initializePerformanceOptimizations();
});

// ===== UPDATE FOOTER YEAR =====
function initializeYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// ===== MOBILE MENU TOGGLE =====
function initializeMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a');

  if (!hamburger || !nav) return;

  // Toggle menu on hamburger click
  hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.classList.toggle('menu-open');

    // Update aria-expanded for accessibility
    hamburger.setAttribute('aria-expanded', isActive);
  });

  // Close menu when clicking on a nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
      document.body.classList.remove('menu-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('active')) {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
      document.body.classList.remove('menu-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
      document.body.classList.remove('menu-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

// ===== PORTFOLIO - SHOW ALL ITEMS IMMEDIATELY =====
function initializePortfolioScroll() {
  const items = Array.from(document.querySelectorAll('.portfolio-item'));

  if (!items.length) {
    console.error('❌ Portfolio items not found!');
    return;
  }

  console.log(`🎨 Portfolio initialized - displaying all ${items.length} items immediately`);

  // Show all items immediately without any animations or lazy loading
  items.forEach((item, index) => {
    item.style.display = 'block';
    item.style.opacity = '1';
    item.style.transform = 'none';
    item.dataset.index = index;
  });

  console.log(`✅ All ${items.length} portfolio items are now visible`);
}

// ===== LIGHTBOX FUNCTIONALITY =====
function initializeLightbox() {
  console.log('🔧 Initializing lightbox...');
  
  // Use event delegation on the document for all portfolio images
  document.addEventListener('click', function(e) {
    const portfolioItem = e.target.closest('.portfolio-item');
    if (portfolioItem) {
      e.preventDefault();
      const img = portfolioItem.querySelector('img');
      const caption = portfolioItem.querySelector('.portfolio-caption')?.textContent || '';
      
      if (img && img.src) {
        console.log('📸 Opening lightbox for:', img.src);
        openLightbox(img.src, caption);
      }
    }
  });
  
  // Close lightbox when clicking close button or outside
  document.addEventListener('click', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (e.target.classList.contains('lightbox-close') || e.target.id === 'lightbox') {
      closeLightbox();
    }
  });
  
  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
}

function openLightbox(imageSrc, caption) {
  console.log('🖼️ Opening lightbox with:', imageSrc);

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');

  if (!lightbox || !lightboxImage || !lightboxCaption) {
    console.error('❌ Lightbox elements not found!');
    return;
  }

  // Save current scroll position
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  lightbox.dataset.scrollPosition = scrollPosition;

  // Set image and caption with loading state
  lightboxImage.style.opacity = '0';
  lightboxImage.src = imageSrc;
  lightboxImage.alt = caption;
  lightboxCaption.textContent = caption;

  // Show image when loaded
  lightboxImage.onload = function() {
    this.style.opacity = '1';
  };

  // Show lightbox with animation
  lightbox.classList.remove('hidden');
  lightbox.style.display = 'flex';

  // Disable body scroll and fix position to center lightbox in viewport
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.width = '100%';

  console.log('✅ Lightbox opened and centered in viewport');
}

function closeLightbox() {
  console.log('❌ Closing lightbox');
  
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.add('hidden');
    lightbox.style.display = 'none';
    
    // Get saved scroll position
    const scrollPosition = parseInt(lightbox.dataset.scrollPosition || '0');
    
    // Restore body scroll and position
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
    // Restore scroll position
    window.scrollTo(0, scrollPosition);
  }
  
  console.log('✅ Lightbox closed and scroll position restored');
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Skip empty anchors and same-page anchors
      if (!href || href === '#') return;

      // Only prevent default and scroll if target exists
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80; // Account for fixed header if any
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== SCROLL ANIMATIONS WITH INTERSECTION OBSERVER =====
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Optionally unobserve after revealing for performance
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections and cards
  const elementsToAnimate = document.querySelectorAll('section, .card, .workflow-step, .hero-pill');
  elementsToAnimate.forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
  });

  console.log(`🎬 Scroll animations initialized for ${elementsToAnimate.length} elements`);
}

// ===== PARALLAX EFFECTS =====
function initializeParallaxEffects() {
  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;

    // Parallax for background orbs only - removed hero-right parallax to keep card in place
    const body = document.body;
    if (body) {
      const orbOffset = scrollY * 0.1;
      body.style.setProperty('--scroll-offset', `${orbOffset}px`);
    }

    ticking = false;
  }

  function requestParallaxUpdate() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  // Use passive event listener for better performance
  window.addEventListener('scroll', requestParallaxUpdate, { passive: true });

  console.log('🌊 Parallax effects initialized (hero card stays in place)');
}

// ===== FORM VALIDATION =====
function initializeFormValidation() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const inputs = form.querySelectorAll('input[required], textarea[required]');

  inputs.forEach(input => {
    // Real-time validation
    input.addEventListener('blur', function() {
      validateField(this);
    });

    input.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        validateField(this);
      }
    });
  });

  // Form submission
  form.addEventListener('submit', function(e) {
    let isValid = true;

    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (!isValid) {
      e.preventDefault();
      showNotification('Please fill in all required fields correctly.', 'error');
    } else {
      showNotification('Sending your message...', 'success');
    }
  });

  console.log('✅ Form validation initialized');
}

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = '';

  if (field.hasAttribute('required') && !value) {
    isValid = false;
    errorMessage = 'This field is required';
  } else if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }
  }

  // Visual feedback
  if (!isValid) {
    field.classList.add('error');
    field.style.borderColor = '#ef4444';
    showFieldError(field, errorMessage);
  } else {
    field.classList.remove('error');
    field.style.borderColor = '';
    removeFieldError(field);
  }

  return isValid;
}

function showFieldError(field, message) {
  removeFieldError(field);
  const errorDiv = document.createElement('div');
  errorDiv.className = 'field-error';
  errorDiv.style.color = '#ef4444';
  errorDiv.style.fontSize = '12px';
  errorDiv.style.marginTop = '4px';
  errorDiv.textContent = message;
  field.parentNode.appendChild(errorDiv);
}

function removeFieldError(field) {
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    background: ${type === 'error' ? '#ef4444' : '#10b981'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    animation: slideInRight 0.3s ease-out;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ===== HERO TAG ANIMATIONS =====
function initializeHeroTagAnimations() {
  const tags = document.querySelectorAll('.hero-tag');
  tags.forEach((tag, index) => {
    tag.style.setProperty('--tag-index', index);
  });
  console.log(`🏷️ Hero tag animations initialized for ${tags.length} tags`);
}

// ===== MAGNETIC BUTTONS =====
function initializeMagneticButtons() {
  const magneticElements = document.querySelectorAll('.btn-primary, .btn-ghost, .fab');

  magneticElements.forEach(el => {
    el.classList.add('magnetic');

    el.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const moveX = x * 0.3;
      const moveY = y * 0.3;

      this.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    el.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  console.log(`🧲 Magnetic effect initialized for ${magneticElements.length} elements`);
}

// ===== LOADING ANIMATIONS =====
function initializeLoadingAnimations() {
  // Add loading state to images
  const images = document.querySelectorAll('img');
  let loadedCount = 0;

  images.forEach(img => {
    if (img.complete) {
      loadedCount++;
    } else {
      img.addEventListener('load', function() {
        loadedCount++;
        this.style.animation = 'fadeIn 0.5s ease-out';

        if (loadedCount === images.length) {
          console.log('✅ All images loaded');
        }
      });

      img.addEventListener('error', function() {
        loadedCount++;
        console.warn('⚠️ Image failed to load:', this.src);
      });
    }
  });

  console.log(`🖼️ Loading animations initialized for ${images.length} images`);
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function initializePerformanceOptimizations() {
  // Debounce function for resize events
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      console.log('📐 Window resized, recalculating layouts...');
      // Trigger any necessary recalculations here
    }, 250);
  }, { passive: true });

  // Lazy load images with Intersection Observer
  const lazyImages = document.querySelectorAll('img[data-src]');
  if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
    console.log(`🚀 Lazy loading initialized for ${lazyImages.length} images`);
  }

  // Preload critical resources
  const criticalLinks = document.querySelectorAll('a[href^="#"]');
  criticalLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          // Preload section content
          target.style.willChange = 'transform, opacity';
          setTimeout(() => {
            target.style.willChange = 'auto';
          }, 1000);
        }
      }
    }, { passive: true });
  });

  console.log('⚡ Performance optimizations initialized');
}

// ===== ADVANCED SCROLL EFFECTS =====
// Add scroll progress indicator
function addScrollProgressIndicator() {
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-tertiary));
    z-index: 9999;
    transition: width 0.1s ease-out;
    box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  }, { passive: true });
}

// Initialize scroll progress on load
window.addEventListener('load', () => {
  addScrollProgressIndicator();
  initializeCustomCursor();
  initializeCardTiltEffect();
  // initializeTextRevealEffect(); // Disabled - was causing text spacing issues
  console.log('📊 Scroll progress indicator added');
  console.log('🎨 All enhancements loaded successfully!');
});

// Handle window resize - disable custom cursor on mobile
window.addEventListener('resize', () => {
  if (window.innerWidth < 1024 && document.body.classList.contains('custom-cursor-active')) {
    document.body.classList.remove('custom-cursor-active');
    const customCursor = document.querySelector('.custom-cursor');
    const customCursorDot = document.querySelector('.custom-cursor-dot');
    if (customCursor) customCursor.remove();
    if (customCursorDot) customCursorDot.remove();
    console.log('🖱️ Custom cursor removed on resize to mobile');
  }
});

// ===== CUSTOM CURSOR EFFECT (Desktop only) =====
function initializeCustomCursor() {
  // Skip on mobile/tablet devices and touch screens
  if (window.innerWidth < 1024 || 'ontouchstart' in window || navigator.maxTouchPoints > 0) {
    console.log('🖱️ Custom cursor disabled on mobile/touch devices');
    return;
  }

  // Add class to body to hide default cursor
  document.body.classList.add('custom-cursor-active');

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  const cursorDot = document.createElement('div');
  cursorDot.className = 'custom-cursor-dot';
  document.body.appendChild(cursorDot);

  let isHovering = false;

  // Instant cursor movement - no delay, just like Windows
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Instant positioning for both cursor elements
    cursor.style.transform = `translate(${x - 10}px, ${y - 10}px)${isHovering ? ' scale(1.5)' : ''}`;
    cursorDot.style.transform = `translate(${x - 3}px, ${y - 3}px)`;

    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
  });

  // Expand cursor on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .card, .portfolio-item, input, textarea');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      isHovering = true;
      cursor.style.borderColor = '#14b8a6';
      cursor.style.transform = cursor.style.transform.replace('scale(1)', 'scale(1.5)') + (cursor.style.transform.includes('scale') ? '' : ' scale(1.5)');
    });
    el.addEventListener('mouseleave', () => {
      isHovering = false;
      cursor.style.borderColor = '#00d4ff';
      cursor.style.transform = cursor.style.transform.replace('scale(1.5)', '');
    });
  });

  console.log('🖱️ Custom cursor initialized - instant response like Windows (desktop only)');
}

// ===== CARD TILT EFFECT =====
function initializeCardTiltEffect() {
  const cards = document.querySelectorAll('.card, .hero-right');

  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  console.log(`🎴 Card tilt effect initialized for ${cards.length} cards`);
}

// ===== TEXT REVEAL EFFECT =====
function initializeTextRevealEffect() {
  const heroLead = document.querySelector('.hero-lead');
  if (!heroLead) return;

  const text = heroLead.textContent;
  heroLead.innerHTML = '';

  // Split text into words
  const words = text.split(' ');
  words.forEach((word, index) => {
    const span = document.createElement('span');
    span.textContent = word + ' ';
    span.style.opacity = '0';
    span.style.display = 'inline-block';
    span.style.animation = `fadeInUp 0.6s ease-out ${index * 0.05}s forwards`;
    heroLead.appendChild(span);
  });

  console.log('📝 Text reveal effect initialized');
}

// ===== UTILITY: PASSIVE EVENT LISTENERS =====
// Modern browsers support passive event listeners for better scroll performance
// This is automatically handled by Intersection Observer API used above
