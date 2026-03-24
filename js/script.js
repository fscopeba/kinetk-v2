// ============================================================
// KINETK v2.0 — Main Script
// GSAP + ScrollTrigger animations, hamburger, FAQ, counters
// ============================================================

gsap.registerPlugin(ScrollTrigger);

// ── Hamburger Menu ──────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const bars = hamburger.querySelectorAll('span');
    bars[0].classList.toggle('rotate-45');
    bars[0].classList.toggle('translate-y-2');
    bars[1].classList.toggle('opacity-0');
    bars[2].classList.toggle('-rotate-45');
    bars[2].classList.toggle('-translate-y-2');
  });
  // Close on mobile link click
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.add('hidden'));
  });
}

// ── Hero Entrance ────────────────────────────────────────────
const heroText = document.getElementById('hero-text');
if (heroText) {
  gsap.from(heroText.children, {
    y: 40,
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,
    ease: 'power3.out',
    delay: 0.2
  });
}

// Before/after glow pulse
const afterImg = document.getElementById('after');
if (afterImg) {
  gsap.to(afterImg, {
    boxShadow: '0 0 50px #00D4FF60',
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
}

// ── Stat Counters (IntersectionObserver) ────────────────────
function animateCounter(el, target, suffix, duration) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start) + suffix;
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const stat1 = document.getElementById('stat1');
      const stat2 = document.getElementById('stat2');
      const stat3 = document.getElementById('stat3');
      if (stat1) animateCounter(stat1, 94, '%', 1500);
      if (stat2) { setTimeout(() => { stat2.textContent = '48hr'; }, 600); }
      if (stat3) {
        let n = 31;
        const t = setInterval(() => {
          n += 2;
          if (n >= 89) { n = 89; clearInterval(t); }
          stat3.textContent = '31 → ' + n;
        }, 30);
      }
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.4 });

const statsSection = document.querySelector('.stat-card');
if (statsSection) statsObserver.observe(statsSection.closest('section') || statsSection);

// ── Scroll Reveal — Step Cards ───────────────────────────────
gsap.utils.toArray('.step-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: { trigger: card, start: 'top 88%', once: true },
    y: 50,
    opacity: 0,
    duration: 0.7,
    delay: i * 0.15,
    ease: 'power2.out'
  });
});

// ── Scroll Reveal — Price Cards ──────────────────────────────
gsap.utils.toArray('.price-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: { trigger: card, start: 'top 85%', once: true },
    y: 60,
    opacity: 0,
    duration: 0.8,
    delay: i * 0.15,
    ease: 'power2.out'
  });
});

// ── Scroll Reveal — Testimonials ─────────────────────────────
gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: { trigger: card, start: 'top 88%', once: true },
    y: 40,
    opacity: 0,
    duration: 0.6,
    delay: i * 0.1,
    ease: 'power2.out'
  });
});

// ── FAQ Accordion (smooth GSAP) ───────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const icon = btn.querySelector('.faq-icon');
    const isOpen = !answer.classList.contains('hidden');

    // Close all
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
    document.querySelectorAll('.faq-icon').forEach(i => { i.textContent = '+'; });

    if (!isOpen) {
      answer.classList.remove('hidden');
      icon.textContent = '−';
      gsap.from(answer, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.out' });
    }
  });
});

// ── Nav shadow on scroll ──────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) {
    nav.style.boxShadow = window.scrollY > 20
      ? '0 4px 30px rgba(0,212,255,0.08)'
      : 'none';
  }
});
