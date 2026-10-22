import { useEffect, useRef, useState } from 'react'
import type { Product } from '../../types/product'
import { formatPrice } from '../../utils/format'
import './ProductModal.scss'

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal" onClick={onClose}>
      <div
        className="modal__content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>

        <img
          className="modal__image"
          src={product.photo}
          alt={product.productName}
        />

        <div className="modal__info">
          <h2 id="modal-title" className="modal__name">
            {product.productName}
          </h2>
          <p className="modal__price">{formatPrice(product.price)}</p>
          <p className="modal__description">{product.descriptionShort}</p>

          <button type="button" className="modal__details">
            Veja mais detalhes do produto
          </button>

          <div className="modal__actions">
            <div className="modal__quantity">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Diminuir quantidade"
              >
                −
              </button>
              <span aria-live="polite">{String(quantity).padStart(2, '0')}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Aumentar quantidade"
              >
                +
              </button>
            </div>

            <button type="button" className="modal__buy" onClick={onClose}>
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
