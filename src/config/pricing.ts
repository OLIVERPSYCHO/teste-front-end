/**
 * O JSON da Econverse expõe apenas o campo `price`.
 *
 * O layout também mostra preço anterior riscado, parcelamento e frete grátis,
 * que não existem no payload. As regras abaixo concentram essa simulação em um
 * único lugar, em vez de espalhar números soltos pelos componentes.
 */

/** Percentual usado para reconstruir o preço "de" exibido riscado no card. */
export const PERCENTUAL_PRECO_ANTERIOR = 0.07

/** Número de parcelas sem juros exibido no card. */
export const PARCELAS_SEM_JUROS = 2

export function calcularPrecoAnterior(preco: number): number {
  return preco * (1 + PERCENTUAL_PRECO_ANTERIOR)
}

export function calcularParcela(preco: number): number {
  return preco / PARCELAS_SEM_JUROS
}
