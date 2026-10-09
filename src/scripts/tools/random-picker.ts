import type { ToolHelpers } from './shared';

export function mountRandomPickerTool(
  root: HTMLElement,
  helpers: ToolHelpers,
): void {
  const { $, value, copy, secureRandom, listen } = helpers;

  listen('picker-draw', 'click', () => {
    const items = value('picker-items')
      .split(/\n/)
      .map((item) => item.trim())
      .filter(Boolean);
    const output = $('picker-result');

    if (!output) return;

    output.textContent = items.length
      ? items[secureRandom(items.length)]
      : '추첨할 항목을 입력하세요.';
  });

  listen('picker-copy', 'click', () => {
    void copy(value('picker-result'), 'picker-copy');
  });
}
