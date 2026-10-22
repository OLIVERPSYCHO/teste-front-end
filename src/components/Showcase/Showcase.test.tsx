import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Product } from '../../types/product'
import Showcase from './Showcase'

const produtos: Product[] = [
  {
    productName: 'IPHONE 13 MINI 1',
    descriptionShort: 'Primeiro produto da vitrine.',
    photo: 'https://exemplo.test/iphone-13.png',
    price: 1499.9,
  },
  {
    productName: 'Iphone 11 PRO MAX BRANCO 1',
    descriptionShort: 'Segundo produto da vitrine.',
    photo: 'https://exemplo.test/iphone-11.png',
    price: 2999.9,
  },
]

vi.mock('../../services/products', () => ({
  fetchProducts: vi.fn(() => Promise.resolve(produtos)),
}))

describe('Showcase', () => {
  it('abre o modal com os dados do produto clicado e fecha com Escape', async () => {
    render(<Showcase />)

    const imagem = await screen.findByRole('img', { name: produtos[1].productName })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await userEvent.click(imagem)

    const modal = screen.getByRole('dialog')
    expect(modal).toHaveAttribute('aria-modal', 'true')
    expect(
      within(modal).getByRole('heading', { name: produtos[1].productName, level: 2 }),
    ).toBeInTheDocument()
    expect(within(modal).getByText(produtos[1].descriptionShort)).toBeInTheDocument()
    expect(within(modal).getByText('R$ 2.999,90')).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('publica os dados estruturados da lista de produtos', async () => {
    const { container } = render(<Showcase />)

    await screen.findByRole('img', { name: produtos[0].productName })

    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).not.toBeNull()

    const dados = JSON.parse(script?.textContent ?? '{}')
    expect(dados['@type']).toBe('ItemList')
    expect(dados.itemListElement).toHaveLength(produtos.length)
    expect(dados.itemListElement[0].item.name).toBe(produtos[0].productName)
  })
})
