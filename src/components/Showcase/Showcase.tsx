import { useEffect, useState } from 'react'
import type { Product } from '../../types/product'
import { fetchProducts } from '../../services/products'
import CategoryTabs from '../CategoryTabs/CategoryTabs'
import ProductCarousel from '../ProductCarousel/ProductCarousel'
import ProductModal from '../ProductModal/ProductModal'
import ProductListJsonLd from '../StructuredData/ProductListJsonLd'
import './Showcase.scss'

const TITULO = 'Produtos relacionados'

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
      .catch(() => setError('Não foi possível carregar os produtos.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="vitrine" aria-labelledby="titulo-vitrine">
      <h2 id="titulo-vitrine">{TITULO}</h2>

      <CategoryTabs categories={categories} active={category} onChange={setCategory} />

      <div aria-live="polite">
        {loading && <p className="mensagem">Carregando produtos...</p>}
        {error && (
          <p className="mensagem erro" role="alert">
            {error}
          </p>
        )}
      </div>

      {!loading && !error && (
        <>
          <ProductCarousel products={products} onSelect={setSelected} />
          <ProductListJsonLd products={products} nome={TITULO} />
        </>
      )}

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
