import type { ToolHelpers } from './shared';
import type { ToolKind } from './types';

type ToolLoader = (root: HTMLElement, helpers: ToolHelpers) => Promise<void>;

/**
 * Each loader imports only its own tool module when selected.
 * Record keeps the script registry exhaustive for every ToolKind.
 */
const toolLoaders: Record<ToolKind, ToolLoader> = {
  lotto: async (root, helpers) => {
    (await import('./lotto')).mountLottoTool(root, helpers);
  },
  random: async (root, helpers) => {
    (await import('./random-number')).mountRandomNumberTool(root, helpers);
  },
  picker: async (root, helpers) => {
    (await import('./random-picker')).mountRandomPickerTool(root, helpers);
  },
  password: async (root, helpers) => {
    (await import('./password')).mountPasswordTool(root, helpers);
  },
  date: async (root, helpers) => {
    (await import('./date-calculator')).mountDateCalculatorTool(root, helpers);
  },
  dday: async (root, helpers) => {
    (await import('./dday')).mountDdayTool(root, helpers);
  },
  age: async (root, helpers) => {
    (await import('./age-calculator')).mountAgeCalculatorTool(root, helpers);
  },
  unit: async (root, helpers) => {
    (await import('./unit-converter')).mountUnitConverterTool(root, helpers);
  },
  percent: async (root, helpers) => {
    (await import('./percent-calculator')).mountPercentCalculatorTool(root, helpers);
  },
};

export async function mountTool(
  root: HTMLElement,
  helpers: ToolHelpers,
  kind: ToolKind,
): Promise<void> {
  await toolLoaders[kind](root, helpers);
}
