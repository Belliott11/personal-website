document.addEventListener('DOMContentLoaded', () => {

  /* =========================
     YEAR
  ========================= */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* =========================
     THEME TOGGLE
  ========================= */
  const btn = document.getElementById('theme-toggle');

  const savedTheme = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const currentTheme = savedTheme || systemTheme;

  document.documentElement.setAttribute('data-theme', currentTheme);

  if (btn) {
    btn.addEventListener('click', () => {
      const nextTheme =
        document.documentElement.getAttribute('data-theme') === 'dark'
          ? 'light'
          : 'dark';

      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
    });
  }

  /* =========================
     STICKY HEADER SHADOW
  ========================= */
  const header = document.querySelector('.site-header');

  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  /* =========================
     SCROLL ANIMATIONS
  ========================= */
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  animatedElements.forEach(el => observer.observe(el));

  /* =========================
     ACTIVE PAGE HIGHLIGHT
  ========================= */
  const path = window.location.pathname;

  const homeBtn = document.querySelector('a[href="../index.html"], a[href="index.html"]');
  const portfolioBtn = document.querySelector('a[href*="academic-writing"]');

  if (homeBtn && (path === '/' || path.endsWith('index.html'))) {
    homeBtn.classList.add('active');
  }

  if (portfolioBtn && path.includes('academic-writing')) {
    portfolioBtn.classList.add('active');
  }

  /* =========================
     CONTACT FORM
  ========================= */
  const contactForm = document.querySelector('.contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      formStatus.textContent = 'Sending…';
      formStatus.className = 'form-status';

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { Accept: 'application/json' }
        });

        if (response.ok) {
          formStatus.textContent = "Thanks — your message has been sent! I'll get back to you soon.";
          formStatus.classList.add('success');
          contactForm.reset();
        } else {
          formStatus.textContent = 'Something went wrong sending your message. Please try emailing me directly.';
          formStatus.classList.add('error');
        }
      } catch (err) {
        formStatus.textContent = 'Something went wrong sending your message. Please try emailing me directly.';
        formStatus.classList.add('error');
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

});