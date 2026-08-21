# 🧩 Components

**Responsabilidade:**
Isola a lógica visual e o comportamento interativo da interface em módulos atômicos e independentes. Atua estritamente como a camada de apresentação, garantindo que lógicas de alto nível da aplicação não interfiram ou quebrem a renderização da UI.

**Arquitetura & Padrões:**
- **Encapsulamento Estrito (SRP):** Cada módulo possui responsabilidade única e gerencia exclusivamente sua árvore no DOM e eventos (como ciclo de vida do *hover* ou redimensionamento de janela), prevenindo *side effects* globais.
- **Isolamento de Performance:** Aplicação ostensiva de cacheamento de coordenadas e throttling em event listeners de alta frequência para evitar gargalos na *main thread* (layout thrashing) e garantir animações em 60 FPS.
- **Degradação Graciosa (Graceful Degradation):** Abordagem arquitetural defensiva. Efeitos custosos para o hardware (como *displacement maps* via SVG) são interceptados e abortados estrategicamente através de *media queries* no JavaScript para dispositivos de toque (mobile), poupando bateria e garantindo UX fluida independentemente do device.
- **KISS & Reusabilidade:** Ausência de *framework lock-in*. Componentes desenhados com Vanilla JS modular para serem *plug-and-play* em qualquer ponto da estrutura HTML sem necessidade de reconfiguração de base.
