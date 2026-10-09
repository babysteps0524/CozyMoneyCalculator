import type { ToolHelpers } from './shared';

export function mountUnitConverterTool(root: HTMLElement, helpers: ToolHelpers): void {
  const { $, value, number, format, copy, secureRandom } = helpers;
  const units: Record<
          string,
          { labels: string[]; convert: (v: number, dir: string) => number }
        > = {
          length: {
            labels: ['m → km', 'km → m', 'cm → m', 'm → cm'],
            convert: (v, d) =>
              d === 'm → km'
                ? v / 1000
                : d === 'km → m'
                  ? v * 1000
                  : d === 'cm → m'
                    ? v / 100
                    : v * 100,
          },
          weight: {
            labels: ['kg → g', 'g → kg', 'kg → lb', 'lb → kg'],
            convert: (v, d) =>
              d === 'kg → g'
                ? v * 1000
                : d === 'g → kg'
                  ? v / 1000
                  : d === 'kg → lb'
                    ? v * 2.2046226218
                    : v / 2.2046226218,
          },
          temperature: {
            labels: ['℃ → ℉', '℉ → ℃'],
            convert: (v, d) =>
              d === '℃ → ℉' ? (v * 9) / 5 + 32 : ((v - 32) * 5) / 9,
          },
          area: {
            labels: ['㎡ → 평', '평 → ㎡'],
            convert: (v, d) => (d === '㎡ → 평' ? v / 3.305785 : v * 3.305785),
          },
          data: {
            labels: ['MB → GB', 'GB → MB', 'GB → TB', 'TB → GB'],
            convert: (v, d) =>
              d === 'MB → GB'
                ? v / 1024
                : d === 'GB → MB'
                  ? v * 1024
                  : d === 'GB → TB'
                    ? v / 1024
                    : v * 1024,
          },
        };
        const update = () => {
          const type = value('unit-type'),
            def = units[type];
          const select = $('unit-direction') as HTMLSelectElement | null;
          if (!select) return;
          select.innerHTML = def.labels
            .map((x) => '<option>' + x + '</option>')
            .join('');
          const out = $('unit-result');
          if (out)
            out.textContent = format(
              def.convert(number('unit-value'), def.labels[0]),
              6,
            );
        };
        const calc = () => {
          const type = value('unit-type'),
            def = units[type],
            dir = value('unit-direction'),
            out = $('unit-result');
          if (out)
            out.textContent = format(def.convert(number('unit-value'), dir), 6);
        };
        $('unit-type')?.addEventListener('change', () => {
          update();
          calc();
        });
        $('unit-direction')?.addEventListener('change', calc);
        $('unit-value')?.addEventListener('input', calc);
        update();
}
