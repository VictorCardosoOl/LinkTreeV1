/**
 * Immersive Ecosystem 3.0 (Physics-Based)
 * Stack: Lenis + GSAP (ScrollTrigger) + SplitType
 */
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger);

/**
 * UTILS: Physics Constants
 */
const PHYSICS = {
  EASE_INERTIA: 'power3.out',
  EASE_EXPO: 'expo.out',
  EASE_ELASTIC: 'elastic.out(1, 0.4)',
  DAMPING: 0.08, // Weight/Luxury feel
  STAGGER: 0.08  // Rhythm
};

/**
 * MODULE: Spotlight & Magnetic Interaction
 * Adds tracking gradient glow AND physical magnetic pull.
 */
class MagneticButton {
  constructor(element, strength = 20) {
    this.element = element;
    this.strength = strength;
    this.glowElement = element.querySelector('::before') ? element : null; // Logic handled in CSS mostly
    this.init();
  }

  init() {
    this.element.addEventListener('mousemove', (e) => this.handleMove(e, false));
    this.element.addEventListener('touchmove', (e) => this.handleMove(e, true), { passive: true });
    this.element.addEventListener('touchstart', (e) => this.handleMove(e, true), { passive: true });

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

    // Spotlight Logic (CSS Vars)
    this.element.style.setProperty('--x', `${x}px`);
    this.element.style.setProperty('--y', `${y}px`);

    // Magnetic Physics
    // Only apply magnetic pull on Desktop to prevent scroll jank on mobile
    if (!isTouch) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate distance from center (-1 to 1)
      const distX = (x - centerX) / centerX;
      const distY = (y - centerY) / centerY;

      gsap.to(this.element, {
        x: distX * this.strength,
        y: distY * this.strength,
        rotation: distX * 2, // Slight tilt
        duration: 0.5,
        ease: PHYSICS.EASE_INERTIA
      });
    }
  }

  handleLeave() {
    gsap.to(this.element, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.8,
      ease: PHYSICS.EASE_ELASTIC
    });
  }
}

/**
 * MODULE: Typography Reveal
 */
class TypographyAnimator {
  constructor(selector) {
    this.elements = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    this.elements.forEach(el => {
      const text = new SplitType(el, { types: 'chars' });

      gsap.from(text.chars, {
        yPercent: 120,
        opacity: 0,
        rotationX: -45,
        stagger: 0.04,
        duration: 1.4,
        ease: 'power4.out',
        delay: 0.2
      });
    });
  }
}

/**
 * CORE: Experience Orchestrator
 */
const App = (function () {
  const state = {
    lenis: null,
    isMobile: window.matchMedia('(max-width: 768px)').matches,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  };

  const setupSmoothScroll = () => {
    if (state.prefersReducedMotion || state.isMobile) {
      // Native scroll mainly for mobile performance or accessibility
      document.documentElement.style.scrollBehavior = 'smooth';
      return;
    }

    // Lenis v1 Setup
    state.lenis = new Lenis({
      lerp: PHYSICS.DAMPING, // The "Weight"
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    // Unified RAF Loop (Crucial for GSAP sync)
    gsap.ticker.add((time) => {
      state.lenis.raf(time * 1000); // Lenis requires ms
    });

    gsap.ticker.lagSmoothing(0); // Prevent GSAP form catching up abruptly
  };

  const setupInteractions = () => {
    // 1. Text Reveals
    new TypographyAnimator('.nome');

    // 2. Magnetic Interactive Elements
    // Standard Links: low strength
    document.querySelectorAll('nav a:not(.feature-card)').forEach(el => new MagneticButton(el, 15));
    // Feature Card: high strength (High Gravity)
    document.querySelectorAll('.feature-card').forEach(el => new MagneticButton(el, 30));

    // 3. Staggered Entrance (The "Flow")
    const tl = gsap.timeline({ delay: 0.5 });

    tl.from('#profile', {
      scale: 0.8,
      opacity: 0,
      duration: 1.2,
      ease: PHYSICS.EASE_EXPO
    })
      .from('nav li', {
        y: 40,
        opacity: 0,
        stagger: PHYSICS.STAGGER,
        duration: 1,
        ease: PHYSICS.EASE_INERTIA
      }, "-=0.8") // Overlap
      .from('#social-links', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: PHYSICS.EASE_INERTIA
      }, "-=0.6");

    // 4. Parallax Effect (Desktop Only)
    if (!state.isMobile && !state.prefersReducedMotion) {
      // Profile Image Parallax
      gsap.to('#profile img', {
        yPercent: 20,
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  };

  const init = () => {
    console.log('💎 Physics Engine: ONLINE');
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
