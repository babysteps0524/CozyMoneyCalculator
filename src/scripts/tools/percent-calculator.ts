import type { ToolHelpers } from './shared';

export function mountPercentCalculatorTool(root: HTMLElement, helpers: ToolHelpers): void {
  const { $, value, number, format, copy, secureRandom } = helpers;
  const calc = () => {
          const a = number('percent-a'),
            b = number('percent-b'),
            type = value('percent-type'),
            out = $('percent-result');
          if (!out) return;
          let text = '';
          if (type === 'of') text = format((a * b) / 100, 2);
          if (type === 'change')
            text =
              a !== 0
                ? format(((b - a) / a) * 100, 2) + '% 변화'
                : '계산할 수 없습니다.';
          if (type === 'discount') text = format(a * (1 - b / 100), 2);
          if (type === 'increase') text = format(a * (1 + b / 100), 2);
          out.textContent = text;
        };
        $('percent-calc')?.addEventListener('click', calc);
        calc();
}
