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
  // Gallery lightbox.
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const lightboxImage = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('p');
    document.querySelectorAll('.gallery-item').forEach((item) => {
      item.addEventListener('click', () => {
        const image = item.querySelector('img');
        lightboxImage.src = item.dataset.full || image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent = item.querySelector('span')?.textContent || image.alt;
        if (typeof lightbox.showModal === 'function') lightbox.showModal();
        else lightbox.setAttribute('open', '');
      });
    });
    lightbox.querySelector('.lightbox-close')?.addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) lightbox.close();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && lightbox.open) lightbox.close();
    });
  }
});  