import type { Product } from '../../types/product'
import { formatPrice } from '../../utils/format'
import { PARCELAS_SEM_JUROS, calcularParcela, calcularPrecoAnterior } from '../../config/pricing'
import './ProductCard.scss'

interface ProductCardProps {
  product: Product
  onSelect: (product: Product) => void
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const precoAnterior = calcularPrecoAnterior(product.price)
  const parcela = calcularParcela(product.price)

  return (
    <article className="card">
      <button type="button" className="gatilho" onClick={() => onSelect(product)}>
        <img
          src={product.photo}
          alt={product.productName}
          width={260}
          height={260}
          loading="lazy"
        />
        <h3>{product.descriptionShort}</h3>
      </button>

      <p className="preco-antigo">{formatPrice(precoAnterior)}</p>
      <p className="preco">{formatPrice(product.price)}</p>
      <p className="parcela">
        ou {PARCELAS_SEM_JUROS}x de {formatPrice(parcela)} sem juros
      </p>
      <p className="frete">Frete grátis</p>

      <button type="button" className="comprar" onClick={() => onSelect(product)}>
        Comprar
      </button>
    </article>
  )
}
