// Dark mode toggle with Bootstrap theme support
(function() {
  const stored = localStorage.getItem('theme');
  // Default to light mode if no preference is stored
  if (stored === 'dark') {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-bs-theme', 'light');
  }
})();

function updateThemeIcon() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-bs-theme');
  const themeIcon = document.getElementById('theme-icon');
  
  if (!themeIcon) return;

  // Minimal inline SVGs for sun and moon (monochrome)
  const sunSVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 4V2M12 22v-2M4.93 4.93L3.51 3.51M20.49 20.49l-1.42-1.42M4 12H2M22 12h-2M4.93 19.07l-1.42 1.42M20.49 3.51l-1.42 1.42" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>';
  const moonSVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>';

  if (currentTheme === 'dark') {
    themeIcon.innerHTML = moonSVG;
    themeIcon.setAttribute('aria-label', 'Dark theme');
  } else {
    themeIcon.innerHTML = sunSVG;
    themeIcon.setAttribute('aria-label', 'Light theme');
  }
}

function restartAnimation() {
  const container = document.querySelector('.flying-stars-container');
  if (container) {
    // Remove the container temporarily to reset animations
    container.style.display = 'none';
    container.offsetHeight; // Force reflow
    container.style.display = 'block';
    
    // Reset the hide animation by removing and re-adding the class
    container.style.animation = 'none';
    container.offsetHeight; // Force reflow
    container.style.animation = 'hideMeteorShower 1s ease-out 8s 1 forwards';
    
    // Reset all individual star animations
    const stars = container.querySelectorAll('.flying-star');
    stars.forEach(star => {
      star.style.animation = 'none';
      star.offsetHeight; // Force reflow
      const delay = star.style.getPropertyValue('--delay') || '0s';
      const duration = star.style.getPropertyValue('--duration') || '4s';
      star.style.animation = `meteorShower ${duration} ease-in ${delay} 1 forwards`;
    });
  }
}

function toggleTheme(){
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-bs-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-bs-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon();
  
  // Restart the animation to show the new theme's animation
  restartAnimation();
}

// Set current year in footer and initialize theme icon and animations
document.addEventListener('DOMContentLoaded', function() {
  const yearElement = document.getElementById('y');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  updateThemeIcon();
  initTypingAnimation();
  initLanguageProgressBars();
});

// Typing animation
function initTypingAnimation() {
  const text = "Product manager focused on AI-driven products, analytics, and measurable impact.";
  
  let charIndex = 0;
  const typingElement = document.getElementById('typing-text');
  
  if (!typingElement) return;
  
  function typeText() {
    if (charIndex < text.length) {
      typingElement.textContent = text.substring(0, charIndex + 1);
      charIndex++;
      setTimeout(typeText, 100);
    }
  }
  
  typeText();
}

// Language progress bars animation
function initLanguageProgressBars() {
  // Use Intersection Observer to trigger animation when section is visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll('.language-progress-bar');
        console.log('Found progress bars:', progressBars.length); // Debug log
        progressBars.forEach((bar, index) => {
          const width = bar.getAttribute('data-width');
          console.log(`Setting bar ${index} to ${width}%`); // Debug log
          setTimeout(() => {
            bar.style.width = width + '%';
          }, 200 + (index * 100)); // Stagger the animations
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  const languagesSection = document.getElementById('languages');
  if (languagesSection) {
    console.log('Languages section found, observing...'); // Debug log
    observer.observe(languagesSection);
  } else {
    console.log('Languages section not found!'); // Debug log
  }
}

// Video fullscreen functionality for lab page
function toggleVideoFullscreen(videoId) {
  const video = document.getElementById(videoId);
  
  if (video) {
    if (video.classList.contains('fullscreen-video')) {
      video.classList.remove('fullscreen-video');
      document.body.style.overflow = 'auto';
    } else {
      video.classList.add('fullscreen-video');
      document.body.style.overflow = 'hidden';
      video.play();
    }
  }
}

// Close fullscreen on Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const fullscreenVideo = document.querySelector('.fullscreen-video');
    if (fullscreenVideo) {
      fullscreenVideo.classList.remove('fullscreen-video');
      document.body.style.overflow = 'auto';
    }
  }
});
