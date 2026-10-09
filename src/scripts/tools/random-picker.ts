import type { ToolHelpers } from './shared';

export function mountRandomPickerTool(root: HTMLElement, helpers: ToolHelpers): void {
  const { $, value, copy, secureRandom, listen } = helpers;
  listen('picker-draw', 'click', () => {
          const items = value('picker-items')
            .split(/\n/)
            .map((x) => x.trim())
            .filter(Boolean);
          const out = $('picker-result');
          if (!out) return;
          out.textContent = items.length
            ? items[secureRandom(items.length)]
            : '추첨할 항목을 입력하세요.';
        });
        listen('picker-copy', 'click', () =>
          copy(value('picker-result'), 'picker-copy'),
        );
}
