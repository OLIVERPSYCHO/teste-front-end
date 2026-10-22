import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Product } from '../../types/product'
import ProductCard from './ProductCard'

const produto: Product = {
  productName: 'IPHONE 13 MINI 1',
  descriptionShort: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  photo: 'https://exemplo.test/iphone.png',
  price: 1499.9,
}

describe('ProductCard', () => {
  it('exibe as informações do produto vindas do JSON', () => {
    render(<ProductCard product={produto} onSelect={vi.fn()} />)

    expect(screen.getByRole('heading', { name: produto.descriptionShort })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: produto.productName })).toHaveAttribute(
      'src',
      produto.photo,
    )
    expect(screen.getByText('R$ 1.499,90')).toBeInTheDocument()
    expect(screen.getByText('Frete grátis')).toBeInTheDocument()
  })

  it('avisa a seleção ao clicar no produto', async () => {
    const aoSelecionar = vi.fn()
    render(<ProductCard product={produto} onSelect={aoSelecionar} />)

    await userEvent.click(screen.getByRole('img', { name: produto.productName }))

    expect(aoSelecionar).toHaveBeenCalledWith(produto)
  })

  it('avisa a seleção ao clicar no botão comprar', async () => {
    const aoSelecionar = vi.fn()
    render(<ProductCard product={produto} onSelect={aoSelecionar} />)

    await userEvent.click(screen.getByRole('button', { name: /comprar/i }))

    expect(aoSelecionar).toHaveBeenCalledWith(produto)
  })
})
