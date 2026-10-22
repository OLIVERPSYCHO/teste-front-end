import type { Product } from '../../types/product'
import { formatPrice } from '../../utils/format'
import './ProductCard.scss'

// O JSON só traz o preço atual; o preço riscado serve para reproduzir o layout
const OLD_PRICE_FACTOR = 1.07

interface ProductCardProps {
  product: Product
  onSelect: (product: Product) => void
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <article className="product-card">
      <img
        className="product-card__image"
        src={product.photo}
        alt={product.productName}
        loading="lazy"
      />

      <h3 className="product-card__name">{product.descriptionShort}</h3>

      <p className="product-card__old-price">
        <s>{formatPrice(product.price * OLD_PRICE_FACTOR)}</s>
      </p>
      <p className="product-card__price">{formatPrice(product.price)}</p>
      <p className="product-card__installment">
        ou 2x de {formatPrice(product.price / 2)} sem juros
      </p>
      <p className="product-card__shipping">Frete grátis</p>

      <button
        type="button"
        className="product-card__button"
        onClick={() => onSelect(product)}
      >
        Comprar
      </button>
    </article>
  )
}
