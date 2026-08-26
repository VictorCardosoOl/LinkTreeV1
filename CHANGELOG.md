# Histórico de Alterações (Changelog)

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

O formato baseia-se no [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/spec/v2.0.0.html).

---

## [1.3.0] - 2026-03-19

### Adicionado

- Infraestrutura de nível empresarial: `.gitignore`, `.nvmrc`, `vite.config.js`
- Ferramentas de qualidade de código: ESLint 8 + Prettier com configuração compartilhada
- Fluxo de trabalho de CI (Integração Contínua) via GitHub Actions (`build` + `lint` a cada push)
- `CHANGELOG.md` seguindo Conventional Commits / Keep a Changelog
- `README.md` com selos (badges), guia de instalação e estrutura do projeto
- `gallery.css` — estilos da galeria extraídos do HTML embutido
- Suporte a `prefers-color-scheme: light` no CSS global
- Padrão de atributo `data-page` para inicialização de JS ciente da página atual
- Documentação JSDoc em todas as classes públicas e funções de módulo
- Ionicons instalados como dependência local do npm

### Modificado

- Refatoração do `script.js`: O padrão `PAGE_HANDLERS` substitui o acoplamento implícito de página
- `MagneticButton`: campos de classe privados (`#`), `AbortController` para limpeza de ouvintes de eventos (listeners)
- `TypographyAnimator`: `#animateElement` extraído como método privado (Princípio de Responsabilidade Única - SRP)
- `manifest.json`: entradas de `purpose` separadas de acordo com as especificações da W3C
- Pontos de quebra (breakpoints) de tela larga (2xl/3xl/4xl) adicionados ao sistema de tokens CSS

### Corrigido

- A fonte `Outfit` era referenciada no CSS, mas faltava no carregamento de fontes do HTML
- Faltava no `gallery.html` a `meta description`, o favicon e o bloco `noscript`
- `purpose: "any maskable"` do `manifest.json` que estava combinado (antipattern da W3C corrigido)
- Vulnerabilidade Rollup CVE-2026-27606: atualizado para a versão corrigida via `npm update`

---

## [1.2.0] - 2026-02-13

### Adicionado

- Animações baseadas em física usando GSAP + ScrollTrigger
- Rolagem suave via Lenis
- Animação de revelação de texto via SplitType
- Classe `MagneticButton` com efeitos de holofote (spotlight) e atração magnética
- Manifesto de PWA (`manifest.json`)

### Modificado

- Refatoração completa da arquitetura CSS: Sistema de tokens de design com Variáveis CSS
- Tipografia fluida usando `clamp()`
- Design de cartão "Glassmorphism" (Efeito Vidro) para os links de navegação

---

## [1.0.0] - 2024-01-01

### Adicionado

- Lançamento inicial: Página pessoal estilo LinkTree
- Layout estático HTML + CSS
- Links sociais: WhatsApp, LinkedIn, GitHub, Instagram, Email
- Cartão de destaque do portfólio
- Espaço reservado para página de Galeria
