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


  test("loan supports equal principal repayment", () => {
    const result = calculateLoan({
      principal: 12_000_000,
      annualRate: 6,
      months: 12,
      repaymentType: "equalPrincipal",
    });

    expect(result.schedule).toHaveLength(12);
    expect(result.schedule[0].payment).toBeGreaterThan(result.schedule[11].payment);
    expect(result.totalInterest).toBeGreaterThan(0);
  });

  test("loan supports maturity repayment and prepayment fee", () => {
    const result = calculateLoan({
      principal: 10_000_000,
      annualRate: 6,
      months: 12,
      repaymentType: "maturity",
      prepaymentMonth: 6,
      prepaymentAmount: 2_000_000,
      prepaymentFeeRate: 1,
    });

    expect(result.schedule).toHaveLength(12);
    expect(result.totalPrepayment).toBe(2_000_000);
    expect(result.totalPrepaymentFee).toBe(20_000);
    expect(result.schedule[11].remainingPrincipal).toBe(0);
  });

  test("loan supports a grace period before repayment", () => {
    const result = calculateLoan({
      principal: 10_000_000,
      annualRate: 6,
      months: 12,
      repaymentType: "equalPrincipalInterest",
      graceMonths: 3,
    });

    expect(result.schedule[0].principalPayment).toBe(0);
    expect(result.schedule[2].principalPayment).toBe(0);
    expect(result.schedule[3].principalPayment).toBeGreaterThan(0);
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

  test("deposit uses simple annual interest and general tax", () => {
    const result = calculateSavings({
      type: "deposit",
      principal: 10_000_000,
      monthlyDeposit: 0,
      annualRate: 3.5,
      months: 12,
    });

    expect(result.interestBeforeTax).toBeCloseTo(350_000, 8);
    expect(result.tax).toBeCloseTo(53_900, 8);
    expect(result.maturityAmount).toBeCloseTo(10_296_100, 8);
  });

  test("installment calculates each monthly payment for its holding period", () => {
    const result = calculateSavings({
      type: "installment",
      principal: 0,
      monthlyDeposit: 300_000,
      annualRate: 3.5,
      months: 12,
    });

    expect(result.interestBeforeTax).toBeCloseTo(68_250, 8);
    expect(result.tax).toBeCloseTo(10_510.5, 8);
  });

  test("savings supports a tax-free comparison assumption", () => {
    const result = calculateSavings({
      type: "deposit",
      principal: 10_000_000,
      monthlyDeposit: 0,
      annualRate: 3.5,
      months: 12,
      taxMode: "taxFree",
    });

    expect(result.taxRate).toBe(0);
    expect(result.tax).toBe(0);
    expect(result.maturityAmount).toBeCloseTo(10_350_000, 8);
  });


  test("salary converts annual salary to monthly and hourly values", () => {
    const result = calculateSalary({
      annualSalary: 40_000_000,
      monthlyHours: 209,
    });

    expect(result.monthlySalary).toBeCloseTo(3_333_333.33, 2);
    expect(result.hourlyWage).toBeCloseTo(15_948.9633, 4);
    expect(result.dailyWage).toBeCloseTo(127_591.7065, 4);
  });
});
