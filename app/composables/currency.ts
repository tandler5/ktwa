export const formatCurrency = (value: number) => {
  return value.toLocaleString('cs-CZ', {style: 'currency', currency: 'CZK'})
}
