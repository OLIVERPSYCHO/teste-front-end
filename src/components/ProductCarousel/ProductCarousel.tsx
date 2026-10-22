import { useCallback, useEffect, useRef, useState } from 'react'
import type { Product } from '../../types/product'
import ProductCard from '../ProductCard/ProductCard'
import './ProductCarousel.scss'

interface ProductCarouselProps {
  products: Product[]
  onSelect: (product: Product) => void
}

export default function ProductCarousel({ products, onSelect }: ProductCarouselProps) {
  const listRef = useRef<HTMLUListElement>(null)
  const [noInicio, setNoInicio] = useState(true)
  const [noFim, setNoFim] = useState(false)

  const atualizarLimites = useCallback(() => {
    const lista = listRef.current
    if (!lista) return

    const limite = lista.scrollWidth - lista.clientWidth
    setNoInicio(lista.scrollLeft <= 1)
    setNoFim(lista.scrollLeft >= limite - 1)
  }, [])

  useEffect(() => {
    atualizarLimites()
    window.addEventListener('resize', atualizarLimites)
    return () => window.removeEventListener('resize', atualizarLimites)
  }, [atualizarLimites, products])

  function mover(direcao: number) {
    const lista = listRef.current
    if (!lista) return

    lista.scrollBy({ left: direcao * lista.clientWidth, behavior: 'smooth' })
  }

  return (
    <div className="carrossel">
      <button
        type="button"
        className="seta anterior"
        onClick={() => mover(-1)}
        disabled={noInicio}
        aria-label="Produtos anteriores"
      >
        <span aria-hidden="true">‹</span>
      </button>

      <ul ref={listRef} onScroll={atualizarLimites}>
        {products.map((product) => (
          <li key={product.productName}>
            <ProductCard product={product} onSelect={onSelect} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="seta proxima"
        onClick={() => mover(1)}
        disabled={noFim}
        aria-label="Próximos produtos"
      >
        <span aria-hidden="true">›</span>
      </button>
    </div>
  )
}
