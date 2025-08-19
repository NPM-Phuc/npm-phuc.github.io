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
    const desktopText = themeButton.querySelector('.d-none.d-sm-inline');
    const mobileIcon = themeButton.querySelector('.d-sm-none');
    
    if (currentTheme === 'dark') {
      if (desktopText) desktopText.textContent = '☀️ Light Mode';
      if (mobileIcon) mobileIcon.textContent = '☀️';
    } else {
      if (desktopText) desktopText.textContent = '🌙 Dark Mode';
      if (mobileIcon) mobileIcon.textContent = '🌙';
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

// Set current year in footer and initialize theme icon
document.addEventListener('DOMContentLoaded', function() {
  const yearElement = document.getElementById('y');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  updateThemeIcon();
});
