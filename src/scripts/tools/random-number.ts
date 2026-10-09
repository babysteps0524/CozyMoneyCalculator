import type { ToolHelpers } from './shared';

export function mountRandomNumberTool(
  _root: HTMLElement,
  helpers: ToolHelpers,
): void {
  const { $, number, secureRandom, listen } = helpers;

  const render = () => {
    const min = Math.ceil(number('random-min'));
    const max = Math.floor(number('random-max'));
    const out = $('random-result');

    if (!out) return;
    if (
      !Number.isSafeInteger(min) ||
      !Number.isSafeInteger(max) ||
      min > max ||
      max - min + 1 > 0x100000000
    ) {
      out.textContent = '최솟값과 최댓값을 확인하세요.';
      return;
    }

    out.textContent = String(min + secureRandom(max - min + 1));
  };

  listen('random-generate', 'click', render);
  render();
}
