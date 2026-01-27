/**
 * Immersive Ecosystem 2.0 (High-End Engineering)
 * Stack: Lenis + GSAP (ScrollTrigger) + SplitType
 */
import Lenis from 'https://cdn.skypack.dev/@studio-freight/lenis';
import gsap from 'https://cdn.skypack.dev/gsap';
import ScrollTrigger from 'https://cdn.skypack.dev/gsap/ScrollTrigger';
import SplitType from 'https://cdn.skypack.dev/split-type';

gsap.registerPlugin(ScrollTrigger);

/**
 * MODULE: Spotlight Interaction
 * Adds a tracking gradient glow to elements (Mouse + Touch).
 */
class SpotlightButton {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    this.element.addEventListener('mousemove', (e) => this.handleMove(e, false));
    this.element.addEventListener('touchmove', (e) => this.handleMove(e, true), { passive: true });
    this.element.addEventListener('touchstart', (e) => this.handleMove(e, true), { passive: true }); // Snap to finger instantly

    // Reset on leave/end
    this.element.addEventListener('mouseleave', () => this.handleLeave());
    this.element.addEventListener('touchend', () => this.handleLeave());
  }

  handleMove(e, isTouch) {
    const rect = this.element.getBoundingClientRect();
    let clientX, clientY;

    if (isTouch) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Update CSS variables for the glow effect
    this.element.style.setProperty('--x', `${x}px`);
    this.element.style.setProperty('--y', `${y}px`);

    // Magnetic Pull (Physical feel)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const pullX = (x - centerX) * 0.1; // 10% pull force
    const pullY = (y - centerY) * 0.1;

    gsap.to(this.element, {
      x: pullX,
      y: pullY,
      duration: 0.4,
      ease: 'power2.out'
    });
  }

  handleLeave() {
    gsap.to(this.element, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  }
}

/**
 * MODULE: Typography Animator
 * Splits text and orchestrates editorial reveals.
 */
class TypographyAnimator {
  constructor(selector) {
    this.elements = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    this.elements.forEach(el => {
      // Split text into chars
      const text = new SplitType(el, { types: 'chars' });

      // Animate Chars
      gsap.from(text.chars, {
        yPercent: 120, // Comes from below
        opacity: 0,
        rotationX: -45,
        stagger: 0.05, // Editorial timing
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.2
      });
    });
  }
}

/**
 * CORE: App Orchestrator
 */
const App = (function () {
  const state = {
    lenis: null,
    isMobile: window.matchMedia('(max-width: 768px)').matches,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  };

  const setupSmoothScroll = () => {
    if (state.prefersReducedMotion) return;

    state.lenis = new Lenis({
      duration: 1.5, // Even smoother (Lux feel)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: true,
      touchMultiplier: 1.5,
    });

    state.lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      state.lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  };

  const setupInteractions = () => {
    // 1. Initialize Spotlights (Enabled for both Mobile and Desktop)
    document.querySelectorAll('nav a').forEach(el => new SpotlightButton(el));

    // 2. Editorial Text Reveal
    new TypographyAnimator('.nome');

    // 3. Image Reveal (Scale + Fade)
    gsap.from('#profile img', {
      scale: 0.5,
      opacity: 0,
      duration: 1.5,
      ease: 'expo.out',
      delay: 0.1
    });

    // 4. Stagger Links (Lag Effect)
    gsap.from('nav a', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.5
    });
  };

  const init = () => {
    console.log('✨ System Upgrade: High-End Motion Active');
    setupSmoothScroll();
    setupInteractions();
  };

  return { init };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', App.init);
} else {
  App.init();
}
