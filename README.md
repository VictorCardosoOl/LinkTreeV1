<h1 align="center">Victor Cardoso — Links</h1>

<p align="center">
  <strong>Página de portfólio estilo LinkTree criada com as melhores práticas modernas de frontend.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/GSAP-3.x-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP">
  <img src="https://img.shields.io/badge/Lenis-Smooth_Scroll-black?style=for-the-badge" alt="Lenis">
  <img src="https://img.shields.io/badge/Node-24_LTS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node">
  <img src="https://img.shields.io/badge/ESLint-8.x-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint">
  <img src="https://img.shields.io/badge/Prettier-3.x-F7B93E?style=for-the-badge&logo=prettier&logoColor=black" alt="Prettier">
  <img src="https://img.shields.io/github/actions/workflow/status/VictorCardosoOl/LinkTreeV1/ci.yml?style=for-the-badge&label=CI" alt="CI">
</p>

---

- **Arquitetura Limpa** — Estrutura de projeto padrão da indústria com isolamento de `src/` e `public/`
- **Interface Glassmorphism (Efeito Vidro)** — Tema editorial em preto e branco com superfícies de filtro de desfoque (backdrop-filter) refinadas
- **Efeitos de Vidro Líquido** — Filtros SVG interativos `feDisplacementMap` com aceleração via `requestAnimationFrame`
- **Singleton AppManager** — Ponto de entrada escalável em POO com tratamento de erros e suporte a fallback
- **Carregamento sob Demanda (On-Demand)** — Divisão de código (code-split) de recursos da galeria (`lightbox.js`) para desempenho mobile otimizado
- **Otimizado para Desempenho** — Animações baseadas em física com GSAP e rolagem suave a 60 FPS com Lenis
- **Pronto para PWA** — `manifest.json` com ícones adaptáveis (maskable) e sincronização de tema
- **Modo Claro / Escuro** — respeita a preferência do sistema `prefers-color-scheme`

---

## 🚀 Começando

### Pré-requisitos

- [Node.js 24 LTS](https://nodejs.org/) — veja o `.nvmrc`
- npm 10+

> **Usando nvm?** Rode `nvm install` e `nvm use` na raiz do projeto.

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/VictorCardosoOl/LinkTreeV1.git
cd LinkTreeV1

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`.

---

## 📦 Scripts

| Comando            | Descrição                                         |
| ------------------ | ------------------------------------------------- |
| `npm run dev`      | Inicia o servidor de desenvolvimento Vite com HMR |
| `npm run build`    | Build de produção com divisão dinâmica de código  |
| `npm run preview`  | Visualizar o build de produção localmente         |
| `npm run lint`     | Roda o ESLint na pasta `src/`                     |
| `npm run format`   | Formata todos os arquivos com o Prettier          |
| `npm run check`    | Validação completa para CI (lint + format)        |

---

## 📁 Estrutura do Projeto

```
LinkTreeV1/
├── public/                 # Assets globais estáticos (favicons, manifest)
├── scripts/                # Scripts utilitários (compressão de imagens)
├── src/
│   ├── assets/             # Assets dinâmicos (avatares, texturas, fontes)
│   ├── features/           # Funcionalidades modulares (Vidro Líquido, Lightbox)
│   ├── styles/             # Design System (CSS Global e de Componentes)
│   └── main.js             # Entrada da Aplicação (Singleton AppManager)
├── index.html              # Página Inicial
├── gallery.html            # Página de Galeria
├── vite.config.js          # Configuração de Build e Assets
└── .eslintrc.json          # Regras de qualidade de código
```

---

## 🎨 Design System (Sistema de Design)

Todos os tokens de design são definidos como Variáveis Customizadas (Custom Properties) no `style.css`:

| Categoria  | Variáveis                                                               |
| ---------- | ----------------------------------------------------------------------- |
| Cores      | `--color-text-primary`, `--color-surface-glass`, `--color-border-glass` |
| Tipografia | `--font-primary`, `--font-display`, `--text-xs` → `--text-xl`           |
| Espaçamento| `--space-xs` → `--space-xl` (grade base de 4px)                         |
| Layout     | `--layout-max-width`, `--layout-gutter`, `--layout-padding-top`         |
| Animação   | `--ease-elastic`, `--ease-expo`                                         |

---

## 🧪 Linting e Formatação

```bash
npm run lint       # Verifica por erros
npm run lint:fix   # Corrige erros automaticamente
npm run format     # Formata todos os arquivos
npm run check      # checagem de lint + formatação (seguro para CI)
```

---

## 📋 Stack de Tecnologias

| Camada         | Tecnologia                                                                                                                  |
| -------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Ferramenta Build| [Vite 7](https://vitejs.dev/)                                                                                               |
| Visuais        | Vanilla JS + Filtros SVG Customizados (`feDisplacementMap`, `feColorMatrix` para efeitos de Vidro Líquido)                  |
| Animações      | [GSAP 3](https://gsap.com/) + [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)                              |
| Rolagem        | [Lenis](https://github.com/darkroomengineering/lenis)                                                                       |
| Divisão Texto  | [SplitType](https://github.com/lukePeavey/SplitType)                                                                        |
| Ícones         | [Ionicons 7](https://ionic.io/ionicons)                                                                                     |
| Fontes         | [Outfit](https://fonts.google.com/specimen/Outfit) + [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) |
| Linting        | ESLint 8 + eslint-config-prettier                                                                                           |
| Formatação     | Prettier 3                                                                                                                  |
| CI             | GitHub Actions                                                                                                              |

---

## 📄 Licença

© 2024 Victor Cardoso. Todos os direitos reservados.
