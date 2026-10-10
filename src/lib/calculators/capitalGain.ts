export interface CapitalGainInput {
  salePrice: number;
  purchasePrice: number;
  expenses: number;
  assumedRate: number;
}

export interface CapitalGainResult {
  taxableGain: number;
  estimatedTax: number;
}

export function calculateCapitalGain({
  salePrice,
  purchasePrice,
  expenses,
  assumedRate,
}: CapitalGainInput): CapitalGainResult {
  const taxableGain = Math.max(0, salePrice - purchasePrice - expenses);
  return {
    taxableGain,
    estimatedTax: (taxableGain * assumedRate) / 100,
  };
}
