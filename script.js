/**
 * @fileoverview Application entry point.
 * @module App
 */
import Lenis from 'lenis';
import gsap from 'gsap';

const PHYSICS = Object.freeze({
  EASE_EXPO: 'power4.out',
  EASE_ELASTIC: 'elastic.out(1, 0.85)',
  STAGGER: 0.12,
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

  const initLightbox = () => {
    const dialog = document.getElementById('lightbox');
    const closeBtn = document.getElementById('close-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item img');

    if (!dialog || !closeBtn || !lightboxImg) return;

    // Open lightbox
    galleryItems.forEach((img) => {
      img.closest('.gallery-item').addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Imagem ampliada';
        dialog.showModal();
        document.body.style.overflow = 'hidden'; // Evita scroll do fundo
      });
      // Acessibilidade via teclado
      img.closest('.gallery-item').setAttribute('tabindex', '0');
      img.closest('.gallery-item').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          lightboxImg.src = img.src;
          dialog.showModal();
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // Close lightbox
    const closeDialog = () => {
      dialog.close();
      document.body.style.overflow = '';
      lightboxImg.src = '';
    };

    closeBtn.addEventListener('click', closeDialog);

    // Close on backdrop click
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) {
        closeDialog();
      }
    });
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
          scale: 1.05,
          duration: 2.5,
          ease: PHYSICS.EASE_EXPO,
        });
      }

      if (profileName) {
        const headerElements = document.querySelectorAll('.card-header > *');
        timeline.from(
          headerElements,
          {
            opacity: 0,
            y: 15,
            stagger: 0.1,
            duration: 1.8,
            ease: PHYSICS.EASE_ELASTIC,
          },
          heroCover ? '-=1.8' : 0
        );
      }

      if (animatedElements.length > 0) {
        gsap.set(animatedElements, { visibility: 'visible' });

        if (!state.prefersReducedMotion) {
          timeline.from(
            animatedElements,
            {
              opacity: 0,
              y: 20,
              stagger: PHYSICS.STAGGER,
              duration: 1.8,
              ease: PHYSICS.EASE_ELASTIC,
            },
            '-=1.4'
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

      const page = document.body.dataset.page ?? 'home';
      if (page === 'gallery') {
        initLightbox();
      }
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
