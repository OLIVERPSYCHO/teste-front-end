# Teste Front-End | Econverse

Implementação do teste técnico front-end da Econverse, reproduzindo a seção **“Produtos relacionados”** a partir do layout original fornecido pela empresa.

O projeto concentra a vitrine de produtos em uma aplicação React, consumindo os dados disponibilizados pela API da Econverse e apresentando os itens em cards e em um modal de detalhes.

## O que foi solicitado

O desafio consistiu em desenvolver a seção de produtos relacionados conforme o layout de referência da Econverse, organizando a apresentação dos produtos e suas informações em uma interface front-end.

## O que foi implementado

- Vitrine com o título **“Produtos relacionados”**.
- Abas de categorias: Celular, Acessórios, Tablets, Notebooks, TVs e Ver todos. O estado da aba selecionada é atualizado; a resposta JSON utilizada não contém categoria para filtrar os produtos.
- Consumo da lista de produtos em JSON pelo endpoint disponibilizado pela Econverse.
- Cards com imagem, descrição, preço, preço anterior e informação de parcelamento.
- Carrossel horizontal com controles para navegar entre os produtos.
- Modal com imagem, nome, preço e descrição do produto selecionado, além de controle de quantidade.
- Estados de carregamento e mensagem de erro durante a consulta dos produtos.
- Dados estruturados em JSON-LD para a lista de produtos.
- Comportamento do modal com fechamento por botão, clique no fundo e tecla Esc, além de gerenciamento de foco.

Os valores de preço anterior e parcelamento são calculados pela aplicação para compor a apresentação visual; não são retornados como campos independentes pela API. O texto de frete grátis também faz parte da apresentação do card.

## Tecnologias

- **React 19** — construção da interface.
- **TypeScript 6** — tipagem.
- **Vite 8** — ambiente de desenvolvimento e build.
- **Sass** — estilos.
- **Vitest 5** — testes.
- **Testing Library** — testes de componentes.
- **Oxlint** — análise estática e lint.

## Demo

**Acesse:** https://teste-front-end-swart.vercel.app

## Instalação

```bash
git clone https://github.com/OLIVERPSYCHO/teste-front-end.git
cd teste-front-end
npm install
```

## Rodando localmente

```bash
npm run dev
```

A aplicação fica disponível em http://localhost:5173.

## Build

```bash
npm run build
npm run preview
```

## Testes e qualidade

```bash
npm test
npm run lint
npm run typecheck
```

Também estão disponíveis os comandos `npm run test:watch` e `npm run test:coverage`.

## Créditos

Layout de referência original: **Econverse**. Este repositório contém a implementação front-end do teste técnico, não o layout original.

---

Desenvolvido por Renan Amaral de Oliveira · [GitHub](https://github.com/OLIVERPSYCHO)
