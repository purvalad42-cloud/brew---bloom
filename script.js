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
});  