import type { ToolHelpers } from './shared';

export function mountAgeCalculatorTool(root: HTMLElement, helpers: ToolHelpers): void {
  const { $, value, number, format, copy, secureRandom } = helpers;
  const asof = $('age-asof') as HTMLInputElement | null;
        if (asof)
          asof.value = new Date(
            Date.now() - new Date().getTimezoneOffset() * 60000,
          )
            .toISOString()
            .slice(0, 10);
        $('age-calc')?.addEventListener('click', () => {
          const birth = new Date(value('age-birth') + 'T00:00:00'),
            date = new Date(value('age-asof') + 'T00:00:00'),
            out = $('age-result');
          if (
            !out ||
            Number.isNaN(birth.getTime()) ||
            Number.isNaN(date.getTime()) ||
            birth > date
          ) {
            if (out) out.textContent = '생년월일과 기준일을 확인하세요.';
            return;
          }
          let years = date.getFullYear() - birth.getFullYear(),
            months = date.getMonth() - birth.getMonth(),
            days = date.getDate() - birth.getDate();
          if (days < 0) {
            months--;
            days += new Date(date.getFullYear(), date.getMonth(), 0).getDate();
          }
          if (months < 0) {
            years--;
            months += 12;
          }
          out.innerHTML =
            '<div text="2xl" font="800">' +
            years +
            '세</div><p m="0" mt="2" text="sm" text-text-muted dark="text-dark-text-muted">만 ' +
            years +
            '년 ' +
            months +
            '개월 ' +
            days +
            '일입니다.</p>';
        });
}
