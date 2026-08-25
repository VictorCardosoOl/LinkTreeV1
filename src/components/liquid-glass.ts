/**
 * Liquid Glass Effect - Vanilla JS Port
 * Baseado no liquid-glass-react
 */

export function initLiquidGlass() {
  const elements = document.querySelectorAll('.link-item');
  const cleanupFunctions = [];

  elements.forEach((el) => {
    if (el.dataset.hasLiquidGlass) {
      return;
    }
    el.dataset.hasLiquidGlass = "true";

    const computedStyle = window.getComputedStyle(el);
    // Force 999px to prevent Safari/Mobile Chrome from returning 0px on rem values
    const radius = '999px';
    const elasticity = 0.15;
    
    const fragment = document.createDocumentFragment();
    while (el.firstChild) {
        fragment.appendChild(el.firstChild);
    }
    
    el.style.position = 'relative'; 
    el.style.isolation = 'isolate'; 
    el.style.zIndex = '1';
    el.style.background = 'transparent';
    el.style.backdropFilter = 'none'; 
    el.style.border = 'none';
    el.style.boxShadow = 'none';

    // 2. Warp/Shader (A lente translúcida)
    const warpLayer = document.createElement('span');
    warpLayer.className = 'glass-warp-layer';
    warpLayer.style.position = 'absolute';
    warpLayer.style.inset = '0';
    warpLayer.style.borderRadius = radius;
    // Removido o SVG filter problemático que causa distorções no Chromium/Arc
    warpLayer.style.backdropFilter = `blur(12px) saturate(160%)`;
    warpLayer.style.WebkitBackdropFilter = `blur(12px) saturate(160%)`;
    warpLayer.style.background = 'transparent';
    warpLayer.style.boxShadow = '0px 10px 40px rgba(0, 0, 0, 0.05), inset 0 1px 3px rgba(255,255,255,0.5)';

    // Adicionamos um layer de background base claro simulando vidro transmitindo luz clara
    const baseBgLayer = document.createElement('span');
    baseBgLayer.style.position = 'absolute';
    baseBgLayer.style.inset = '0';
    baseBgLayer.style.borderRadius = radius;
    baseBgLayer.className = 'glass-base-bg';
    // Gradiente significativamente ampliado para preencher a cor vítrea com mais presença
    baseBgLayer.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.2) 65%, rgba(255,255,255,0.05) 100%)';
    baseBgLayer.style.border = '1px solid var(--color-border)';

    const border1 = document.createElement('span');
    const border2 = document.createElement('span');

    [border1, border2].forEach(b => {
        b.className = 'glass-border-layer';
        b.style.position = 'absolute';
        b.style.inset = '0';
        b.style.borderRadius = radius;
        b.style.pointerEvents = 'none';
        b.style.padding = '1.5px';
        b.style.WebkitMask = 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)';
        b.style.WebkitMaskComposite = 'xor';
        b.style.maskComposite = 'exclude';
    });
    
    border1.style.opacity = '0.3';
    border2.style.opacity = '0.7';
    
    // 4. Hover effect layers
    const hoverHighlight = document.createElement('span');
    hoverHighlight.style.position = 'absolute';
    hoverHighlight.style.inset = '0';
    hoverHighlight.style.borderRadius = radius;
    hoverHighlight.style.pointerEvents = 'none';
    hoverHighlight.style.opacity = '0';
    hoverHighlight.style.transition = 'opacity 0.2s ease-out';
    hoverHighlight.style.backgroundImage = 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)';
    hoverHighlight.style.mixBlendMode = 'overlay';

    // 5. Container de Texto Limpo (Sem distorção)
    const contentContainer = document.createElement('div');
    contentContainer.style.position = 'relative';
    contentContainer.style.zIndex = '5';
    // Repassa os flex layouts para o wrapper pra nao quebrar o design
    if (computedStyle.display === 'flex') {
        contentContainer.style.display = 'flex';
        contentContainer.style.flexDirection = computedStyle.flexDirection;
        contentContainer.style.alignItems = computedStyle.alignItems;
        contentContainer.style.justifyContent = computedStyle.justifyContent;
        contentContainer.style.gap = computedStyle.gap;
        contentContainer.style.width = '100%';
        contentContainer.style.height = '100%';
    }
    contentContainer.appendChild(fragment);

    // Constrói a árvore de nós interna
    el.appendChild(warpLayer);
    el.appendChild(baseBgLayer);
    el.appendChild(border1);
    el.appendChild(border2);
    el.appendChild(hoverHighlight);
    el.appendChild(contentContainer);

    // State & Throttling setup
    let isTicking = false;
    let targetX = 0;
    let targetY = 0;
    let centerX = 0;
    let centerY = 0;
    let rectWidth = 0;
    let rectHeight = 0;
    
    const updateDOM = () => {
        isTicking = false;

        const mx = ((targetX - centerX) / rectWidth) * 100;
        const my = ((targetY - centerY) / rectHeight) * 100;

        const angle = 135 + mx * 1.2;
        const colorStart = `rgba(255,255,255,${0.3 + Math.abs(mx) * 0.008})`;
        const colorMid = `rgba(255,255,255,${0.6 + Math.abs(mx) * 0.012})`;
        
        border1.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0) 0%, ${colorStart} ${Math.max(0, 15 + my * 0.3)}%, ${colorMid} ${Math.min(100, 85 + my * 0.4)}%, rgba(255,255,255,0) 100%)`;
        border2.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0) 0%, rgba(255,255,255,${0.5 + Math.abs(mx) * 0.01}) ${Math.max(0, 15 + my * 0.3)}%, rgba(255,255,255,${0.8 + Math.abs(mx) * 0.015}) ${Math.min(100, 85 + my * 0.4)}%, rgba(255,255,255,0) 100%)`;

        const deltaX = targetX - centerX;
        const deltaY = targetY - centerY;
        const centerDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const stretchIntensity = Math.min(centerDistance / 300, 1) * elasticity;
        
        const normX = centerDistance === 0 ? 0 : deltaX/centerDistance;
        const normY = centerDistance === 0 ? 0 : deltaY/centerDistance;
        const scaleX = 1 + Math.abs(normX) * stretchIntensity * 0.3 - Math.abs(normY) * stretchIntensity * 0.15;
        const scaleY = 1 + Math.abs(normY) * stretchIntensity * 0.3 - Math.abs(normX) * stretchIntensity * 0.15;

        el.style.transform = `translate(${deltaX * elasticity * 0.1}px, ${deltaY * elasticity * 0.1}px) scaleX(${Math.max(0.8, scaleX)}) scaleY(${Math.max(0.8, scaleY)})`;
    };

    const handleMouseMove = (e) => {
        targetX = e.clientX;
        targetY = e.clientY;

        if (!isTicking) {
            window.requestAnimationFrame(updateDOM);
            isTicking = true;
        }
    };

    const handleMouseEnter = () => {
        // Cache rect on mouse enter to avoid Forced Synchronous Layout on mouse move
        const rect = el.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
        rectWidth = rect.width;
        rectHeight = rect.height;

        hoverHighlight.style.opacity = '0.7';
    };

    const handleMouseLeave = () => {
        hoverHighlight.style.opacity = '0';
        el.style.transform = 'scale(1) translate(0px, 0px)';
        border1.style.background = 'transparent';
        border2.style.background = 'transparent';
    };

    const handleMouseDown = () => {
        hoverHighlight.style.opacity = '1';
        el.style.transform = `scale(0.96)`;
    };

    const handleMouseUp = () => {
        hoverHighlight.style.opacity = '0.7';
    };

    // Cache resize if window size changes while hovering (optional but good practice)
    const handleResize = () => {
        const rect = el.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
        rectWidth = rect.width;
        rectHeight = rect.height;
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('resize', handleResize);
    
    cleanupFunctions.push(() => {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.removeEventListener('mousedown', handleMouseDown);
        el.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('resize', handleResize);
    });
  });

  return () => cleanupFunctions.forEach(fn => fn());
}
