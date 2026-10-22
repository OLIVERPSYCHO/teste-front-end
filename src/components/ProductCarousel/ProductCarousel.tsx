import { useRef } from 'react'
import type { Product } from '../../types/product'
import ProductCard from '../ProductCard/ProductCard'
import './ProductCarousel.scss'

interface ProductCarouselProps {
  products: Product[]
  onSelect: (product: Product) => void
}

export default function ProductCarousel({
  products,
  onSelect,
}: ProductCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null)

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return

    const firstItem = track.firstElementChild as HTMLElement | null
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    const step = firstItem ? firstItem.offsetWidth + gap : track.clientWidth

    track.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return (
    <div className="carousel">
      <button
        type="button"
        className="carousel__arrow carousel__arrow--prev"
        onClick={() => scroll(-1)}
        aria-label="Produtos anteriores"
      >
        <svg width="20" height="40" viewBox="0 0 20 40" aria-hidden="true">
          <path
            d="M17 3 3 20l14 17"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <ul className="carousel__track" ref={trackRef}>
        {products.map((product, index) => (
          <li key={`${product.productName}-${index}`} className="carousel__item">
            <ProductCard product={product} onSelect={onSelect} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="carousel__arrow carousel__arrow--next"
        onClick={() => scroll(1)}
        aria-label="Próximos produtos"
      >
        <svg width="20" height="40" viewBox="0 0 20 40" aria-hidden="true">
          <path
            d="m3 3 14 17L3 37"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}
