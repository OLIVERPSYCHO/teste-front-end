import { useRef } from 'react'
import type { Product } from '../../types/product'
import ProductCard from '../ProductCard/ProductCard'
import './ProductCarousel.scss'

interface ProductCarouselProps {
  products: Product[]
  onSelect: (product: Product) => void
}

export default function ProductCarousel({ products, onSelect }: ProductCarouselProps) {
  const listRef = useRef<HTMLUListElement>(null)

  function mover(direcao: number) {
    if (!listRef.current) return
    const passo = listRef.current.clientWidth
    listRef.current.scrollBy({ left: direcao * passo, behavior: 'smooth' })
  }

  return (
    <div className="carrossel">
      <button
        type="button"
        className="seta anterior"
        onClick={() => mover(-1)}
        aria-label="Produtos anteriores"
      >
        ‹
      </button>

      <ul ref={listRef}>
        {products.map((product, index) => (
          <li key={index}>
            <ProductCard product={product} onSelect={onSelect} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="seta proxima"
        onClick={() => mover(1)}
        aria-label="Próximos produtos"
      >
        ›
      </button>
    </div>
  )
}