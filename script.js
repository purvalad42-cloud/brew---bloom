document.addEventListener('DOMContentLoaded', () => {
    // Set the current year in every footer.
    document.querySelectorAll('.year').forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  
    // Restore the saved theme across all pages.
    const themeButtons = document.querySelectorAll('.theme-toggle');
    const savedTheme = localStorage.getItem('brewBloomTheme');
    if (savedTheme === 'dark') document.body.classList.add('dark-theme');
  
    function updateThemeButtons() {
      const isDark = document.body.classList.contains('dark-theme');
      themeButtons.forEach((button) => {
        button.textContent = isDark ? '☀ Light mode' : '☾ Dark mode';
        button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      });
    }
    updateThemeButtons();
    themeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('brewBloomTheme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        updateThemeButtons();
      });
    });
    // Mobile hamburger navigation.
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      menuToggle.textContent = isOpen ? '×' : '☰';
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    }));
  }
});  