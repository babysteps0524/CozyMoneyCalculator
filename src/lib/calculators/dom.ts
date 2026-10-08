import { parseNumber } from './number-input';

export function resetCalculatorFields(fields: ParentNode): void {
  fields.querySelectorAll<HTMLInputElement>('input').forEach((input) => {
    const defaultValue = input.dataset.defaultValue;
    if (defaultValue !== undefined) {
      input.value = defaultValue;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });

  fields.querySelectorAll<HTMLSelectElement>('select').forEach((select) => {
    select.selectedIndex = 0;
    select.dispatchEvent(new Event('change', { bubbles: true }));
  });
}

export function getCalculatorField(
  root: ParentNode,
  id: string,
): HTMLInputElement | HTMLSelectElement | null {
  return root.querySelector<HTMLInputElement | HTMLSelectElement>(
    '#' + id,
  );
}

export function readCalculatorNumber(
  root: ParentNode,
  id: string,
): number {
  const field = getCalculatorField(root, id);
  return field instanceof HTMLInputElement ? parseNumber(field.value) : 0;
}

export function formatCalculatorNumber(
  value: number,
  maximumFractionDigits = 0,
): string {
  return Number.isFinite(value)
    ? value.toLocaleString('ko-KR', { maximumFractionDigits })
    : '-';
}

export function formatCalculatorWon(
  value: number,
  maximumFractionDigits = 0,
): string {
  return formatCalculatorNumber(value, maximumFractionDigits) + '원';
}
