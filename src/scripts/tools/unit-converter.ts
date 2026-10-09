import type { ToolHelpers } from './shared';

interface UnitDefinition {
  labels: string[];
  convert: (value: number, direction: string) => number;
}

const UNITS: Record<string, UnitDefinition> = {
  length: {
    labels: ['m → km', 'km → m', 'cm → m', 'm → cm'],
    convert: (value, direction) =>
      direction === 'm → km'
        ? value / 1000
        : direction === 'km → m'
          ? value * 1000
          : direction === 'cm → m'
            ? value / 100
            : value * 100,
  },
  weight: {
    labels: ['kg → g', 'g → kg', 'kg → lb', 'lb → kg'],
    convert: (value, direction) =>
      direction === 'kg → g'
        ? value * 1000
        : direction === 'g → kg'
          ? value / 1000
          : direction === 'kg → lb'
            ? value * 2.2046226218
            : value / 2.2046226218,
  },
  temperature: {
    labels: ['℃ → ℉', '℉ → ℃'],
    convert: (value, direction) =>
      direction === '℃ → ℉' ? (value * 9) / 5 + 32 : ((value - 32) * 5) / 9,
  },
  area: {
    labels: ['㎡ → 평', '평 → ㎡'],
    convert: (value, direction) =>
      direction === '㎡ → 평' ? value / 3.305785 : value * 3.305785,
  },
  data: {
    labels: ['MB → GB', 'GB → MB', 'GB → TB', 'TB → GB'],
    convert: (value, direction) =>
      direction === 'MB → GB'
        ? value / 1024
        : direction === 'GB → MB'
          ? value * 1024
          : direction === 'GB → TB'
            ? value / 1024
            : value * 1024,
  },
};

export function mountUnitConverterTool(
  _root: HTMLElement,
  helpers: ToolHelpers,
): void {
  const { $, value, number, format, listen } = helpers;

  const calculate = () => {
    const definition = UNITS[value('unit-type')];
    const output = $('unit-result');

    if (!definition || !output) return;

    const inputValue = number('unit-value');
    const direction = value('unit-direction');

    if (!Number.isFinite(inputValue) || !definition.labels.includes(direction)) {
      output.textContent = '값과 변환 방향을 확인하세요.';
      return;
    }

    output.textContent = format(definition.convert(inputValue, direction), 6);
  };

  const updateDirections = () => {
    const definition = UNITS[value('unit-type')];
    const directionSelect = $('unit-direction') as HTMLSelectElement | null;

    if (!definition || !directionSelect) return;

    directionSelect.replaceChildren(
      ...definition.labels.map((label) => {
        const option = document.createElement('option');
        option.value = label;
        option.textContent = label;
        return option;
      }),
    );

    calculate();
  };

  listen('unit-type', 'change', updateDirections);
  listen('unit-direction', 'change', calculate);
  listen('unit-value', 'input', calculate);

  updateDirections();
}
