# 🎨 Assets

**Responsabilidade:**
Centraliza arquivos estáticos estruturais (imagens rasterizadas, vetores, displacement maps e blobs) consumidos nativamente pela camada de view e pelo processo de bundle.

**Arquitetura & Padrões:**
- **Separação de Contexto:** Recursos visuais são estritamente isolados da lógica de execução; processados estaticamente ou *inlinados* por plugins de bundle (Vite) de acordo com o threshold de tamanho, evitando *bloating* de requisições de rede.
- **Otimização Assíncrona:** Arquivos de imagem seguem padrões estritos de compressão upstream (utilizando pipelines WebP ou formatações hiper-comprimidas) para garantir uma Carga Útil (Payload) diminuta e maximizar as pontuações em *Core Web Vitals* (LCP).
- **Estratégia de Cacheability:** Preparado estruturalmente para alavancar headers agressivos de *cache* em provedores de edge (como immutable/max-age), propiciando renderizações secundárias instântaneas via cache de disco.
