// ============================================================
// Mobile navigation
// ============================================================
const hamburger = document.getElementById('hamburger');
const mobilePanel = document.getElementById('mobilePanel');

hamburger.addEventListener('click', () => {
  const isOpen = mobilePanel.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Close mobile panel after tapping a link
mobilePanel.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobilePanel.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ============================================================
// Scroll-reveal for service cards (IntersectionObserver)
// ============================================================
const cards = document.querySelectorAll('.card');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  cards.forEach(card => revealObserver.observe(card));
} else {
  // Fallback: just show everything
  cards.forEach(card => card.classList.add('show'));
}

// ============================================================
// Contact form — progressive enhancement (AJAX to Formspree,
// falls back to a normal POST if fetch/JS is unavailable)
// ============================================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        formStatus.textContent = 'Message sent — we\u2019ll be in touch within one business day.';
        formStatus.classList.add('ok');
        contactForm.reset();
      } else {
        throw new Error('Request failed');
      }
    } catch (err) {
      formStatus.textContent = 'Something went wrong. Please try again or email us directly.';
      formStatus.classList.add('err');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}
