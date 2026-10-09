import type { ToolHelpers } from './shared';

export function mountLottoTool(root: HTMLElement, helpers: ToolHelpers): void {
  const { $, value, number, format, copy, secureRandom } = helpers;
  const render = () => {
          const count = Number(value('lotto-count')) || 1;
          const target = $('lotto-results');
          if (!target) return;
          target.innerHTML = Array.from({ length: count }, (_, i) => {
            const nums: number[] = [];
            while (nums.length < 6) {
              const n = secureRandom(45) + 1;
              if (!nums.includes(n)) nums.push(n);
            }
            nums.sort((a, b) => a - b);
            const odd = nums.filter((n) => n % 2).length;
            return (
              '<div class="cm-result"><div flex="~" items-center justify-between gap="2"><span text="xs" font="700" text-text-subtle dark="text-dark-text-subtle">' +
              (i + 1) +
              '게임</span><span text="xs" text-text-muted dark="text-dark-text-muted">홀 ' +
              odd +
              ' · 짝 ' +
              (6 - odd) +
              ' · 합 ' +
              nums.reduce((a, b) => a + b, 0) +
              '</span></div><div flex="~ wrap" gap="2" mt="3">' +
              nums
                .map((n) => '<span class="cm-number-ball">' + n + '</span>')
                .join('') +
              '</div></div>'
            );
          }).join('');
        };
        $('lotto-generate')?.addEventListener('click', render);
        $('lotto-count')?.addEventListener('change', render);
        $('lotto-copy')?.addEventListener('click', () => {
          const cards = Array.from(root.querySelectorAll('.cm-result'));
          copy(
            cards
              .map(
                (card, i) =>
                  i +
                  1 +
                  '게임: ' +
                  Array.from(card.querySelectorAll('.cm-number-ball'))
                    .map((x) => x.textContent)
                    .join(', '),
              )
              .join('\n'),
          );
        });
        render();
}
