export interface SalaryInput {
  annualSalary: number;
  monthlyHours: number;
}

export interface SalaryResult {
  monthlySalary: number;
  hourlyWage: number;
  dailyWage: number;
}

export function calculateSalary({
  annualSalary,
  monthlyHours,
}: SalaryInput): SalaryResult {
  if (annualSalary <= 0) {
    throw new Error("연봉은 0보다 커야 합니다.");
  }

  if (monthlyHours <= 0) {
    throw new Error("월 근로시간은 0보다 커야 합니다.");
  }

  const monthlySalary = annualSalary / 12;
  const hourlyWage = monthlySalary / monthlyHours;
  const dailyWage = hourlyWage * 8;

  return {
    monthlySalary,
    hourlyWage,
    dailyWage,
  };
}

export function formatWon(value: number): string {
  return `${Math.round(value).toLocaleString("ko-KR")}원`;
}
