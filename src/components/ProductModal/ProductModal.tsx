import { useEffect, useId, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import type { Product } from '../../types/product'
import { formatPrice } from '../../utils/format'
import './ProductModal.scss'

interface ProductModalProps {
  product: Product
  onClose: () => void
}

const SELETOR_FOCAVEIS = 'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantidade, setQuantidade] = useState(1)
  const dialogoRef = useRef<HTMLDivElement>(null)
  const tituloId = useId()

  useEffect(() => {
    const elementoAnterior = document.activeElement as HTMLElement | null
    const dialogo = dialogoRef.current

    // Impede a rolagem do conteúdo atrás do modal.
    document.body.classList.add('modal-aberto')
    dialogo?.querySelector<HTMLElement>(SELETOR_FOCAVEIS)?.focus()

    function aoApertarTecla(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogo) return

      // Mantém o foco preso dentro do modal enquanto ele estiver aberto.
      const focaveis = Array.from(dialogo.querySelectorAll<HTMLElement>(SELETOR_FOCAVEIS))
      if (focaveis.length === 0) return

      const primeiro = focaveis[0]
      const ultimo = focaveis[focaveis.length - 1]

      if (event.shiftKey && document.activeElement === primeiro) {
        event.preventDefault()
        ultimo.focus()
      } else if (!event.shiftKey && document.activeElement === ultimo) {
        event.preventDefault()
        primeiro.focus()
      }
    }

    document.addEventListener('keydown', aoApertarTecla)

    return () => {
      document.removeEventListener('keydown', aoApertarTecla)
      document.body.classList.remove('modal-aberto')
      // Devolve o foco para o elemento que abriu o modal.
      elementoAnterior?.focus()
    }
  }, [onClose])

  function aoClicarNoFundo(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <div className="modal-fundo" role="presentation" onMouseDown={aoClicarNoFundo}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={tituloId}
        ref={dialogoRef}
      >
        <button type="button" className="fechar" onClick={onClose} aria-label="Fechar">
          <span aria-hidden="true">×</span>
        </button>

        <img src={product.photo} alt={product.productName} width={360} height={360} />

        <div className="info">
          <h2 id={tituloId}>{product.productName}</h2>
          <p className="preco">{formatPrice(product.price)}</p>
          <p>{product.descriptionShort}</p>

          <button type="button" className="detalhes">
            Veja mais detalhes do produto
          </button>

          <div className="acoes">
            <div className="quantidade">
              <button
                type="button"
                onClick={() => setQuantidade((atual) => Math.max(1, atual - 1))}
                disabled={quantidade === 1}
                aria-label="Diminuir quantidade"
              >
                <span aria-hidden="true">−</span>
              </button>

              <output aria-label="Quantidade">{quantidade}</output>

              <button
                type="button"
                onClick={() => setQuantidade((atual) => atual + 1)}
                aria-label="Aumentar quantidade"
              >
                <span aria-hidden="true">+</span>
              </button>
            </div>

            <button type="button" className="comprar" onClick={onClose}>
              Comprar
              <span className="apenas-leitor-de-tela">
                {' '}
                {quantidade} unidade{quantidade > 1 ? 's' : ''} de {product.productName}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
