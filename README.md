# Teste Front-End Econverse

Vitrine de produtos do teste técnico da Econverse. A página reproduz a seção
"Produtos relacionados" do layout, consome a lista de produtos em JSON e abre um
modal com os dados do produto selecionado.

Stack: React 19, TypeScript, Vite, Sass e Vitest. Sem bibliotecas de UI.

## Requisitos

Node.js 20.19 ou superior e npm 10 ou superior.

## Instalação

```bash
git clone https://github.com/OLIVERPSYCHO/teste-front-end.git
cd teste-front-end
npm install
```

## Rodar

```bash
npm run dev      # http://localhost:5173
```

## Compilar

```bash
npm run build    # gera dist/
npm run preview  # serve o build localmente
```

## Testar

```bash
npm test         # Vitest
npm run lint     # Oxlint
npm run typecheck
```

Os testes cobrem a formatação de preço em BRL, a renderização do card e a
abertura do modal ao clicar no produto, incluindo o fechamento por Escape.

## Estrutura

```
src/
├── components/   CategoryTabs, ProductCard, ProductCarousel, ProductModal,
│                 Showcase, StructuredData
├── config/       Regras de preço simulado
├── services/     Acesso ao JSON de produtos
├── styles/       Tokens, mixins e estilos globais
├── test/         Configuração do Vitest
├── types/        Tipagem do payload
└── utils/        Formatação de valores
```

## Origem dos dados

```
https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json
```

A origem é configurável por `VITE_API_ORIGIN` (ver `.env.example`). Em
desenvolvimento e no preview, `.env.development` aponta para `/api-econverse`,
encaminhado pelo proxy do `vite.config.ts` para evitar bloqueio de CORS. Sem a
variável, a aplicação chama o domínio público diretamente.

Ao publicar em um host estático, confira no console se a requisição direta é
aceita. Havendo bloqueio de CORS, configure um rewrite no host e defina
`VITE_API_ORIGIN` no build.

## Decisões técnicas

O JSON traz apenas `productName`, `descriptionShort`, `photo` e `price`. Não há
campo de categoria, então as abas reproduzem o layout e mantêm o estado
selecionado sem filtrar a lista. Inferir categoria pelo nome do produto seria
criar uma regra que o payload não sustenta.

Preço anterior e parcelamento também não existem no JSON. As regras ficam
isoladas em `src/config/pricing.ts`, marcadas como simulação.

O enunciado pede a interação ao clicar no produto, então a imagem e o título
ficam dentro de um botão, acessível por teclado. O modal tem `role="dialog"`,
foco preso enquanto aberto, foco devolvido ao fechar e saída por Escape ou
clique no fundo.

Cores, tipografia, espaçamentos e breakpoints ficam em
`src/styles/_tokens.scss`, consumidos via `@use`.

Para SEO: HTML semântico, metadados Open Graph e Twitter Card, e dados
estruturados `ItemList` + `Product` gerados a partir da lista carregada.

## Pendências

- `canonical` e `og:url` usam `SEU-DEPLOY` como marcador.
- Falta favicon e `og:image`, que dependem da exportação do logo no Figma.
- Só a seção "Produtos relacionados" foi implementada. As demais seções do
  layout ainda não.
