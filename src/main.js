/**
 * @fileoverview Application entry point - Enterprise AppManager
 * @module App
 */
import Lenis from 'lenis';
import gsap from 'gsap';
import { initLiquidGlass } from './features/liquid-glass.js';

const PHYSICS = Object.freeze({
  EASE_EXPO: 'power4.out',
  EASE_ELASTIC: 'elastic.out(1, 0.85)',
  STAGGER: 0.12,
});

/**
 * @class AppManager
 * @description Classe Sênior de Inicialização com fallback Graceful Degradation e Opcional Chaining.
 */
class AppManager {
  constructor() {
    this.state = Object.freeze({
      isMobile: window.matchMedia('(max-width: 768px)').matches,
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
    this.lenisInstance = null;
  }

  bootstrap() {
    try {
      this.#initScrollEngine();
      this.#playEntranceSequence();
      
      // Carregamento específico sob demanda (Code Splitting)
      this.#loadPageSpecificModules();
    } catch (error) {
      console.warn('[App] Instalação base falhou, usando modo Fallback', error);
      document.documentElement.style.scrollBehavior = 'smooth';
      gsap.set('.anim-el, .hero-cover, .profile-name', { visibility: 'visible', opacity: 1, y: 0 });
    }
  }

  #loadPageSpecificModules() {
    const pageType = document.body.dataset.page || 'home';
    
    if (pageType === 'gallery') {
      import('./features/lightbox.js')
        .then(({ initLightbox }) => initLightbox())
        .catch((err) => console.error('[App] Falha ao baixar o modulo Gallery', err));
    } else {
      initLiquidGlass();
    }
  }

  #initScrollEngine() {
    if (this.state.prefersReducedMotion || this.state.isMobile) {
      document.documentElement.style.scrollBehavior = 'smooth';
      return;
    }

    this.lenisInstance = new Lenis({ lerp: 0.08, smoothWheel: true });
    
    gsap.ticker.add((time) => this.lenisInstance?.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  #playEntranceSequence() {
    const timeline = gsap.timeline({ delay: 0.3 });
    const heroCover = document.querySelector('.hero-cover');
    const profileName = document.querySelector('.profile-name');
    const animatedElements = document.querySelectorAll('.anim-el');

    if (heroCover && !this.state.prefersReducedMotion) {
      timeline.from(heroCover, {
        opacity: 0,
        scale: 1.05,
        duration: 1.5,
        ease: PHYSICS.EASE_EXPO,
      });
    }

    if (profileName) {
      const headerElements = document.querySelectorAll('.card-header > *');
      timeline.from(headerElements, {
        opacity: 0,
        y: 15,
        stagger: 0.1,
        duration: 1.5,
        ease: PHYSICS.EASE_ELASTIC,
      }, heroCover ? '-=1.2' : 0);
    }

    if (animatedElements.length > 0) {
      gsap.set(animatedElements, { visibility: 'visible' });

      if (!this.state.prefersReducedMotion) {
        timeline.from(animatedElements, {
          opacity: 0,
          y: 20,
          stagger: PHYSICS.STAGGER,
          duration: 1.5,
          ease: PHYSICS.EASE_ELASTIC,
        }, '-=1.2');
      }
    }
  }
}

// Singleton Engine Start
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new AppManager().bootstrap());
} else {
  new AppManager().bootstrap();
}
