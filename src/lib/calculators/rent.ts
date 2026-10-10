export interface RentComparisonInput {
  deposit: number;
  monthlyRent: number;
  conversionRate: number;
}

export interface RentComparisonResult {
  annualRent: number;
  convertedDeposit: number;
  annualCost: number;
}

export function calculateRentComparison({
  deposit,
  monthlyRent,
  conversionRate,
}: RentComparisonInput): RentComparisonResult {
  const annualRent = monthlyRent * 12;
  const convertedDeposit = (deposit * conversionRate) / 100;
  return {
    annualRent,
    convertedDeposit,
    annualCost: annualRent + convertedDeposit,
  };
}
