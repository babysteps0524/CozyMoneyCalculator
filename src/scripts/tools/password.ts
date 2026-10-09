import type { ToolHelpers } from './shared';

export function mountPasswordTool(root: HTMLElement, helpers: ToolHelpers): void {
  const { $, value, number, copy, secureRandom, listen } = helpers;
  const generate = () => {
          const len = Math.min(
            128,
            Math.max(4, Math.floor(number('password-length')) || 16),
          );
          const sets = [
            value('pw-upper') === '' ? '' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            value('pw-lower') === '' ? '' : 'abcdefghijklmnopqrstuvwxyz',
            value('pw-number') === '' ? '' : '0123456789',
            value('pw-symbol') === '' ? '' : '!@#$%^&*()-_=+[]{}?',
          ];
          const enabled = ['pw-upper', 'pw-lower', 'pw-number', 'pw-symbol']
            .map((id) =>
              ($(id) as HTMLInputElement)?.checked
                ? sets[
                    ['pw-upper', 'pw-lower', 'pw-number', 'pw-symbol'].indexOf(id)
                  ]
                : '',
            )
            .filter(Boolean);
          const out = $('password-result') as HTMLInputElement | null;
          if (!out) return;
          if (!enabled.length) {
            out.value = '문자 구성을 하나 이상 선택하세요.';
            return;
          }
          let result = '';
          const all = enabled.join('');
          enabled.forEach((set) => {
            result += set[secureRandom(set.length)];
          });
          while (result.length < len) result += all[secureRandom(all.length)];
          const chars = result.split('');
          for (let i = chars.length - 1; i > 0; i--) {
            const j = secureRandom(i + 1);
            [chars[i], chars[j]] = [chars[j], chars[i]];
          }
          out.value = chars.join('');
        };
        listen('password-generate', 'click', generate);
        listen('password-copy', 'click', () =>
          copy(value('password-result')),
        );
        generate();
}
