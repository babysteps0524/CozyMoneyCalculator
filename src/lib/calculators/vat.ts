export type VatCalculationMode = 'supply' | 'total' | 'tax' | 'payable';
export type VatRoundingMode = 'round' | 'floor' | 'ceil';

export interface VatCalculationInput {
  amount: number;
  rate: number;
  inputTax: number;
  mode: VatCalculationMode;
  roundingUnit: number;
  roundingMode: VatRoundingMode;
}

export interface VatCalculationResult {
  supply: number;
  tax: number;
  total: number;
  payable: number;
  roundedSupply: number;
  roundedTax: number;
  roundedTotal: number;
  roundedPayable: number;
  roundedInputTax: number;
}

export type VatCalculationOutcome = { error: string } | VatCalculationResult;

function applyRounding(
  value: number,
  unit: number,
  mode: VatRoundingMode,
): number {
  if (!unit) return value;
  if (mode === 'floor') return Math.floor(value / unit) * unit;
  if (mode === 'ceil') return Math.ceil(value / unit) * unit;
  return Math.round(value / unit) * unit;
}

export function calculateVat({
  amount,
  rate,
  inputTax,
  mode,
  roundingUnit,
  roundingMode,
}: VatCalculationInput): VatCalculationOutcome {
  const taxRate = rate / 100;
  if (taxRate < 0 || taxRate >= 100 || !Number.isFinite(taxRate)) {
    return { error: '세율은 0 이상 100 미만으로 입력하세요.' };
  }

  let supply = 0;
  let tax = 0;
  let total = 0;
  let payable = 0;

  if (mode === 'supply') {
    supply = amount;
    tax = supply * taxRate;
    total = supply + tax;
  } else if (mode === 'total') {
    total = amount;
    supply = total / (1 + taxRate);
    tax = total - supply;
  } else if (mode === 'tax') {
    tax = amount;
    supply = taxRate === 0 ? NaN : tax / taxRate;
    total = supply + tax;
  } else {
    supply = amount;
    tax = supply * taxRate;
    total = supply + tax;
    payable = tax - inputTax;
  }

  if (![supply, tax, total].every(Number.isFinite)) {
    return {
      error: '세율이 0%인 경우 부가세액으로부터 공급가액을 역산할 수 없습니다.',
    };
  }

  return {
    supply,
    tax,
    total,
    payable,
    roundedSupply: applyRounding(supply, roundingUnit, roundingMode),
    roundedTax: applyRounding(tax, roundingUnit, roundingMode),
    roundedTotal: applyRounding(total, roundingUnit, roundingMode),
    roundedPayable: applyRounding(payable, roundingUnit, roundingMode),
    roundedInputTax: applyRounding(inputTax, roundingUnit, roundingMode),
  };
}
