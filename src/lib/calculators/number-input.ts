export function parseNumber(value: string): number {
  const normalized = value.replace(/,/g, '').trim();
  return normalized === '' || normalized === '-' || normalized === '.' || normalized === '-.'
    ? 0
    : Number(normalized);
}

export function formatNumberInputValue(value: string, allowDecimal = false): string {
  let normalized = value.replace(/,/g, '').replace(/[^0-9.]/g, '');

  if (!allowDecimal) {
    normalized = normalized.replace(/\./g, '');
    if (normalized === '') return '';
    return Number(normalized).toLocaleString('ko-KR');
  }

  const firstDot = normalized.indexOf('.');
  if (firstDot >= 0) {
    const integerPart = normalized.slice(0, firstDot) || '0';
    const decimalPart = normalized.slice(firstDot + 1).replace(/\./g, '');
    return `${Number(integerPart).toLocaleString('ko-KR')}.${decimalPart}`;
  }

  if (normalized === '') return '';
  return Number(normalized).toLocaleString('ko-KR');
}

export function bindNumberInput(input: HTMLInputElement): void {
  const allowDecimal = input.dataset.decimal === 'true';

  const format = () => {
    const start = input.selectionStart ?? input.value.length;
    const digitsBeforeCaret = input.value
      .slice(0, start)
      .replace(/[^0-9]/g, '').length;

    input.value = formatNumberInputValue(input.value, allowDecimal);

    let digitCount = 0;
    let caret = 0;

    if (digitsBeforeCaret > 0) {
      caret = input.value.length;
      for (let i = 0; i < input.value.length; i += 1) {
        if (/\d/.test(input.value[i])) digitCount += 1;
        if (digitCount >= digitsBeforeCaret) {
          caret = i + 1;
          break;
        }
      }
    }

    if (document.activeElement === input) {
      input.setSelectionRange(caret, caret);
    }
  };

  input.addEventListener('input', format);
  input.addEventListener('blur', format);
  format();
}

export function stepNumberInput(
  input: HTMLInputElement,
  direction: 1 | -1,
): void {
  const current = parseNumber(input.value);
  const step = Number(input.dataset.step || '1');
  const min = Number(input.dataset.min || '0');
  const max = input.dataset.max ? Number(input.dataset.max) : Infinity;
  const next = Math.min(max, Math.max(min, current + direction * step));
  const precision = (String(step).split('.')[1] || '').length;
  const rounded = Number(next.toFixed(Math.max(precision, 0)));
  input.value = formatNumberInputValue(String(rounded), input.dataset.decimal === 'true');
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

export function bindNumberControls(root: ParentNode): void {
  root.querySelectorAll<HTMLInputElement>('input[data-number-input]').forEach((input) => {
    bindNumberInput(input);

    const controls = input.parentElement?.parentElement;
    const decrease = controls?.querySelector<HTMLButtonElement>(
      '[data-step-direction="-1"]',
    );
    const increase = controls?.querySelector<HTMLButtonElement>(
      '[data-step-direction="1"]',
    );

    decrease?.addEventListener('click', () => {
      stepNumberInput(input, -1);
      input.focus();
    });
    increase?.addEventListener('click', () => {
      stepNumberInput(input, 1);
      input.focus();
    });
  });
}
