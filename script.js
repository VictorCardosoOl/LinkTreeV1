/**
 * @fileoverview Application entry point.
 * Refactored for Minimalist Editorial Design.
 * Simplifies animations to match the clean B&W aesthetic.
 *
 * @module App
 * @requires lenis
 * @requires gsap
 * @requires ionicons
 */
import Lenis from 'lenis';
import gsap from 'gsap';
import 'ionicons';

const PHYSICS = Object.freeze({
  EASE_EXPO: 'power4.out',
  STAGGER: 0.08,
});

/**
 * App Module — Scroll & Minimalist Entrance Animations
 */
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
        lerp: 0.1,
        smoothWheel: true,
      });

      gsap.ticker.add((time) => state.lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } catch {
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  };

  /**
   * Entrada minimalista e imersiva. Efeito "fade-up" pacífico 
   * em vez do split-type agressivo anterior.
   */
  const _playEntranceSequence = () => {
    const tl = gsap.timeline({ delay: 0.2 });
    const cover = document.querySelector('.hero-cover');
    const name = document.querySelector('.profile-name');
    const elements = document.querySelectorAll('.anim-el');

    // Se tiver capa (Home), suaviza a imagem primeiro
    if (cover && !state.prefersReducedMotion) {
      tl.from(cover, {
        opacity: 0,
        y: -20,
        duration: 1.2,
        ease: PHYSICS.EASE_EXPO,
      });
    }

    // Fade-in limpo na tipografia serifada
    if (name) {
      tl.from(
        name,
        {
          opacity: 0,
          y: 15,
          duration: 1.5,
          ease: PHYSICS.EASE_EXPO,
        },
        cover ? '-=0.8' : 0
      );
    }

    // Revelação elegante dos blocos seguintes (bio, stats, posts)
    if (elements.length && !state.prefersReducedMotion) {
      gsap.set(elements, { visibility: 'visible' });
      tl.from(
        elements,
        {
          opacity: 0,
          y: 10,
          stagger: PHYSICS.STAGGER,
          duration: 1.2,
          ease: PHYSICS.EASE_EXPO,
        },
        '-=1.2'
      );
    } else if (elements.length) {
      // Fallback sem animação
      gsap.set(elements, { visibility: 'visible' });
    }
  };

  const PAGE_HANDLERS = {
    home: () => {
      _playEntranceSequence();
    },
    gallery: () => {
      _playEntranceSequence();
    },
  };

  const init = () => {
    _initScrollEngine();

    const page = document.body.dataset.page ?? 'home';
    PAGE_HANDLERS[page]?.();
  };

  return { init };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', App.init);
} else {
  App.init();
}
