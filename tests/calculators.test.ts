import { describe, expect, test } from "bun:test";
import { calculateLoan } from "../src/lib/calculators/loan";
import { calculateSavings } from "../src/lib/calculators/savings";
import { calculateSalary } from "../src/lib/calculators/salary";
import { calculatePropertyTax } from "../src/lib/calculators/property";
import {
  calculateBrokerage,
  getHousingRate,
  getMonthlyLeaseAmount,
} from "../src/lib/calculators/brokerage";

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
      method: "compound",
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
    expect(result.hourlyWage).toBeCloseTo(15_948.9633, 4);
    expect(result.dailyWage).toBeCloseTo(127_591.7065, 4);
  });

  test("property tax applies 2026 one-household-one-home rules", () => {
    const result = calculatePropertyTax({
      year: 2026,
      oneHouseholdOneHome: true,
      taxBurdenCap: false,
      assets: [
        {
          id: "1",
          assessedValue: 500_000_000,
          ownershipShare: 100,
          urbanArea: true,
          previousPropertyTax: 0,
          previousUrbanAreaTax: 0,
        },
      ],
    });

    expect(result.assets[0].taxableBase).toBe(220_000_000);
    expect(result.assets[0].propertyTax).toBe(260_000);
    expect(result.assets[0].urbanAreaTax).toBe(308_000);
    expect(result.assets[0].localEducationTax).toBe(52_000);
    expect(result.total).toBe(620_000);
  });

  test("property tax supports multiple homes and ownership share", () => {
    const result = calculatePropertyTax({
      year: 2026,
      oneHouseholdOneHome: false,
      taxBurdenCap: false,
      assets: [
        {
          id: "1",
          assessedValue: 300_000_000,
          ownershipShare: 100,
          urbanArea: false,
          previousPropertyTax: 0,
          previousUrbanAreaTax: 0,
        },
        {
          id: "2",
          assessedValue: 400_000_000,
          ownershipShare: 50,
          urbanArea: false,
          previousPropertyTax: 0,
          previousUrbanAreaTax: 0,
        },
      ],
    });

    expect(result.assets).toHaveLength(2);
    expect(result.assets[1].taxableBase).toBe(120_000_000);
    expect(result.propertyTax).toBeGreaterThan(0);
  });

  test("brokerage uses housing sale rate and statutory cap", () => {
    expect(getHousingRate("sale", 40_000_000)).toEqual({
      rate: 0.6,
      cap: 250_000,
    });

    const result = calculateBrokerage({
      transaction: "sale",
      property: "house",
      amount: 40_000_000,
      vatRate: 10,
    });

    expect(result.transactionAmount).toBe(40_000_000);
    expect(result.brokerageFee).toBe(240_000);
    expect(result.vat).toBe(24_000);
    expect(result.total).toBe(264_000);
    expect(result.capped).toBe(false);
  });

  test("brokerage applies the 800000 won cap for the 50m to 200m sale range", () => {
    const result = calculateBrokerage({
      transaction: "sale",
      property: "house",
      amount: 150_000_000,
      vatRate: 10,
    });

    expect(result.brokerageFee).toBe(750_000);
    expect(result.capped).toBe(false);
  });

  test("brokerage converts monthly rent transaction amount", () => {
    expect(getMonthlyLeaseAmount(10_000_000, 300_000)).toBe(31_000_000);
    expect(getMonthlyLeaseAmount(30_000_000, 300_000)).toBe(60_000_000);

    const result = calculateBrokerage({
      transaction: "monthly",
      property: "house",
      amount: 31_000_000,
      vatRate: 10,
    });

    expect(result.rate).toBe(0.5);
    expect(result.brokerageFee).toBe(155_000);
  });

  test("brokerage supports officetel and presale rules", () => {
    const officetel = calculateBrokerage({
      transaction: "sale",
      property: "officetel",
      amount: 300_000_000,
      officetelEligible: true,
      vatRate: 0,
    });

    const presale = calculateBrokerage({
      transaction: "sale",
      property: "presale",
      amount: 0,
      paidAmount: 200_000_000,
      premium: 30_000_000,
      vatRate: 0,
    });

    expect(officetel.rate).toBe(0.5);
    expect(officetel.brokerageFee).toBe(1_500_000);
    expect(presale.transactionAmount).toBe(230_000_000);
    expect(presale.rate).toBe(0.4);
    expect(presale.brokerageFee).toBe(920_000);
  });
});
