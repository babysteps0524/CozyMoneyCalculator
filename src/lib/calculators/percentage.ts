export interface PercentageInput {
  mode: string;
  direction: string;
  firstValue: number;
  secondValue: number;
}

export function calculatePercentage({
  mode,
  direction,
  firstValue,
  secondValue,
}: PercentageInput): number {
  if (mode === 'Y의 X% 계산') {
    return (firstValue * secondValue) / 100;
  }

  if (mode === 'X는 Y의 몇 %인지 계산') {
    return secondValue === 0 ? NaN : (firstValue / secondValue) * 100;
  }

  if (mode === '이전 값에서 새 값으로의 증감률') {
    return firstValue === 0
      ? NaN
      : ((secondValue - firstValue) / firstValue) * 100;
  }

  if (mode === '기준값의 X% 증가·감소 후 값') {
    return (
      firstValue *
      (direction === '증가' ? 1 + secondValue / 100 : 1 - secondValue / 100)
    );
  }

  if (mode === 'X%에 해당하는 원래 값') {
    return secondValue === 0 ? NaN : (firstValue * 100) / secondValue;
  }

  return secondValue - firstValue;
}
