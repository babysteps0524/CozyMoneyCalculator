export interface CompoundInput {
  principal: number;
  annualRate: number;
  years: number;
  annualContribution: number;
}

export interface CompoundResult {
  futureValue: number;
  totalContributions: number;
  interest: number;
}

export function calculateCompound({
  principal,
  annualRate,
  years,
  annualContribution,
}: CompoundInput): CompoundResult {
  const rate = annualRate / 100;
  const futureValue =
    rate === 0
      ? principal + annualContribution * years
      : principal * (1 + rate) ** years +
        (annualContribution * ((1 + rate) ** years - 1)) / rate;
  const totalContributions = principal + annualContribution * years;

  return {
    futureValue,
    totalContributions,
    interest: futureValue - totalContributions,
  };
}
