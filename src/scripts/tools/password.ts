import type { ToolHelpers } from './shared';

const CHARACTER_SETS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  number: '0123456789',
  symbol: '!@#$%^&*()-_=+[]{}?',
} as const;

export function mountPasswordTool(root: HTMLElement, helpers: ToolHelpers): void {
  const { $, number, copy, secureRandom, listen } = helpers;

  const generate = () => {
    const length = Math.min(
      128,
      Math.max(4, Math.floor(number('password-length')) || 16),
    );
    const options = [
      { id: 'pw-upper', characters: CHARACTER_SETS.upper },
      { id: 'pw-lower', characters: CHARACTER_SETS.lower },
      { id: 'pw-number', characters: CHARACTER_SETS.number },
      { id: 'pw-symbol', characters: CHARACTER_SETS.symbol },
    ];
    const enabled = options.filter(
      ({ id }) => ($(id) as HTMLInputElement | null)?.checked,
    );
    const output = $('password-result') as HTMLInputElement | null;

    if (!output) return;

    if (!enabled.length) {
      output.value = '문자 구성을 하나 이상 선택하세요.';
      return;
    }

    const allCharacters = enabled
      .map(({ characters }) => characters)
      .join('');
    const characters = enabled.map(
      ({ characters: set }) => set[secureRandom(set.length)],
    );

    while (characters.length < length) {
      characters.push(allCharacters[secureRandom(allCharacters.length)]);
    }

    for (let index = characters.length - 1; index > 0; index--) {
      const swapIndex = secureRandom(index + 1);
      [characters[index], characters[swapIndex]] = [
        characters[swapIndex],
        characters[index],
      ];
    }

    output.value = characters.join('');
  };

  listen('password-generate', 'click', generate);
  listen('password-copy', 'click', () => {
    const output = $('password-result') as HTMLInputElement | null;
    void copy(output?.value ?? '', 'password-copy');
  });

  generate();
}
