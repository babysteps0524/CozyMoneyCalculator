import type { ToolHelpers } from './shared';

export function mountRandomNumberTool(root: HTMLElement, helpers: ToolHelpers): void {
  const { $, number, secureRandom, listen } = helpers;
  const render = () => {
          const min = Math.ceil(number('random-min')),
            max = Math.floor(number('random-max'));
          const out = $('random-result');
          if (!out) return;
          out.textContent =
            min <= max
              ? String(min + secureRandom(max - min + 1))
              : '최솟값과 최댓값을 확인하세요.';
        };
        listen('random-generate', 'click', render);
        render();
}
