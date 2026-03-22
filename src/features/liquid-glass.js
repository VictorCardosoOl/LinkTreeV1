/**
 * Liquid Glass Effect - Vanilla JS Port
 * Baseado no liquid-glass-react
 */

// A textura geradora de noise agora é um mapa físico extraído da string base64 original para prevenir ERR_INVALID_URL
const displacementMapUrl = "./assets/displacement-map.jpg";

function createGlassSVGFilter(id, displacementScale, aberrationIntensity) {
  const svgNS = "http://www.w3.org/2000/svg";
  
  let svgContainer = document.getElementById('liquid-glass-svg-container');
  if (!svgContainer) {
    svgContainer = document.createElementNS(svgNS, 'svg');
    svgContainer.id = 'liquid-glass-svg-container';
    svgContainer.style.position = 'absolute';
    svgContainer.style.width = '0';
    svgContainer.style.height = '0';
    svgContainer.style.pointerEvents = 'none';
    svgContainer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(svgContainer);
  }

  if (document.getElementById(id)) return id;

  const defs = document.createElementNS(svgNS, 'defs');
  
  const filterHTML = `
    <filter id="${id}" x="-35%" y="-35%" width="170%" height="170%" color-interpolation-filters="sRGB">
      <feImage id="feimage" x="0" y="0" width="100%" height="100%" result="DISPLACEMENT_MAP" href="${displacementMapUrl}" preserveAspectRatio="xMidYMid slice" />

      <!-- Create edge mask using the displacement map itself -->
      <feColorMatrix
        in="DISPLACEMENT_MAP"
        type="matrix"
        values="0.3 0.3 0.3 0 0
                0.3 0.3 0.3 0 0
                0.3 0.3 0.3 0 0
                0 0 0 1 0"
        result="EDGE_INTENSITY"
      />
      <feComponentTransfer in="EDGE_INTENSITY" result="EDGE_MASK">
        <feFuncA type="discrete" tableValues="0 ${aberrationIntensity * 0.05} 1" />
      </feComponentTransfer>

      <feOffset in="SourceGraphic" dx="0" dy="0" result="CENTER_ORIGINAL" />

      <!-- RGB Channels with intense displacement (-70) -->
      <feDisplacementMap in="SourceGraphic" in2="DISPLACEMENT_MAP" scale="${-displacementScale}" xChannelSelector="R" yChannelSelector="B" result="RED_DISPLACED" />
      <feColorMatrix in="RED_DISPLACED" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="RED_CHANNEL" />

      <feDisplacementMap in="SourceGraphic" in2="DISPLACEMENT_MAP" scale="${-displacementScale - aberrationIntensity * 0.05}" xChannelSelector="R" yChannelSelector="B" result="GREEN_DISPLACED" />
      <feColorMatrix in="GREEN_DISPLACED" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="GREEN_CHANNEL" />

      <feDisplacementMap in="SourceGraphic" in2="DISPLACEMENT_MAP" scale="${-displacementScale - aberrationIntensity * 0.1}" xChannelSelector="R" yChannelSelector="B" result="BLUE_DISPLACED" />
      <feColorMatrix in="BLUE_DISPLACED" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="BLUE_CHANNEL" />

      <feBlend in="GREEN_CHANNEL" in2="BLUE_CHANNEL" mode="screen" result="GB_COMBINED" />
      <feBlend in="RED_CHANNEL" in2="GB_COMBINED" mode="screen" result="RGB_COMBINED" />

      <feGaussianBlur in="RGB_COMBINED" stdDeviation="${Math.max(0.1, 0.5 - aberrationIntensity * 0.1)}" result="ABERRATED_BLURRED" />

      <feComposite in="ABERRATED_BLURRED" in2="EDGE_MASK" operator="in" result="EDGE_ABERRATION" />

      <feComponentTransfer in="EDGE_MASK" result="INVERTED_MASK">
        <feFuncA type="table" tableValues="1 0" />
      </feComponentTransfer>
      <feComposite in="CENTER_ORIGINAL" in2="INVERTED_MASK" operator="in" result="CENTER_CLEAN" />

      <feComposite in="EDGE_ABERRATION" in2="CENTER_CLEAN" operator="over" />
    </filter>
  `;

  
  defs.innerHTML = filterHTML;
  svgContainer.appendChild(defs);
  
  return id;
}

export function initLiquidGlass() {
  const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");

  const cleanupFunctions = [];
  const links = document.querySelectorAll('.link-item');
  const socialIcons = document.querySelectorAll('.social-icons-grid a');
  
  // Vamos focar o efeito de liquid glass apenas nos elementos iterativos (botões) 
  // para garantir a semântica visual e evitar o bug da caixa branca no profile-card.
  const allGlassElements = [...links, ...socialIcons].filter(Boolean);

  allGlassElements.forEach((el, idx) => {
    if(el.dataset.hasLiquidGlass) return;
    el.dataset.hasLiquidGlass = true;

    // overLight mode params: (reduz a distorção pela metade, adiciona sombras ricas e fundo escurecido)
    const displacementScale = 35; // 70 * 0.5 for overLight
    const saturation = 140;
    const blurPx = 14; 
    const elasticity = 0.15;
    
    const filterId = `liquid-glass-filter-${idx}`;
    createGlassSVGFilter(filterId, displacementScale, 2);

    const computedStyle = window.getComputedStyle(el);
    const radius = computedStyle.borderRadius || '999px';

    const fragment = document.createDocumentFragment();
    while(el.firstChild) {
        fragment.appendChild(el.firstChild);
    }
    
    el.style.position = 'relative'; 
    el.style.isolation = 'isolate'; 
    el.style.zIndex = '1';
    el.style.background = 'transparent';
    el.style.backdropFilter = 'none'; 
    el.style.border = 'none';
    el.style.boxShadow = 'none';

    // 2. Warp/Shader (A lente translúcida com distorção)
    const warpLayer = document.createElement('span');
    warpLayer.className = 'glass-warp-layer';
    warpLayer.style.position = 'absolute';
    warpLayer.style.inset = '0';
    warpLayer.style.borderRadius = radius;
    warpLayer.style.filter = isFirefox ? 'none' : `url(#${filterId})`;
    warpLayer.style.backdropFilter = `blur(${blurPx}px) saturate(${saturation}%)`;
    warpLayer.style.WebkitBackdropFilter = `blur(${blurPx}px) saturate(${saturation}%)`;
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
    baseBgLayer.style.border = '1px solid rgba(17,17,17,0.1)';

    // Camadas de Borda Brilhante Reativa do React!
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
    
    border1.style.mixBlendMode = 'screen';
    border1.style.opacity = '0.2';
    border2.style.mixBlendMode = 'overlay';
    
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

        // Atualiza as bordas dinâmicas
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

        // Transform fica no elemento pai
        el.style.transform = `translate(${deltaX * elasticity * 0.1}px, ${deltaY * elasticity * 0.1}px) scaleX(${Math.max(0.8, scaleX)}) scaleY(${Math.max(0.8, scaleY)})`;
    };

    // Eventos Otimizados
    const handleMouseMove = (e) => {
        // Cache rect to avoid Forced Synchronous Layout if possible, but element size shouldn't change
        const rect = el.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
        rectWidth = rect.width;
        rectHeight = rect.height;
        targetX = e.clientX;
        targetY = e.clientY;

        if (!isTicking) {
            window.requestAnimationFrame(updateDOM);
            isTicking = true;
        }
    };

    const handleMouseEnter = () => {
        hoverHighlight.style.opacity = '0.7'; // Glow mais forte
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

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mouseup', handleMouseUp);
    
    // As injeções em links que antes tinham um ícone puro precisam preservar estado original (reparar color via css no elemento filho e não no parent background)
    
    // Feature Sênior: Retorna o Teardown Handler
    cleanupFunctions.push(() => {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.removeEventListener('mousedown', handleMouseDown);
        el.removeEventListener('mouseup', handleMouseUp);
    });
  });

  return () => cleanupFunctions.forEach(fn => fn());
}
