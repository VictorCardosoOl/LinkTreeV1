/**
 * @fileoverview Application entry point.
 * @module App
 */
import Lenis from 'lenis';
import gsap from 'gsap';
import 'ionicons';

const PHYSICS = Object.freeze({
  EASE_EXPO: 'power2.out',
  STAGGER: 0.1,
});

const App = (() => {
  const state = {
    lenis: null,
    isMobile: window.matchMedia('(max-width: 768px)').matches,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  };

  const initScrollEngine = () => {
    if (state.prefersReducedMotion || state.isMobile) {
      document.documentElement.style.scrollBehavior = 'smooth';
      return;
    }

    try {
      state.lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
      });

      gsap.ticker.add((time) => state.lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } catch (error) {
      console.error('Lenis initialization failed:', error);
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  };

  const playEntranceSequence = () => {
    try {
      const timeline = gsap.timeline({ delay: 0.3 });
      const heroCover = document.querySelector('.hero-cover');
      const profileName = document.querySelector('.profile-name');
      const animatedElements = document.querySelectorAll('.anim-el');

      if (heroCover && !state.prefersReducedMotion) {
        timeline.from(heroCover, {
          opacity: 0,
          y: -10,
          duration: 1.8,
          ease: PHYSICS.EASE_EXPO,
        });
      }

      if (profileName) {
        timeline.from(
          profileName,
          {
            opacity: 0,
            y: 8,
            duration: 2.0,
            ease: PHYSICS.EASE_EXPO,
          },
          heroCover ? '-=1.2' : 0
        );
      }

      if (animatedElements.length > 0) {
        gsap.set(animatedElements, { visibility: 'visible' });

        if (!state.prefersReducedMotion) {
          timeline.from(
            animatedElements,
            {
              opacity: 0,
              y: 5,
              stagger: PHYSICS.STAGGER,
              duration: 1.8,
              ease: PHYSICS.EASE_EXPO,
            },
            '-=1.5'
          );
        }
      }
    } catch (error) {
      console.error('Animation sequence failed:', error);
      const fallbackElements = document.querySelectorAll('.anim-el, .hero-cover, .profile-name');
      if (fallbackElements.length > 0) {
        gsap.set(fallbackElements, { visibility: 'visible', opacity: 1, y: 0 });
      }
    }
  };

  const init = () => {
    try {
      initScrollEngine();
      playEntranceSequence();
    } catch (error) {
      console.error('App initialization failed:', error);
    }
  };

  return { init };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', App.init);
} else {
  App.init();
}
