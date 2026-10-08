import type { CalculatorGuidance } from '../../lib/calculators/guidance';

export type CalculatorMode = 'standard' | 'custom';

export interface CalculatorDefinition {
  slug: string;
  title: string;
  description: string;
  canonical: string;
  category: string;
  mode: CalculatorMode;
  guidance?: CalculatorGuidance;
}
