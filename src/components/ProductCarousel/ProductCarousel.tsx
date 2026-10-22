import type { Product } from '../../types/product'
import { formatPrice } from '../../utils/format'
import './ProductCard.scss'

interface ProductCardProps {
  product: Product
  onSelect: (product: Product) => void
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const precoAntigo = product.price * 1.07
  const parcela = product.price / 2

  return (
    <article className="card">
      <img src={product.photo} alt={product.productName} />

      <h3>{product.descriptionShort}</h3>

      <p className="preco-antigo">{formatPrice(precoAntigo)}</p>
      <p className="preco">{formatPrice(product.price)}</p>
      <p className="parcela">ou 2x de {formatPrice(parcela)} sem juros</p>
      <p className="frete">Frete grátis</p>

      <button type="button" onClick={() => onSelect(product)}>
        Comprar
      </button>
    </article>
  )
}