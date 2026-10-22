import type { Product, ProductsResponse } from '../types/product'

const PRODUCTS_URL =
  'https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json'

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(PRODUCTS_URL)

  if (!response.ok) {
    throw new Error('Não foi possível carregar os produtos.')
  }

  const data: ProductsResponse | Product[] = await response.json()
  return Array.isArray(data) ? data : data.products
}
