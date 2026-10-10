export interface CarTaxInput {
  displacement: number;
  rate: number;
}

export function calculateCarTax({ displacement, rate }: CarTaxInput): number {
  return displacement * rate;
}
