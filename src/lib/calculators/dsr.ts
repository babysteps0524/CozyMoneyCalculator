export interface DsrInput {
  annualIncome: number;
  existingAnnualDebt: number;
  additionalAnnualDebt: number;
  targetRate: number;
}

export interface DsrResult {
  currentRate: number;
  projectedRate: number;
  targetRate: number;
}

export function calculateDsr({
  annualIncome,
  existingAnnualDebt,
  additionalAnnualDebt,
  targetRate,
}: DsrInput): DsrResult {
  const totalDebt = existingAnnualDebt + additionalAnnualDebt;
  return {
    currentRate:
      annualIncome === 0 ? NaN : (existingAnnualDebt / annualIncome) * 100,
    projectedRate: annualIncome === 0 ? NaN : (totalDebt / annualIncome) * 100,
    targetRate,
  };
}
