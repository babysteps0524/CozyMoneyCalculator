import { describe, expect, test } from 'bun:test';
import {
  calculateEstimatedDailyAverageWage,
  calculateUnemployment,
  getBenefitDays,
} from '../src/lib/calculators/unemployment';

describe('unemployment calculator', () => {
  test('calculates daily average wage from three-month wages', () => {
    const result = calculateEstimatedDailyAverageWage(9_000_000, '2026-10-06');

    expect(result.periodDays).toBe(92);
    expect(result.dailyAverageWage).toBe(97_826);
  });

  test('handles a three-month period crossing a shorter month', () => {
    const result = calculateEstimatedDailyAverageWage(9_000_000, '2026-05-31');

    expect(result.periodDays).toBe(90);
    expect(result.dailyAverageWage).toBe(100_000);
  });

  test('applies 2026 lower limit and 50세 미만 1~3년 지급일수', () => {
    const result = calculateUnemployment({
      dailyAverageWage: 100_000,
      dailyWorkingHours: 8,
      ageGroup: 'under50',
      insurancePeriod: '1to3',
    });

    expect(result.baseBenefit).toBe(60_000);
    expect(result.lowerLimit).toBe(66_048);
    expect(result.upperLimit).toBe(68_100);
    expect(result.dailyBenefit).toBe(66_048);
    expect(result.benefitDays).toBe(150);
    expect(result.totalBenefit).toBe(9_907_200);
    expect(result.lowerLimitApplied).toBe(true);
    expect(result.upperLimitApplied).toBe(false);
  });

  test('applies upper limit when 60 percent exceeds 2026 maximum', () => {
    const result = calculateUnemployment({
      dailyAverageWage: 150_000,
      dailyWorkingHours: 8,
      ageGroup: 'under50',
      insurancePeriod: '3to5',
    });

    expect(result.baseBenefit).toBe(90_000);
    expect(result.dailyBenefit).toBe(68_100);
    expect(result.upperLimitApplied).toBe(true);
    expect(result.totalBenefit).toBe(12_258_000);
  });

  test('uses longer benefit days for age 50+ or disabled', () => {
    expect(getBenefitDays('over50OrDisabled', '1to3')).toBe(180);
    expect(getBenefitDays('over50OrDisabled', '10plus')).toBe(270);
  });

  test('scales lower limit by daily working hours', () => {
    const result = calculateUnemployment({
      dailyAverageWage: 80_000,
      dailyWorkingHours: 4,
      ageGroup: 'under50',
      insurancePeriod: 'under1',
    });

    expect(result.lowerLimit).toBe(33_024);
    expect(result.dailyBenefit).toBe(48_000);
  });
});
