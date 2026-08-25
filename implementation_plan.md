# Implementação do Layout Desktop (Formulário WhatsApp)

O objetivo é transformar a experiência no desktop de um "LinkTree" clássico para uma página de contato elegante (baseada no design de referência), onde o usuário preenche um formulário que, ao invés de disparar um email, redireciona para o seu WhatsApp com a mensagem pré-formatada.

## User Review Required

> [!IMPORTANT]
> **Como essa mudança afeta o mobile?** 
> Atualmente seu site é um LinkTree (com botões de links sociais). Se adicionarmos esse formulário gigante, onde ele deve ficar no celular? 
> **Opção A:** Substituir os botões pelo formulário em todas as telas (o site vira puramente uma página de contato).
> **Opção B:** No celular, continuar mostrando os botões do LinkTree. No desktop, mostrar o formulário ao lado da foto.
> 
> Vou assumir a **Opção A** para simplificar a arquitetura (pois ter dois conteúdos completamente diferentes dependendo da tela é confuso para o usuário), mas **aguardo sua confirmação**.

## Proposed Changes

### Estrutura HTML (`index.html`)

#### [MODIFY] `index.html`
- Inversão da ordem no grid: O conteúdo textual/formulário ficará à esquerda e a foto à direita.
- Remoção (ou ocultação) da `links-section` atual.
- Adição da estrutura do formulário:
  - Header: `<h1>Let's Talk</h1>`
  - Campos: Nome, Sobrenome, Telefone, Email, Mensagem (usando bordas pontilhadas inferiores).
  - Botão de Submit (Preto, arredondado).
  - Rodapé com informações de contato estáticas.
- Adição do "Selo Redondo" (Badge circular giratório) sobreposto à imagem.

### Estilização (`src/styles/global.css`)

#### [MODIFY] `global.css`
- Atualização do `@media (min-width: 48rem)` para alterar o layout do grid (`grid-template-columns: 55% 45%` ou similar).
- Criação das classes para o formulário:
  - `.contact-form`: Grid interno para os campos (Nome e Sobrenome lado a lado).
  - `.form-input`: Inputs com `border-bottom: 1px dashed var(--color-border)` e background transparente.
  - `.submit-btn`: Botão preto e estilo pill.
  - `.circular-badge`: CSS para posicionar e animar (girar) o texto em formato circular usando SVG ou CSS rotacional.

### Lógica de JavaScript (`src/main.ts`)

#### [MODIFY] `src/main.ts`
- Adição de um `EventListener` no `submit` do formulário.
- Capturar os valores dos inputs.
- Montar uma string de texto (ex: `"Olá, me chamo [Nome]. Meu email é [Email] e telefone [Telefone]. Mensagem: [Mensagem]"`).
- Codificar a string usando `encodeURIComponent`.
- Abrir a URL do WhatsApp: `window.open('https://wa.me/SEU_NUMERO?text=' + mensagemCodificada, '_blank')`.

## Open Questions

> [!CAUTION]
> Para o envio do WhatsApp, preciso que você confirme se devo ler o número de telefone da propriedade `socials` no `data.json` (o seu número atual final 0146) ou se devo colocar no código.

## Verification Plan

### Manual Verification
- O usuário será instruído a rodar `npm run dev` e testar a submissão do formulário, verificando se o WhatsApp Web (ou app) é aberto com os dados preenchidos corretamente nas quebras de linha ideais.
- Verificação visual da responsividade no desktop e mobile.
