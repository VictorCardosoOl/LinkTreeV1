/**
 * Immersive Ecosystem (Awwwards Grade)
 * Stack: Lenis + GSAP ScrollTrigger
 */
import Lenis from 'https://cdn.skypack.dev/@studio-freight/lenis';
import gsap from 'https://cdn.skypack.dev/gsap';
import ScrollTrigger from 'https://cdn.skypack.dev/gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App = (function () {
  const state = {
    lenis: null,
    isMobile: window.matchMedia('(max-width: 768px)').matches,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  };

  /**
   * FASE 3: Smooth Wrapper Architecture
   * Setup Lenis & Synchronize RAF
   */
  const setupSmoothScroll = () => {
    if (state.prefersReducedMotion) return; // Accessibility Check

    state.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential Ease
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Sync GSAP ScrollTrigger with Lenis
    state.lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      state.lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0); // Remove lag smoothing for precise sync
  };

  /**
   * FASE 4: Coreografia (Physics-Based)
   */
  const setupAnimations = () => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. Hero Reveal (Lei da Inércia - Entrada Suave)
    tl.from('#profile img', {
      scale: 0.8,
      opacity: 0,
      duration: 1.5,
      y: 50
    })
      .from('.nome', {
        y: 30,
        opacity: 0,
        duration: 1,
        filter: 'blur(10px)' // Cinematic Blur Effect
      }, '-=1.2');

    // 2. Links Stagger (Lei do Ritmo)
    // "O conteúdo deve fluir, não aparecer"
    gsap.from('nav ul li', {
      scrollTrigger: {
        trigger: 'nav',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1, // 0.1s rhythm
      ease: 'expo.out'
    });

    // 3. Magnetic Microinteractions (Physics)
    const buttons = document.querySelectorAll('nav a, #social-links a');

    buttons.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        if (state.isMobile) return; // Mobile Guard

        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Atração Magnética (0.3 power)
        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.4)' // Retorno com "peso"
        });
      });
    });

    // 4. Parallax Background & Elements (Lei da Profundidade)
    if (!state.isMobile) {
      gsap.to('#profile', {
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        yPercent: 50, // Move slower than scroll
        opacity: 0
      });
    }
  };

  const init = () => {
    console.log('🚀 Immersive System Initialized');
    setupSmoothScroll();
    setupAnimations();
  };

  return { init };
})();

// Wait for module execution
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', App.init);
} else {
  App.init();
}
