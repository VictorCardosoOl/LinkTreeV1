/**
 * Immersive Ecosystem 3.0 (Physics-Based)
 * Stack: Lenis + GSAP (ScrollTrigger) + SplitType
 * @module App
 */
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

/**
 * Physics Configuration Constants
 * @constant {Object}
 */
const PHYSICS = Object.freeze({
  EASE_INERTIA: 'power3.out',
  EASE_EXPO: 'expo.out',
  EASE_ELASTIC: 'elastic.out(1, 0.4)',
  DAMPING: 0.08,
  STAGGER: 0.08,
  MAGNETIC_STRENGTH_LOW: 15,
  MAGNETIC_STRENGTH_HIGH: 30
});

/**
 * Handles Magnetic and Spotlight effects for UI elements.
 */
class MagneticButton {
  /**
   * @param {HTMLElement} element - Target element
   * @param {number} strength - Magnetic pull strength
   */
  constructor(element, strength = 20) {
    if (!element) throw new Error('MagneticButton: Element required');

    this.element = element;
    this.strength = strength;
    this.rect = null;
    this.isTouch = false;

    this.bindEvents();
  }

  bindEvents() {
    this.element.addEventListener('mouseenter', () => this.updateRect());
    this.element.addEventListener('mousemove', (e) => this.handleMove(e));
    this.element.addEventListener('mouseleave', () => this.handleLeave());

    this.element.addEventListener('touchstart', (e) => {
      this.isTouch = true;
      this.updateRect();
      this.handleMove(e.touches[0]);
    }, { passive: true });

    this.element.addEventListener('touchmove', (e) => {
      this.handleMove(e.touches[0]);
    }, { passive: true });

    this.element.addEventListener('touchend', () => this.handleLeave());
  }

  updateRect() {
    this.rect = this.element.getBoundingClientRect();
  }

  handleMove(clientEvent) {
    if (!this.rect) this.updateRect();

    const x = clientEvent.clientX - this.rect.left;
    const y = clientEvent.clientY - this.rect.top;

    // Spotlight Effect (CSS Variables)
    this.element.style.setProperty('--x', `${x}px`);
    this.element.style.setProperty('--y', `${y}px`);

    // Magnetic Pull (Desktop Only for Performance)
    if (!this.isTouch) {
      const centerX = this.rect.width / 2;
      const centerY = this.rect.height / 2;

      const distX = (x - centerX) / centerX;
      const distY = (y - centerY) / centerY;

      gsap.to(this.element, {
        x: distX * this.strength,
        y: distY * this.strength,
        rotation: distX * 2,
        duration: 0.5,
        ease: PHYSICS.EASE_INERTIA,
        overwrite: 'auto'
      });
    }
  }

  handleLeave() {
    this.isTouch = false;
    gsap.to(this.element, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.8,
      ease: PHYSICS.EASE_ELASTIC,
      overwrite: 'auto'
    });
  }
}

/**
 * Manages text reveal animations using SplitType.
 */
class TypographyAnimator {
  constructor(selector) {
    this.elements = document.querySelectorAll(selector);
    this.init();
  }

  init() {
    if (!this.elements.length) return;

    this.elements.forEach((el) => {
      try {
        const text = new SplitType(el, { types: 'chars' });

        if (!text.chars) return;

        gsap.from(text.chars, {
          yPercent: 120,
          opacity: 0,
          rotationX: -45,
          stagger: 0.04,
          duration: 1.4,
          ease: 'power4.out',
          delay: 0.2
        });
      } catch (error) {
        // Fail silently in production, text renders normally as fallback
      }
    });
  }
}

/**
 * Core Application Controller
 * Handles global state, scroll engine, and initialization.
 */
const App = (() => {
  const state = {
    lenis: null,
    isMobile: window.matchMedia('(max-width: 768px)').matches,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  };

  /**
   * Initializes Lenis Scroll Engine synced with GSAP.
   */
  const _initScrollEngine = () => {
    if (state.prefersReducedMotion || state.isMobile) {
      document.documentElement.style.scrollBehavior = 'smooth';
      return;
    }

    try {
      state.lenis = new Lenis({
        lerp: PHYSICS.DAMPING,
        smoothWheel: true,
        wheelMultiplier: 1,
      });

      // Synchronize Lenis with GSAP Ticker
      gsap.ticker.add((time) => {
        state.lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    } catch (e) {
      // Fallback to native scroll if Lenis fails
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  };

  /**
   * Initializes all interactive components.
   */
  const _initInteractions = () => {
    // 1. Text Animations
    new TypographyAnimator('.nome');

    // 2. Interactive Buttons (Guard Clause for safety)
    const navLinks = document.querySelectorAll('nav a:not(.feature-card)');
    const featureCards = document.querySelectorAll('.feature-card');

    navLinks.forEach(el => new MagneticButton(el, PHYSICS.MAGNETIC_STRENGTH_LOW));
    featureCards.forEach(el => new MagneticButton(el, PHYSICS.MAGNETIC_STRENGTH_HIGH));

    // 3. Staggered Entrance Animation
    _playEntranceSequence();

    // 4. Desktop Parallax (Performance Guard)
    if (!state.isMobile && !state.prefersReducedMotion) {
      _initParallax();
    }
  };

  const _playEntranceSequence = () => {
    const tl = gsap.timeline({ delay: 0.5 });

    const profile = document.getElementById('profile');
    const navItems = document.querySelectorAll('nav li');
    const socialLinks = document.getElementById('social-links');

    if (profile) {
      tl.from(profile, {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: PHYSICS.EASE_EXPO
      });
    }

    if (navItems.length) {
      tl.from(navItems, {
        y: 40,
        opacity: 0,
        stagger: PHYSICS.STAGGER,
        duration: 1,
        ease: PHYSICS.EASE_INERTIA
      }, "-=0.8");
    }

    if (socialLinks) {
      tl.from(socialLinks, {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: PHYSICS.EASE_INERTIA
      }, "-=0.6");
    }
  };

  const _initParallax = () => {
    const profileImg = document.querySelector('#profile img');
    if (profileImg) {
      gsap.to(profileImg, {
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
    _initScrollEngine();
    _initInteractions();
  };

  return { init };
})();

// Execution Entry Point
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', App.init);
} else {
  App.init();
}
