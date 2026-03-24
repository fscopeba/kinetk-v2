// GSAP animations - very light & smooth
gsap.registerPlugin(ScrollTrigger);

// Hero fade-in
gsap.from("h1, p.text-2xl, .flex.gap-4", {
  y: 60,
  opacity: 0,
  duration: 1.2,
  stagger: 0.2,
  ease: "power3.out"
});

// Before/After energy trail glow (subtle pulse)
gsap.to("#after", {
  boxShadow: "0 0 40px #00D4FF80",
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

// Button pulse on load
gsap.from("a.bg-cyan-400", {
  scale: 0.95,
  opacity: 0.8,
  duration: 1.5,
  ease: "elastic.out(1, 0.5)"
});

// Scroll animations for stats and feature sections
ScrollTrigger.batch(".rounded-3xl", {
  onEnter: (elements) => {
    gsap.from(elements, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out"
    });
  },
  start: "top 85%",
  once: true
});

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    const answer = item.querySelector('.faq-answer');
    if (answer) {
      answer.classList.toggle('hidden');
    }
  });
});