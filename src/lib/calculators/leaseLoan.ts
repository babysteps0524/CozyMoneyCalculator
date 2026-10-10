export interface LeaseLoanInput {
  deposit: number;
  loanRate: number;
  annualRate: number;
}

export interface LeaseLoanResult {
  loanAmount: number;
  annualInterest: number;
}

export function calculateLeaseLoan({
  deposit,
  loanRate,
  annualRate,
}: LeaseLoanInput): LeaseLoanResult {
  const loanAmount = (deposit * loanRate) / 100;
  return {
    loanAmount,
    annualInterest: (loanAmount * annualRate) / 100,
  };
}
