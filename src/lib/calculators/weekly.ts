export interface WeeklyWageInput {
  hourlyWage: number;
  weeklyHours: number;
}

export interface WeeklyWageResult {
  weeklyHolidayPay: number;
  weeklyTotal: number;
}

export function calculateWeeklyWage({
  hourlyWage,
  weeklyHours,
}: WeeklyWageInput): WeeklyWageResult {
  const weeklyHolidayPay =
    weeklyHours >= 15 ? hourlyWage * Math.min(8, weeklyHours) : 0;
  return {
    weeklyHolidayPay,
    weeklyTotal: hourlyWage * weeklyHours + weeklyHolidayPay,
  };
}
