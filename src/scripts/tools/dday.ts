import type { ToolHelpers } from './shared';

export function mountDdayTool(root: HTMLElement, helpers: ToolHelpers): void {
  const { $, value, number, format, copy, secureRandom } = helpers;
  const today = new Date();
        today.setHours(0, 0, 0, 0);
        const input = $('dday-date') as HTMLInputElement | null;
        if (input)
          input.value = new Date(
            Date.now() - new Date().getTimezoneOffset() * 60000,
          )
            .toISOString()
            .slice(0, 10);
        const calc = () => {
          const target = new Date(value('dday-date') + 'T00:00:00');
          const out = $('dday-result');
          if (!out || Number.isNaN(target.getTime())) return;
          const diff = Math.round(
            (target.getTime() - today.getTime()) / 86400000,
          );
          const name = value('dday-name') || '목표 날짜';
          out.innerHTML =
            '<div text="sm" text-text-muted dark="text-dark-text-muted">' +
            name +
            '</div><div mt="1" text="4xl md:5xl" font="800">' +
            (diff > 0
              ? 'D-' + diff
              : diff < 0
                ? 'D+' + Math.abs(diff)
                : 'D-DAY') +
            '</div>';
        };
        $('dday-calc')?.addEventListener('click', calc);
        calc();
}
