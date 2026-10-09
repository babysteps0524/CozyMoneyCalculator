import type { ToolHelpers } from './shared';

export function mountRandomPickerTool(root: HTMLElement, helpers: ToolHelpers): void {
  const { $, value, number, format, copy, secureRandom } = helpers;
  $('picker-draw')?.addEventListener('click', () => {
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
        $('picker-copy')?.addEventListener('click', () =>
          copy(value('picker-result')),
        );
}
