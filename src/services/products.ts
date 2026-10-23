import type { Product, ProductsResponse } from '../types/product'

const PRODUCTS_PATH = '/teste-front-end/junior/tecnologia/lista-produtos/produtos.json'
const DEFAULT_ORIGIN = 'https://app.econverse.com.br'

// Em dev e preview, VITE_API_ORIGIN aponta para o proxy do Vite e evita CORS.
const API_ORIGIN = import.meta.env.VITE_API_ORIGIN ?? DEFAULT_ORIGIN

export const PRODUCTS_URL = `${API_ORIGIN}${PRODUCTS_PATH}`

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(PRODUCTS_URL)

  if (!response.ok) {
    throw new Error('Não foi possível carregar os produtos.')
  }

  const data: ProductsResponse | Product[] = await response.json()
  return Array.isArray(data) ? data : data.products
}
