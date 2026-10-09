import type { ToolHelpers } from './shared';
import type { ToolKind } from './types';

/**
 * Load only the active tool module.
 * Each dynamic import lets the bundler create a separate chunk per tool.
 */
export async function mountTool(
  root: HTMLElement,
  helpers: ToolHelpers,
  kind: ToolKind | undefined,
): Promise<void> {
  switch (kind) {
    case 'lotto':
      (await import('./lotto')).mountLottoTool(root, helpers);
      break;
    case 'random':
      (await import('./random-number')).mountRandomNumberTool(root, helpers);
      break;
    case 'picker':
      (await import('./random-picker')).mountRandomPickerTool(root, helpers);
      break;
    case 'password':
      (await import('./password')).mountPasswordTool(root, helpers);
      break;
    case 'date':
      (await import('./date-calculator')).mountDateCalculatorTool(root, helpers);
      break;
    case 'dday':
      (await import('./dday')).mountDdayTool(root, helpers);
      break;
    case 'age':
      (await import('./age-calculator')).mountAgeCalculatorTool(root, helpers);
      break;
    case 'unit':
      (await import('./unit-converter')).mountUnitConverterTool(root, helpers);
      break;
    case 'percent':
      (await import('./percent-calculator')).mountPercentCalculatorTool(root, helpers);
      break;
  }
}
