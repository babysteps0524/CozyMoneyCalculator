import type { ToolHelpers } from './shared';

export function mountDdayTool(root: HTMLElement, helpers: ToolHelpers): void {
  const { $, value, listen } = helpers;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const input = $('dday-date') as HTMLInputElement | null;
  if (input) {
    input.value = new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000,
    )
      .toISOString()
      .slice(0, 10);
  }

  const calc = () => {
    const rawDate = value('dday-date');
    const target = new Date(rawDate + 'T00:00:00');
    const out = $('dday-result');

    if (!out) return;
    if (!rawDate || Number.isNaN(target.getTime())) {
      out.textContent = '목표 날짜를 선택하세요.';
      return;
    }

    const diff = Math.round(
      (target.getTime() - today.getTime()) / 86400000,
    );
    const name = value('dday-name') || '목표 날짜';
    const nameElement = document.createElement('div');
    nameElement.className = 'text-sm text-text-muted dark:text-dark-text-muted';
    nameElement.textContent = name;

    const resultElement = document.createElement('div');
    resultElement.className = 'mt-1 text-4xl md:text-5xl font-800';
    resultElement.textContent =
      diff > 0 ? 'D-' + diff : diff < 0 ? 'D+' + Math.abs(diff) : 'D-DAY';

    out.replaceChildren(nameElement, resultElement);
  };

  listen('dday-calc', 'click', calc);
  calc();
}
