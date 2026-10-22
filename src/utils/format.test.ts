import { describe, expect, it } from 'vitest'
import { formatPrice } from './format'

// Intl.NumberFormat separa o símbolo do valor com espaço inquebrável (U+00A0).
const ESPACO_INQUEBRAVEL = String.fromCharCode(160)

describe('formatPrice', () => {
  it('formata o valor em real brasileiro', () => {
    expect(formatPrice(1499.9)).toBe(`R$${ESPACO_INQUEBRAVEL}1.499,90`)
  })

  it('mantém duas casas decimais para valores inteiros', () => {
    expect(formatPrice(30)).toBe(`R$${ESPACO_INQUEBRAVEL}30,00`)
  })
})
