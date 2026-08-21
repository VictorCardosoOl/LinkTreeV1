# ⚙️ Config

**Responsabilidade:**
Consolida e isola a camada de configuração, dicionários de ambiente e dados estruturados (*schemas*), agindo como a **Single Source of Truth** (Fonte Única de Verdade) para informações consumidas pela interface e pelo pipeline de compilação.

**Arquitetura & Padrões:**
- **Single Source of Truth (SSOT):** O schema define toda a estrutura estática (links, redes sociais, metadados de SEO) num eixo central, assegurando que as camadas de view permaneçam estritas à renderização gráfica (*dumb views* ou views burras).
- **Separação de Interesses (Separation of Concerns):** Desacopla brutalmente o conteúdo da estrutura HTML abstrata. Habilita edições seguras, versionadas e massivas de *copywriting* e links, blindando o código-fonte executável contra falhas humanas.
- **Data Hydration no Build Time:** Otimização arquitetural extrema: injeta os dados estáticos diretamente no HTML nativo durante a compilação (via Handlebars / Vite Plugins), garantindo TTFB (Time to First Byte) nulo, entrega instantânea no servidor de Edge e indexação robótica perfeita, eliminando overheads de parse JSON no *client-side*.
