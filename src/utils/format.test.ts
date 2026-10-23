import { describe, expect, it } from 'vitest'
import { formatPrice } from './format'

describe('formatPrice', () => {
  it('formata o valor em real brasileiro', () => {
    expect(formatPrice(1499.9)).toMatch(/^R\$\s1\.499,90$/)
  })

  it('mantém duas casas decimais para valores inteiros', () => {
    expect(formatPrice(30)).toMatch(/^R\$\s30,00$/)
  })
})
