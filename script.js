import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const PHYSICS = Object.freeze({
  EASE_INERTIA: 'power3.out',
  EASE_EXPO: 'expo.out',
  EASE_ELASTIC: 'elastic.out(1, 0.4)',
  DAMPING: 0.08,
  STAGGER: 0.08,
  MAGNETIC_STRENGTH_LOW: 15,
  MAGNETIC_STRENGTH_HIGH: 30,
});

class MagneticButton {
  #element;
  #strength;
  #rect = null;
  #isTouch = false;
  #abortController = new AbortController();

  constructor(element, strength = 20) {
    if (!(element instanceof HTMLElement)) {
      throw new TypeError('MagneticButton: element must be an HTMLElement');
    }
    this.#element = element;
    this.#strength = strength;
    this.#bindEvents();
  }

  #updateRect() {
    this.#rect = this.#element.getBoundingClientRect();
  }

  #handleMove(clientX, clientY) {
    if (!this.#rect) this.#updateRect();

    const x = clientX - this.#rect.left;
    const y = clientY - this.#rect.top;

    this.#element.style.setProperty('--x', `${x}px`);
    this.#element.style.setProperty('--y', `${y}px`);

    if (this.#isTouch) return;

    const distX = (x - this.#rect.width / 2) / (this.#rect.width / 2);
    const distY = (y - this.#rect.height / 2) / (this.#rect.height / 2);

    gsap.to(this.#element, {
      x: distX * this.#strength,
      y: distY * this.#strength,
      rotation: distX * 2,
      duration: 0.5,
      ease: PHYSICS.EASE_INERTIA,
      overwrite: 'auto',
    });
  }

  #handleLeave() {
    this.#isTouch = false;
    gsap.to(this.#element, {
      x: 0, y: 0, rotation: 0,
      duration: 0.8,
      ease: PHYSICS.EASE_ELASTIC,
      overwrite: 'auto',
    });
  }

  #bindEvents() {
    const { signal } = this.#abortController;

    this.#element.addEventListener('mouseenter', () => this.#updateRect(), { signal });
    this.#element.addEventListener('mousemove', ({ clientX, clientY }) => this.#handleMove(clientX, clientY), { signal });
    this.#element.addEventListener('mouseleave', () => this.#handleLeave(), { signal });

    this.#element.addEventListener('touchstart', ({ touches }) => {
      this.#isTouch = true;
      this.#updateRect();
      this.#handleMove(touches[0].clientX, touches[0].clientY);
    }, { passive: true, signal });

    this.#element.addEventListener('touchmove', ({ touches }) => {
      this.#handleMove(touches[0].clientX, touches[0].clientY);
    }, { passive: true, signal });

    this.#element.addEventListener('touchend', () => this.#handleLeave(), { signal });
  }

  destroy() {
    this.#abortController.abort();
    gsap.killTweensOf(this.#element);
  }
}

class TypographyAnimator {
  #elements;

  constructor(selector) {
    if (typeof selector !== 'string' || !selector.trim()) {
      throw new TypeError('TypographyAnimator: selector must be a non-empty string');
    }
    this.#elements = document.querySelectorAll(selector);
    this.#init();
  }

  #animateElement(el) {
    const split = new SplitType(el, { types: 'chars' });
    if (!split.chars?.length) return;

    gsap.from(split.chars, {
      yPercent: 120,
      opacity: 0,
      rotationX: -45,
      stagger: 0.04,
      duration: 1.4,
      ease: 'power4.out',
      delay: 0.2,
    });
  }

  #init() {
    if (!this.#elements.length) return;

    this.#elements.forEach((el) => {
      try {
        this.#animateElement(el);
      } catch {
        // Text renders normally as fallback
      }
    });
  }
}

const App = (() => {
  const state = {
    lenis: null,
    isMobile: window.matchMedia('(max-width: 768px)').matches,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  };

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

      gsap.ticker.add((time) => state.lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } catch {
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  };

  const _initMagneticButtons = () => {
    document.querySelectorAll('nav a:not(.feature-card)').forEach(
      (el) => new MagneticButton(el, PHYSICS.MAGNETIC_STRENGTH_LOW)
    );
    document.querySelectorAll('.feature-card').forEach(
      (el) => new MagneticButton(el, PHYSICS.MAGNETIC_STRENGTH_HIGH)
    );
  };

  const _playEntranceSequence = () => {
    const tl = gsap.timeline({ delay: 0.5 });
    const profile = document.getElementById('profile');
    const navItems = document.querySelectorAll('nav li');

    if (profile) {
      tl.from(profile, { scale: 0.8, opacity: 0, duration: 1.2, ease: PHYSICS.EASE_EXPO });
    }

    if (navItems.length) {
      tl.from(navItems, {
        y: 40, opacity: 0,
        stagger: PHYSICS.STAGGER,
        duration: 1,
        ease: PHYSICS.EASE_INERTIA,
      }, '-=0.8');
    }
  };

  const _initParallax = () => {
    const profileImg = document.querySelector('#profile img');
    if (!profileImg) return;

    gsap.to(profileImg, {
      yPercent: 20,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  };

  const _initInteractions = () => {
    new TypographyAnimator('.nome');
    _initMagneticButtons();
    _playEntranceSequence();

    if (!state.isMobile && !state.prefersReducedMotion) {
      _initParallax();
    }
  };

  const init = () => {
    _initScrollEngine();
    _initInteractions();
  };

  return { init };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', App.init);
} else {
  App.init();
}
