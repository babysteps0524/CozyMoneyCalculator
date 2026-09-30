import { describe, expect, test } from "bun:test";
import { calculateLoan } from "../src/lib/calculators/loan";
import { calculateSavings } from "../src/lib/calculators/savings";
import { calculateSalary } from "../src/lib/calculators/salary";

describe("calculator calculations", () => {
  test("loan calculates equal principal and interest payments", () => {
    const result = calculateLoan({
      principal: 10_000_000,
      annualRate: 4.5,
      months: 36,
    });

    expect(result.monthlyPayment).toBeGreaterThan(0);
    expect(result.totalPayment).toBeGreaterThan(10_000_000);
    expect(result.totalInterest).toBeGreaterThan(0);
  });

  test("zero-rate loan divides principal evenly", () => {
    const result = calculateLoan({
      principal: 12_000_000,
      annualRate: 0,
      months: 12,
    });

    expect(result.monthlyPayment).toBe(1_000_000);
    expect(result.totalInterest).toBe(0);
  });

  test("deposit returns principal plus after-tax interest", () => {
    const result = calculateSavings({
      type: "deposit",
      principal: 10_000_000,
      monthlyDeposit: 0,
      annualRate: 3.5,
      months: 12,
    });

    expect(result.principal).toBe(10_000_000);
    expect(result.interestBeforeTax).toBeGreaterThan(0);
    expect(result.tax).toBeGreaterThan(0);
    expect(result.maturityAmount).toBeGreaterThan(10_000_000);
  });

  test("installment savings uses monthly deposits", () => {
    const result = calculateSavings({
      type: "installment",
      principal: 0,
      monthlyDeposit: 300_000,
      annualRate: 3.5,
      months: 12,
    });

    expect(result.principal).toBe(3_600_000);
    expect(result.maturityAmount).toBeGreaterThan(3_600_000);
  });

  test("salary converts annual salary to monthly and hourly values", () => {
    const result = calculateSalary({
      annualSalary: 40_000_000,
      monthlyHours: 209,
    });

    expect(result.monthlySalary).toBeCloseTo(3_333_333.33, 2);
    expect(result.hourlyWage).toBeCloseTo(15_948.01, 2);
    expect(result.dailyWage).toBeCloseTo(127_584.06, 2);
  });
});
