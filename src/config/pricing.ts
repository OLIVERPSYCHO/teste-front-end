// O JSON só traz `price`. Preço anterior e parcelamento são simulados para
// reproduzir o layout.

export const PERCENTUAL_PRECO_ANTERIOR = 0.07
export const PARCELAS_SEM_JUROS = 2

export function calcularPrecoAnterior(preco: number): number {
  return preco * (1 + PERCENTUAL_PRECO_ANTERIOR)
}

export function calcularParcela(preco: number): number {
  return preco / PARCELAS_SEM_JUROS
}
