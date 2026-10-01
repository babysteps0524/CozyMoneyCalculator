export type SavingsType = "deposit" | "installment";
export type SavingsTaxMode = "general" | "taxFree";

export interface SavingsInput {
  type: SavingsType;
  principal: number;
  monthlyDeposit: number;
  annualRate: number;
  months: number;
  taxMode?: SavingsTaxMode;
}

export interface SavingsResult {
  principal: number;
  interestBeforeTax: number;
  tax: number;
  taxRate: number;
  maturityAmount: number;
}

const GENERAL_INTEREST_TAX_RATE = 0.154;

export function calculateSavings({
  type,
  principal,
  monthlyDeposit,
  annualRate,
  months,
  taxMode = "general",
}: SavingsInput): SavingsResult {
  if (months <= 0) {
    throw new Error("저축기간은 1개월 이상이어야 합니다.");
  }

  if (annualRate < 0) {
    throw new Error("금리는 0 이상이어야 합니다.");
  }

  if (type === "deposit" && principal <= 0) {
    throw new Error("예치금액은 0보다 커야 합니다.");
  }

  if (type === "installment" && monthlyDeposit <= 0) {
    throw new Error("월 납입금액은 0보다 커야 합니다.");
  }

  const annualRateDecimal = annualRate / 100;

  // 일반적인 단리형 예금은 예치원금 × 연이율 × 보유기간으로 계산합니다.
  // 적금은 각 회차의 납입금이 서로 다른 기간 동안 예치된다고 가정합니다.
  let interestBeforeTax = 0;
  const paidPrincipal =
    type === "deposit" ? principal : monthlyDeposit * months;

  if (type === "deposit") {
    interestBeforeTax = principal * annualRateDecimal * (months / 12);
  } else {
    for (let paymentMonth = 1; paymentMonth <= months; paymentMonth += 1) {
      const holdingMonths = months - paymentMonth + 1;
      interestBeforeTax +=
        monthlyDeposit * annualRateDecimal * (holdingMonths / 12);
    }
  }

  const taxRate =
    taxMode === "taxFree" ? 0 : GENERAL_INTEREST_TAX_RATE;
  const tax = interestBeforeTax * taxRate;

  return {
    principal: paidPrincipal,
    interestBeforeTax,
    tax,
    taxRate,
    maturityAmount: paidPrincipal + interestBeforeTax - tax,
  };
}

export function formatWon(value: number): string {
  return `${Math.round(value).toLocaleString("ko-KR")}원`;
}
