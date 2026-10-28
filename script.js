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
  // Booking form: native HTML constraints + helpful inline messages.
  const form = document.querySelector('#booking-form');
  if (form) {
    const dateInput = form.querySelector('#date');
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    dateInput.min = localToday;

    const message = form.querySelector('#form-message');
    function showFieldError(field, text) {
      const container = field.closest('.form-field');
      const error = container?.querySelector('.field-error');
      if (error) error.textContent = text;
      field.setAttribute('aria-invalid', text ? 'true' : 'false');
    }
    function validateField(field) {
      let error = '';
      if (field.type === 'radio') {
        const radios = form.querySelectorAll(`input[name="${field.name}"]`);
        if (![...radios].some((radio) => radio.checked)) error = 'Please choose a seating preference.';
        radios.forEach((radio) => showFieldError(radio, error));
        return !error;
      }
      if (field.type === 'checkbox' && field.required && !field.checked) error = 'Please confirm the details to continue.';
      else if (field.validity.valueMissing) error = 'This field is required.';
      else if (field.validity.typeMismatch && field.type === 'email') error = 'Please enter a valid email address.';
      else if (field.validity.patternMismatch && field.type === 'tel') error = 'Enter a 10-digit mobile number starting with 6, 7, 8 or 9.';
      else if (field.validity.tooShort) error = `Please enter at least ${field.minLength} characters.`;
      else if (field.validity.rangeUnderflow && field.type === 'number') error = `Please enter at least ${field.min}.`;
      else if (field.validity.rangeOverflow && field.type === 'number') error = `Please enter no more than ${field.max}.`;
      else if (field.validity.rangeUnderflow && field.type === 'date') error = 'Please choose today or a future date.';
      else if (field.validity.rangeUnderflow && field.type === 'time') error = 'Our booking hours start at 9:00 AM.';
      else if (field.validity.rangeOverflow && field.type === 'time') error = 'Please choose a time before 8:30 PM.';
      showFieldError(field, error);
      return !error;
    }
});  