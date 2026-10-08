import type { CalculatorDetailsContent, CalculatorGuidance } from '../../lib/calculators/guidance';

export type CalculatorMode = 'standard' | 'custom';

export interface CalculatorDefinitionBase {
  slug: string;
  title: string;
  description: string;
  canonical: string;
  category: string;
}

export interface StandardCalculatorDefinition extends CalculatorDefinitionBase {
  mode: 'standard';
  guidance: CalculatorGuidance;
}

export interface CustomCalculatorDefinition extends CalculatorDefinitionBase {
  mode: 'custom';
  guidance?: CalculatorDetailsContent;
}

export type CalculatorDefinition =
  | StandardCalculatorDefinition
  | CustomCalculatorDefinition;
