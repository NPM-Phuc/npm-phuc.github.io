// Dark mode toggle with Bootstrap theme support
(function() {
  const stored = localStorage.getItem('theme');
  // Default to dark mode if no preference is stored
  if (stored === 'light') {
    document.documentElement.setAttribute('data-bs-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
  }
})();

function updateThemeIcon() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-bs-theme');
  const themeIcon = document.getElementById('theme-icon');
  
  if (themeIcon) {
    if (currentTheme === 'dark') {
      themeIcon.textContent = '🌙'; // Show moon in dark mode
    } else {
      themeIcon.textContent = '☀️'; // Show sun in light mode
    }
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
  const text = "Proudly bringing color, clarity, and creativity to tech, data, and analytics";
  
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
