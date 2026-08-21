# 💅 Styles

**Responsabilidade:**
Define a arquitetura CSS global do ecossistema, estabelecendo a fundação estrutural do Design System, os tokens visuais genéricos e a tipografia matemática base.

**Arquitetura & Padrões:**
- **Design Tokens & Reatividade Base:** Emprego intensivo de CSS Custom Properties (`:root`) atuando como camada de abstração para cores, raios e easing. Garante invariabilidade visual rigorosa e viabiliza a introdução *frictionless* de temas no futuro (ex: Dark Mode global sem hardcode).
- **Tipografia Matemática Fluida:** Adoção absoluta de unidades relativas (`rem`, `dvh`, `vw`) calculadas em equações com a função `clamp()`. Resulta em um layout responsivo organico de ponta-a-ponta, tornando a aplicação virtualmente *media-query free* e imune a quebras bruscas de tela.
- **Agnosticismo Estrutural:** Concentra regras universais, *resets* seguros (box-sizing global) e prevenções nativas de overflow, enquanto delega estilos específicos aos escopos encapsulados no JavaScript.
- **Blindagem de Renderização e Acessibilidade:** Minimiza drásticamente *layout thrashing* ao delegar animações estritamente a propriedades aceleradas via GPU (`transform`, `opacity`). Respeita incondicionalmente a acessibilidade com media queries baseadas em heurísticas de hardware (`hover: none`, `prefers-reduced-motion`).
