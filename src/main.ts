/**
 * @fileoverview Application entry point
 * @module App
 */
import Lenis from 'lenis';
import gsap from 'gsap';
import { initLiquidGlass } from './components/liquid-glass.js';

const ANIMATION_CONFIG = Object.freeze({
  EASE_EXPO: 'power4.out',
  EASE_ELASTIC: 'elastic.out(1, 0.85)',
  STAGGER: 0.12,
});

class AppManager {
  constructor() {
    this.mediaQueries = {
      mobile: window.matchMedia('(max-width: 768px)'),
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)'),
    };

    this.state = {
      isMobile: this.mediaQueries.mobile.matches,
      prefersReducedMotion: this.mediaQueries.reducedMotion.matches,
    };

    this.lenisInstance = null;
    this.#bindEvents();
  }

  #bindEvents() {
    this.mediaQueries.mobile.addEventListener('change', (e) => {
      this.state.isMobile = e.matches;
      this.#handleMediaChange();
    });

    this.mediaQueries.reducedMotion.addEventListener('change', (e) => {
      this.state.prefersReducedMotion = e.matches;
      this.#handleMediaChange();
    });
  }

  #handleMediaChange() {
    if (this.state.isMobile || this.state.prefersReducedMotion) {
      if (this.lenisInstance) {
        this.lenisInstance.destroy();
        this.lenisInstance = null;
      }
      document.documentElement.classList.add('fallback-scroll');
    } else {
      document.documentElement.classList.remove('fallback-scroll');
      if (!this.lenisInstance) {
        this.#initScrollEngine();
      }
    }
  }

  bootstrap() {
    this.#showEasterEgg();
    try {
      this.#initScrollEngine();
      this.#playEntranceSequence();
      this.#loadPageSpecificModules();
    } catch (error) {
      console.warn('[App] Error during initialization. Falling back to default behavior.', error);
      document.documentElement.classList.add('fallback-scroll');
      gsap.set('.anim-el, .hero-cover, .profile-name', { visibility: 'visible', opacity: 1, y: 0 });
    }
  }

  #showEasterEgg() {
    const asciiArt = `
      /\\_/\\  
     ( o.o ) 
      > ^ <  
    `;
    console.log(
      "%cOlá, Recrutador(a) / Dev Curioso! 👀",
      "font-size: 24px; font-weight: bold; color: #222;"
    );
    console.log(
      "%cQue legal ver você inspecionando meu código. Gosta do que vê? Vamos conversar!\n" +
      "Repositório limpo, design minimalista e código estruturado. 🚀",
      "font-size: 14px; color: #555; padding-top: 5px; padding-bottom: 5px;"
    );
    console.log(`%c${asciiArt}`, "font-weight: bold; color: #333;");
  }

  #loadPageSpecificModules() {
    initLiquidGlass();
    this.#initWhatsAppForm();
  }

  #initWhatsAppForm() {
    const form = document.getElementById('whatsapp-form');
    if (!form) {
      return;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const firstName = formData.get('firstName');
      const lastName = formData.get('lastName');
      const message = formData.get('message');

      // O número de destino do WhatsApp
      const targetNumber = '5511977440146'; // Puxado do LinkTree anterior
      
      const text = `Olá! Meu nome é ${firstName} ${lastName}.\n\n${message}`;

      const encodedText = encodeURIComponent(text);
      const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodedText}`;
      
      window.open(whatsappUrl, '_blank');
    });
  }

  #initScrollEngine() {
    if (this.state.prefersReducedMotion || this.state.isMobile) {
      document.documentElement.classList.add('fallback-scroll');
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
        ease: ANIMATION_CONFIG.EASE_EXPO,
      });
    }

    if (profileName) {
      const headerElements = document.querySelectorAll('.card-header > *');
      if (headerElements.length > 0) {
        timeline.from(headerElements, {
          opacity: 0,
          y: 15,
          stagger: 0.1,
          duration: 1.5,
          ease: ANIMATION_CONFIG.EASE_ELASTIC,
        }, heroCover ? '-=1.2' : 0);
      }
    }

    if (animatedElements.length > 0) {
      gsap.set(animatedElements, { visibility: 'visible' });

      if (!this.state.prefersReducedMotion) {
        timeline.from(animatedElements, {
          opacity: 0,
          y: 20,
          stagger: ANIMATION_CONFIG.STAGGER,
          duration: 1.5,
          ease: ANIMATION_CONFIG.EASE_ELASTIC,
        }, '-=1.2');
      }
    }
  }
}

// App Initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new AppManager().bootstrap());
} else {
  new AppManager().bootstrap();
}
