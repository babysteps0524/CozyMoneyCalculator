export type UnemploymentAgeGroup = 'under50' | 'over50OrDisabled';
export type InsurancePeriod = 'under1' | '1to3' | '3to5' | '5to10' | '10plus';

export interface UnemploymentInput {
  dailyAverageWage: number;
  dailyWorkingHours: number;
  ageGroup: UnemploymentAgeGroup;
  insurancePeriod: InsurancePeriod;
}

export interface UnemploymentResult {
  dailyAverageWage: number;
  baseBenefit: number;
  lowerLimit: number;
  upperLimit: number;
  dailyBenefit: number;
  benefitDays: number;
  totalBenefit: number;
  lowerLimitApplied: boolean;
  upperLimitApplied: boolean;
}

const BENEFIT_DAYS: Record<UnemploymentAgeGroup, Record<InsurancePeriod, number>> = {
  under50: { under1: 120, '1to3': 150, '3to5': 180, '5to10': 210, '10plus': 240 },
  over50OrDisabled: { under1: 120, '1to3': 180, '3to5': 210, '5to10': 240, '10plus': 270 },
};

export function getBenefitDays(ageGroup: UnemploymentAgeGroup, insurancePeriod: InsurancePeriod): number {
  return BENEFIT_DAYS[ageGroup][insurancePeriod];
}

/**
 * 이직일 직전 3개월의 임금총액을 해당 기간의 총일수로 나누어
 * 1일 평균임금을 간편하게 추정합니다.
 *
 * 실제 평균임금 산정에서는 제외기간·제외임금 등이 발생할 수 있으므로
 * 고용센터의 최종 산정 결과와 다를 수 있습니다.
 */
export function calculateEstimatedDailyAverageWage(
  totalWages: number,
  separationDate: string,
): { dailyAverageWage: number; periodDays: number } {
  if (totalWages <= 0) throw new Error('퇴직 전 3개월 임금총액은 0보다 커야 합니다.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(separationDate)) {
    throw new Error('이직일을 올바른 날짜로 입력하세요.');
  }

  const end = new Date(`${separationDate}T00:00:00`);
  if (Number.isNaN(end.getTime())) throw new Error('이직일을 올바른 날짜로 입력하세요.');

  const periodStart = new Date(end);
  const targetMonth = periodStart.getMonth() - 3;
  const targetYear = periodStart.getFullYear() + Math.floor(targetMonth / 12);
  const normalizedMonth = ((targetMonth % 12) + 12) % 12;
  const lastDayOfTargetMonth = new Date(targetYear, normalizedMonth + 1, 0).getDate();
  periodStart.setFullYear(targetYear, normalizedMonth, Math.min(end.getDate(), lastDayOfTargetMonth));

  const periodDays = Math.round((end.getTime() - periodStart.getTime()) / 86_400_000);

  if (periodDays <= 0) throw new Error('이직일을 확인하세요.');

  return {
    dailyAverageWage: Math.floor(totalWages / periodDays),
    periodDays,
  };
}

export function calculateUnemployment(input: UnemploymentInput): UnemploymentResult {
  if (input.dailyAverageWage <= 0) throw new Error('1일 평균임금은 0보다 커야 합니다.');
  if (input.dailyWorkingHours <= 0 || input.dailyWorkingHours > 8) {
    throw new Error('1일 소정근로시간은 1~8시간 범위로 입력하세요.');
  }

  const dailyAverageWage = Math.floor(input.dailyAverageWage);
  const baseBenefit = Math.floor(dailyAverageWage * 0.6);
  const upperLimit = 68_100;
  const lowerLimit = Math.floor(10_320 * 0.8 * input.dailyWorkingHours);
  const dailyBenefit = Math.min(upperLimit, Math.max(lowerLimit, baseBenefit));
  const benefitDays = getBenefitDays(input.ageGroup, input.insurancePeriod);

  return {
    dailyAverageWage,
    baseBenefit,
    lowerLimit,
    upperLimit,
    dailyBenefit,
    benefitDays,
    totalBenefit: dailyBenefit * benefitDays,
    lowerLimitApplied: baseBenefit < lowerLimit,
    upperLimitApplied: baseBenefit > upperLimit,
  };
}
