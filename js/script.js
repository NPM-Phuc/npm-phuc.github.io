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
  const themeButton = document.querySelector('[onclick="toggleTheme()"]');
  
  if (themeButton) {
    if (currentTheme === 'dark') {
      themeButton.textContent = '☀️';
    } else {
      themeButton.textContent = '🌙';
    }
  }
}

function toggleTheme(){
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-bs-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-bs-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon();
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
