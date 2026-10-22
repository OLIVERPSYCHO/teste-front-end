import type { Product, ProductsResponse } from '../types/product'

// Em desenvolvimento, usa o proxy do Vite (evita o bloqueio de CORS)
const BASE_URL = import.meta.env.DEV ? '/api-econverse' : 'https://app.econverse.com.br'
const PRODUCTS_PATH = '/teste-front-end/junior/tecnologia/lista-produtos/produtos.json'

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(BASE_URL + PRODUCTS_PATH)

  if (!response.ok) {
    throw new Error('Não foi possível carregar os produtos.')
  }

  const data: ProductsResponse | Product[] = await response.json()
  return Array.isArray(data) ? data : data.products
}