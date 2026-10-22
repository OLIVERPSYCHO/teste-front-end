import { useEffect, useState } from 'react'
import type { Product } from '../../types/product'
import { formatPrice } from '../../utils/format'
import './ProductModal.scss'

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantidade, setQuantidade] = useState(1)

  useEffect(() => {
    function aoApertarTecla(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', aoApertarTecla)
    return () => document.removeEventListener('keydown', aoApertarTecla)
  }, [onClose])

  return (
    <div className="modal-fundo" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="fechar" onClick={onClose} aria-label="Fechar">
          ×
        </button>

        <img src={product.photo} alt={product.productName} />

        <div className="info">
          <h2>{product.productName}</h2>
          <p className="preco">{formatPrice(product.price)}</p>
          <p>{product.descriptionShort}</p>

          <button type="button" className="detalhes">
            Veja mais detalhes do produto
          </button>

          <div className="acoes">
            <div className="quantidade">
              <button type="button" onClick={() => setQuantidade(Math.max(1, quantidade - 1))}>
                −
              </button>
              <span>{quantidade}</span>
              <button type="button" onClick={() => setQuantidade(quantidade + 1)}>
                +
              </button>
            </div>

            <button type="button" className="comprar" onClick={onClose}>
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}