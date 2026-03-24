// ============================================================
// KINETK v2.0 — Main Script
// GSAP + ScrollTrigger, counters, FAQ, all animations
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
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.add('hidden'));
  });
}

// ── Nav shadow on scroll ──────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) {
    nav.style.boxShadow = window.scrollY > 30
      ? '0 4px 30px rgba(0,212,255,0.1)'
      : 'none';
  }
}, { passive: true });

// ── Hero Entrance ────────────────────────────────────────────
const heroText = document.getElementById('hero-text');
if (heroText) {
  gsap.from(heroText.children, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out',
    delay: 0.15
  });
}

// ── Hero Images entrance ─────────────────────────────────────
const heroImages = document.getElementById('hero-images');
if (heroImages) {
  const before = heroImages.querySelector('.img-before');
  const after = heroImages.querySelector('.img-after');
  if (before) {
    gsap.from(before, {
      x: -40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.4
    });
  }
  if (after) {
    gsap.from(after, {
      x: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.6
    });
    // Perpetual glow pulse on the After card
    gsap.to(after, {
      boxShadow: '0 0 40px rgba(0,212,255,0.35)',
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }
}

// ── Stat Counters ─────────────────────────────────────────────
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

let statsAnimated = false;
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      const stat1 = document.getElementById('stat1');
      const stat2 = document.getElementById('stat2');
      const stat3 = document.getElementById('stat3');
      if (stat1) animateCounter(stat1, 94, '%', 1400);
      if (stat2) setTimeout(() => { stat2.textContent = '48hr'; }, 500);
      if (stat3) {
        let n = 31;
        const t = setInterval(() => {
          n += 2;
          if (n >= 89) { n = 89; clearInterval(t); }
          stat3.textContent = '31 → ' + n;
        }, 28);
      }

      // Animate stat cards in
      gsap.from('.stat-card', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
      });

      statsObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const firstStatCard = document.querySelector('.stat-card');
if (firstStatCard) statsObserver.observe(firstStatCard.closest('section') || firstStatCard);

// ── Section headings reveal ───────────────────────────────────
document.querySelectorAll('section h2').forEach(h2 => {
  gsap.from(h2, {
    scrollTrigger: { trigger: h2, start: 'top 90%', once: true },
    y: 20,
    opacity: 0,
    duration: 0.7,
    ease: 'power2.out'
  });
});

// ── Step Cards — staggered from section trigger ───────────────
const stepsGrid = document.querySelector('#how .grid');
if (stepsGrid) {
  gsap.from('.step-card', {
    scrollTrigger: { trigger: stepsGrid, start: 'top 82%', once: true },
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power2.out'
  });
}

// ── Price Cards — all trigger together from section ───────────
const pricingGrid = document.getElementById('pricing-grid');
if (pricingGrid) {
  gsap.from('.price-card', {
    scrollTrigger: { trigger: pricingGrid, start: 'top 80%', once: true },
    y: 50,
    opacity: 0,
    duration: 0.7,
    stagger: 0.18,
    ease: 'back.out(1.2)'
  });
}

// ── Testimonials — stagger reveal ─────────────────────────────
const testimonialsGrid = document.querySelector('.testimonial-card')
  ?.closest('.grid');
if (testimonialsGrid) {
  gsap.from('.testimonial-card', {
    scrollTrigger: { trigger: testimonialsGrid, start: 'top 85%', once: true },
    y: 30,
    opacity: 0,
    duration: 0.55,
    stagger: 0.1,
    ease: 'power2.out'
  });
}

// ── Video section reveal ───────────────────────────────────────
const videoBox = document.querySelector('.aspect-video');
if (videoBox) {
  gsap.from(videoBox, {
    scrollTrigger: { trigger: videoBox, start: 'top 85%', once: true },
    y: 30,
    opacity: 0,
    duration: 0.7,
    ease: 'power2.out'
  });
}

// ── Social proof bar items ─────────────────────────────────────
const socialProofItems = document.querySelectorAll('.flex.flex-wrap.justify-center span');
if (socialProofItems.length) {
  gsap.from(socialProofItems, {
    scrollTrigger: { trigger: socialProofItems[0].closest('section'), start: 'top 90%', once: true },
    y: 10,
    opacity: 0,
    duration: 0.4,
    stagger: 0.07,
    ease: 'power1.out'
  });
}

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
      if (icon) icon.textContent = '−';
      gsap.from(answer, { height: 0, opacity: 0, duration: 0.28, ease: 'power2.out' });
    }
  });
});

// ── FAQ items reveal ──────────────────────────────────────────
document.querySelectorAll('.faq-item').forEach((item, i) => {
  gsap.from(item, {
    scrollTrigger: { trigger: item, start: 'top 90%', once: true },
    x: -20,
    opacity: 0,
    duration: 0.5,
    delay: i * 0.05,
    ease: 'power2.out'
  });
});

// ── Final CTA section reveal ──────────────────────────────────
const finalCta = document.querySelector('.cta-primary');
if (finalCta) {
  const ctaSection = finalCta.closest('section');
  if (ctaSection) {
    gsap.from(ctaSection.children, {
      scrollTrigger: { trigger: ctaSection, start: 'top 85%', once: true },
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power2.out'
    });
  }
}
