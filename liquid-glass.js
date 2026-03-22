/**
 * Liquid Glass Effect - Vanilla JS Port
 * Baseado no liquid-glass-react (https://github.com/rdev/liquid-glass-react)
 */

const displacementMap = "data:image/jpeg;base64,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kziomgGgkoxZGgxZFQFQlYnQHRdPfj/10KCSCKESCNiVkViPSLpD0h6I0Q0I0A2IoBWBIJIBKBIJoJIJ2R2J0JWBUJ0JUB0XTv479dFZDYiglYigkhEgjZFQjRFQjRFQjQigFYigHYigmgEgmglYlYnQlQlYlQHQlQnQ9P/kf1yVkNiNCNkNiVENiNiViNEViNkVCVgKCViViViSCViSCVgdCViVCViVCdgVCVCdD1D+U/XBWQ2I0I2Q2JUQ2I0JWQ0I2JUQ2JUI2JUI2J0JWJWJWA2R0BWJ0I2JUJ2BUJUJ0P//EABkQAQEBAQEBAAAAAAAAAAAAAAECABEDEP/aAAgBAQABAgB1atWrVq1atWrVq1atWrVq1atWrVq1atWrVq+OrVq1atWrVq1atWrVq1atWrVq1atWrVq1atXxVppppppdWrVq1atWrVq1NNNNNNNNNNNPVWmmmmms6tWrVq1atWpppppppppppppp6q0000uc51atWrVq1ammmmmmmmmmmmmt1Vpppc5znVq1atWrVqaaaaaaaaaaaaaeqtNLnOc51atWrVq1ammmmmmmmmmmmmnqrS5znOc6tWrVq16222mmmmmmlVppp6tKuc5znOrVq1a9TbbbbTTTTTSq000qtLnOc5zq1atWrW0222200000qqqtKqrnOc5zq1atTbbbbbbbbTTTSqqqqqq5znOc6tTTTbbbbbbbbTTTSqqqqrlVznOctNNNtttttttttNNNNKqqqrqznKqrTTTTbbbbbbbbbTTTSqqqqrqznOc5aaaabbbbbbbbbaaaaVVVVVdWc5znVq1NNttttttttttNNKqqqqudWc5znVq16tbbbbbbbbbbTTSqqqq5XVnOc6tWrVrb1tttttttttNNKqqqqrWrK5VWmmm2230bbbbbbaaaXOc5zlVa1KuVVppptttt9G22222mmlzlVznK6tWVVWmmmm2222222222mlznOc5znLWppVVWmmm22222229bTWrOc5znOcq1qaaVpWmm222222229erVqznOc5znKtatStK0rTbTTbbbberXr1as5znOc5aVpppppWlabaabbbb1ta9WrVnOc5znU0rTTTTTTTTTbTTbbbTWvVq1as5znOdTTStNNNNNNNNNtNNtttN6tWvVq1ZznOrU00rTTTTTTTTTTTTTbTWvVq1atWrOc6tTTTStNNNNNNNNNNtNNtNa9WrVq1Z1Z1NNNNNK1q1NNNNNNNNNNNtNatWrVq1atWrU00000rWrVq1atWrVq1alaaa1atWrVq1NNNammmmla1atWrVq1aterVq16tWrVnVqa1NK1qaaaVX/xAAWEAADAAAAAAAAAAAAAAAAAAAhgJD/2gAIAQEAAz8AaExf/8QAGhEBAQEBAQEBAAAAAAAAAAAAAQISEQADEP/aAAgBAgEBAgDx48ePHjx48ePHjx48ePHjx48ePHjx48ePHj86IiIiIiInjx48ePHjx48IiIiIj0oooooooooRERER73ve60UUUUUUVrWiiiiiihERERER73ve97ooooorRWiiiiihKERERER73ve973RRRRWtFFFFFFCIiIiIiPe973ve60UUVrRRRRRRQiIlCIiI973ve973pRRWiiiiiiiiiiiiiiihEe973ve973RRWtFFFFFFFFFFFFFFFFFFa13ve973WitaKKKKKKKKKKKKKKKKKK1rWtd1rutFa1oooooooooooosssooorWta1rWta1rRRRRRRRRRRZZZZZZZZZWta1rWta1rRRRRRRRRZZZZZZZZZZZZe9a1rWta1rWitaKLLLLLLLLLLLLLLLLL3rWta1rWtFbLLLLLLLLLLLLLLLLLLLL3vWta1rWita1ssssssss+hZZZZZZZZe961rWta0Vre97LLLLLLLLLLLPoWWWWWXrWta1oorWta3ssss+hZZZZ9Cyyyyyyyyiita1orWta1ve9llllllllllllllllFFa0VorWta1ve9llllllllllllllllllFFFaK1rWta1rWiyyyyyyyyyyyyiiiiiiitFFa1rWta1oosoosssssoooosoooorRRRWta1rWta0UUUUUWUUUUUUUUUUUVoooorWta1rWtaKKKKKKmiiiiiiiiiiiiiiitd73ve61oSiiipoqaKKKKKKKKKK0UUUVrve973vREREZoSihEooooorRRRRWtd73ve9EREREREoSiiiiitFllllla73ve9ERERERESiiiiiitH0PoWWWWVrXe96IiIiMoiJRRRRRRWjwlFFllllFFd6IiIiIlCUUUUUUUUUePHjx48ePCIiIiIiIiUUUUUUUUUUUePHjx48ePHjx48ePHjx48IiUUUUUUJRRRX//xAAWEQADAAAAAAAAAAAAAAAAAAABYJD/2gAIAQIBAz8AtEV7/8QAFxEBAQEBAAAAAAAAAAAAAAAAAAECEP/aAAgBAwEBAgCtNNNNNNNNNNNNNNNNNNNNNNNNNNNNNcrTTTTTTTTTTTTTTTTTTTTTTTTTTTTTXKrTTTTTTTU000000000000000000001FVpppppqampqaaaaaaaaaaaaaaaaaaaa5Vaaaaampqampqammmmmmmmmmmlaaaaaaiq0001NTU1NTU1NTTTTTTTTTTSqqtNNNcqtNNSyzU1LNTU1NTTTTTTTTTSqqq001ytNLLLLNTU1NTU1NTbbbTTTTTSqqq001ytNLLLLLNTU1NTU3NttttNNNNNKqq001KrSyyyyyzU1NTU3Nzc02220000qqqqrSqqyyyyyzU1NTU3Nzc3NttttNNNKqqqqqqssssss1NTU3Nzc3NzbbbbTTTSqqqqqqrLLLLLNTU1Nzc3Nzc22220000qqqqqqqqssss1NTU3Nzc3NzbbbbbTTSqqqqqqqqqqzU1NTc3Nzc3Nzbc22000qqqqqqqqqqqtTU3Nzc3Nzc3NtzbTTSqqqqrKqqqqqtNNzc23Nzc3Nzc3NTU1KqqqrKqqqqqtNNNNttzc3Nzc3NzU1NLLLLLKqqqqqqqq0022223Nzc3NzU1NSyyyyyyqqqqqqqrTTbbbbc3Nzc3NTU1LLLLLLKsqqqqqqrTTTTbbbc3Nzc1NTUsssssssqqqqqqrTTTTTbbbTc3NTU1NTUsssssqqqqqqqq0000222023NTU1NTUsssssqqqqqqqq000000003NTU1NTU1LLLLLNKrTSqqqqtNNNNNNtNNTU1NSzUssss00qq0qqqqrTTTTTTTTTU1NTUs1LLLNNNKrTTTSqqq00000000001NTU1LNTU0000qtNNNKqqqtNNNNNNNNTU1NTUs1NNNNNKss1NNNK00qtK0000001NNTU0s000000qq000001NKrStNNNNK1NNNNStNNNNNKqtNNNNNNNK0000000rU0000rTTTTTSq00000rTTTTTTTTTTTTTTTTStNNNNKr/xAAUEQEAAAAAAAAAAAAAAAAAAACg/9oACAEDAQM/AAAf/9k=";

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
      <feImage id="feimage" x="0" y="0" width="100%" height="100%" result="DISPLACEMENT_MAP" href="${displacementMap}" preserveAspectRatio="xMidYMid slice" />

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
    baseBgLayer.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 100%)';
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

    // Eventos
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mx = ((e.clientX - centerX) / rect.width) * 100;
        const my = ((e.clientY - centerY) / rect.height) * 100;

        // Atualiza a borda brilhante e elástica
        const angle = 135 + mx * 1.2;
        border1.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0) 0%, rgba(255,255,255,${0.12+Math.abs(mx)*0.008}) ${Math.max(10,33+my*0.3)}%, rgba(255,255,255,${0.4+Math.abs(mx)*0.012}) ${Math.min(90,66+my*0.4)}%, rgba(255,255,255,0) 100%)`;
        border2.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0) 0%, rgba(255,255,255,${0.32+Math.abs(mx)*0.008}) ${Math.max(10,33+my*0.3)}%, rgba(255,255,255,${0.6+Math.abs(mx)*0.012}) ${Math.min(90,66+my*0.4)}%, rgba(255,255,255,0) 100%)`;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const centerDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const stretchIntensity = Math.min(centerDistance / 300, 1) * elasticity;
        
        const normX = centerDistance === 0 ? 0 : deltaX/centerDistance;
        const normY = centerDistance === 0 ? 0 : deltaY/centerDistance;
        const scaleX = 1 + Math.abs(normX) * stretchIntensity * 0.3 - Math.abs(normY) * stretchIntensity * 0.15;
        const scaleY = 1 + Math.abs(normY) * stretchIntensity * 0.3 - Math.abs(normX) * stretchIntensity * 0.15;

        // O transform fica no elemento pai (o card inteiro!)
        el.style.transform = `translate(${deltaX * elasticity * 0.1}px, ${deltaY * elasticity * 0.1}px) scaleX(${Math.max(0.8, scaleX)}) scaleY(${Math.max(0.8, scaleY)})`;
    });

    el.addEventListener('mouseenter', () => {
        hoverHighlight.style.opacity = '0.4';
    });

    el.addEventListener('mouseleave', () => {
        hoverHighlight.style.opacity = '0';
        el.style.transform = 'scale(1) translate(0px, 0px)';
        border1.style.background = 'transparent';
        border2.style.background = 'transparent';
    });

    el.addEventListener('mousedown', () => {
        hoverHighlight.style.opacity = '0.8';
        el.style.transform = `scale(0.96)`;
    });

    el.addEventListener('mouseup', () => {
        hoverHighlight.style.opacity = '0.4';
    });
    
    // As injeções em links que antes tinham um ícone puro precisam preservar estado original (reparar color via css no elemento filho e não no parent background)
  });
}
