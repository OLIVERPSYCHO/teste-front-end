import type { Product } from '../../types/product'

interface ProductListJsonLdProps {
  products: Product[]
  nome: string
}

// Dados estruturados (schema.org) da lista de produtos.
export default function ProductListJsonLd({ products, nome }: ProductListJsonLdProps) {
  if (products.length === 0) return null

  const dados = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: nome,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.productName,
        description: product.descriptionShort,
        image: product.photo,
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'BRL',
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  }

  const json = JSON.stringify(dados).replace(/</g, '\\u003c')

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
