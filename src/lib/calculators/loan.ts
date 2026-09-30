export interface LoanInput {
  principal: number;
  annualRate: number;
  months: number;
}

export interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

export function calculateLoan({
  principal,
  annualRate,
  months,
}: LoanInput): LoanResult {
  if (principal <= 0) {
    throw new Error("대출금액은 0보다 커야 합니다.");
  }

  if (annualRate < 0) {
    throw new Error("금리는 0 이상이어야 합니다.");
  }

  if (months <= 0) {
    throw new Error("대출기간은 1개월 이상이어야 합니다.");
  }

  const monthlyRate = annualRate / 100 / 12;

  let monthlyPayment: number;

  if (monthlyRate === 0) {
    monthlyPayment = principal / months;
  } else {
    monthlyPayment =
      (principal * monthlyRate * (1 + monthlyRate) ** months) /
      ((1 + monthlyRate) ** months - 1);
  }

  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - principal;

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
  };
}

export function formatWon(value: number): string {
  return `${Math.round(value).toLocaleString("ko-KR")}원`;
}
