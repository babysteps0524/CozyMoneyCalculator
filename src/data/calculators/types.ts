import type { CalculatorDetailsContent } from '../../lib/calculators/guidance';

export interface CalculatorDefinition {
  slug: string;
  title: string;
  description: string;
  canonical: string;
  category: string;
  guidance?: CalculatorDetailsContent;
}
