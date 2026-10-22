import { useEffect, useState } from 'react'
import type { Product } from '../../types/product'
import { fetchProducts } from '../../services/products'
import CategoryTabs from '../CategoryTabs/CategoryTabs'
import ProductCarousel from '../ProductCarousel/ProductCarousel'
import ProductModal from '../ProductModal/ProductModal'
import './Showcase.scss'

const categories = ['Celular', 'Acessórios', 'Tablets', 'Notebooks', 'TVs', 'Ver todos']

export default function Showcase() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<Product | null>(null)
  const [category, setCategory] = useState(categories[0])

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="vitrine">
      <h2>Produtos relacionados</h2>

      <CategoryTabs
        categories={categories}
        active={category}
        onChange={setCategory}
      />

      {loading && <p className="mensagem">Carregando produtos...</p>}
      {error && <p className="mensagem erro">{error}</p>}

      {!loading && !error && (
        <ProductCarousel products={products} onSelect={setSelected} />
      )}

      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}