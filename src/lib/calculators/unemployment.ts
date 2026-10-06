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
