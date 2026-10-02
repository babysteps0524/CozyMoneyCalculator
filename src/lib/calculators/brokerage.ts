export type BrokerageTransaction = 'sale' | 'jeonse' | 'monthly';
export type BrokerageProperty =
  | 'house'
  | 'officetel'
  | 'presale'
  | 'other';

export interface BrokerageInput {
  transaction: BrokerageTransaction;
  property: BrokerageProperty;
  amount: number;
  monthlyRent?: number;
  paidAmount?: number;
  premium?: number;
  officetelEligible?: boolean;
  customRate?: number;
  vatRate?: number;
}

export interface BrokerageResult {
  brokerageBase: number;
  rate: number;
  upperLimit: number;
  vat: number;
  total: number;
  capped: boolean;
  explanation: string;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function getHousingRate(
  transaction: BrokerageTransaction,
  amount: number,
): { rate: number; cap: number | null } {
  if (transaction === 'sale') {
    if (amount < 50_000_000) return { rate: 0.6, cap: 250_000 };
    if (amount < 200_000_000) return { rate: 0.5, cap: 800_000 };
    if (amount < 900_000_000) return { rate: 0.4, cap: null };
    if (amount < 1_200_000_000) return { rate: 0.5, cap: null };
    if (amount < 1_500_000_000) return { rate: 0.6, cap: null };
    return { rate: 0.7, cap: null };
  }

  if (amount < 50_000_000) return { rate: 0.5, cap: 200_000 };
  if (amount < 100_000_000) return { rate: 0.4, cap: 300_000 };
  if (amount < 600_000_000) return { rate: 0.3, cap: null };
  if (amount < 1_200_000_000) return { rate: 0.4, cap: null };
  if (amount < 1_500_000_000) return { rate: 0.5, cap: null };
  return { rate: 0.6, cap: null };
}

export function calculateBrokerage(input: BrokerageInput): BrokerageResult {
  if (input.amount < 0) throw new Error('거래금액은 0 이상이어야 합니다.');

  const vatRate = clamp(input.vatRate ?? 10, 0, 100);

  let base = input.amount;
  let rate = 0;
  let statutoryCap: number | null = null;
  let explanation = '';

  if (input.property === 'house') {
    const housing = getHousingRate(input.transaction, input.amount);
    rate = housing.rate;
    statutoryCap = housing.cap;
    explanation =
      '주택 중개보수 상한요율을 적용했습니다. 실제 중개보수는 상한 범위에서 중개의뢰인과 개업공인중개사가 협의해 결정할 수 있습니다.';
  } else if (input.property === 'officetel') {
    if (input.officetelEligible) {
      rate = input.transaction === 'sale' ? 0.5 : 0.4;
      explanation =
        '전용면적 85㎡ 이하이고 시행규칙상 시설요건을 갖춘 오피스텔의 상한요율을 적용했습니다.';
    } else {
      rate = 0.9;
      explanation =
        '일반적인 주택 외 중개대상물 기준인 거래금액의 0.9% 이내를 적용했습니다.';
    }
  } else if (input.property === 'presale') {
    base = Math.max(0, (input.paidAmount ?? 0) + (input.premium ?? 0));
    if (input.customRate === undefined) {
      const housing = getHousingRate(input.transaction, base);
      rate = housing.rate;
      statutoryCap = housing.cap;
    } else {
      rate = clamp(input.customRate, 0, 0.9);
    }
    explanation =
      '분양권은 거래 당시까지 불입한 금액(융자 포함)과 프리미엄을 합산한 거래금액을 기준으로 계산했습니다.';
  } else {
    rate = clamp(input.customRate ?? 0.9, 0, 0.9);
    explanation =
      '주택 외 중개대상물은 거래금액의 0.9% 이내에서 협의하는 구조이므로 입력한 요율을 적용했습니다.';
  }

  if (input.customRate !== undefined && input.property !== 'officetel') {
    rate = clamp(input.customRate, 0, 0.9);
    statutoryCap = null;
  }

  const raw = base * (rate / 100);
  const upperLimit = statutoryCap === null ? raw : Math.min(raw, statutoryCap);
  const brokerageBase = Math.max(0, Math.round(upperLimit));
  const vat = Math.round(brokerageBase * (vatRate / 100));
  const total = brokerageBase + vat;

  return {
    brokerageBase,
    rate,
    upperLimit,
    vat,
    total,
    capped: statutoryCap !== null && raw > statutoryCap,
    explanation,
  };
}

export function getMonthlyLeaseAmount(
  deposit: number,
  monthlyRent: number,
): number {
  const converted = deposit + monthlyRent * 100;
  return converted < 50_000_000
    ? deposit + monthlyRent * 70
    : converted;
}
