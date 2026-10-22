import type { Product, ProductsResponse } from '../types/product'

const PRODUCTS_PATH = '/teste-front-end/junior/tecnologia/lista-produtos/produtos.json'
const DEFAULT_ORIGIN = 'https://app.econverse.com.br'

// A origem e configuravel por variavel de ambiente para que o mesmo codigo
// funcione em `dev`, `preview` e em um deploy estatico:
// - dev e preview usam `/api-econverse`, que o Vite encaminha para a Econverse
//   (ver proxy em vite.config.ts), evitando bloqueio de CORS;
// - sem a variavel, a requisicao vai direto para o dominio publico.
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
