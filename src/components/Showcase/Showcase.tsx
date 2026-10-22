import { useEffect, useState } from 'react'
import type { Product } from '../../types/product'
import { fetchProducts } from '../../services/products'
import CategoryTabs from '../CategoryTabs/CategoryTabs'
import ProductCarousel from '../ProductCarousel/ProductCarousel'
import ProductModal from '../ProductModal/ProductModal'
import './Showcase.scss'

const CATEGORIES = ['Celular', 'Acessórios', 'Tablets', 'Notebooks', 'TVs', 'Ver todos']

export default function Showcase() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<Product | null>(null)
  const [category, setCategory] = useState(CATEGORIES[0])

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="showcase" aria-labelledby="showcase-title">
      <h2 id="showcase-title" className="showcase__title">
        Produtos relacionados
      </h2>

      <CategoryTabs
        categories={CATEGORIES}
        active={category}
        onChange={setCategory}
      />

      {loading && <p className="showcase__message">Carregando produtos...</p>}
      {error && (
        <p className="showcase__message showcase__message--error" role="alert">
          {error}
        </p>
      )}
      {!loading && !error && (
        <ProductCarousel products={products} onSelect={setSelected} />
      )}

      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
