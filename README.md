# Teste Front-End Econverse

Vitrine de produtos desenvolvida para o teste técnico da vaga de Desenvolvedor
Front-End da Econverse. A página reproduz a seção "Produtos relacionados" do
layout, consome a lista de produtos em JSON e abre um modal com os dados do
produto selecionado.

## Stack

- React 19
- TypeScript
- Vite
- Sass (SCSS, sem frameworks de UI)
- Vitest + Testing Library

Nenhuma biblioteca de componentes (Bootstrap, Material, Foundation e
similares) foi utilizada: todo o estilo é escrito à mão em SCSS.

## Requisitos

- Node.js 20.19 ou superior
- npm 10 ou superior

## Instalação

```bash
git clone https://github.com/OLIVERPSYCHO/teste-front-end.git
cd teste-front-end
npm install
```

## Rodar em desenvolvimento

```bash
npm run dev
```

A aplicação sobe em `http://localhost:5173`.

## Compilar

```bash
npm run build
```

O resultado é gerado em `dist/`. Para servir o build localmente:

```bash
npm run preview
```

## Testar

```bash
npm test             # executa a suíte uma vez
npm run test:watch   # executa em modo observação
npm run test:coverage # relatório de cobertura
npm run lint         # análise estática com Oxlint
npm run typecheck    # checagem de tipos do TypeScript
```

A suíte cobre a formatação de preço em BRL, a renderização do card com os
dados do JSON e a abertura do modal ao clicar no produto, incluindo o
fechamento por Escape e a publicação dos dados estruturados.

## Scripts disponíveis

| Script | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com HMR |
| `npm run build` | Checagem de tipos e build de produção |
| `npm run preview` | Serve o build de produção localmente |
| `npm test` | Executa os testes uma vez |
| `npm run test:watch` | Testes em modo observação |
| `npm run test:coverage` | Testes com relatório de cobertura |
| `npm run lint` | Oxlint |
| `npm run typecheck` | `tsc -b` sem emitir arquivos |

## Estrutura

```
src/
├── components/
│   ├── CategoryTabs/      Abas de categoria da vitrine
│   ├── ProductCard/       Card de produto do carrossel
│   ├── ProductCarousel/   Carrossel horizontal com navegação
│   ├── ProductModal/      Modal com os dados do produto
│   ├── Showcase/          Seção "Produtos relacionados"
│   └── StructuredData/    JSON-LD (schema.org) da lista de produtos
├── config/                Regras de preço simulado
├── services/              Acesso ao JSON de produtos
├── styles/                Tokens, mixins e estilos globais
├── test/                  Configuração do Vitest
├── types/                 Tipagem do payload da API
└── utils/                 Formatação de valores
```

## Origem dos dados

Os produtos vêm de:

```
https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json
```

A origem da requisição é configurável pela variável `VITE_API_ORIGIN`
(ver `.env.example`):

- Em desenvolvimento e no `preview`, `.env.development` define
  `VITE_API_ORIGIN=/api-econverse`. Esse caminho é encaminhado pelo proxy
  declarado em `vite.config.ts`, o que evita bloqueio de CORS no navegador.
- Sem a variável definida, a aplicação chama o domínio público diretamente.

Ao publicar em um host estático, verifique no console do navegador se a
requisição direta é aceita. Se houver bloqueio de CORS, configure um rewrite no
host (por exemplo, `/api-econverse/*` apontando para `app.econverse.com.br`) e
defina `VITE_API_ORIGIN=/api-econverse` no build.

## Decisões técnicas

**Abas de categoria sem filtro.** O JSON expõe apenas `productName`,
`descriptionShort`, `photo` e `price`. Não existe campo de categoria, então não
há dado para filtrar a lista. As abas reproduzem o layout e mantêm o estado
selecionado, sem alterar os produtos exibidos. Inferir categoria a partir do
nome do produto seria criar uma regra que o payload não sustenta.

**Preço anterior e parcelamento.** Também não existem no JSON. O layout os
exibe, então as regras ficam isoladas em `src/config/pricing.ts`, explicitamente
marcadas como simulação, em vez de ficarem como números soltos no componente.

**Abertura do modal.** O enunciado pede a interação ao clicar no produto, então
a imagem e o título ficam dentro de um botão, acessível por teclado. O botão
"Comprar" mantém o mesmo comportamento.

**Tokens de estilo.** Cores, tipografia, espaçamentos e breakpoints ficam em
`src/styles/_tokens.scss`, consumidos via `@use`. Os mixins em
`src/styles/_mixins.scss` concentram breakpoints, botão da marca e utilitários
de acessibilidade.

## Acessibilidade

- Modal com `role="dialog"`, `aria-modal`, `aria-labelledby`, foco preso
  enquanto aberto, foco devolvido ao elemento que o abriu, fechamento por
  Escape e por clique no fundo, e rolagem do fundo travada.
- Produto acionável por mouse e teclado.
- Estados de carregamento e erro anunciados por `aria-live`.
- Setas do carrossel desabilitadas nos extremos e rótulos descritivos nos
  botões com ícone.
- `h1` da página disponível para leitores de tela.

## SEO

- HTML semântico (`main`, `section`, `article`, `nav`, hierarquia de títulos).
- `title`, `description`, `robots`, Open Graph, Twitter Card e `canonical`.
- Dados estruturados `ItemList` + `Product` (schema.org) gerados a partir da
  lista carregada.
- `lang="pt-BR"` e imagens com dimensões declaradas e `loading="lazy"`.

## Pendências conhecidas

- As tags `canonical` e `og:url` em `index.html` usam a URL `SEU-DEPLOY` como
  marcador. Substituir pela URL publicada antes do envio.
- Não há favicon: o ícone deve ser exportado do logo da Econverse no Figma.
- Falta `og:image`, que depende da mesma exportação.
- A página cobre a seção "Produtos relacionados" do layout. As demais seções do
  Figma (cabeçalho, banner, trilha de categorias, banners de parceiros,
  carrossel de marcas, newsletter e rodapé) ainda não foram implementadas.
