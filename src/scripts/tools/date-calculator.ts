import type { ToolHelpers } from './shared';

export function mountDateCalculatorTool(root: HTMLElement, helpers: ToolHelpers): void {
  const { $, value, number, format, copy, secureRandom } = helpers;
  $('date-calc')?.addEventListener('click', () => {
          const a = new Date(value('date-start') + 'T00:00:00'),
            b = new Date(value('date-end') + 'T00:00:00');
          const out = $('date-result');
          if (!out || Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) {
            if (out) out.textContent = '두 날짜를 모두 선택하세요.';
            return;
          }
          const days = Math.round(Math.abs(b.getTime() - a.getTime()) / 86400000);
          const inclusive = days + 1;
          out.innerHTML =
            '<strong text="xl">' +
            format(days) +
            '일</strong><p m="0" mt="2" text="sm" text-text-muted dark="text-dark-text-muted">시작일과 종료일을 모두 포함하면 ' +
            format(inclusive) +
            '일입니다.</p>';
        });
}
